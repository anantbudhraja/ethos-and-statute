'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Subscribe() {
  const [formData, setFormData] = useState({ name:'', email:'' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      setError('Please fill in both fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <main style={{ fontFamily:"'DM Sans',sans-serif", background:"#0d1b2a", color:"white", minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        a { text-decoration:none; color:inherit; }
        .sub-input { width:100%; padding:16px 20px; font-family:'DM Sans',sans-serif; font-size:15px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:white; outline:none; transition:border 0.2s; }
        .sub-input:focus { border-color:#c0392b; }
        .sub-input::placeholder { color:rgba(255,255,255,0.35); }
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
      <nav style={{ borderBottom:"1px solid rgba(255,255,255,0.08)", padding:"0 40px", display:"flex", alignItems:"center", height:64 }}>
        <Link href="/" style={{ fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:20, color:"white", letterSpacing:"-0.02em" }}>
          Ethos <em style={{ fontStyle:"italic", color:"#e74c3c" }}>&</em> Statute
        </Link>
        <Link href="/" style={{ marginLeft:"auto", fontSize:12, color:"rgba(255,255,255,0.4)", letterSpacing:"0.1em", textTransform:"uppercase", display:"flex", alignItems:"center", gap:8 }}>
          ← Back to site
        </Link>
      </nav>

      {/* Main */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 40px" }}>
        {submitted ? (
          <div style={{ textAlign:"center", maxWidth:520 }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:80, color:"#c0392b", lineHeight:1, marginBottom:16 }}>✓</div>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(32px,4vw,48px)", fontWeight:900, color:"white", letterSpacing:"-0.03em", marginBottom:16 }}>
              You&apos;re in.
            </h1>
            <p style={{ fontSize:16, color:"rgba(255,255,255,0.55)", lineHeight:1.8, marginBottom:32 }}>
              Welcome to Ethos & Statute. Check your inbox — a welcome email is on its way to <strong style={{ color:"white" }}>{formData.email}</strong>
            </p>
            <Link href="/" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#c0392b", color:"white", fontSize:12, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"14px 28px" }}>
              Read Latest Articles →
            </Link>
          </div>
        ) : (
          <div style={{ width:"100%", maxWidth:560 }}>
            <div style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:"#e74c3c", fontWeight:500, display:"flex", alignItems:"center", gap:8, marginBottom:24 }}>
              <span style={{ width:20, height:1, background:"#e74c3c", display:"inline-block" }}></span>
              Newsletter
            </div>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(36px,5vw,64px)", fontWeight:900, color:"white", lineHeight:1.05, letterSpacing:"-0.03em", marginBottom:16 }}>
              Law is too important to leave to <em style={{ color:"#e74c3c" }}>lawyers alone.</em>
            </h1>
            <p style={{ fontSize:16, color:"rgba(255,255,255,0.55)", lineHeight:1.8, marginBottom:40 }}>
              Join readers who get sharp, accessible legal analysis every Tuesday and Friday. Free forever.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <input
                className="sub-input"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={e => setFormData({...formData, name:e.target.value})}
              />
              <input
                className="sub-input"
                type="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={e => setFormData({...formData, email:e.target.value})}
              />
              {error && <div style={{ fontSize:13, color:"#e74c3c" }}>{error}</div>}
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ background: loading ? "#555" : "#c0392b", color:"white", border:"none", padding:"16px 32px", fontSize:12, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", cursor: loading ? "not-allowed" : "pointer", transition:"background 0.2s", marginTop:4 }}
              >
                {loading ? "Sending..." : "Subscribe — It's Free →"}
              </button>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", letterSpacing:"0.05em" }}>
                No spam. Unsubscribe any time.
              </div>
            </div>
          </div>
        )}
      </div>

      <footer style={{ borderTop:"1px solid rgba(255,255,255,0.08)", padding:"20px 40px", textAlign:"center" }}>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.25)", letterSpacing:"0.05em" }}>© 2026 Ethos & Statute</div>
      </footer>
    </main>
  )
}