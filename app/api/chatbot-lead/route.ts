import { NextResponse, type NextRequest } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// Lighter validation for chatbot leads — only name, email, message required
const chatbotLeadSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(100),
  email: z.string().email('Invalid email.'),
  message: z.string().min(1, 'Message is required.').max(2000),
})

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    const result = chatbotLeadSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed.',
          errors: result.error.issues.map((i) => i.message),
        },
        { status: 400 },
      )
    }

    const { name, email, message } = result.data

    // Always log to server so leads aren't lost even if email fails
    // eslint-disable-next-line no-console
    console.log('[CHATBOT LEAD]', { name, email, message, timestamp: new Date().toISOString() })

    // Try sending email via Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)

      const toEmail = process.env.CONTACT_FORM_TO_EMAIL || process.env.RESEND_VERIFIED_EMAIL
      if (!toEmail) {
        // eslint-disable-next-line no-console
        console.error('[CHATBOT LEAD] No CONTACT_FORM_TO_EMAIL or RESEND_VERIFIED_EMAIL set. Lead saved to logs only.')
        return NextResponse.json({
          success: true,
          message: 'Lead captured (email delivery not configured).',
          emailSent: false,
        })
      }

      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'Forte AI Solutions <onboarding@resend.dev>',
        to: toEmail,
        subject: `[Chatbot Lead] ${name}`,
        replyTo: email,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto;">
            <div style="background: #0C1B33; padding: 24px; border-radius: 8px; border: 1px solid rgba(160,120,64,0.2);">
              <h2 style="color: #C49A58; margin: 0 0 16px; font-size: 18px;">New Chatbot Lead</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #999; font-size: 13px; width: 80px;">Name</td>
                  <td style="padding: 8px 0; color: #F7F4EE; font-size: 14px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #999; font-size: 13px;">Email</td>
                  <td style="padding: 8px 0; color: #F7F4EE; font-size: 14px;"><a href="mailto:${email}" style="color: #C49A58;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #999; font-size: 13px; vertical-align: top;">Challenge</td>
                  <td style="padding: 8px 0; color: #F7F4EE; font-size: 14px;">${message.replace(/\n/g, '<br>')}</td>
                </tr>
              </table>
              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(160,120,64,0.15);">
                <p style="color: #666; font-size: 11px; margin: 0;">Captured via website chatbot at ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}</p>
              </div>
            </div>
          </div>
        `,
      })

      if (emailError) {
        // eslint-disable-next-line no-console
        console.error('[CHATBOT LEAD] Resend error:', JSON.stringify(emailError))
        return NextResponse.json({
          success: true,
          message: 'Lead captured but email delivery failed.',
          emailSent: false,
          error: String(emailError.message ?? emailError),
        })
      }

      // eslint-disable-next-line no-console
      console.log('[CHATBOT LEAD] Email sent successfully. ID:', emailData?.id)

      return NextResponse.json({
        success: true,
        message: 'Lead captured and email sent.',
        emailSent: true,
      })
    }

    // No Resend key configured
    // eslint-disable-next-line no-console
    console.warn('[CHATBOT LEAD] RESEND_API_KEY not set. Lead logged to console only.')
    return NextResponse.json({
      success: true,
      message: 'Lead captured (email not configured).',
      emailSent: false,
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[CHATBOT LEAD] Unexpected error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal error.' },
      { status: 500 },
    )
  }
}
