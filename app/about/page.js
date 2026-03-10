import Link from 'next/link'

export default function About() {
  return (
    <main style={{ fontFamily:"'DM Sans',sans-serif", background:"#f7f5f0", color:"#1a1a1a", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        a { text-decoration:none; color:inherit; }
        .nav-link { display:flex; align-items:center; height:64px; padding:0 18px; font-size:12px; letter-spacing:0.1em; text-transform:uppercase; font-weight:500; color:#0d1b2a; border-bottom:2px solid transparent; transition:all 0.2s; }
        .nav-link:hover { color:#c0392b; border-bottom-color:#c0392b; }
        .value-card:hover { background:#ffffff !important; }
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

      {/* Nav */}
      <nav style={{ background:"white", borderBottom:"1px solid rgba(13,27,42,0.12)", position:"sticky", top:0, zIndex:100, padding:"0 40px", display:"flex", alignItems:"stretch", height:64 }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:20, color:"#0d1b2a", letterSpacing:"-0.02em", paddingRight:40, borderRight:"1px solid rgba(13,27,42,0.12)", marginRight:32, whiteSpace:"nowrap" }}>
          Ethos <em style={{ fontStyle:"italic", color:"#c0392b", margin:"0 4px" }}>&</em> Statute
        </Link>
        <div style={{ display:"flex", alignItems:"center", flex:1 }}>
          {["Latest","Constitutional","Corporate","Criminal","IP & Tech","Opinion","Deep Reads"].map(item => (
            <a key={item} href="/" className="nav-link">{item}</a>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginLeft:"auto" }}>
          <Link href="/subscribe" style={{ background:"#c0392b", color:"white", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", padding:"8px 20px", border:"none", cursor:"pointer" }}>
            Subscribe
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background:"#0d1b2a", padding:"100px 40px" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <div style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:"#e74c3c", fontWeight:500, display:"flex", alignItems:"center", gap:8, marginBottom:24 }}>
            <span style={{ width:20, height:1, background:"#e74c3c", display:"inline-block" }}></span>
            About Us
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(40px,5vw,72px)", fontWeight:900, lineHeight:1.05, color:"white", letterSpacing:"-0.03em", marginBottom:24 }}>
            Law is too important to leave to <em style={{ color:"#e74c3c", fontStyle:"italic" }}>lawyers alone.</em>
          </h1>
          <p style={{ fontSize:18, color:"rgba(255,255,255,0.6)", lineHeight:1.8, maxWidth:640 }}>
            Ethos & Statute was founded on a simple conviction — that legal journalism should be sharp, accessible, and honest. Not a summary of judgments, but a reckoning with what they mean.
          </p>
        </div>
      </div>

      {/* Mission */}
<div style={{ maxWidth:800, margin:"0 auto", padding:"64px 40px" }}>
  <div style={{ background:"white", padding:56, borderLeft:"4px solid #c0392b" }}>
    <p style={{ fontSize:16, color:"#555", lineHeight:1.9, marginBottom:24 }}>
      The idea for Ethos & Statute began quietly, sometime during my years at the West Bengal National University of Juridical Sciences. Like most law students, I wrote blog pieces with great enthusiasm and sent them off to established legal websites. And then I waited. And waited some more. Often, by the time the piece was finally published, the moment had already passed. Because legal news, for all its gravity, still obeys the ruthless rhythm of the news cycle. A week, perhaps two, and the conversation has moved on.
    </p>
    <p style={{ fontSize:16, color:"#555", lineHeight:1.9, marginBottom:24 }}>
      I remember thinking then that law deserved a space where ideas could travel faster, where commentary could keep pace with the moment it was responding to.
    </p>
    <p style={{ fontSize:16, color:"#555", lineHeight:1.9, marginBottom:24 }}>
      That thought returned to me years later, once I had stepped outside the walls of law school. I discovered brilliant business and financial platforms such as Finshots and The Ken. They had mastered something remarkable: the art of making complex financial developments readable, engaging, and intelligible to anyone curious enough to learn.
    </p>
    <p style={{ fontSize:16, color:"#555", lineHeight:1.9, marginBottom:24 }}>
      The contrast with much of legal writing was difficult to ignore. Too often, legal blogs fell into familiar patterns. Some were dense with impenetrable jargon. Others reproduced, with minor edits, the old projects of law students (we have all done this at some point). And many were simply too difficult for a curious reader without legal training to follow.
    </p>
    <p style={{ fontSize:16, color:"#555", lineHeight:1.9, marginBottom:24 }}>
      Yet law shapes every aspect of public life. It intersects with politics, economics, technology, culture, and everyday decisions. Why should the conversation about it remain confined to a small professional circle?
    </p>
    <p style={{ fontSize:16, color:"#555", lineHeight:1.9, marginBottom:24, fontWeight:600, color:"#0d1b2a" }}>
      Ethos & Statute is an attempt to change that.
    </p>
    <p style={{ fontSize:16, color:"#555", lineHeight:1.9, marginBottom:24 }}>
      This blog exists to make law accessible without making it shallow. To write about legal developments with clarity and curiosity. To explain without condescension. To analyse without drowning the reader in technicalities.
    </p>
    <p style={{ fontSize:16, color:"#555", lineHeight:1.9, marginBottom:24, fontStyle:"italic" }}>
      And yes, to write a blog in the age of reels.
    </p>
    <p style={{ fontSize:16, color:"#555", lineHeight:1.9, marginBottom:24 }}>
      Because while short videos may dominate our attention today, the habit of reading remains essential to thinking clearly. Ideas require a little space to breathe. Not pages of dense prose, but thoughtful pieces that can be read in a few minutes and remembered long after.
    </p>
    <p style={{ fontSize:16, color:"#555", lineHeight:1.9, marginBottom:24 }}>
      The writing here will aim to be simple, but not simplistic. Impartial, yet unafraid of opinion. Analytical, but grounded in the real world.
    </p>
    <p style={{ fontSize:16, color:"#555", lineHeight:1.9, marginBottom:24 }}>
      Most importantly, it will treat law not as an isolated discipline but as something deeply intertwined with everything else that shapes our lives.
    </p>
    <p style={{ fontSize:16, color:"#555", lineHeight:1.9, marginBottom:24 }}>
      Ethos & Statute is not meant only for lawyers. It is meant for anyone interested in understanding how law moves through the world we inhabit.
    </p>
    <p style={{ fontSize:18, color:"#0d1b2a", lineHeight:1.9, fontFamily:"'Playfair Display',serif", fontWeight:700, fontStyle:"italic" }}>
      One thoughtful piece at a time.
    </p>
  </div>
</div>

      {/* Values */}
      <div style={{ background:"#0d1b2a", padding:"80px 40px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:"0.08em", color:"white", paddingBottom:12, borderBottom:"1px solid rgba(255,255,255,0.1)", marginBottom:48 }}>What We Stand For</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"rgba(255,255,255,0.06)" }}>
            {[
              { num:"01", title:"Clarity over Complexity", desc:"We translate legal language into plain English — without losing precision or depth." },
              { num:"02", title:"Independence", desc:"We have no political affiliations, no corporate sponsors, and no agenda other than honest reporting." },
              { num:"03", title:"Access to Justice", desc:"We believe legal literacy is a civic right. Our core content will always be free." },
              { num:"04", title:"Rigour", desc:"Every claim we make is sourced. Every judgment we cite is read — not summarised from a press release." },
              { num:"05", title:"Diversity of Voice", desc:"Indian law is argued in dozens of languages and across wildly different contexts. We aim to reflect that." },
              { num:"06", title:"Accountability", desc:"When we get something wrong, we correct it — openly, promptly, and without defensiveness." },
            ].map(v => (
              <div key={v.num} className="value-card" style={{ background:"#0d1b2a", padding:"40px 32px", transition:"background 0.2s", cursor:"default" }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:48, color:"#c0392b", lineHeight:1, marginBottom:16 }}>{v.num}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:"white", marginBottom:10 }}>{v.title}</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.7 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding:"80px 40px", textAlign:"center", background:"#f7f5f0" }}>
        <div style={{ maxWidth:560, margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,3vw,40px)", fontWeight:900, color:"#0d1b2a", letterSpacing:"-0.02em", marginBottom:16 }}>
            Want to write for us?
          </h2>
          <p style={{ fontSize:15, color:"#9a9590", lineHeight:1.7, marginBottom:32 }}>
            We welcome contributions from lawyers, academics, and legal journalists. If you have a story worth telling, we want to hear it.
          </p>
          <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#c0392b", color:"white", fontSize:12, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"14px 32px" }}>
            Get in Touch →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background:"#0d1b2a", color:"white", padding:"40px", textAlign:"center" }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, marginBottom:8 }}>
          Ethos <em style={{ color:"#e74c3c" }}>&</em> Statute
        </div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)" }}>© 2026 Ethos & Statute. All rights reserved.</div>
      </footer>
    </main>
  )
}