'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Contact() {
  const [formData, setFormData] = useState({ name:'', email:'', subject:'', message:'' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <main style={{ fontFamily:"'DM Sans',sans-serif", background:"#f7f5f0", color:"#1a1a1a", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        a { text-decoration:none; color:inherit; }
        .nav-link { display:flex; align-items:center; height:64px; padding:0 18px; font-size:12px; letter-spacing:0.1em; text-transform:uppercase; font-weight:500; color:#0d1b2a; border-bottom:2px solid transparent; transition:all 0.2s; }
        .nav-link:hover { color:#c0392b; border-bottom-color:#c0392b; }
        .form-input { width:100%; padding:14px 18px; font-family:'DM Sans',sans-serif; font-size:14px; background:white; border:1px solid rgba(13,27,42,0.15); color:#1a1a1a; outline:none; transition:border 0.2s; }
        .form-input:focus { border-color:#c0392b; }
        .form-input::placeholder { color:#9a9590; }
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
          <Link href="/subscribe" style={{ background:"#c0392b", color:"white", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", padding:"8px 20px" }}>
            Subscribe
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div style={{ background:"#0d1b2a", padding:"100px 40px" }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <div style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:"#e74c3c", fontWeight:500, display:"flex", alignItems:"center", gap:8, marginBottom:24 }}>
            <span style={{ width:20, height:1, background:"#e74c3c", display:"inline-block" }}></span>
            Contact Us
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(40px,5vw,64px)", fontWeight:900, lineHeight:1.05, color:"white", letterSpacing:"-0.03em", marginBottom:16 }}>
            Let&apos;s start a <em style={{ color:"#e74c3c", fontStyle:"italic" }}>conversation.</em>
          </h1>
          <p style={{ fontSize:18, color:"rgba(255,255,255,0.6)", lineHeight:1.8 }}>
            Whether you want to write for us, report an error, pitch a story, or just say hello — we read every message.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"80px 40px", display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:64 }}>

        {/* Left Info */}
        <div style={{ display:"flex", flexDirection:"column", gap:40 }}>
          {[
            { title:"Write for Us", desc:"Have a legal story worth telling? We welcome contributions from lawyers, academics and journalists.", link:"Pitch a story →" },
            { title:"Report an Error", desc:"Spotted something factually incorrect? We take accuracy seriously and will correct it promptly.", link:"Flag an error →" },
            { title:"General Enquiries", desc:"For everything else — partnerships, feedback, or just a conversation about the law.", link:"Say hello →" },
          ].map(item => (
            <div key={item.title} style={{ paddingBottom:32, borderBottom:"1px solid rgba(13,27,42,0.12)" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"#0d1b2a", marginBottom:8 }}>{item.title}</div>
              <div style={{ fontSize:14, color:"#9a9590", lineHeight:1.7, marginBottom:10 }}>{item.desc}</div>
              <div style={{ fontSize:12, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"#c0392b" }}>{item.link}</div>
            </div>
          ))}

          <div>
            <div style={{ fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", color:"#9a9590", marginBottom:12 }}>Follow Us</div>
            <div style={{ display:"flex", gap:10 }}>
              {["X","in","YT","IG"].map(s => (
                <a key={s} href="#" style={{ width:36, height:36, border:"1px solid rgba(13,27,42,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"#0d1b2a", fontWeight:700, transition:"all 0.2s" }}>{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div>
          {submitted ? (
            <div style={{ background:"white", padding:64, textAlign:"center", border:"1px solid rgba(13,27,42,0.08)" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>✓</div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:900, color:"#0d1b2a", marginBottom:12 }}>Message Received</h2>
              <p style={{ fontSize:15, color:"#9a9590", lineHeight:1.7, marginBottom:32 }}>Thank you for reaching out. We&apos;ll get back to you within 2 working days.</p>
              <button onClick={() => { setSubmitted(false); setFormData({ name:'', email:'', subject:'', message:'' }) }} style={{ background:"#c0392b", color:"white", border:"none", padding:"12px 28px", fontSize:12, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer" }}>
                Send Another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background:"white", padding:48, border:"1px solid rgba(13,27,42,0.08)", display:"flex", flexDirection:"column", gap:20 }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:"0.08em", color:"#0d1b2a", paddingBottom:16, borderBottom:"2px solid #0d1b2a" }}>Send us a message</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                <div>
                  <label style={{ fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", color:"#9a9590", display:"block", marginBottom:6 }}>Your Name *</label>
                  <input required className="form-input" type="text" placeholder="Full name" value={formData.name} onChange={e => setFormData({...formData, name:e.target.value})} />
                </div>
                <div>
                  <label style={{ fontSize:11, letterSpacing