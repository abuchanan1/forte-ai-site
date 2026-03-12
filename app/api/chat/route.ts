import { type NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getSystemPrompt, LEAD_CAPTURE_INSTRUCTION } from '@/lib/chatbot-prompt'

export const runtime = 'nodejs'
export const maxDuration = 30

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const body = await request.json()
    const messages: ChatMessage[] = body.messages ?? []

    if (!messages.length) {
      return new Response(
        JSON.stringify({ error: 'No messages provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      )
    }

    // Limit conversation history to last 20 messages to control token usage
    const trimmedMessages = messages.slice(-20)

    const client = new Anthropic({ apiKey })

    const stream = await client.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: getSystemPrompt() + LEAD_CAPTURE_INSTRUCTION,
      messages: trimmedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    })

    // Stream the response as Server-Sent Events
    const encoder = new TextEncoder()

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              const data = JSON.stringify({ type: 'delta', text: event.delta.text })
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            }
          }

          // Send final message with usage info
          const finalMessage = await stream.finalMessage()
          const usage = {
            input_tokens: finalMessage.usage.input_tokens,
            output_tokens: finalMessage.usage.output_tokens,
          }
          const data = JSON.stringify({ type: 'done', usage })
          controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          controller.close()
        } catch (err) {
          const errMsg = err instanceof Error ? err.message : 'Stream error'
          const data = JSON.stringify({ type: 'error', error: errMsg })
          controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          controller.close()
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[CHAT API]', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
