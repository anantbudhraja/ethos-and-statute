import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const audienceId = process.env.RESEND_AUDIENCE_ID || '5b8cf9a0-1d3c-4c29-9c4a-44154adef29d'
  
  console.log('Audience ID:', audienceId)
  
  try {
    const { name, email } = await request.json()
    console.log('Subscribing:', name, email)

    // Try adding to audience
    const contactResult = await resend.contacts.create({
      email,
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' ') || '',
      audienceId,
    })
    
    console.log('Contact result:', JSON.stringify(contactResult))

    // Send welcome email
    await resend.emails.send({
      from: 'Ethos & Statute <hello@ethosandstatute.com>',
      to: email,
      subject: 'Welcome to Ethos & Statute',
      html: `<p>Welcome ${name}!</p>`
    })

    return Response.json({ success: true, contactResult })
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ error: error.message, details: error }, { status: 500 })
  }
}