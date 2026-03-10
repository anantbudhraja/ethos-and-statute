import { client } from '../sanity/lib'
import Link from 'next/link'

async function getArticles() {
  return await client.fetch(`
    *[_type == "article"] | order(publishedAt desc) {
      _id, title, slug, author, category, excerpt, readTime, publishedAt, featured
    }
  `)
}

export default async function Home() {
  const articles = await getArticles()
  const featured = articles.find(a => a.featured) || articles[0]
  const secondary = articles.filter(a => a._id !== featured?._id).slice(0, 3)
  const grid = articles.filter(a => a._id !== featured?._id).slice(0, 6)

  return (
    <main style={{ fontFamily:"'DM Sans', sans-serif", background:"#f7f5f0", color:"#1a1a1a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        a { text-decoration:none; color:inherit; }
        .ticker-track { display:flex; white-space:nowrap; animation:ticker 35s linear infinite; }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .article-card { transition:background 0.25s; position:relative; overflow:hidden; cursor:pointer; }
        .article-card::after { content:''; position:absolute; bottom:0; left:0; width:0; height:2px; background:#c0392b; transition:width 0.3s ease; }
        .article-card:hover { background:#ffffff !important; }
        .article-card:hover::after { width:100%; }
        .hero-secondary { transition:background 0.2s; cursor:pointer; }
        .hero-secondary:hover { background:#e8e4dc !important; }
        .nav-link { display:flex; align-items:center; height:64px; padding:0 18px; font-size:12px; letter-spacing:0.1em; text-transform:uppercase; font-weight:500; color:#0d1b2a; border-bottom:2px solid transparent; transition:all 0.2s; }
        .nav-link:hover { color:#c0392b; border-bottom-color:#c0392b; }
        .newsletter-input { flex:1; padding:14px 20px; font-family:'DM Sans',sans-serif; font-size:14px; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); color:white; outline:none; }
        .newsletter-input::placeholder { color:rgba(255,255,255,0.5); }
        @media (max-width: 768px) {
  .ticker-bar { display: none; }
  nav { padding: 0 16px !important; overflow-x: auto; }
  .hero-split { flex-direction: column !important; }
  .hero-left { width: 100% !important; padding: 32px 16px !important; }
  .hero-right { width: 100% !important; min-height: 260px !important; }
  .articles-grid { grid-template-columns: 1fr !important; padding: 24px 16px !important; }
  .deep-read { flex-direction: column !important; padding: 32px 16px !important; }
  .deep-read-img { width: 100% !important; height: 220px !important; }
  .categories-grid { grid-template-columns: 1fr 1fr !important; padding: 24px 16px !important; }
  .opinion-layout { flex-direction: column !important; padding: 24px 16px !important; }
  .newsletter-band { padding: 48px 16px !important; }
  .newsletter-band h2 { font-size: 32px !important; }
  .newsletter-form { flex-direction: column !important; }
  .newsletter-form input { width: 100% !important; }
  .footer-cols { flex-direction: column !important; }
  .footer-cols > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; padding: 24px 16px !important; }
  @media (max-width: 768px) {
  .desktop-nav { display: none !important; }
  .mobile-nav { display: flex !important; }
  .hero-split { flex-direction: column !important; min-height: auto !important; }
  .hero-left { width: 100% !important; padding: 40px 20px !important; min-height: auto !important; }
  .hero-right { width: 100% !important; min-height: 280px !important; }
  .articles-grid { grid-template-columns: 1fr !important; padding: 32px 20px !important; gap: 24px !important; }
  .deep-read { flex-direction: column !important; }
  .deep-read-img { width: 100% !important; min-height: 240px !important; }
  .deep-read-content { padding: 32px 20px !important; }
  .categories-grid { grid-template-columns: 1fr 1fr !important; padding: 32px 20px !important; gap: 12px !important; }
  .opinion-layout { flex-direction: column !important; gap: 0 !important; }
  .newsletter-band { padding: 48px 20px !important; }
  .newsletter-band h2 { font-size: 28px !important; }
  .newsletter-form { flex-direction: column !important; max-width: 100% !important; }
  .newsletter-form input { width: 100% !important; }
  .footer-cols { flex-direction: column !important; }
  .footer-cols > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; padding: 24px 20px !important; }
  body { overflow-x: hidden !important; }
  * { max-width: 100vw; }
}
      `}</style>

      {/* Ticker */}
      <div style={{ background:"#0d1b2a", height:34, display:"flex", alignItems:"center", overflow:"hidden", fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:500 }}>
        <div className="ticker-track">
          {[...articles.slice(0,6), ...articles.slice(0,3)].map((a, i) => (
            <span key={i} style={{ padding:"0 40px", color:"#9a9590" }}>
              {a.title} <span style={{ color:"#c0392b", padding:"0 8px" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Nav */}
<nav style={{ background:"white", borderBottom:"1px solid rgba(13,27,42,0.12)", position:"sticky", top:0, zIndex:100, padding:"0 20px", display:"flex", alignItems:"center", height:64, overflow:"hidden" }}>
  {/* Logo */}
  <Link href="/" style={{ display:"flex", alignItems:"center", fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:20, color:"#0d1b2a", letterSpacing:"-0.02em", whiteSpace:"nowrap", flexShrink:0 }}>
    Ethos <em style={{ fontStyle:"italic", color:"#c0392b", margin:"0 4px" }}>&</em> Statute
  </Link>

  {/* Desktop nav links */}
  <div className="desktop-nav" style={{ display:"flex", alignItems:"center", flex:1, marginLeft:32 }}>
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

  {/* Desktop right buttons */}
  <div className="desktop-nav" style={{ display:"flex", alignItems:"center", gap:16, marginLeft:"auto" }}>
    <Link href="/search" style={{ width:32, height:32, border:"1px solid #e8e4dc", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d1b2a" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    </Link>
    <Link href="/subscribe" style={{ background:"#c0392b", color:"white", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", padding:"8px 20px" }}>
      Subscribe
    </Link>
  </div>

  {/* Mobile right buttons */}
  <div className="mobile-nav" style={{ display:"none", alignItems:"center", gap:12, marginLeft:"auto" }}>
    <Link href="/search" style={{ width:32, height:32, border:"1px solid #e8e4dc", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d1b2a" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
    </Link>
    <Link href="/subscribe" style={{ background:"#c0392b", color:"white", fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", padding:"6px 14px", whiteSpace:"nowrap" }}>
      Subscribe
    </Link>
  </div>
</nav>

      {/* Hero */}
      {featured && (
        <section style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"82vh", borderBottom:"1px solid rgba(13,27,42,0.12)" }}>
          <div style={{ background:"#0d1b2a", padding:"64px 60px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
            <div style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:"#e74c3c", fontWeight:500, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ width:20, height:1, background:"#e74c3c", display:"inline-block" }}></span>
              {featured.category}
            </div>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(44px,5.5vw,72px)", fontWeight:900, lineHeight:1.0, color:"white", letterSpacing:"-0.03em" }}>
              {featured.title}
            </h1>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.65)", lineHeight:1.7, maxWidth:440 }}>
              {featured.excerpt}
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#c0392b,#8e1a10)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Playfair Display',serif", fontSize:14, color:"white", fontWeight:700 }}>
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
          <div style={{ display:"flex", flexDirection:"column", borderLeft:"1px solid rgba(13,27,42,0.12)" }}>
            {secondary.map((a, i) => (
              <Link href={`/article/${a.slug?.current}`} key={a._id} className="hero-secondary" style={{ flex:1, padding:"40px 48px", borderBottom:"1px solid rgba(13,27,42,0.12)", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                <div style={{ fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600, color:"#c0392b", marginBottom:12 }}>{a.category}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(16px,1.8vw,24px)", fontWeight:700, lineHeight:1.25, color:"#0d1b2a", letterSpacing:"-0.02em" }}>{a.title}</div>
                <div style={{ fontSize:11, color:"#9a9590", letterSpacing:"0.05em", textTransform:"uppercase", marginTop:12 }}>By <strong style={{ color:"#0d1b2a" }}>{a.author}</strong> · {a.readTime}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section style={{ padding:"72px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 40px" }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:16, marginBottom:32, paddingBottom:12, borderBottom:"2px solid #0d1b2a" }}>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:"0.08em", color:"#0d1b2a" }}>Latest Articles</span>
            <span style={{ fontSize:11, color:"#9a9590", letterSpacing:"0.1em", textTransform:"uppercase" }}>— {articles.length} stories</span>
          </div>
          {grid.length === 0 ? (
            <div style={{ padding:48, textAlign:"center", color:"#9a9590", fontFamily:"'Playfair Display',serif", fontSize:20 }}>
              No articles yet — publish your first one in the Studio!
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", border:"1px solid rgba(13,27,42,0.12)" }}>
              {grid.map((a, i) => (
                <Link href={`/article/${a.slug?.current}`} key={a._id} className="article-card" style={{ padding:32, borderRight: i % 3 !== 2 ? "1px solid rgba(13,27,42,0.12)" : "none", borderBottom:"1px solid rgba(13,27,42,0.12)", display:"flex", flexDirection:"column", gap:16, background:"#f7f5f0" }}>
                  <div style={{ fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600, color:"#c0392b" }}>{a.category}</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, lineHeight:1.3, color:"#0d1b2a", flex:1 }}>{a.title}</div>
                  <div style={{ fontSize:13, color:"#9a9590", lineHeight:1.65 }}>{a.excerpt}</div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#9a9590", textTransform:"uppercase", letterSpacing:"0.05em", borderTop:"1px solid rgba(13,27,42,0.12)", paddingTop:16 }}>
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
      <section style={{ background:"#c0392b", padding:"80px 0", overflow:"hidden", position:"relative" }}>
        <div style={{ position:"absolute", fontFamily:"'Bebas Neue',sans-serif", fontSize:200, color:"rgba(255,255,255,0.05)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", whiteSpace:"nowrap", pointerEvents:"none" }}>SUBSCRIBE</div>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 40px", display:"flex", alignItems:"center", gap:80, position:"relative", zIndex:1 }}>
          <div style={{ flex:1 }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,3.5vw,44px)", fontWeight:900, color:"white", lineHeight:1.15, letterSpacing:"-0.03em", marginBottom:12 }}>
              Law is too important<br/>to leave it to <em>lawyers alone.</em>
            </h2>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.75)", lineHeight:1.65, maxWidth:360 }}>
              Join readers who get sharp, accessible legal analysis in their inbox every week.
            </p>
          </div>
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"flex" }}>
              <input className="newsletter-input" type="text" placeholder="Your name" style={{ borderRight:"none" }} />
              <input className="newsletter-input" type="email" placeholder="Your email address" />
              <button style={{ background:"#0d1b2a", color:"white", border:"none", padding:"14px 28px", fontSize:12, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>
                Subscribe →
              </button>
            </div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>Free forever. Unsubscribe any time.</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background:"#0d1b2a", color:"white" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 40px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1fr", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ padding:"56px 48px 56px 0", borderRight:"1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, marginBottom:16 }}>
                Ethos <em style={{ color:"#e74c3c" }}>&</em> Statute
              </div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", lineHeight:1.7, maxWidth:260, marginBottom:28 }}>
                Sharp legal journalism. Analysis, opinion and deep reporting on law, courts, and justice.
              </div>
              <div style={{ display:"flex", gap:10 }}>
                {["X","in","YT","IG"].map(s => (
                  <a key={s} href="#" style={{ width:32, height:32, border:"1px solid rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"rgba(255,255,255,0.5)", fontWeight:700 }}>{s}</a>
                ))}
              </div>
            </div>
            {[
              { title:"Coverage", links:[
    {name:"Constitutional Law", href:"/?category=Constitutional Law"},
    {name:"Corporate & Business", href:"/?category=Corporate & Business"},
    {name:"Criminal Law", href:"/?category=Criminal Law"},
    {name:"IP & Technology", href:"/?category=IP & Technology"},
    {name:"Family & Civil", href:"/?category=Family & Civil"},
    {name:"International Law", href:"/?category=International Law"},
    {name:"Tax & Revenue", href:"/?category=Tax & Revenue"},
    {name:"Environmental", href:"/?category=Environmental Law"},
  ]},
  { title:"Sections", links:[
    {name:"Latest Stories", href:"/"},
    {name:"Opinion", href:"/?category=Opinion"},
    {name:"Deep Reads", href:"/"},
    {name:"All Articles", href:"/"},
  ]},
  { title:"About", links:[
    {name:"Our Mission", href:"/about"},
    {name:"The Team", href:"/about"},
    {name:"Write for Us", href:"/contact"},
    {name:"Contact", href:"/contact"},
    {name:"Privacy Policy", href:"/privacy"},
    {name:"Terms of Use", href:"/terms"},
  ]},
].map(col => (
  <div key={col.title} style={{ padding:"56px 0 56px 48px", borderRight:"1px solid rgba(255,255,255,0.06)" }}>
    <div style={{ fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:20, paddingBottom:10, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>{col.title}</div>
    <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
      {col.links.map(l => (
        <li key={l.name}>
          <Link href={l.href} style={{ fontSize:13, color:"rgba(255,255,255,0.55)", display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:10, color:"rgba(255,255,255,0.2)" }}>—</span>{l.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", padding:"20px 0", fontSize:11, color:"rgba(255,255,255,0.25)" }}>
            <span>© 2026 Ethos & Statute. All rights reserved.</span>
            <span>Crafted with conviction.</span>
          </div>
        </div>
      </footer>
    </main>
  )
}