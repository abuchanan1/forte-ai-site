import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const leadSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
  transcript: z.string().max(20000).optional(),
  qualification: z
    .object({
      company_size: z.string().optional(),
      data_maturity: z.string().optional(),
      leadership_need: z.string().optional(),
      ai_interest: z.string().optional(),
      budget_authority: z.string().optional(),
      recommended_service: z.string().optional(),
      fit_score: z.string().optional(),
      notes: z.string().optional(),
    })
    .optional(),
})

function fitScoreColor(score: string | undefined): string {
  if (score === 'strong') return '#22c55e'
  if (score === 'moderate') return '#eab308'
  return '#999'
}

function levelBadge(level: string | undefined): string {
  if (!level || level === 'unknown') return '<span style="color:#666;">Unknown</span>'
  const colors: Record<string, string> = { high: '#22c55e', medium: '#eab308', low: '#ef4444' }
  const color = colors[level] ?? '#999'
  return `<span style="color:${color}; font-weight: 600;">${level.charAt(0).toUpperCase() + level.slice(1)}</span>`
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    const result = leadSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ success: false, message: 'Validation failed.' }, { status: 400 })
    }

    const { name, email, message, transcript, qualification } = result.data

    // eslint-disable-next-line no-console
    console.log('[CHATBOT LEAD]', JSON.stringify({ name, email, message, qualification, timestamp: new Date().toISOString() }))

    if (!process.env.RESEND_API_KEY) {
      // eslint-disable-next-line no-console
      console.warn('[CHATBOT LEAD] RESEND_API_KEY not set.')
      return NextResponse.json({ success: true, emailSent: false })
    }

    const toEmail = process.env.CONTACT_FORM_TO_EMAIL
    if (!toEmail) {
      // eslint-disable-next-line no-console
      console.error('[CHATBOT LEAD] No CONTACT_FORM_TO_EMAIL set.')
      return NextResponse.json({ success: true, emailSent: false })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const q = qualification
    const fitColor = fitScoreColor(q?.fit_score)
    const serviceNames: Record<string, string> = {
      foundation_sprint: 'Foundation Sprint ($25K–$40K)',
      infrastructure: 'Infrastructure & AI Systems ($100K+)',
      fractional: 'Fractional Head of DI ($12K–$25K/mo)',
      assessment: 'AI & Data Health Assessment ($10K–$20K)',
    }
    const recommendedService = q?.recommended_service ? (serviceNames[q.recommended_service] ?? q.recommended_service) : 'Not yet determined'

    const qualificationHtml = q
      ? `
        <div style="margin-top: 20px; padding: 16px; background: #0a1628; border-radius: 6px; border: 1px solid rgba(160,120,64,0.15);">
          <h3 style="color: #C49A58; margin: 0 0 12px; font-size: 14px;">Lead Qualification</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr><td style="padding: 6px 0; color: #888; width: 140px;">Fit Score</td><td style="padding: 6px 0; color: ${fitColor}; font-weight: 700; font-size: 14px;">${(q.fit_score ?? 'Unknown').toUpperCase()}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Company Size</td><td style="padding: 6px 0; color: #ddd;">${q.company_size ?? 'Unknown'}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Data Maturity</td><td style="padding: 6px 0;">${levelBadge(q.data_maturity)}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Leadership Need</td><td style="padding: 6px 0;">${levelBadge(q.leadership_need)}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">AI Interest</td><td style="padding: 6px 0;">${levelBadge(q.ai_interest)}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Budget/Authority</td><td style="padding: 6px 0;">${levelBadge(q.budget_authority)}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">Recommended</td><td style="padding: 6px 0; color: #C49A58;">${recommendedService}</td></tr>
            ${q.notes ? `<tr><td style="padding: 6px 0; color: #888; vertical-align: top;">Notes</td><td style="padding: 6px 0; color: #bbb;">${q.notes}</td></tr>` : ''}
          </table>
        </div>
      `
      : ''

    const transcriptHtml = transcript
      ? `
        <div style="margin-top: 20px; padding: 16px; background: #0a1628; border-radius: 6px; border: 1px solid rgba(160,120,64,0.1);">
          <h3 style="color: #C49A58; margin: 0 0 12px; font-size: 14px;">Conversation Transcript</h3>
          <div style="font-size: 12px; color: #999; line-height: 1.6; white-space: pre-wrap;">${transcript}</div>
        </div>
      `
      : ''

    const fitLabel = q?.fit_score === 'strong' ? ' [HIGH PRIORITY]' : q?.fit_score === 'moderate' ? ' [QUALIFIED]' : ''

    const { error: emailError } = await resend.emails.send({
      from: 'Forte AI Solutions <onboarding@resend.dev>',
      to: toEmail,
      subject: `${fitLabel} Chatbot Lead: ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0C1B33; padding: 24px; border-radius: 8px; border: 1px solid rgba(160,120,64,0.2);">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
              <div style="width: 8px; height: 8px; border-radius: 50%; background: ${fitColor};"></div>
              <h2 style="color: #F7F4EE; margin: 0; font-size: 18px;">New Lead from Chatbot</h2>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px; width: 80px;">Name</td>
                <td style="padding: 8px 0; color: #F7F4EE; font-size: 14px; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td>
                <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #C49A58;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px; vertical-align: top;">Context</td>
                <td style="padding: 8px 0; color: #ddd; font-size: 13px;">${message.replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
            ${qualificationHtml}
            ${transcriptHtml}
            <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid rgba(160,120,64,0.15);">
              <p style="color: #555; font-size: 11px; margin: 0;">Captured via Forte AI chatbot &middot; ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}</p>
            </div>
          </div>
        </div>
      `,
    })

    if (emailError) {
      // eslint-disable-next-line no-console
      console.error('[CHATBOT LEAD] Resend error:', JSON.stringify(emailError))
      return NextResponse.json({ success: true, emailSent: false })
    }

    return NextResponse.json({ success: true, emailSent: true })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[CHATBOT LEAD] Error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
