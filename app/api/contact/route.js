import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, email, subject, message } = await request.json()

    await resend.emails.send({
      from: 'Ethos & Statute <onboarding@resend.dev>',
      to: 'contact@ethosandstatute.com',
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family:'Georgia',serif; max-width:600px; margin:0 auto;">
          <div style="background:#0d1b2a; padding:32px 40px;">
            <h1 style="font-size:22px; color:white; margin:0; font-weight:900;">
              Ethos <em style="color:#e74c3c;">&</em> Statute
            </h1>
            <p style="color:rgba(255,255,255,0.4); font-size:12px; margin:8px 0 0; letter-spacing:0.1em; text-transform:uppercase;">New Contact Form Submission</p>
          </div>
          <div style="padding:40px; background:white; border:1px solid #e8e4dc;">
            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0; border-bottom:1px solid #f0ece4; font-size:12px; color:#9a9590; text-transform:uppercase; letter-spacing:0.1em; width:120px;">From</td>
                <td style="padding:12px 0; border-bottom:1px solid #f0ece4; font-size:15px; color:#0d1b2a; font-weight:600;">${name}</td>
              </tr>
              <tr>
                <td style="padding:12px 0; border-bottom:1px solid #f0ece4; font-size:12px; color:#9a9590; text-transform:uppercase; letter-spacing:0.1em;">Email</td>
                <td style="padding:12px 0; border-bottom:1px solid #f0ece4; font-size:15px; color:#c0392b;">${email}</td>
              </tr>
              <tr>
                <td style="padding:12px 0; border-bottom:1px solid #f0ece4; font-size:12px; color:#9a9590; text-transform:uppercase; letter-spacing:0.1em;">Subject</td>
                <td style="padding:12px 0; border-bottom:1px solid #f0ece4; font-size:15px; color:#0d1b2a;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top:24px;">
              <div style="font-size:12px; color:#9a9590; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:12px;">Message</div>
              <div style="font-size:16px; color:#333; line-height:1.8; white-space:pre-wrap; padding:20px; background:#f7f5f0; border-left:3px solid #c0392b;">${message}</div>
            </div>
            <div style="margin-top:32px; padding-top:24px; border-top:1px solid #f0ece4;">
              <p style="font-size:12px; color:#9a9590;">Reply directly to this email to respond to ${name} at ${email}</p>
            </div>
          </div>
        </div>
      `
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Failed to send message' }, { status: 500 })
  }
}