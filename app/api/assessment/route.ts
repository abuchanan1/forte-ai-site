import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { DIMENSION_LABELS, QUESTIONS, buildReport, type Track } from '@/lib/diagnostic'

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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

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

    // Notification email to Aaron — reuses the existing Resend pattern
    if (process.env.RESEND_API_KEY && process.env.CONTACT_FORM_TO_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const trackLabel =
        track === 'small-business' ? 'Small Business' : 'Nonprofit / Mission-Driven'
      const questions = QUESTIONS[track]

      const scoreRows = report.scores
        .map(
          (s) =>
            `<tr>
              <td style="padding:6px 12px; color:#F7F4EE; font-size:13px;">${DIMENSION_LABELS[s.dimension]}</td>
              <td style="padding:6px 12px; color:#C49A58; font-size:13px; text-align:right;">${s.average}/4.0 — ${s.stage}</td>
            </tr>`,
        )
        .join('')

      const answerRows = questions
        .map((q) => {
          const value = data.answers[q.id]
          let display = ''
          if (q.type === 'score' && typeof value === 'number') {
            const option = q.options?.find((o) => o.score === value)
            display = `${value}/4 — ${option?.label ?? ''}`
          } else if (q.type === 'context' && Array.isArray(value)) {
            display = value.join(', ')
          } else if (q.type === 'open' && typeof value === 'string') {
            display = value
          } else {
            display = '(no answer)'
          }
          return `
            <tr>
              <td style="padding:10px 12px; vertical-align:top; border-bottom:1px solid rgba(160,120,64,0.15); color:#9aa0a6; font-size:12px; width:40px;">${q.id.toUpperCase()}</td>
              <td style="padding:10px 12px; vertical-align:top; border-bottom:1px solid rgba(160,120,64,0.15); font-size:13px;">
                <div style="color:#F7F4EE; margin-bottom:4px;">${escapeHtml(q.prompt)}</div>
                <div style="color:#C49A58;">${escapeHtml(display)}</div>
              </td>
            </tr>
          `
        })
        .join('')

      const contactRows = [
        ['Name', contact.name ?? ''],
        ['Email', contact.email ?? ''],
        ['Organization', contact.organization ?? ''],
        ['Role', contact.role ?? ''],
        ['Org size', contact.orgSize ?? ''],
        ['Phone', contact.phone ?? ''],
      ]
        .filter(([, v]) => (v ?? '').length > 0)
        .map(
          ([label, value]) =>
            `<tr><td style="padding:6px 12px; color:#9aa0a6; font-size:12px; width:110px;">${label}</td><td style="padding:6px 12px; color:#F7F4EE; font-size:13px;">${escapeHtml(String(value))}</td></tr>`,
        )
        .join('')

      const callBadge = contact.requestedCall
        ? '<strong style="color:#C49A58;">Requested discovery call</strong>'
        : ''

      const replyTo = contact.email ? contact.email : undefined

      const { error: emailError } = await resend.emails.send({
        from: 'Forte AI Solutions <onboarding@resend.dev>',
        to: process.env.CONTACT_FORM_TO_EMAIL,
        ...(replyTo ? { replyTo } : {}),
        subject: `New Decision Readiness Diagnostic — ${contact.organization || 'anonymous'}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 640px; margin: 0 auto; background:#060E1C; padding:24px;">
            <h2 style="color:#F7F4EE; margin:0 0 8px; font-size:20px;">New Decision Readiness Diagnostic</h2>
            <p style="color:#9aa0a6; margin:0 0 20px; font-size:13px;">Track: ${trackLabel}${callBadge ? ' · ' + callBadge : ''}</p>

            ${
              contactRows.length > 0
                ? `<h3 style="color:#F7F4EE; font-size:14px; margin:0 0 8px; text-transform:uppercase; letter-spacing:0.1em;">Respondent</h3>
            <table style="width:100%; border-collapse:collapse; margin-bottom:24px; background:#0C1B33; border:1px solid rgba(160,120,64,0.2); border-radius:6px;">
              ${contactRows}
            </table>`
                : `<p style="color:#9aa0a6; font-size:13px; margin:0 0 20px; font-style:italic;">Respondent skipped the contact form.</p>`
            }

            <h3 style="color:#F7F4EE; font-size:14px; margin:0 0 8px; text-transform:uppercase; letter-spacing:0.1em;">Scores</h3>
            <table style="width:100%; border-collapse:collapse; margin-bottom:8px; background:#0C1B33; border:1px solid rgba(160,120,64,0.2); border-radius:6px;">
              ${scoreRows}
            </table>
            <p style="color:#9aa0a6; font-size:12px; margin:0 0 24px;">Bottleneck stage (lowest dimension): <strong style="color:#C49A58;">${report.bottleneckStage}</strong></p>

            <h3 style="color:#F7F4EE; font-size:14px; margin:0 0 8px; text-transform:uppercase; letter-spacing:0.1em;">Key insight</h3>
            <p style="color:#F7F4EE; font-size:13px; margin:0 0 6px;"><strong>${escapeHtml(report.insight.headline)}</strong></p>
            <p style="color:#c9cdd4; font-size:13px; margin:0 0 24px;">${escapeHtml(report.insight.body)}</p>

            <h3 style="color:#F7F4EE; font-size:14px; margin:0 0 8px; text-transform:uppercase; letter-spacing:0.1em;">Answers</h3>
            <table style="width:100%; border-collapse:collapse; background:#0C1B33; border:1px solid rgba(160,120,64,0.2); border-radius:6px;">
              ${answerRows}
            </table>

            <p style="color:#9aa0a6; font-size:11px; margin:20px 0 0;">Submission ID: ${submissionId}</p>
          </div>
        `,
      })

      if (emailError) {
        // eslint-disable-next-line no-console
        console.error('[ASSESSMENT] Resend error:', JSON.stringify(emailError))
      }
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
