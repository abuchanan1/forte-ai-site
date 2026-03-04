import { NextResponse, type NextRequest } from 'next/server'
import { contactFormSchema } from '@/lib/validations'
import type { ApiResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()

    const result = contactFormSchema.safeParse(body)

    if (!result.success) {
      const fieldErrors: Record<string, string[]> = {}
      for (const issue of result.error.issues) {
        const field = String(issue.path[0])
        if (!fieldErrors[field]) {
          fieldErrors[field] = []
        }
        fieldErrors[field]!.push(issue.message)
      }

      const response: ApiResponse = {
        success: false,
        message: 'Validation failed. Please check your input.',
        errors: fieldErrors,
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Check honeypot
    if (result.data.honeypot) {
      const response: ApiResponse = {
        success: true,
        message: 'Thank you for your message.',
      }
      return NextResponse.json(response, { status: 200 })
    }

    // Rate limiting with Upstash Redis
    if (
      process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      const { Ratelimit } = await import('@upstash/ratelimit')
      const { Redis } = await import('@upstash/redis')

      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })

      const ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '1 h'),
      })

      const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
        'anonymous'

      const { success: allowed } = await ratelimit.limit(ip)

      if (!allowed) {
        const response: ApiResponse = {
          success: false,
          message:
            'Too many requests. Please try again later or email us directly at hello@forteaisolutions.com',
        }
        return NextResponse.json(response, { status: 429 })
      }
    }

    // TODO: Integrate email service (Resend or Postmark) to forward the contact form submission
    // For now, log the submission server-side
    // eslint-disable-next-line no-console
    console.log('Contact form submission:', {
      name: result.data.name,
      company: result.data.company,
      role: result.data.role,
      email: result.data.email,
      messageLength: result.data.message.length,
    })

    const response: ApiResponse = {
      success: true,
      message:
        'Thank you. We received your message and will be in touch within one business day.',
    }
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Contact form error:', error)

    const response: ApiResponse = {
      success: false,
      message:
        'Something went wrong. Please try again or email us directly at hello@forteaisolutions.com',
    }
    return NextResponse.json(response, { status: 500 })
  }
}
