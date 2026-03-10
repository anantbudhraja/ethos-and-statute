import { client } from '../../../sanity/lib'
import Link from 'next/link'

async function getArticle(slug) {
  return await client.fetch(`
    *[_type == "article" && slug.current == $slug][0] {
      _id, title, slug, author, category, excerpt, readTime, publishedAt, featured,
      body[] {
        ...,
        _type == "block" => {
          ...,
          children[] { ... }
        }
      }
    }
  `, { slug })
}

function renderBody(body) {
  if (!body) return null
  return body.map((block, i) => {
    if (block._type === 'block') {
      const text = block.children?.map(c => c.text).join('') || ''
      if (block.style === 'h2') return <h2 key={i} style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(24px,2.5vw,36px)", fontWeight:700, color:"#0d1b2a", lineHeight:1.2, letterSpacing:"-0.02em", margin:"40px 0 16px" }}>{text}</h2>
      if (block.style === 'h3') return <h3 key={i} style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(20px,2vw,28px)", fontWeight:700, color:"#0d1b2a", lineHeight:1.2, margin:"32px 0 12px" }}>{text}</h3>
      if (block.style === 'blockquote') return <blockquote key={i} style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(18px,2vw,24px)", fontStyle:"italic", color:"#0d1b2a", borderLeft:"3px solid #c0392b", paddingLeft:24, margin:"32px 0" }}>{text}</blockquote>
      return <p key={i} style={{ fontSize:18, lineHeight:1.85, color:"#333", margin:"0 0 24px" }}>{text}</p>
    }
    return null
  })
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Playfair Display',serif", fontSize:32, color:"#0d1b2a" }}>
        Article not found.
      </div>
    )
  }

  const date = new Date(article.publishedAt).toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' })

  return (
    <main style={{ fontFamily:"'DM Sans',sans-serif", background:"#f7f5f0", color:"#1a1a1a", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        a { text-decoration:none; color:inherit; }
        .nav-link { display:flex; align-items:center; height:64px; padding:0 18px; font-size:12px; letter-spacing:0.1em; text-transform:uppercase; font-weight:500; color:#0d1b2a; border-bottom:2px solid transparent; transition:all 0.2s; }
        .nav-link:hover { color:#c0392b; border-bottom-color:#c0392b; }
        @media (max-width: 768px) {
  nav { padding: 0 16px !important; }
  div[style*="max-width:720"] { padding: 24px 16px !important; }
  div[style*="max-width: 720"] { padding: 24px 16px !important; }
  h1 { font-size: 28px !important; }
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
          <button style={{ background:"#c0392b", color:"white", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", padding:"8px 20px", border:"none", cursor:"pointer" }}>
            Subscribe
          </button>
        </div>
      </nav>

      {/* Article Header */}
      <div style={{ background:"#0d1b2a", padding:"80px 40px" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <div style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:"#e74c3c", fontWeight:500, display:"flex", alignItems:"center", gap:8, marginBottom:24 }}>
            <Link href="/" style={{ color:"rgba(255,255,255,0.4)" }}>Home</Link>
            <span style={{ color:"rgba(255,255,255,0.2)" }}>→</span>
            <span>{article.category}</span>
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(36px,5vw,64px)", fontWeight:900, lineHeight:1.05, color:"white", letterSpacing:"-0.03em", marginBottom:24 }}>
            {article.title}
          </h1>
          <p style={{ fontSize:18, color:"rgba(255,255,255,0.6)", lineHeight:1.7, marginBottom:32, maxWidth:640 }}>
            {article.excerpt}
          </p>
          <div style={{ display:"flex", alignItems:"center", gap:20, paddingTop:24, borderTop:"1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,#c0392b,#8e1a10)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Playfair Display',serif", fontSize:18, color:"white", fontWeight:700 }}>
              {article.author?.[0]}
            </div>
            <div>
              <div style={{ fontSize:14, color:"white", fontWeight:600 }}>{article.author}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>{date} · {article.readTime} read</div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div style={{ maxWidth:800, margin:"0 auto", padding:"64px 40px" }}>
        <div style={{ background:"white", padding:"64px", borderLeft:"1px solid rgba(13,27,42,0.08)", borderRight:"1px solid rgba(13,27,42,0.08)" }}>
          {renderBody(article.body)}
          {(!article.body || article.body.length === 0) && (
            <p style={{ fontSize:18, color:"#9a9590", fontStyle:"italic" }}>No content yet.</p>
          )}
        </div>

        {/* Back link */}
        <div style={{ marginTop:48, paddingTop:32, borderTop:"1px solid rgba(13,27,42,0.12)" }}>
          <Link href="/" style={{ fontSize:12, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"#c0392b", display:"inline-flex", alignItems:"center", gap:8 }}>
            ← Back to all articles
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background:"#0d1b2a", color:"white", padding:"40px", textAlign:"center" }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, marginBottom:8 }}>
          Ethos <em style={{ color:"#e74c3c" }}>&</em> Statute
        </div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)", letterSpacing:"0.05em" }}>© 2026 Ethos & Statute. All rights reserved.</div>
      </footer>
    </main>
  )
}