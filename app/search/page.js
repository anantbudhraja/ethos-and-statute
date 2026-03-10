'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setSearched(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data.results || [])
    } catch {
      setResults([])
    }
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <main style={{ fontFamily:"'DM Sans',sans-serif", background:"#f7f5f0", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        a { text-decoration:none; color:inherit; }
        .nav-link { display:flex; align-items:center; height:64px; padding:0 18px; font-size:12px; letter-spacing:0.1em; text-transform:uppercase; font-weight:500; color:#0d1b2a; border-bottom:2px solid transparent; transition:all 0.2s; }
        .nav-link:hover { color:#c0392b; border-bottom-color:#c0392b; }
        .result-card { background:white; padding:32px; border-left:3px solid transparent; transition:all 0.2s; cursor:pointer; border-bottom:1px solid rgba(13,27,42,0.08); }
        .result-card:hover { border-left-color:#c0392b; background:#fff; }
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
        <div style={{ display:"flex", alignItems:"center", marginLeft:"auto" }}>
          <Link href="/subscribe" style={{ background:"#c0392b", color:"white", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", padding:"8px 20px" }}>
            Subscribe
          </Link>
        </div>
      </nav>

      {/* Search Hero */}
      <div style={{ background:"#0d1b2a", padding:"80px 40px" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <div style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:"#e74c3c", fontWeight:500, display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
            <span style={{ width:20, height:1, background:"#e74c3c", display:"inline-block" }}></span>
            Search
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(32px,4vw,56px)", fontWeight:900, color:"white", letterSpacing:"-0.03em", marginBottom:32 }}>
            Find any <em style={{ color:"#e74c3c", fontStyle:"italic" }}>article.</em>
          </h1>
          <div style={{ display:"flex", gap:0 }}>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search by title, topic, or category..."
              style={{ flex:1, padding:"18px 24px", fontFamily:"'DM Sans',sans-serif", fontSize:16, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", borderRight:"none", color:"white", outline:"none" }}
            />
            <button
              onClick={handleSearch}
              style={{ background:"#c0392b", color:"white", border:"none", padding:"18px 32px", fontSize:12, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}
            >
              Search →
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth:720, margin:"0 auto", padding:"48px 40px" }}>
        {loading && (
          <div style={{ textAlign:"center", padding:64 }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:"#9a9590" }}>Searching...</div>
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div style={{ textAlign:"center", padding:64 }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:64, color:"#e8e4dc", lineHeight:1, marginBottom:16 }}>0</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, color:"#0d1b2a", marginBottom:8 }}>No results found</div>
            <div style={{ fontSize:14, color:"#9a9590" }}>Try a different search term or browse by category</div>
            <Link href="/" style={{ display:"inline-flex", alignItems:"center", gap:8, marginTop:24, fontSize:12, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"#c0392b" }}>
              ← Browse all articles
            </Link>
          </div>
        )}

        {!loading && results.length > 0 && (
          <>
            <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:24, paddingBottom:12, borderBottom:"2px solid #0d1b2a" }}>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:"0.08em", color:"#0d1b2a" }}>Results</span>
              <span style={{ fontSize:11, color:"#9a9590", letterSpacing:"0.1em", textTransform:"uppercase" }}>— {results.length} articles found</span>
            </div>
            <div style={{ border:"1px solid rgba(13,27,42,0.08)" }}>
              {results.map((article) => (
                <Link href={`/article/${article.slug?.current}`} key={article._id} className="result-card" style={{ display:"block" }}>
                  <div style={{ fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600, color:"#c0392b", marginBottom:8 }}>{article.category}</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"#0d1b2a", lineHeight:1.25, letterSpacing:"-0.01em", marginBottom:8 }}>{article.title}</div>
                  <div style={{ fontSize:13, color:"#9a9590", lineHeight:1.65, marginBottom:12 }}>{article.excerpt}</div>
                  <div style={{ fontSize:11, color:"#9a9590", textTransform:"uppercase", letterSpacing:"0.08em" }}>
                    By <strong style={{ color:"#0d1b2a" }}>{article.author}</strong> · {article.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {!searched && (
          <div style={{ textAlign:"center", padding:64 }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:"#9a9590", fontStyle:"italic" }}>
              Start typing to search across all articles...
            </div>
          </div>
        )}
      </div>

      <footer style={{ background:"#0d1b2a", color:"white", padding:"40px", textAlign:"center" }}>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, marginBottom:8 }}>Ethos <em style={{ color:"#e74c3c" }}>&</em> Statute</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)" }}>© 2026 Ethos & Statute. All rights reserved.</div>
      </footer>
    </main>
  )
}