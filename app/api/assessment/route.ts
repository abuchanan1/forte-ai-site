import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { buildReport, type Track } from '@/lib/diagnostic'

const submissionSchema = z.object({
  track: z.enum(['small-business', 'nonprofit']),
  answers: z.record(z.string(), z.union([z.number(), z.string(), z.array(z.string())])),
  contact: z
    .object({
      name: z.string().max(200).optional(),
      email: z.string().email().max(200).optional().or(z.literal('')),
      organization: z.string().max(200).optional(),
      role: z.string().max(200).optional(),
      orgSize: z.string().max(50).optional(),
      phone: z.string().max(50).optional(),
      requestedCall: z.boolean().optional(),
    })
    .optional(),
  honeypot: z.string().optional(),
})

const SESSION_COOKIE = 'forte_session_id'
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

function generateId(): string {
  // Node runtime has crypto.randomUUID; fallback for edge compatibility
  try {
    return crypto.randomUUID()
  } catch {
    return `f${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    const result = submissionSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Please check your entries and try again.' },
        { status: 400 },
      )
    }

    if (result.data.honeypot) {
      return NextResponse.json({ success: true })
    }

    const data = result.data
    const track = data.track as Track
    const contact = data.contact ?? {}

    // Rate limiting via Upstash
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
      const { success: allowed } = await ratelimit.limit(`assessment:${ip}`)
      if (!allowed) {
        return NextResponse.json(
          { success: false, message: 'Too many submissions. Try again later.' },
          { status: 429 },
        )
      }
    }

    const report = buildReport(track, data.answers, contact.organization)
    const submissionId = generateId()
    const timestamp = new Date().toISOString()

    // Session cookie
    let sessionId = request.cookies.get(SESSION_COOKIE)?.value
    if (!sessionId) sessionId = generateId()

    const record = {
      submissionId,
      timestamp,
      sessionId,
      track,
      answers: data.answers,
      scores: report.scores,
      bottleneckStage: report.bottleneckStage,
      insight: report.insight,
      contact: {
        name: contact.name ?? '',
        email: contact.email ?? '',
        organization: contact.organization ?? '',
        role: contact.role ?? '',
        orgSize: contact.orgSize ?? '',
        phone: contact.phone ?? '',
        requestedCall: contact.requestedCall ?? false,
      },
    }

    // Persist to Upstash if configured
    if (
      process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      const { Redis } = await import('@upstash/redis')
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
      await redis.set(`assessment:${submissionId}`, record)
      await redis.zadd('assessment:index', { score: Date.now(), member: submissionId })
      if (sessionId) {
        await redis.sadd(`assessment:session:${sessionId}`, submissionId)
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('[ASSESSMENT] (no Upstash) record:', JSON.stringify(record))
    }

    const response = NextResponse.json({
      success: true,
      submissionId,
      report,
    })
    response.cookies.set(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: ONE_YEAR_SECONDS,
    })
    return response
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[ASSESSMENT] Unexpected error:', err)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
