import Link from 'next/link'

export default function Terms() {
  return (
    <main style={{ fontFamily:"'DM Sans',sans-serif", background:"#f7f5f0", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900&family=DM+Sans:wght@300;400;500&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        a { text-decoration:none; color:inherit; }
        .nav-link { display:flex; align-items:center; height:64px; padding:0 18px; font-size:12px; letter-spacing:0.1em; text-transform:uppercase; font-weight:500; color:#0d1b2a; border-bottom:2px solid transparent; transition:all 0.2s; }
        .nav-link:hover { color:#c0392b; border-bottom-color:#c0392b; }
        h2 { font-family:'Playfair Display',serif; font-size:24px; font-weight:700; color:#0d1b2a; margin:40px 0 12px; }
        p { font-size:15px; color:#555; line-height:1.85; margin-bottom:16px; }
        ul { padding-left:24px; margin-bottom:16px; }
        li { font-size:15px; color:#555; line-height:1.85; margin-bottom:8px; }
      `}</style>

      <nav style={{ background:"white", borderBottom:"1px solid rgba(13,27,42,0.12)", position:"sticky", top:0, zIndex:100, padding:"0 40px", display:"flex", alignItems:"stretch", height:64 }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:20, color:"#0d1b2a", letterSpacing:"-0.02em", paddingRight:40, borderRight:"1px solid rgba(13,27,42,0.12)", marginRight:32, whiteSpace:"nowrap" }}>
          Ethos <em style={{ fontStyle:"italic", color:"#c0392b", margin:"0 4px" }}>&</em> Statute
        </Link>
        <div style={{ display:"flex", alignItems:"center", flex:1 }}>
          {["Latest","Constitutional","Corporate","Criminal","IP & Tech","Opinion","Deep Reads"].map(item => (
            <a key={item} href="/" className="nav-link">{item}</a>
          ))}
        </div>
      </nav>

      <div style={{ background:"#0d1b2a", padding:"80px 40px" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <div style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:"#e74c3c", fontWeight:500, marginBottom:16 }}>Legal</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(36px,4vw,56px)", fontWeight:900, color:"white", letterSpacing:"-0.03em" }}>Terms of Use</h1>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", marginTop:12 }}>Last updated: March 2026</p>
        </div>
      </div>

      <div style={{ maxWidth:800, margin:"0 auto", padding:"64px 40px" }}>
        <div style={{ background:"white", padding:56, borderLeft:"4px solid #c0392b" }}>

          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using Ethos & Statute, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.</p>

          <h2>2. Content and Intellectual Property</h2>
          <p>All content on this website — including articles, analyses, opinions, and design — is the intellectual property of Ethos & Statute unless otherwise stated. You may not reproduce, distribute, or republish our content without prior written permission.</p>
          <p>You may share links to our articles and quote brief excerpts with proper attribution.</p>

          <h2>3. Editorial Independence</h2>
          <p>All editorial content on Ethos & Statute is produced independently. Our analysis and opinions are not influenced by advertisers, sponsors, or any external parties.</p>

          <h2>4. Not Legal Advice</h2>
          <p>The content on this website is for informational and educational purposes only. Nothing on this site constitutes legal advice. For advice specific to your situation, please consult a qualified legal professional.</p>

          <h2>5. User Conduct</h2>
          <p>When interacting with our platform, you agree not to:</p>
          <ul>
            <li>Post or transmit any unlawful, harmful, or offensive content</li>
            <li>Attempt to gain unauthorised access to any part of our systems</li>
            <li>Use our content for commercial purposes without permission</li>
            <li>Misrepresent your identity or affiliation</li>
          </ul>

          <h2>6. Disclaimer of Warranties</h2>
          <p>We strive for accuracy in all our content, but we make no warranties regarding the completeness or accuracy of information on this site. We are not liable for any errors or omissions.</p>

          <h2>7. Limitation of Liability</h2>
          <p>Ethos & Statute shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or reliance on its content.</p>

          <h2>8. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the updated terms.</p>

          <h2>9. Contact</h2>
          <p>For any questions regarding these terms, contact us at <strong>contact@ethosandstatute.com</strong></p>

        </div>
        <div style={{ marginTop:32 }}>
          <Link href="/" style={{ fontSize:12, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"#c0392b" }}>← Back to Home</Link>
        </div>
      </div>

      <footer style={{ background:"#0d1b2a", color:"white", padding:"40px", textAlign:"center" }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, marginBottom:8 }}>Ethos <em style={{ color:"#e74c3c" }}>&</em> Statute</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)" }}>© 2026 Ethos & Statute. All rights reserved.</div>
      </footer>
    </main>
  )
}