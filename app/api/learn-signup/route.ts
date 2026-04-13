import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const signupSchema = z.object({
  email: z.string().email().max(200),
  honeypot: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    const result = signupSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email.' },
        { status: 400 },
      )
    }

    if (result.data.honeypot) {
      return NextResponse.json({ success: true })
    }

    const { email } = result.data

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
      const { success: allowed } = await ratelimit.limit(`learn:${ip}`)
      if (!allowed) {
        return NextResponse.json(
          { success: false, message: 'Too many requests. Try again later.' },
          { status: 429 },
        )
      }
    }

    // eslint-disable-next-line no-console
    console.log('[LEARN SIGNUP]', JSON.stringify({ email, timestamp: new Date().toISOString() }))

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FORM_TO_EMAIL) {
      // eslint-disable-next-line no-console
      console.warn('[LEARN SIGNUP] Resend env vars not set.')
      return NextResponse.json({ success: true, emailSent: false })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error: emailError } = await resend.emails.send({
      from: 'Forte AI Solutions <onboarding@resend.dev>',
      to: process.env.CONTACT_FORM_TO_EMAIL,
      subject: `[Forte Learn] Early access signup: ${email}`,
      replyTo: email,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0C1B33; padding: 24px; border-radius: 8px; border: 1px solid rgba(160,120,64,0.2);">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
              <div style="width: 8px; height: 8px; border-radius: 50%; background: #C49A58;"></div>
              <h2 style="color: #F7F4EE; margin: 0; font-size: 18px;">New Forte Learn Signup</h2>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px; width: 80px;">Email</td>
                <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #C49A58;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px;">Source</td>
                <td style="padding: 8px 0; color: #ddd; font-size: 13px;">/learn — early access form</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(160,120,64,0.15);">
              <p style="color: #555; font-size: 11px; margin: 0;">${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}</p>
            </div>
          </div>
        </div>
      `,
    })

    if (emailError) {
      // eslint-disable-next-line no-console
      console.error('[LEARN SIGNUP] Resend error:', emailError)
      return NextResponse.json({ success: true, emailSent: false })
    }

    return NextResponse.json({ success: true, emailSent: true })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[LEARN SIGNUP] Error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
