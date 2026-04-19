import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import {
  DIMENSION_LABELS,
  QUESTIONS,
  computeScores,
  overallBottleneckStage,
  type Track,
} from '@/lib/diagnostic'

const submissionSchema = z.object({
  track: z.enum(['small-business', 'nonprofit']),
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  organization: z.string().min(1).max(200),
  role: z.string().min(1).max(200),
  orgSize: z.string().max(50).optional(),
  phone: z.string().max(50).optional(),
  requestedCall: z.boolean().optional(),
  answers: z.record(z.string(), z.union([z.number(), z.string(), z.array(z.string())])),
  honeypot: z.string().optional(),
})

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
    const scores = computeScores(track, data.answers)
    const bottleneck = overallBottleneckStage(scores)

    // Rate limiting via Upstash if configured
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
        limiter: Ratelimit.slidingWindow(3, '1 h'),
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

    // eslint-disable-next-line no-console
    console.log(
      '[ASSESSMENT]',
      JSON.stringify({
        email: data.email,
        organization: data.organization,
        track,
        scores,
        bottleneck,
        requestedCall: data.requestedCall ?? false,
        timestamp: new Date().toISOString(),
      }),
    )

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FORM_TO_EMAIL) {
      // eslint-disable-next-line no-console
      console.warn('[ASSESSMENT] Resend env vars not set; submission logged only.')
      return NextResponse.json({ success: true, emailSent: false })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const trackLabel = track === 'small-business' ? 'Small Business' : 'Nonprofit / Mission-Driven'
    const questions = QUESTIONS[track]

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

    const scoreRows = scores
      .map(
        (s) =>
          `<tr>
            <td style="padding:6px 12px; color:#F7F4EE; font-size:13px;">${DIMENSION_LABELS[s.dimension]}</td>
            <td style="padding:6px 12px; color:#C49A58; font-size:13px; text-align:right;">${s.average}/4.0 — ${s.stage}</td>
          </tr>`,
      )
      .join('')

    // Email 1: Notification to Aaron
    const { error: aaronError } = await resend.emails.send({
      from: 'Forte AI Solutions <onboarding@resend.dev>',
      to: process.env.CONTACT_FORM_TO_EMAIL,
      replyTo: data.email,
      subject: `New Decision Readiness Diagnostic — ${data.organization}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 640px; margin: 0 auto; background:#060E1C; padding:24px;">
          <h2 style="color:#F7F4EE; margin:0 0 8px; font-size:20px;">New Decision Readiness Diagnostic</h2>
          <p style="color:#9aa0a6; margin:0 0 20px; font-size:13px;">Track: ${trackLabel}${data.requestedCall ? ' · <strong style="color:#C49A58;">Requested discovery call</strong>' : ''}</p>

          <h3 style="color:#F7F4EE; font-size:14px; margin:0 0 8px; text-transform:uppercase; letter-spacing:0.1em;">Respondent</h3>
          <table style="width:100%; border-collapse:collapse; margin-bottom:24px; background:#0C1B33; border:1px solid rgba(160,120,64,0.2); border-radius:6px;">
            <tr><td style="padding:6px 12px; color:#9aa0a6; font-size:12px; width:110px;">Name</td><td style="padding:6px 12px; color:#F7F4EE; font-size:13px;">${escapeHtml(data.name)}</td></tr>
            <tr><td style="padding:6px 12px; color:#9aa0a6; font-size:12px;">Email</td><td style="padding:6px 12px; font-size:13px;"><a href="mailto:${escapeHtml(data.email)}" style="color:#C49A58;">${escapeHtml(data.email)}</a></td></tr>
            <tr><td style="padding:6px 12px; color:#9aa0a6; font-size:12px;">Organization</td><td style="padding:6px 12px; color:#F7F4EE; font-size:13px;">${escapeHtml(data.organization)}</td></tr>
            <tr><td style="padding:6px 12px; color:#9aa0a6; font-size:12px;">Role</td><td style="padding:6px 12px; color:#F7F4EE; font-size:13px;">${escapeHtml(data.role)}</td></tr>
            ${data.orgSize ? `<tr><td style="padding:6px 12px; color:#9aa0a6; font-size:12px;">Size</td><td style="padding:6px 12px; color:#F7F4EE; font-size:13px;">${escapeHtml(data.orgSize)}</td></tr>` : ''}
            ${data.phone ? `<tr><td style="padding:6px 12px; color:#9aa0a6; font-size:12px;">Phone</td><td style="padding:6px 12px; color:#F7F4EE; font-size:13px;">${escapeHtml(data.phone)}</td></tr>` : ''}
          </table>

          <h3 style="color:#F7F4EE; font-size:14px; margin:0 0 8px; text-transform:uppercase; letter-spacing:0.1em;">Scores</h3>
          <table style="width:100%; border-collapse:collapse; margin-bottom:8px; background:#0C1B33; border:1px solid rgba(160,120,64,0.2); border-radius:6px;">
            ${scoreRows}
          </table>
          <p style="color:#9aa0a6; font-size:12px; margin:0 0 24px;">Bottleneck stage (lowest dimension): <strong style="color:#C49A58;">${bottleneck}</strong></p>

          <h3 style="color:#F7F4EE; font-size:14px; margin:0 0 8px; text-transform:uppercase; letter-spacing:0.1em;">Answers</h3>
          <table style="width:100%; border-collapse:collapse; background:#0C1B33; border:1px solid rgba(160,120,64,0.2); border-radius:6px;">
            ${answerRows}
          </table>
        </div>
      `,
    })

    if (aaronError) {
      // eslint-disable-next-line no-console
      console.error('[ASSESSMENT] Aaron notification error:', JSON.stringify(aaronError))
    }

    // Email 2: Confirmation to respondent
    const firstName = data.name.split(' ')[0] ?? data.name
    const { error: respondentError } = await resend.emails.send({
      from: 'Forte AI Solutions <onboarding@resend.dev>',
      to: data.email,
      replyTo: process.env.CONTACT_FORM_TO_EMAIL,
      subject: 'We got your diagnostic — your report is on the way',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding:24px; color:#1a1a1a;">
          <p>Hi ${escapeHtml(firstName)},</p>
          <p>Thanks for taking the Decision Readiness Diagnostic. I will personally review your answers and send your written Decision Readiness Report within 24 hours.</p>
          <p>A few things to note while you wait:</p>
          <ul>
            <li>Your answers are confidential. I will not share them.</li>
            <li>The report you are about to receive is the same diagnostic framework I use with paid clients during the first phase of any Forte engagement. Treat it seriously.</li>
            <li>If you requested a discovery call, I will reach out in the same window with a few times.</li>
          </ul>
          <p>If you have questions in the meantime, reply to this email directly. I read every one.</p>
          <p style="margin-top:24px;">Aaron Buchanan<br/>Forte AI Solutions<br/><a href="https://forteaisolutions.com" style="color:#A07840;">forteaisolutions.com</a></p>
        </div>
      `,
    })

    if (respondentError) {
      // eslint-disable-next-line no-console
      console.error('[ASSESSMENT] Respondent email error:', JSON.stringify(respondentError))
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[ASSESSMENT] Unexpected error:', err)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
