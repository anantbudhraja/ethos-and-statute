import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, email } = await request.json()

    // Add to audience list
    await resend.contacts.create({
      email,
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' ') || '',
      audienceId: process.env.RESEND_AUDIENCE_ID,
    })

    // Send welcome email
    await resend.emails.send({
      from: 'Ethos & Statute <hello@ethosandstatute.com>',
      to: email,
      subject: 'Welcome to Ethos & Statute',
      html: `
        <div style="font-family:'Georgia',serif; max-width:600px; margin:0 auto; background:#f7f5f0; padding:0;">
          <div style="background:#0d1b2a; padding:48px 40px;">
            <h1 style="font-size:28px; font-weight:900; color:white; margin:0; letter-spacing:-0.02em;">
              Ethos <em style="color:#e74c3c;">&</em> Statute
            </h1>
          </div>
          <div style="padding:48px 40px; background:white;">
            <h2 style="font-size:24px; font-weight:700; color:#0d1b2a; margin:0 0 16px; letter-spacing:-0.02em;">
              Welcome, ${name}.
            </h2>
            <p style="font-size:16px; color:#555; line-height:1.8; margin:0 0 20px;">
              You're now part of a growing community of readers who believe the law is too important to leave to lawyers alone.
            </p>
            <p style="font-size:16px; color:#555; line-height:1.8; margin:0 0 32px;">
              Every week, we'll send you sharp, accessible legal analysis — no jargon, no paywall, just clarity.
            </p>
            <a href="https://ethosandstatute.com" style="display:inline-block; background:#c0392b; color:white; font-size:12px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; padding:14px 28px; text-decoration:none;">
              Read Latest Articles →
            </a>
          </div>
          <div style="padding:24px 40px; background:#0d1b2a; text-align:center;">
            <p style="font-size:11px; color:rgba(255,255,255,0.3); margin:0; letter-spacing:0.05em;">
              © 2026 Ethos & Statute. You're receiving this because you subscribed at ethosandstatute.com
            </p>
          </div>
        </div>
      `
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}