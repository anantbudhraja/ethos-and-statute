import Link from "next/link";

const articles = [
  {
    id: 1,
    tag: "IP & Technology",
    title: "Generative AI and Copyright: The Courtroom Battles Shaping the Digital Commons",
    excerpt: "Courts across the world are being asked a question no legislature has yet answered: can a machine be an infringer?",
    author: "Kavya Iyer",
    readTime: "9 min",
    date: "Mar 9",
  },
  {
    id: 2,
    tag: "Family Law",
    title: "Divorce in the Digital Age: Data, Devices, and the Fight Over Evidence",
    excerpt: "WhatsApp chats, GPS logs, and social media — how electronic evidence is transforming matrimonial disputes.",
    author: "Anika Sharma",
    readTime: "6 min",
    date: "Mar 8",
  },
  {
    id: 3,
    tag: "Tax Law",
    title: "GST Litigation Surge: Why Half of India's Tax Disputes End in Court",
    excerpt: "A systemic audit of the adjudication process exposes structural gaps that keep the docket impossibly full.",
    author: "Nikhil Das",
    readTime: "11 min",
    date: "Mar 7",
  },
  {
    id: 4,
    tag: "Environmental Law",
    title: "The Green Bench Grows Teeth: NGT's Landmark Orders in 2025",
    excerpt: "The National Green Tribunal has issued more enforceable directives in the past year than in its previous five combined.",
    author: "Sonal Mehta",
    readTime: "8 min",
    date: "Mar 6",
  },
  {
    id: 5,
    tag: "Labour Law",
    title: "Gig Workers, No Safety Net: The Legal Vacuum That Tech Platforms Exploit",
    excerpt: "With four Labour Codes still unimplemented, millions of platform workers fall through the cracks of employment protection.",
    author: "Rohan Pillai",
    readTime: "7 min",
    date: "Mar 5",
  },
  {
    id: 6,
    tag: "Constitutional Law",
    title: "Article 21 at 75: From Mere Existence to a Life of Dignity",
    excerpt: "A retrospective on how the right to life has been stretched, tested, and fortified over seven decades of jurisprudence.",
    author: "Radhika Menon",
    readTime: "14 min",
    date: "Mar 4",
  },
];

const categories = [
  { num: "01", name: "Constitutional", count: "38 Articles" },
  { num: "02", name: "Corporate & Business", count: "52 Articles" },
  { num: "03", name: "Criminal Law", count: "44 Articles" },
  { num: "04", name: "IP & Technology", count: "29 Articles" },
  { num: "05", name: "Family & Civil", count: "33 Articles" },
  { num: "06", name: "International Law", count: "21 Articles" },
  { num: "07", name: "Tax & Revenue", count: "41 Articles" },
  { num: "08", name: "Environmental", count: "18 Articles" },
];

const mostRead = [
  { num: "01", title: "The Collapse of India's Legal Aid System", meta: "Constitutional · 14 min" },
  { num: "02", title: "PMLA at 20: A Shield Against Money Laundering or a Sword Against Dissent?", meta: "Criminal Law · 11 min" },
  { num: "03", title: "How the Consumer Protection Act 2019 Changed the Game for E-Commerce", meta: "Consumer Law · 8 min" },
  { num: "04", title: "Section 498A: Between Safeguard and Abuse", meta: "Family Law · 9 min" },
];

export default function Home() {
  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#f7f5f0", color: "#1a1a1a" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { text-decoration: none; color: inherit; }
        :root {
          --navy: #0d1b2a;
          --red: #c0392b;
          --red-light: #e74c3c;
          --white: #ffffff;
          --off-white: #f7f5f0;
          --light-gray: #e8e4dc;
          --mid-gray: #9a9590;
          --rule: rgba(13,27,42,0.12);
        }

        /* Ticker */
        .ticker-track { display:flex; white-space:nowrap; animation: ticker 35s linear infinite; }
        @keyframes ticker { from { transform:translateX(0); } to { transform:translateX(-50%); } }

        /* Cards */
        .article-card { transition: background 0.25s; position:relative; overflow:hidden; cursor:pointer; }
        .article-card::after { content:''; position:absolute; bottom:0; left:0; width:0; height:2px; background:var(--red); transition:width 0.3s ease; }
        .article-card:hover { background: var(--white) !important; }
        .article-card:hover::after { width:100%; }

        /* Cat cards */
        .cat-card { transition: background 0.2s; cursor:pointer; }
        .cat-card:hover { background: #162840 !important; }
        .cat-card:hover .cat-arrow { transform: translateX(6px); }
        .cat-arrow { transition: transform 0.2s; }

        /* Hero secondary */
        .hero-secondary { transition: background 0.2s; cursor:pointer; }
        .hero-secondary:hover { background: var(--light-gray) !important; }

        /* Sidebar items */
        .sidebar-item { cursor:pointer; }
        .sidebar-item:hover .sidebar-item-title { color: var(--red) !important; }

        /* Long read */
        .long-read { transition: box-shadow 0.3s; cursor:pointer; }
        .long-read:hover { box-shadow: 0 12px 48px rgba(13,27,42,0.1); }

        /* Nav links */
        .nav-link { display:flex; align-items:center; height:64px; padding:0 18px; font-size:12px; letter-spacing:0.1em; text-transform:uppercase; font-weight:500; color:var(--navy); border-bottom:2px solid transparent; transition:all 0.2s; }
        .nav-link:hover { color:var(--red); border-bottom-color:var(--red); }

        /* Newsletter input */
        .newsletter-input { flex:1; padding:14px 20px; font-family:'DM Sans',sans-serif; font-size:14px; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); color:white; outline:none; transition:background 0.2s; }
        .newsletter-input::placeholder { color:rgba(255,255,255,0.5); }
        .newsletter-input:focus { background:rgba(255,255,255,0.25); }
      `}</style>

      {/* Ticker */}
      <div style={{ background:"#0d1b2a", color:"white", fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:500, overflow:"hidden", height:34, display:"flex", alignItems:"center" }}>
        <div className="ticker-track">
          {["Supreme Court Upholds Digital Privacy Rights","SEBI Introduces New Insider Trading Framework","International Arbitration: India's Rise as a Global Hub","New Labour Codes: What Employers Must Know","High Court Strikes Down Ambiguous Taxation Clause","AI & The Law: Who Owns the Output?"].map((t,i) => (
            <span key={i} style={{ padding:"0 40px" }}>{t} <span style={{ color:"#c0392b", padding:"0 8px" }}>◆</span></span>
          ))}
          {["Supreme Court Upholds Digital Privacy Rights","SEBI Introduces New Insider Trading Framework","International Arbitration: India's Rise as a Global Hub"].map((t,i) => (
            <span key={`d${i}`} style={{ padding:"0 40px" }}>{t} <span style={{ color:"#c0392b", padding:"0 8px" }}>◆</span></span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ background:"white", borderBottom:"1px solid rgba(13,27,42,0.12)", position:"sticky", top:0, zIndex:100, padding:"0 40px", display:"flex", alignItems:"stretch", height:64 }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", fontFamily:"'Playfair Display',serif", fontWeight:900, fontSize:20, color:"#0d1b2a", letterSpacing:"-0.02em", paddingRight:40, borderRight:"1px solid rgba(13,27,42,0.12)", marginRight:32, whiteSpace:"nowrap" }}>
          Ethos <em style={{ fontStyle:"italic", color:"#c0392b", margin:"0 4px" }}>&</em> Statute
        </Link>
        <div style={{ display:"flex", alignItems:"center", flex:1 }}>
          {["Latest","Constitutional","Corporate","Criminal","IP & Tech","Opinion","Deep Reads"].map(item => (
            <a key={item} href="#" className="nav-link">{item}</a>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginLeft:"auto" }}>
          <button style={{ background:"#c0392b", color:"white", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", padding:"8px 20px", border:"none", cursor:"pointer" }}>
            Subscribe
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"82vh", borderBottom:"1px solid rgba(13,27,42,0.12)" }}>
        <div style={{ background:"#0d1b2a", padding:"64px 60px", display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", overflow:"hidden" }}>
          <div style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:"#e74c3c", fontWeight:500, display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ width:20, height:1, background:"#e74c3c", display:"inline-block" }}></span>
            Featured Story
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(44px,5.5vw,76px)", fontWeight:900, lineHeight:1.0, color:"white", letterSpacing:"-0.03em" }}>
            The <em style={{ fontStyle:"italic", color:"#e74c3c" }}>Right to Privacy</em> is not a Privilege — It&apos;s a Reckoning
          </h1>
          <p style={{ fontSize:15, color:"rgba(255,255,255,0.65)", lineHeight:1.7, maxWidth:440 }}>
            How a string of Supreme Court judgments over the last decade has quietly redefined the relationship between the state, surveillance, and the citizen.
          </p>
          <div style={{ display:"flex", alignItems:"center", gap:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#c0392b,#8e1a10)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Playfair Display',serif", fontSize:14, color:"white", fontWeight:700 }}>R</div>
              <div>
                <div style={{ fontSize:13, color:"white", fontWeight:600 }}>Radhika Menon</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>Senior Legal Correspondent</div>
              </div>
            </div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:"0.05em" }}>March 9, 2026 · 12 min read</div>
          </div>
          <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:12, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"white", borderBottom:"1px solid rgba(255,255,255,0.3)", paddingBottom:4, width:"fit-content" }}>
            Read the full analysis →
          </a>
        </div>
        <div style={{ display:"flex", flexDirection:"column", borderLeft:"1px solid rgba(13,27,42,0.12)" }}>
          {[
            { tag:"Corporate Law", title:"When Contracts Speak — and Courts Listen: The New Doctrine of Contextual Interpretation", author:"Arjun Sethi", time:"8 min" },
            { tag:"Criminal Law", title:"Bail or Jail? How India's Pre-Trial Detention Crisis is Rewriting Justice", author:"Priya Nair", time:"10 min" },
            { tag:"International Law", title:"The Investor-State Dispute That Could Change How Nations Sign Treaties", author:"Vikram Bose", time:"7 min" },
          ].map((s, i) => (
            <div key={i} className="hero-secondary" style={{ flex:1, padding:"40px 48px", borderBottom:"1px solid rgba(13,27,42,0.12)", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
              <div style={{ fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600, color:"#c0392b", marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ width:12, height:2, background:"#c0392b", display:"inline-block" }}></span>{s.tag}
              </div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(18px,2vw,26px)", fontWeight:700, lineHeight:1.25, color:"#0d1b2a", letterSpacing:"-0.02em", marginBottom:12 }}>{s.title}</div>
              <div style={{ fontSize:11, color:"#9a9590", letterSpacing:"0.05em", textTransform:"uppercase" }}>By <strong style={{ color:"#0d1b2a" }}>{s.author}</strong> · {s.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section style={{ padding:"72px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 40px" }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:16, marginBottom:32, paddingBottom:12, borderBottom:"2px solid #0d1b2a" }}>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:"0.08em", color:"#0d1b2a" }}>Latest Articles</span>
            <span style={{ fontSize:11, color:"#9a9590", letterSpacing:"0.1em", textTransform:"uppercase" }}>— 142 stories this month</span>
            <a href="#" style={{ marginLeft:"auto", fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600, color:"#c0392b" }}>All stories →</a>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", border:"1px solid rgba(13,27,42,0.12)" }}>
            {articles.map((a, i) => (
              <div key={a.id} className="article-card" style={{ padding:32, borderRight: i % 3 !== 2 ? "1px solid rgba(13,27,42,0.12)" : "none", borderBottom:"1px solid rgba(13,27,42,0.12)", display:"flex", flexDirection:"column", gap:16, background:"#f7f5f0" }}>
                <div style={{ fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600, color:"#c0392b" }}>{a.tag}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, lineHeight:1.3, color:"#0d1b2a", letterSpacing:"-0.01em", flex:1 }}>{a.title}</div>
                <div style={{ fontSize:13, color:"#9a9590", lineHeight:1.65 }}>{a.excerpt}</div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", fontSize:11, color:"#9a9590", letterSpacing:"0.05em", textTransform:"uppercase", borderTop:"1px solid rgba(13,27,42,0.12)", paddingTop:16, marginTop:"auto" }}>
                  <span><strong style={{ color:"#0d1b2a", fontWeight:600 }}>{a.author}</strong></span>
                  <span>⏱ {a.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Read */}
      <section style={{ padding:"72px 0", background:"white" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 40px" }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:16, marginBottom:32, paddingBottom:12, borderBottom:"2px solid #0d1b2a" }}>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:"0.08em", color:"#0d1b2a" }}>Deep Read</span>
            <span style={{ fontSize:11, color:"#9a9590", letterSpacing:"0.1em", textTransform:"uppercase" }}>— Editor&apos;s Pick</span>
          </div>
          <div className="long-read" style={{ display:"grid", gridTemplateColumns:"1fr 380px", border:"1px solid rgba(13,27,42,0.12)", overflow:"hidden" }}>
            <div style={{ padding:56, display:"flex", flexDirection:"column", gap:24, justifyContent:"center" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#c0392b", color:"white", fontSize:10, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", padding:"5px 12px", width:"fit-content" }}>
                Long Read ◆ 24 min
              </div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,3vw,44px)", fontWeight:900, lineHeight:1.1, color:"#0d1b2a", letterSpacing:"-0.03em" }}>
                India&apos;s Arbitration <em style={{ fontStyle:"italic", color:"#c0392b" }}>Crossroads:</em> Global Ambition vs. Ground Reality
              </h2>
              <p style={{ fontSize:15, color:"#555", lineHeight:1.75, maxWidth:480 }}>
                India wants to be the arbitration capital of Asia. It has the statutes, the institutions, and the political will. What it lacks — and why — is the story of modern legal reform at its most revealing.
              </p>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", fontSize:11, color:"#9a9590", textTransform:"uppercase", letterSpacing:"0.05em" }}>
                <span><strong style={{ color:"#0d1b2a" }}>Vikram Bose</strong> · Analysis · March 2026</span>
                <a href="#" style={{ fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600, color:"#c0392b" }}>Read →</a>
              </div>
            </div>
            <div style={{ background:"#0d1b2a", padding:"56px 40px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", marginBottom:8 }}>Cases filed in 2025</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:64, color:"white", lineHeight:1 }}>42<span style={{ fontSize:28, color:"#e74c3c" }}>K+</span></div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.6, marginTop:4 }}>Arbitration filings up 38% from 2023.</div>
              </div>
              <div style={{ width:40, height:1, background:"rgba(255,255,255,0.15)" }}></div>
              <div>
                <div style={{ fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", marginBottom:8 }}>Average resolution time</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:64, color:"white", lineHeight:1 }}>18<span style={{ fontSize:28, color:"#e74c3c" }}>mo</span></div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.6, marginTop:4 }}>Against a global benchmark of 12 months.</div>
              </div>
              <div style={{ width:40, height:1, background:"rgba(255,255,255,0.15)" }}></div>
              <div>
                <div style={{ fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", marginBottom:4 }}>Written by</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:"white", fontWeight:700 }}>Vikram Bose</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>International Disputes Correspondent</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ background:"#0d1b2a", padding:"56px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 40px" }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:16, marginBottom:32, paddingBottom:12, borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:"0.08em", color:"white" }}>Browse by Area of Law</span>
            <a href="#" style={{ marginLeft:"auto", fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600, color:"rgba(255,255,255,0.4)" }}>All categories →</a>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"rgba(255,255,255,0.08)" }}>
            {categories.map((c) => (
              <div key={c.num} className="cat-card" style={{ background:"#0d1b2a", padding:"40px 32px", position:"relative", overflow:"hidden" }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:56, color:"rgba(255,255,255,0.06)", lineHeight:1, position:"absolute", top:16, right:20, letterSpacing:"0.02em" }}>{c.num}</span>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"white", marginBottom:8, letterSpacing:"-0.01em" }}>{c.name}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", letterSpacing:"0.1em", textTransform:"uppercase" }}>{c.count}</div>
                <div className="cat-arrow" style={{ position:"absolute", bottom:32, right:28, fontSize:20, color:"rgba(255,255,255,0.2)" }}>→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opinion + Most Read */}
      <section style={{ padding:"72px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 40px" }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:16, marginBottom:32, paddingBottom:12, borderBottom:"2px solid #0d1b2a" }}>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, letterSpacing:"0.08em", color:"#0d1b2a" }}>Opinion</span>
            <span style={{ fontSize:11, color:"#9a9590", letterSpacing:"0.1em", textTransform:"uppercase" }}>— Perspectives from the Bar</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", border:"1px solid rgba(13,27,42,0.12)" }}>
            <div style={{ padding:48, borderRight:"1px solid rgba(13,27,42,0.12)" }}>
              <div style={{ fontSize:10, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600, color:"#c0392b", marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ width:12, height:2, background:"#c0392b", display:"inline-block" }}></span>Viewpoint
              </div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(22px,2.5vw,34px)", fontWeight:900, color:"#0d1b2a", lineHeight:1.15, letterSpacing:"-0.02em", margin:"12px 0" }}>
                Why India&apos;s Sedition Law Needs More Than an Amendment — It Needs Abolition
              </h3>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(18px,2vw,26px)", fontWeight:700, fontStyle:"italic", lineHeight:1.35, color:"#0d1b2a", letterSpacing:"-0.02em", margin:"24px 0", padding:"24px 0", borderTop:"2px solid #0d1b2a", borderBottom:"1px solid rgba(13,27,42,0.12)" }}>
                &ldquo;A law born in colonial fear cannot be rehabilitated with democratic good intentions. It must be buried, not reformed.&rdquo;
              </div>
              <p style={{ fontSize:14, color:"#555", lineHeight:1.8, marginBottom:20 }}>
                Section 124A of the IPC — now repackaged under the BNS — continues to be wielded against journalists, activists, and dissenters. The author argues that any version of the offence, however amended, carries the same structural risk to free expression.
              </p>
              <a href="#" style={{ fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600, color:"#c0392b" }}>Read →</a>
            </div>
            <div style={{ padding:"48px 36px", background:"#f7f5f0", display:"flex", flexDirection:"column", gap:32 }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:"0.1em", color:"#0d1b2a", paddingBottom:12, borderBottom:"2px solid #0d1b2a" }}>Most Read This Week</div>
              {mostRead.map((item) => (
                <div key={item.num} className="sidebar-item" style={{ paddingBottom:20, borderBottom:"1px solid rgba(13,27,42,0.12)" }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:"#e8e4dc", lineHeight:1, marginBottom:4 }}>{item.num}</div>
                  <div className="sidebar-item-title" style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:700, color:"#0d1b2a", lineHeight:1.35, marginBottom:4 }}>{item.title}</div>
                  <div style={{ fontSize:11, color:"#9a9590", textTransform:"uppercase", letterSpacing:"0.08em" }}>{item.meta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background:"#c0392b", padding:"80px 0", overflow:"hidden", position:"relative" }}>
        <div style={{ position:"absolute", fontFamily:"'Bebas Neue',sans-serif", fontSize:200, color:"rgba(255,255,255,0.05)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", whiteSpace:"nowrap", letterSpacing:"0.05em", pointerEvents:"none" }}>SUBSCRIBE</div>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 40px", display:"flex", alignItems:"center", gap:80, position:"relative", zIndex:1 }}>
          <div style={{ flex:1 }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,3.5vw,44px)", fontWeight:900, color:"white", lineHeight:1.15, letterSpacing:"-0.03em", marginBottom:12 }}>
              Law is too important<br/>to leave to <em style={{ fontStyle:"italic" }}>lawyers alone.</em>
            </h2>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.75)", lineHeight:1.65, maxWidth:360 }}>
              Join 24,000+ readers who get sharp, accessible legal analysis in their inbox every Tuesday and Friday.
            </p>
          </div>
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"flex" }}>
              <input className="newsletter-input" type="text" placeholder="Your name" style={{ borderRight:"none" }} />
              <input className="newsletter-input" type="email" placeholder="Your email address" />
              <button style={{ background:"#0d1b2a", color:"white", border:"none", padding:"14px 28px", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer", whiteSpace:"nowrap" }}>
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
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:900, color:"white", letterSpacing:"-0.02em", marginBottom:16 }}>
                Ethos <em style={{ fontStyle:"italic", color:"#e74c3c" }}>&</em> Statute
              </div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", lineHeight:1.7, maxWidth:260, marginBottom:28 }}>
                India&apos;s sharpest legal journalism. Analysis, opinion and deep reporting on law, courts, and justice — for everyone.
              </div>
              <div style={{ display:"flex", gap:10 }}>
                {["X","in","YT","IG"].map(s => (
                  <a key={s} href="#" style={{ width:32, height:32, border:"1px solid rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"rgba(255,255,255,0.5)", fontWeight:700, letterSpacing:"0.05em" }}>{s}</a>
                ))}
              </div>
            </div>
            {[
              { title:"Coverage", links:["Constitutional Law","Corporate & Business","Criminal Law","IP & Technology","Family & Civil","International Law","Tax & Revenue","Environmental"] },
              { title:"Sections", links:["Latest Stories","Deep Reads","Opinion","Case Watch","Legislation Tracker","The Glossary","Podcast"] },
              { title:"About", links:["Our Mission","The Team","Write for Us","Advertise","Contact","Privacy Policy","Terms of Use"] },
            ].map(col => (
              <div key={col.title} style={{ padding:"56px 0 56px 48px", borderRight:"1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:20, paddingBottom:10, borderBottom:"1px solid rgba(255,255,255,0.06)" }}>{col.title}</div>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize:13, color:"rgba(255,255,255,0.55)", display:"flex", alignItems:"center", gap:6 }}><span style={{ fontSize:10, color:"rgba(255,255,255,0.2)" }}>—</span>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 0", fontSize:11, color:"rgba(255,255,255,0.25)", letterSpacing:"0.05em" }}>
            <span>© 2026 Ethos & Statute. All rights reserved.</span>
            <span>Crafted with conviction.</span>
          </div>
        </div>
      </footer>

    </main>
  );
}
