import { client } from '../../../sanity/lib'
import Link from 'next/link'

async function getArticle(slug) {
  return await client.fetch(`
    *[_type == "article" && slug.current == $slug][0] {
      _id, title, slug, author, authorBio, category, excerpt, readTime, publishedAt, featured,
      mainImage { asset->{ url }, alt },
      body[] {
        ...,
        markDefs[] { ... },
        asset->{ url },
        _type == "block" => {
          ...,
          children[] { ... }
        }
      }
    }
  `, { slug })
}

function renderChildren(children, block) {
  return children?.map((child, j) => {
    if (child._type === 'span') {
      const marks = child.marks || []
      const linkMark = marks.find(m => block.markDefs?.find(d => d._key === m && d._type === 'link'))
      if (linkMark) {
        const def = block.markDefs.find(d => d._key === linkMark)
        return <a key={j} href={def.href} target="_blank" rel="noopener noreferrer" style={{ color:"#c0392b", textDecoration:"underline", textUnderlineOffset:3 }}>{child.text}</a>
      }
      if (marks.includes('strong')) return <strong key={j}>{child.text}</strong>
      if (marks.includes('em')) return <em key={j}>{child.text}</em>
      if (marks.includes('underline')) return <u key={j}>{child.text}</u>
      return <span key={j}>{child.text}</span>
    }
    return null
  })
}

function renderBody(body) {
  if (!body) return null
  const elements = []
  let i = 0

  while (i < body.length) {
    const block = body[i]

    // Images
    if (block._type === 'image' && block.asset?.url) {
      const sizeMap = { small:'40%', medium:'70%', full:'100%' }
      const width = sizeMap[block.size] || '100%'
      elements.push(
        <figure key={i} style={{ margin:"40px auto", width, maxWidth:"100%" }}>
          <img src={block.asset.url} alt={block.alt || ''} style={{ width:"100%", height:"auto", display:"block" }} />
          {block.caption && (
            <figcaption style={{ fontSize:12, color:"#9a9590", textAlign:"center", marginTop:10, fontStyle:"italic" }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      )
      i++
      continue
    }

    // Bullet lists
    if (block._type === 'block' && block.listItem === 'bullet') {
      const items = []
      while (i < body.length && body[i]._type === 'block' && body[i].listItem === 'bullet') {
        items.push(
          <li key={i} style={{ fontSize:18, color:"#333", lineHeight:1.85, marginBottom:10, paddingLeft:4 }}>
            {renderChildren(body[i].children, body[i])}
          </li>
        )
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} style={{ paddingLeft:28, marginBottom:28, marginTop:8, listStyleType:"disc" }}>
          {items}
        </ul>
      )
      continue
    }

    // Numbered lists
    if (block._type === 'block' && block.listItem === 'number') {
      const items = []
      while (i < body.length && body[i]._type === 'block' && body[i].listItem === 'number') {
        items.push(
          <li key={i} style={{ fontSize:18, color:"#333", lineHeight:1.85, marginBottom:10, paddingLeft:4 }}>
            {renderChildren(body[i].children, body[i])}
          </li>
        )
        i++
      }
      elements.push(
        <ol key={`ol-${i}`} style={{ paddingLeft:28, marginBottom:28, marginTop:8, listStyleType:"decimal" }}>
          {items}
        </ol>
      )
      continue
    }

    // Regular blocks
    if (block._type === 'block') {
      if (block.style === 'h2') {
        elements.push(
          <h2 key={i} style={{ fontFamily:"'Playfair Display',serif", fontSize:32, fontWeight:900, color:"#0d1b2a", margin:"56px 0 20px", paddingTop:32, borderTop:"2px solid rgba(13,27,42,0.08)", letterSpacing:"-0.02em", lineHeight:1.2 }}>
            {renderChildren(block.children, block)}
          </h2>
        )
      } else if (block.style === 'h3') {
        elements.push(
          <h3 key={i} style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:"#0d1b2a", margin:"40px 0 16px", letterSpacing:"-0.01em", lineHeight:1.25 }}>
            {renderChildren(block.children, block)}
          </h3>
        )
      } else if (block.style === 'blockquote') {
        elements.push(
          <blockquote key={i} style={{ borderLeft:"3px solid #c0392b", paddingLeft:24, margin:"32px 0", fontFamily:"'Playfair Display',serif", fontSize:20, fontStyle:"italic", color:"#555", lineHeight:1.7 }}>
            {renderChildren(block.children, block)}
          </blockquote>
        )
      } else {
        elements.push(
          <p key={i} style={{ fontSize:18, color:"#333", lineHeight:1.85, marginBottom:28 }}>
            {renderChildren(block.children, block)}
          </p>
        )
      }
    }

    i++
  }

  return elements
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
        html, body { overflow-x: hidden; }
        a { text-decoration:none; color:inherit; }
        .nav-link { display:flex; align-items:center; height:64px; padding:0 14px; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; font-weight:500; color:#0d1b2a; border-bottom:2px solid transparent; transition:all 0.2s; white-space:nowrap; }
        .nav-link:hover { color:#c0392b; border-bottom-color:#c0392b; }
        ul, ol { list-style-position:outside; }
        .article-header { padding:64px 40px; }
        .article-header-inner { max-width:860px; margin:0 auto; }
        .article-body-outer { max-width:860px; margin:0 auto; padding:48px 24px; }
        .article-body-inner { background:white; padding:48px 56px; }
        .author-card { margin-top:32px; background:white; padding:36px 40px; border-left:4px solid #c0392b; display:flex; align-items:flex-start; gap:24px; }
        @media (max-width: 768px) {
          .desktop-nav { display:none !important; }
          .mobile-subscribe { display:flex !important; }
          .article-header { padding:36px 20px !important; }
          .article-body-outer { padding:0 !important; }
          .article-body-inner { padding:28px 20px !important; }
          .author-card { padding:24px 20px !important; flex-direction:column !important; }
          .back-link { padding:16px 20px !important; }
          h1 { font-size:clamp(26px,6vw,48px) !important; }
          h2 { font-size:24px !important; }
          h3 { font-size:20px !important; }
          p, li { font-size:17px !important; line-height:1.8 !important; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{ background:"white", borderBottom:"1px solid rgba(13,27,42,0.12)", position:"sticky", top:0, zIndex:100, padding:"0 20px", display:"flex", alignItems:"center", height:64, overflow:"hidden" }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:20, color:"#0d1b2a", letterSpacing:"-0.02em", paddingRight:24, borderRight:"1px solid rgba(13,27,42,0.12)", marginRight:16, whiteSpace:"nowrap", flexShrink:0 }}>
          Ethos <em style={{ fontStyle:"italic", color:"#c0392b", margin:"0 4px" }}>&</em> Statute
        </Link>
        <div className="desktop-nav" style={{ display:"flex", alignItems:"center", flex:1, overflow:"hidden" }}>
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
        <div style={{ display:"flex", alignItems:"center", gap:12, marginLeft:"auto", flexShrink:0 }}>
          <Link href="/search" style={{ width:32, height:32, border:"1px solid #e8e4dc", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d1b2a" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </Link>
          <Link href="/subscribe" style={{ background:"#c0392b", color:"white", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", padding:"8px 16px", whiteSpace:"nowrap" }}>
            Subscribe
          </Link>
        </div>
      </nav>

      {/* Article Header */}
      <div className="article-header" style={{ background:"#0d1b2a" }}>
        <div className="article-header-inner">
          <div style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:"#e74c3c", fontWeight:500, display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
            <Link href="/" style={{ color:"rgba(255,255,255,0.4)" }}>Home</Link>
            <span style={{ color:"rgba(255,255,255,0.2)" }}>→</span>
            <span>{article.category}</span>
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(30px,5vw,60px)", fontWeight:900, lineHeight:1.08, color:"white", letterSpacing:"-0.03em", marginBottom:20 }}>
            {article.title}
          </h1>
          <p style={{ fontSize:17, color:"rgba(255,255,255,0.6)", lineHeight:1.7, marginBottom:28 }}>
            {article.excerpt}
          </p>
          <div style={{ display:"flex", alignItems:"center", gap:16, paddingTop:20, borderTop:"1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#c0392b,#8e1a10)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Playfair Display',serif", fontSize:16, color:"white", fontWeight:700, flexShrink:0 }}>
              {article.author?.[0]}
            </div>
            <div>
              <div style={{ fontSize:14, color:"white", fontWeight:600 }}>{article.author}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>{date} · {article.readTime} read</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Cover Image */}
      {article.mainImage?.asset?.url && (
        <div style={{ width:"100%", maxHeight:480, overflow:"hidden" }}>
          <img
            src={article.mainImage.asset.url}
            alt={article.mainImage.alt || article.title}
            style={{ width:"100%", height:480, objectFit:"cover", display:"block" }}
          />
        </div>
      )}

      {/* Article Body */}
      <div className="article-body-outer">
        <div className="article-body-inner">
          {renderBody(article.body)}
          {(!article.body || article.body.length === 0) && (
            <p style={{ fontSize:18, color:"#9a9590", fontStyle:"italic" }}>No content yet.</p>
          )}
        </div>

        {/* Author Card */}
        <div className="author-card">
          <div style={{ width:56, height:56, borderRadius:"50%", background:"linear-gradient(135deg,#c0392b,#8e1a10)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"white" }}>
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
        <div className="back-link" style={{ marginTop:24, padding:"16px 0" }}>
          <Link href="/" style={{ fontSize:12, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"#c0392b", display:"inline-flex", alignItems:"center", gap:8 }}>
            ← Back to all articles
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background:"#0d1b2a", color:"white", padding:"40px 20px", textAlign:"center" }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, marginBottom:8 }}>
          Ethos <em style={{ color:"#e74c3c" }}>&</em> Statute
        </div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)", letterSpacing:"0.05em" }}>© 2026 Ethos & Statute. All rights reserved.</div>
      </footer>
    </main>
  )
}