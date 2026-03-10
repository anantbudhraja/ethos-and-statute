'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const navItems = [
  { label:"Our Mission", href:"/about" },
  { label:"Latest", href:"/" },
  { label:"Constitutional", href:"/" },
  { label:"Corporate", href:"/" },
  { label:"Criminal", href:"/" },
  { label:"IP & Tech", href:"/" },
  { label:"Opinion", href:"/" },
]

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <nav style={{ background:"white", borderBottom:"1px solid rgba(13,27,42,0.12)", position:"sticky", top:0, zIndex:200, padding:"0 20px", display:"flex", alignItems:"center", height:64 }}>
        {/* Logo */}
        <Link href="/" style={{ display:"flex", alignItems:"center", fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:20, color:"#0d1b2a", letterSpacing:"-0.02em", whiteSpace:"nowrap", flexShrink:0 }} onClick={() => setMenuOpen(false)}>
          Ethos <em style={{ fontStyle:"italic", color:"#c0392b", margin:"0 4px" }}>&</em> Statute
        </Link>

        {/* Desktop nav links */}
        <div style={{ display:"flex", alignItems:"center", flex:1, marginLeft:32, overflow:"hidden" }} className="desktop-only">
          {navItems.map(item => (
            <Link key={item.label} href={item.href} style={{ display:"flex", alignItems:"center", height:64, padding:"0 14px", fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:500, color:"#0d1b2a", borderBottom:"2px solid transparent", whiteSpace:"nowrap", flexShrink:0 }}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop right */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginLeft:"auto", flexShrink:0 }} className="desktop-only">
          <Link href="/search" style={{ width:32, height:32, border:"1px solid #e8e4dc", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d1b2a" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </Link>
          <Link href="/subscribe" style={{ background:"#c0392b", color:"white", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", padding:"8px 20px" }}>
            Subscribe
          </Link>
        </div>

        {/* Mobile right */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginLeft:"auto" }} className="mobile-only">
          <Link href="/search" style={{ width:32, height:32, border:"1px solid #e8e4dc", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d1b2a" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background:"none", border:"none", cursor:"pointer", padding:4, display:"flex", flexDirection:"column", gap:5, justifyContent:"center" }}>
            <span style={{ display:"block", width:22, height:2, background:"#0d1b2a", transition:"all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }}></span>
            <span style={{ display:"block", width:22, height:2, background:"#0d1b2a", transition:"all 0.3s", opacity: menuOpen ? 0 : 1 }}></span>
            <span style={{ display:"block", width:22, height:2, background:"#0d1b2a", transition:"all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }}></span>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{ position:"fixed", top:64, left:0, right:0, bottom:0, background:"white", zIndex:190, overflowY:"auto" }}>
          <div style={{ display:"flex", flexDirection:"column" }}>
            {navItems.map(item => (
              <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} style={{ padding:"18px 24px", fontSize:16, fontWeight:500, color:"#0d1b2a", borderBottom:"1px solid rgba(13,27,42,0.08)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                {item.label}
                <span style={{ color:"#c0392b", fontSize:18 }}>→</span>
              </Link>
            ))}
            <div style={{ padding:24 }}>
              <Link href="/subscribe" onClick={() => setMenuOpen(false)} style={{ display:"block", background:"#c0392b", color:"white", textAlign:"center", padding:"16px", fontSize:13, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase" }}>
                Subscribe — It's Free →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function Home() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch('/api/articles').then(r => r.json()).then(data => setArticles(data.articles || []))
  }, [])

  const featured = articles.find(a => a.featured) || articles[0]
  const secondary = articles.filter(a => a._id !== featured?._id).slice(0, 3)
  const grid = articles.filter(a => a._id !== featured?._id).slice(0, 6)

  return (
    <main style={{ fontFamily:"'DM Sans', sans-serif", background:"#f7f5f0", color:"#1a1a1a", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html, body { overflow-x:hidden; max-width:100%; }
        a { text-decoration:none; color:inherit; }
        .ticker-track { display:flex; white-space:nowrap; animation:ticker 35s linear infinite; }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .article-card { transition:background 0.25s; cursor:pointer; }
        .article-card:hover { background:#ffffff !important; }
        .hero-secondary { transition:background 0.2s; cursor:pointer; }
        .hero-secondary:hover { background:#e8e4dc !important; }
        .newsletter-input { flex:1; min-width:0; padding:14px 16px; font-family:'DM Sans',sans-serif; font-size:14px; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); color:white; outline:none; width:100%; }
        .newsletter-input::placeholder { color:rgba(255,255,255,0.5); }

        .desktop-only { display:flex !important; }
        .mobile-only { display:none !important; }

        @media (max-width: 768px) {
          .desktop-only { display:none !important; }
          .mobile-only { display:flex !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-secondary-panel { display:none !important; }
          .articles-grid { grid-template-columns: 1fr !important; }
          .newsletter-inner { flex-direction:column !important; gap:32px !important; }
          .newsletter-form-row { flex-direction:column !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-brand { grid-column: span 2 !important; }
          .section-pad { padding-left:20px !important; padding-right:20px !important; }
        }
      `}</style>

      {/* Ticker */}
      {articles.length > 0 && (
        <div style={{ background:"#0d1b2a", height:34, display:"flex", alignItems:"center", overflow:"hidden", fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:500 }}>
          <div className="ticker-track">
            {[...articles.slice(0,6), ...articles.slice(0,6)].map((a, i) => (
              <span key={i} style={{ padding:"0 40px", color:"#9a9590" }}>
                {a.title} <span style={{ color:"#c0392b", padding:"0 8px" }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Nav — client component with hamburger */}
      <Nav />

      {/* Hero */}
      {featured && (
        <section className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"82vh", borderBottom:"1px solid rgba(13,27,42,0.12)" }}>
          <div style={{ background:"#0d1b2a", padding:"48px 40px", display:"flex", flexDirection:"column", justifyContent:"space-between", gap:32 }}>
            <div style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:"#e74c3c", fontWeight:500, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ width:20, height:1, background:"#e74c3c", display:"inline-block" }}></span>
              {featured.category}
            </div>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(32px,5vw,72px)", fontWeight:900, lineHeight:1.05, color:"white", letterSpacing:"-0.03em" }}>
              {featured.title}
            </h1>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.65)", lineHeight:1.7 }}>
              {featured.excerpt}
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#c0392b,#8e1a10)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Playfair Display',serif", fontSize:14, color:"white", fontWeight:700, flexShrink:0 }}>
                {featured.author?.[0]}
              </div>
              <div>
                <div style={{ fontSize:13, color:"white", fontWeight:600 }}>{featured.author}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{featured.readTime} read</div>
              </div>
            </div>
            <Link href={`/article/${featured.slug?.current}`} style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:12, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"white", borderBottom:"1px solid rgba(255,255,255,0.3)", paddingBottom:4, width:"fit-content" }}>
              Read the full article →
            </Link>
          </div>
          <div className="hero-secondary-panel" style={{ display:"flex", flexDirection:"column", borderLeft:"1px solid rgba(13,27,42,0.12)" }}>
            {secondary.map((a) => (
              <Link href={`/article/${a.slug?.current}`} key={a._id} className="hero-secondary" style={{ flex:1, padding:"32px 40px", borderBottom:"1px solid rgba(13,27,42,0.12)", display:"flex", flexDirection:"column", justifyContent:"space-between", gap:12 }}>
                <div style={{ fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600, color:"#c0392b" }}>{a.category}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(16px,1.8vw,22px)", fontWeight:700, lineHeight:1.25, color:"#0d1b2a" }}>{a.title}</div>
                <div style={{ fontSize:11, color:"#9a9590", letterSpacing:"0.05em", textTransform:"uppercase" }}>By <strong style={{ color:"#0d1b2a" }}>{a.author}</strong> · {a.readTime}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section style={{ padding:"64px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 40px" }} className="section-pad">
          <div style={{ display:"flex", alignItems:"baseline", gap:16, marginBottom:32, paddingBottom:12, borderBottom:"2px solid #0d1b2a" }}>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:"0.08em", color:"#0d1b2a" }}>Latest Articles</span>
            <span style={{ fontSize:11, color:"#9a9590", letterSpacing:"0.1em", textTransform:"uppercase" }}>— {articles.length} stories</span>
          </div>
          {grid.length > 0 && (
  <div className="articles-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", border:"1px solid rgba(13,27,42,0.12)" }}>
    {grid.map((a, i) => (
      <Link href={`/article/${a.slug?.current}`} key={a._id} className="article-card" style={{ padding:28, borderRight: i % 3 !== 2 ? "1px solid rgba(13,27,42,0.12)" : "none", borderBottom:"1px solid rgba(13,27,42,0.12)", display:"flex", flexDirection:"column", gap:14, background:"#f7f5f0" }}>
        <div style={{ fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600, color:"#c0392b" }}>{a.category}</div>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:700, lineHeight:1.3, color:"#0d1b2a", flex:1 }}>{a.title}</div>
        <div style={{ fontSize:13, color:"#9a9590", lineHeight:1.65 }}>{a.excerpt}</div>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#9a9590", textTransform:"uppercase", letterSpacing:"0.05em", borderTop:"1px solid rgba(13,27,42,0.12)", paddingTop:14 }}>
          <span><strong style={{ color:"#0d1b2a" }}>{a.author}</strong></span>
          <span>⏱ {a.readTime}</span>
        </div>
      </Link>
    ))}
  </div>
)}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background:"#c0392b", padding:"72px 0", overflow:"hidden", position:"relative" }}>
        <div style={{ position:"absolute", fontFamily:"'Bebas Neue',sans-serif", fontSize:200, color:"rgba(255,255,255,0.05)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", whiteSpace:"nowrap", pointerEvents:"none" }}>SUBSCRIBE</div>
        <div className="newsletter-inner section-pad" style={{ maxWidth:1280, margin:"0 auto", padding:"0 40px", display:"flex", alignItems:"center", gap:64, position:"relative", zIndex:1 }}>
          <div style={{ flex:1, minWidth:0 }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(24px,3.5vw,44px)", fontWeight:900, color:"white", lineHeight:1.15, letterSpacing:"-0.03em", marginBottom:12 }}>
              Law is too important<br/>to leave to <em>lawyers alone.</em>
            </h2>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.75)", lineHeight:1.65 }}>
              Join readers who get sharp, accessible legal analysis in their inbox every week.
            </p>
          </div>
          <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", gap:12 }}>
            <div className="newsletter-form-row" style={{ display:"flex", gap:0 }}>
              <input className="newsletter-input" type="text" placeholder="Your name" style={{ borderRight:"none" }} />
              <input className="newsletter-input" type="email" placeholder="Your email address" />
              <button style={{ background:"#0d1b2a", color:"white", border:"none", padding:"14px 20px", fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
                Subscribe →
              </button>
            </div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>Free forever. Unsubscribe any time.</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background:"#0d1b2a", color:"white" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"56px 40px 32px" }} className="section-pad">
          <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1fr", gap:40, marginBottom:48, paddingBottom:40, borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
            {/* Brand */}
            <div className="footer-brand">
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, marginBottom:12 }}>
                Ethos <em style={{ color:"#e74c3c" }}>&</em> Statute
              </div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", lineHeight:1.7, marginBottom:24 }}>
                Sharp legal journalism. Analysis, opinion and deep reporting on law, courts, and justice.
              </div>
              <div style={{ display:"flex", gap:8 }}>
                {["X","in","YT","IG"].map(s => (
                  <a key={s} href="#" style={{ width:32, height:32, border:"1px solid rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"rgba(255,255,255,0.5)", fontWeight:700 }}>{s}</a>
                ))}
              </div>
            </div>

            {/* Coverage */}
            <div>
              <div style={{ fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:16, paddingBottom:10, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>Coverage</div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  {name:"Constitutional Law", href:"/"},
                  {name:"Corporate & Business", href:"/"},
                  {name:"Criminal Law", href:"/"},
                  {name:"IP & Technology", href:"/"},
                  {name:"Family & Civil", href:"/"},
                  {name:"International Law", href:"/"},
                  {name:"Tax & Revenue", href:"/"},
                  {name:"Environmental", href:"/"},
                ].map(l => (
                  <li key={l.name}><Link href={l.href} style={{ fontSize:13, color:"rgba(255,255,255,0.55)" }}>— {l.name}</Link></li>
                ))}
              </ul>
            </div>

            {/* Sections */}
            <div>
              <div style={{ fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:16, paddingBottom:10, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>Sections</div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  {name:"Latest Stories", href:"/"},
                  {name:"Opinion", href:"/"},
                  {name:"Deep Reads", href:"/"},
                  {name:"All Articles", href:"/"},
                ].map(l => (
                  <li key={l.name}><Link href={l.href} style={{ fontSize:13, color:"rgba(255,255,255,0.55)" }}>— {l.name}</Link></li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <div style={{ fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:16, paddingBottom:10, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>About</div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  {name:"Our Mission", href:"/about"},
                  {name:"Write for Us", href:"/contact"},
                  {name:"Contact", href:"/contact"},
                  {name:"Subscribe", href:"/subscribe"},
                  {name:"Privacy Policy", href:"/privacy"},
                  {name:"Terms of Use", href:"/terms"},
                ].map(l => (
                  <li key={l.name}><Link href={l.href} style={{ fontSize:13, color:"rgba(255,255,255,0.55)" }}>— {l.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ display:"flex", flexWrap:"wrap", gap:16, justifyContent:"space-between", fontSize:11, color:"rgba(255,255,255,0.25)" }}>
            <span>© 2026 Ethos & Statute. All rights reserved.</span>
            <span>Crafted with conviction.</span>
          </div>
        </div>
      </footer>
    </main>
  )
}