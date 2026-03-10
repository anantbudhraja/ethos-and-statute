import Link from 'next/link'

export default function Privacy() {
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
        @media (max-width: 768px) {
  nav { padding: 0 16px !important; }
  nav > div { display: none; }
  .nav-link { display: none; }
  h1 { font-size: 32px !important; }
  div[style*="max-width:800"] { padding: 32px 16px !important; }
  div[style*="max-width: 800"] { padding: 32px 16px !important; }
  div[style*="padding:56"] { padding: 24px 16px !important; }
}
      `}</style>

      <nav style={{ background:"white", borderBottom:"1px solid rgba(13,27,42,0.12)", position:"sticky", top:0, zIndex:100, padding:"0 40px", display:"flex", alignItems:"stretch", height:64 }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:20, color:"#0d1b2a", letterSpacing:"-0.02em", paddingRight:40, borderRight:"1px solid rgba(13,27,42,0.12)", marginRight:32, whiteSpace:"nowrap" }}>
          Ethos <em style={{ fontStyle:"italic", color:"#c0392b", margin:"0 4px" }}>&</em> Statute
        </Link>
        <div style={{ display:"flex", alignItems:"center", flex:1 }}>
          {[
  { label:"Our Mission", href:"/about" },
  { label:"Latest", href:"/" },
  { label:"Constitutional", href:"/" },
  { label:"Corporate", href:"/" },
  { label:"Criminal", href:"/" },
  { label:"IP & Tech", href:"/" },
  { label:"Opinion", href:"/" },
].map(item => (
  <Link key={item.label} className="nav-link" href={item.href}>{item.label}</Link>
))}
        </div>
      </nav>

      <div style={{ background:"#0d1b2a", padding:"80px 40px" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <div style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:"#e74c3c", fontWeight:500, marginBottom:16 }}>Legal</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(36px,4vw,56px)", fontWeight:900, color:"white", letterSpacing:"-0.03em" }}>Privacy Policy</h1>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", marginTop:12 }}>Last updated: March 2026</p>
        </div>
      </div>

      <div style={{ maxWidth:800, margin:"0 auto", padding:"64px 40px" }}>
        <div style={{ background:"white", padding:56, borderLeft:"4px solid #c0392b" }}>

          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as your name and email address when you subscribe to our newsletter or contact us through our website.</p>
          <p>We may also automatically collect certain information when you visit our site, including your IP address, browser type, referring URLs, and pages viewed.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Send you our newsletter and legal analysis updates</li>
            <li>Respond to your comments and questions</li>
            <li>Monitor and analyse trends and usage of our website</li>
            <li>Improve our content and services</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, provided they agree to keep it confidential.</p>

          <h2>4. Cookies</h2>
          <p>We use cookies to enhance your experience on our site. You can choose to disable cookies through your browser settings, though this may affect certain functionality.</p>

          <h2>5. Data Retention</h2>
          <p>We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law.</p>

          <h2>6. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information at any time. To exercise these rights, please contact us at contact@ethosandstatute.com</p>

          <h2>7. Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.</p>

          <h2>8. Contact Us</h2>
          <p>If you have any questions about this privacy policy, please contact us at <strong>contact@ethosandstatute.com</strong></p>

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