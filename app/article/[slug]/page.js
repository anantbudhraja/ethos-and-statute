import { client } from '../../../sanity/lib'
import Link from 'next/link'

async function getArticle(slug) {
  return await client.fetch(`
    *[_type == "article" && slug.current == $slug][0] {
      _id, title, slug, author, authorBio, category, excerpt, readTime, publishedAt, featured,
      body[] {
        ...,
        markDefs[] { ... },
        _type == "block" => {
          ...,
          children[] { ... }
        }
      }
    }
  `, { slug })
}

function renderBody(body) {
  return body?.map((block, i) => {
    if (block._type === 'block') {
      const renderChildren = (children) => children?.map((child, j) => {
        if (child._type === 'span') {
          const marks = child.marks || []
          const linkMark = marks.find(m => block.markDefs?.find(d => d._key === m && d._type === 'link'))
          if (linkMark) {
            const def = block.markDefs.find(d => d._key === linkMark)
            return (
              <a key={j} href={def.href} target="_blank" rel="noopener noreferrer"
                style={{ color:"#c0392b", textDecoration:"underline", textUnderlineOffset:3 }}>
                {child.text}
              </a>
            )
          }
          let content = <span key={j}>{child.text}</span>
          if (marks.includes('strong')) content = <strong key={j}>{child.text}</strong>
          if (marks.includes('em')) content = <em key={j}>{child.text}</em>
          if (marks.includes('underline')) content = <u key={j}>{child.text}</u>
          return content
        }
        return null
      })

      if (block.style === 'h2') return (
        <h2 key={i} style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, color:"#0d1b2a", margin:"40px 0 16px", letterSpacing:"-0.02em" }}>
          {renderChildren(block.children)}
        </h2>
      )
      if (block.style === 'h3') return (
        <h3 key={i} style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"#0d1b2a", margin:"32px 0 12px" }}>
          {renderChildren(block.children)}
        </h3>
      )
      if (block.style === 'blockquote') return (
        <blockquote key={i} style={{ borderLeft:"3px solid #c0392b", paddingLeft:24, margin:"32px 0", fontFamily:"'Playfair Display',serif", fontSize:20, fontStyle:"italic", color:"#555", lineHeight:1.7 }}>
          {renderChildren(block.children)}
        </blockquote>
      )
      return (
        <p key={i} style={{ fontSize:17, color:"#444", lineHeight:1.9, marginBottom:24 }}>
          {renderChildren(block.children)}
        </p>
      )
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
          nav { padding: 0 16px !important; overflow: hidden !important; }
          .desktop-nav { display: none !important; }
          h1 { font-size: 28px !important; }
          div[style*="padding:64px"] { padding: 24px 16px !important; }
          div[style*="max-width:800"] { padding: 24px 16px !important; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{ background:"white", borderBottom:"1px solid rgba(13,27,42,0.12)", position:"sticky", top:0, zIndex:100, padding:"0 40px", display:"flex", alignItems:"center", height:64, overflow:"hidden" }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:20, color:"#0d1b2a", letterSpacing:"-0.02em", paddingRight:40, borderRight:"1px solid rgba(13,27,42,0.12)", marginRight:32, whiteSpace:"nowrap", flexShrink:0 }}>
          Ethos <em style={{ fontStyle:"italic", color:"#c0392b", margin:"0 4px" }}>&</em> Statute
        </Link>
        <div className="desktop-nav" style={{ display:"flex", alignItems:"center", flex:1 }}>
          {[
            { label:"Our Mission", href:"/about" },
            { label:"Latest", href:"/" },
            { label:"Constitutional", href:"/" },
            { label:"Corporate", href:"/" },
            { label:"Criminal", href:"/" },
            { label:"IP & Tech", href:"/" },
            { label:"Opinion", href:"/" },
          ].map(item => (
            <Link key={item.label} href={item.href} className="nav-link">{item.label}</Link>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginLeft:"auto", flexShrink:0 }}>
          <Link href="/search" style={{ width:32, height:32, border:"1px solid #e8e4dc", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d1b2a" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </Link>
          <Link href="/subscribe" style={{ background:"#c0392b", color:"white", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", padding:"8px 20px" }}>
            Subscribe
          </Link>
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
            <div style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,#c0392b,#8e1a10)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Playfair Display',serif", fontSize:18, color:"white", fontWeight:700, flexShrink:0 }}>
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

        {/* Author Card */}
        <div style={{ marginTop:48, background:"white", padding:"40px", borderLeft:"4px solid #c0392b", display:"flex", alignItems:"flex-start", gap:24 }}>
          <div style={{ width:64, height:64, borderRadius:"50%", background:"linear-gradient(135deg,#c0392b,#8e1a10)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:"white" }}>
              {article.author?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase", color:"#9a9590", marginBottom:6 }}>Written by</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"#0d1b2a", marginBottom:8 }}>{article.author}</div>
            <div style={{ fontSize:14, color:"#666", lineHeight:1.75 }}>
              {article.authorBio || "Contributing writer at Ethos & Statute."}
            </div>
          </div>
        </div>

        {/* Back link */}
        <div style={{ marginTop:32 }}>
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