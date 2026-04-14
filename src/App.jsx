import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════
   "THE JOURNAL" — Beyond Disintegration
   ───────────────────────────────────────────────────────────────────
   Market Research Finding: 100% of medical charities use cold blue/
   dark/teal. Nobody uses warm editorial aesthetics. This concept
   deliberately occupies that empty space: warm cream parchment,
   terracotta urgency, forest green hope — like a compassionate
   medical journal brought to life.

   Palette: Cream #F4EFE6 · Ink #1A1108 · Terracotta #C4472A
            Forest #2D5A3D · Amber #D4843C · Sand #E8E0D0

   Fonts: Fraunces (optical display serif — rare, distinguished)
          Plus Jakarta Sans (warm humanist UI)
          Lora (academic body serif)
═══════════════════════════════════════════════════════════════════ */

const T = {
  cream:      "#F4EFE6",
  sand:       "#E8E0D0",
  panel:      "#EDE7DA",
  border:     "#C8BBA3",
  borderLight:"#DDD5C2",
  ink:        "#1A1108",
  inkMid:     "#3D2E1E",
  inkLight:   "#6B5340",
  red:        "#C4472A",
  redDark:    "#A33820",
  redPale:    "rgba(196,71,42,0.08)",
  redGlow:    "rgba(196,71,42,0.18)",
  green:      "#2D5A3D",
  greenLight: "#3D7A52",
  greenPale:  "rgba(45,90,61,0.08)",
  amber:      "#D4843C",
  amberPale:  "rgba(212,132,60,0.12)",
  white:      "#FDFAF4",
};

/* ─── Google Fonts + Global CSS ─────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,500&family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Lora', Georgia, serif;
    background: ${T.cream};
    color: ${T.inkMid};
    line-height: 1.75;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .fraunces { font-family: 'Fraunces', Georgia, serif; }
  .jakarta  { font-family: 'Plus Jakarta Sans', sans-serif; }
  .lora     { font-family: 'Lora', Georgia, serif; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${T.sand}; }
  ::-webkit-scrollbar-thumb { background: ${T.red}; border-radius: 3px; }

  /* Focus */
  :focus-visible { outline: 2px solid ${T.red}; outline-offset: 3px; border-radius: 2px; }

  /* Keyframes */
  @keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes spin     { to   { transform:rotate(360deg); } }
  @keyframes drawLine { from { width:0; } to { width:100%; } }
  @keyframes floatUp  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes pulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(.96)} }

  .fu  { animation: fadeUp .65s ease both; }
  .fu2 { animation: fadeUp .65s .12s ease both; }
  .fu3 { animation: fadeUp .65s .24s ease both; }
  .fu4 { animation: fadeUp .65s .36s ease both; }
  .pi  { animation: fadeIn .35s ease; }

  /* Inputs */
  input, textarea, select {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: ${T.white};
    border: 1.5px solid ${T.border};
    color: ${T.ink};
    border-radius: 4px;
    padding: 11px 15px;
    font-size: .94rem;
    width: 100%;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  input:focus, textarea:focus, select:focus {
    border-color: ${T.red};
    box-shadow: 0 0 0 3px ${T.redPale};
  }
  input::placeholder, textarea::placeholder { color: ${T.inkLight}; opacity:.55; }
  textarea { resize: vertical; min-height: 130px; }
  input[type="checkbox"] {
    width: 16px; height: 16px;
    accent-color: ${T.red};
    cursor: pointer; flex-shrink: 0;
  }
  select option { background: ${T.white}; color: ${T.ink}; }

  /* Card */
  .card {
    background: ${T.white};
    border: 1.5px solid ${T.border};
    border-radius: 6px;
    transition: border-color .3s, box-shadow .3s, transform .3s;
  }
  .card:hover {
    border-color: ${T.red};
    box-shadow: 4px 4px 0 ${T.red};
    transform: translate(-2px,-2px);
  }

  /* Green card variant */
  .card-green:hover {
    border-color: ${T.green};
    box-shadow: 4px 4px 0 ${T.green};
  }

  /* Rule line accent */
  .rule-red { width:56px; height:3px; background:${T.red}; margin-bottom:20px; }
  .rule-green { width:56px; height:3px; background:${T.green}; margin-bottom:20px; }

  /* Nav underline hover */
  .nav-btn {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: .78rem; font-weight: 600;
    letter-spacing: .05em; text-transform: uppercase;
    color: ${T.inkLight}; background: none; border: none;
    cursor: pointer; padding: 4px 0; position: relative;
    transition: color .2s;
  }
  .nav-btn::after {
    content:''; position:absolute; bottom:-2px; left:0;
    width:0; height:2px; background:${T.red};
    transition: width .25s;
  }
  .nav-btn:hover { color: ${T.ink}; }
  .nav-btn:hover::after { width:100%; }

  /* Responsive */
  @media (max-width: 960px) {
    .hide-mob { display:none!important; }
    .show-mob { display:flex!important; }
    .col-2    { grid-template-columns:1fr!important; }
    .col-3    { grid-template-columns:1fr 1fr!important; }
    .col-4    { grid-template-columns:1fr 1fr!important; }
  }
  @media (max-width: 600px) {
    .col-3   { grid-template-columns:1fr!important; }
    .col-4   { grid-template-columns:1fr!important; }
    .mob-col { flex-direction:column!important; }
    .mob-hide{ display:none!important; }
    .two-col-quotes { columns:1!important; }
  }
`;

/* ─── Animated counter ──────────────────────────────────────────── */
const Counter = ({ to, prefix = "", suffix = "", dur = 1800 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const t0 = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - t0) / dur, 1);
          setVal(Math.floor((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        tick();
      }
    }, { threshold: .5 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [to, dur]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
};

/* ─── Shared Design Atoms ───────────────────────────────────────── */
const Eyebrow = ({ children, color = T.red }) => (
  <div className="jakarta" style={{
    fontSize: ".66rem", letterSpacing: ".22em", textTransform: "uppercase",
    color, fontWeight: 700, marginBottom: 12,
    display: "flex", alignItems: "center", gap: 10,
  }}>
    <span style={{ width: 20, height: 2, background: color, display: "block", flexShrink: 0 }} />
    {children}
  </div>
);

const Headline = ({ children, size = "lg", style = {} }) => {
  const sizes = { xl:"clamp(3.2rem,7vw,6rem)", lg:"clamp(2rem,4vw,3.5rem)", md:"clamp(1.6rem,3vw,2.5rem)", sm:"clamp(1.3rem,2.5vw,1.8rem)" };
  return (
    <h2 className="fraunces" style={{
      fontSize: sizes[size], fontWeight: 400, color: T.ink,
      lineHeight: 1.1, marginBottom: 20, ...style,
    }}>{children}</h2>
  );
};

const BodyText = ({ children, style = {} }) => (
  <p className="lora" style={{ fontSize: ".97rem", color: T.inkLight, lineHeight: 1.85, fontWeight: 400, ...style }}>{children}</p>
);

/* Primary button — red fill */
const BtnRed = ({ children, onClick, full = false, style = {} }) => {
  const [h, sh] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)}
      style={{
        background: h ? T.redDark : T.red, color: T.white,
        border: `2px solid ${T.red}`, borderRadius: 4,
        padding: "12px 30px", fontFamily: "'Plus Jakarta Sans',sans-serif",
        fontWeight: 700, fontSize: ".83rem", letterSpacing: ".06em",
        textTransform: "uppercase", cursor: "pointer", transition: "all .22s",
        transform: h ? "translate(-2px,-2px)" : "none",
        boxShadow: h ? `4px 4px 0 ${T.redDark}` : "none",
        width: full ? "100%" : "auto", ...style,
      }}
    >{children}</button>
  );
};

/* Outline button — ink border */
const BtnOutline = ({ children, onClick, color = T.ink, style = {} }) => {
  const [h, sh] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)}
      style={{
        background: h ? T.ink : "transparent", color: h ? T.white : color,
        border: `2px solid ${color}`, borderRadius: 4,
        padding: "12px 30px", fontFamily: "'Plus Jakarta Sans',sans-serif",
        fontWeight: 600, fontSize: ".83rem", letterSpacing: ".06em",
        textTransform: "uppercase", cursor: "pointer", transition: "all .22s",
        transform: h ? "translate(-2px,-2px)" : "none",
        boxShadow: h ? `4px 4px 0 ${T.ink}` : "none", ...style,
      }}
    >{children}</button>
  );
};

/* Green button */
const BtnGreen = ({ children, onClick, style = {} }) => {
  const [h, sh] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)}
      style={{
        background: h ? T.greenLight : T.green, color: T.white,
        border: `2px solid ${T.green}`, borderRadius: 4,
        padding: "12px 30px", fontFamily: "'Plus Jakarta Sans',sans-serif",
        fontWeight: 700, fontSize: ".83rem", letterSpacing: ".06em",
        textTransform: "uppercase", cursor: "pointer", transition: "all .22s",
        transform: h ? "translate(-2px,-2px)" : "none",
        boxShadow: h ? `4px 4px 0 ${T.green}` : "none", ...style,
      }}
    >{children}</button>
  );
};

/* Decorative circle (signature visual element) */
const Circle = ({ size = 200, color = T.red, opacity = .12, style = {} }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    border: `2px solid ${color}`, opacity, position: "absolute",
    pointerEvents: "none", ...style,
  }} />
);

/* Page Hero (inner pages) */
const PageHero = ({ vol, eyebrow, title, subtitle }) => (
  <div style={{
    background: T.ink, padding: "120px 0 64px",
    position: "relative", overflow: "hidden",
  }}>
    <Circle size={380} color={T.red} opacity={.18} style={{ top: -100, right: -80 }} />
    <Circle size={200} color={T.amber} opacity={.12} style={{ bottom: -60, left: "30%" }} />
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
      {vol && (
        <div className="jakarta" style={{
          fontSize: ".68rem", letterSpacing: ".2em", textTransform: "uppercase",
          color: T.amber, marginBottom: 16, display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ width: 24, height: 2, background: T.amber, display: "block" }} />
          {vol}
        </div>
      )}
      <Eyebrow color={T.red}>{eyebrow}</Eyebrow>
      <h1 className="fraunces fu" style={{
        fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 400,
        color: T.white, lineHeight: 1.08, maxWidth: 720, marginBottom: 18,
      }}>{title}</h1>
      {subtitle && <p className="lora" style={{ color: "rgba(253,250,244,.6)", fontSize: "1.05rem", fontWeight: 400, maxWidth: 520, lineHeight: 1.75 }}>{subtitle}</p>}
    </div>
  </div>
);

/* ─── Navigation ────────────────────────────────────────────────── */
const NAV = [
  { l:"About",     p:"about"    },
  { l:"Who We Are",p:"who"      },
  { l:"Research",  p:"research" },
  { l:"Stories",   p:"stories"  },
  { l:"Involved",  p:"involve"  },
  { l:"Community", p:"community"},
  { l:"Contact",   p:"contact"  },
];

const Nav = ({ navigate, openDonate, scrolled }) => {
  const [mob, setMob] = useState(false);
  const bg = scrolled ? T.white : "rgba(253,250,244,.95)";
  return (
    <>
      <style>{`@media(max-width:960px){.show-mob{display:flex!important}}`}</style>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: bg, backdropFilter: "blur(12px)",
        borderBottom: `1.5px solid ${scrolled ? T.border : T.borderLight}`,
        transition: "all .3s",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 64,
        }}>
          {/* Logo */}
          <button onClick={() => navigate("home")} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 10, padding: 0,
          }}>
            <div style={{
              width: 34, height: 34, background: T.red, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <div style={{
                width: 14, height: 14, border: `2px solid ${T.white}`,
                borderRadius: "50%", position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: 5, height: 5, background: T.white, borderRadius: "50%",
                }} />
              </div>
            </div>
            <div>
              <div className="fraunces" style={{ fontSize: ".95rem", fontWeight: 500, color: T.ink, lineHeight: 1.15 }}>
                Beyond <em style={{ fontStyle: "italic" }}>Disintegration</em>
              </div>
              <div className="jakarta" style={{ fontSize: ".6rem", letterSpacing: ".14em", textTransform: "uppercase", color: T.inkLight }}>
                Medical Research Charity
              </div>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hide-mob" style={{ display: "flex", alignItems: "center", gap: 26 }}>
            {NAV.map(i => <button key={i.p} className="nav-btn" onClick={() => navigate(i.p)}>{i.l}</button>)}
            <button onClick={openDonate}
              onMouseEnter={e => { e.currentTarget.style.background = T.redDark; e.currentTarget.style.transform = "translate(-2px,-2px)"; e.currentTarget.style.boxShadow = `3px 3px 0 ${T.redDark}`; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.red; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              style={{
                background: T.red, color: T.white, border: `2px solid ${T.red}`,
                borderRadius: 4, padding: "8px 20px", fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontWeight: 700, fontSize: ".75rem", letterSpacing: ".06em",
                textTransform: "uppercase", cursor: "pointer", transition: "all .22s",
              }}
            >Donate</button>
          </div>

          {/* Hamburger */}
          <button className="show-mob" onClick={() => setMob(o => !o)}
            style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 }}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 2.5,
                background: i === 1 && mob ? "transparent" : T.ink,
                borderRadius: 2, transition: "all .3s",
                transform: mob ? (i===0?"rotate(45deg) translate(5px,5px)":i===2?"rotate(-45deg) translate(5px,-5px)":"none") : "none",
              }} />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {mob && (
          <div style={{ background: T.white, borderTop: `1.5px solid ${T.border}`, padding: "18px 24px 24px" }}>
            {[...NAV, { l: "Donate", p: "donate" }].map(i => (
              <button key={i.p} onClick={() => { navigate(i.p); setMob(false); }}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  background: "none", border: "none",
                  borderBottom: `1.5px solid ${T.borderLight}`,
                  padding: "12px 0", fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: ".93rem", color: T.inkMid, cursor: "pointer",
                }}
              >{i.l}</button>
            ))}
            <button onClick={() => { openDonate(); setMob(false); }}
              style={{
                width: "100%", marginTop: 14, background: T.red, color: T.white,
                border: "2px solid transparent", borderRadius: 4, padding: 13,
                fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700,
                fontSize: ".86rem", letterSpacing: ".06em", textTransform: "uppercase", cursor: "pointer",
              }}
            >Donate Now</button>
          </div>
        )}
      </nav>
    </>
  );
};

/* ─── HOME PAGE ─────────────────────────────────────────────────── */
const Home = ({ navigate, openDonate }) => {
  const raised = 87400, goal = 250000, pct = Math.round(raised/goal*100);
  return (
    <div className="pi">

      {/* ── EDITORIAL HERO ── */}
      <section style={{
        minHeight: "100vh", background: T.cream,
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "center",
        paddingTop: 64,
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: "8%", right: "4%", width: 420, height: 420, borderRadius: "50%", background: T.red, opacity: .07 }} />
        <div style={{ position: "absolute", top: "15%", right: "8%", width: 280, height: 280, borderRadius: "50%", border: `2px solid ${T.red}`, opacity: .15 }} />
        <div style={{ position: "absolute", bottom: "10%", left: "2%", width: 160, height: 160, borderRadius: "50%", border: `2px solid ${T.green}`, opacity: .2 }} />

        {/* Grain overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: .4,
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 28px", position: "relative", zIndex: 2, width: "100%" }}>
          {/* Journal datestamp */}
          <div className="jakarta fu" style={{
            display: "flex", alignItems: "center", gap: 16,
            fontSize: ".7rem", letterSpacing: ".18em", textTransform: "uppercase",
            color: T.inkLight, marginBottom: 36,
          }}>
            <span style={{ width: 32, height: 1.5, background: T.border, display: "block" }} />
            <span>Founded 2025</span>
            <span style={{ width: 32, height: 1.5, background: T.border, display: "block" }} />
            <span style={{ color: T.red }}>England & Wales</span>
          </div>

          {/* Main headline */}
          <h1 className="fraunces fu2" style={{
            fontSize: "clamp(3.2rem,8vw,7rem)", fontWeight: 400,
            color: T.ink, lineHeight: 1.02, maxWidth: 900, marginBottom: 32,
          }}>
            When a child's world<br/>
            falls{" "}
            <em style={{ fontStyle: "italic", color: T.red }}>silent,</em>
            <br />
            <span style={{ fontSize: "70%", color: T.inkLight, fontWeight: 300 }}>
              we find the <em style={{ fontStyle: "italic", color: T.green }}>words.</em>
            </span>
          </h1>

          <div
  className="fu3 mx-auto"
  style={{ maxWidth: 580, marginBottom: 44, textAlign: "center" }}
>
  <div className="fu3" style={{ maxWidth: 580, marginBottom: 44, textAlign: "center" }}>
  <BodyText style={{ textAlign: "center" }}>
    Beyond Disintegration funds pioneering research into unexplained catastrophic
    developmental regression in children : one of medicine's most devastating
    and underrecognised crises. We exist because these children deserve answers.
  </BodyText>
</div>
</div>

          <div className="fu4" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 52 }}>
            <BtnRed onClick={() => navigate("about")}>Discover Our Mission</BtnRed>
            <BtnOutline onClick={openDonate} color={T.red}>Donate Now</BtnOutline>
            <BtnGreen onClick={() => navigate("involve")}>Get Involved</BtnGreen>
          </div>

          {/* Funding progress */}
          <div className="fu4" style={{
            background: T.white, border: `1.5px solid ${T.border}`,
            borderRadius: 6, padding: "24px 28px", maxWidth: 520,
          }}>
            <div className="jakarta" style={{
              display: "flex", justifyContent: "space-between",
              fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase",
              color: T.inkLight, marginBottom: 12,
            }}>
              <span>2025 Research Fund</span>
              <span style={{ color: T.red }}>£{(goal/1000).toFixed(0)}k target</span>
            </div>
            <div style={{ height: 6, background: T.sand, borderRadius: 3, overflow: "hidden", marginBottom: 10 }}>
              <div style={{
                height: "100%", width: `${pct}%`,
                background: `linear-gradient(90deg, ${T.red}, ${T.amber})`,
                borderRadius: 3, transition: "width 1.5s ease",
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className="fraunces" style={{ fontSize: "1.1rem", color: T.ink, fontWeight: 500 }}>
                £{(raised/1000).toFixed(1)}k raised
              </span>
              <span className="jakarta" style={{ fontSize: ".82rem", color: T.green, fontWeight: 700 }}>{pct}% of goal</span>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
          color: T.inkLight,
        }}>
          <div style={{ width: 1.5, height: 38, background: `linear-gradient(to bottom, ${T.red}, transparent)` }} />
          <span className="jakarta" style={{ fontSize: ".58rem", letterSpacing: ".2em", textTransform: "uppercase" }}>Scroll</span>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <div style={{ background: T.ink, padding: "0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 28px" }}>
          <div className="col-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
            {[
              { n: 5000, pre: "1 in ", suf: "", l: "Children affected globally" },
              { n: 70, pre: "", suf: "%", l: "Remain undiagnosed" },
              { n: 7000, pre: "", suf: "+", l: "Rare diseases, most unstudied" },
              { n: 3, pre: "~", suf: " yrs", l: "Average diagnostic wait" },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "32px 28px", textAlign: "center",
                borderRight: i < 3 ? `1px solid rgba(255,255,255,.08)` : "none",
              }}>
                <div className="fraunces" style={{ fontSize: "2.8rem", fontWeight: 500, color: T.white, lineHeight: 1, marginBottom: 10 }}>
                  <Counter to={s.n} prefix={s.pre} suffix={s.suf} />
                </div>
                <div className="jakarta" style={{ fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", color: "#fff", opacity: .85 }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT SPLIT ── */}
      <section style={{ padding: "96px 0", background: T.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
          <div className="col-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }}>
            {/* Left */}
            <div>
              <Eyebrow>The Condition</Eyebrow>
              <Headline>A child's world, erased : <em style={{ fontStyle:"italic", color:T.red }}>without warning</em></Headline>
              <BodyText style={{ marginBottom: 16 }}>
                Childhood developmental regression , encompassing Childhood Disintegrative Disorder,
                acquired epileptic aphasia, FIRES, and related conditions : describes devastating
                scenarios where previously typically-developing children experience rapid, severe loss
                of acquired skills.
              </BodyText>
              <BodyText style={{ marginBottom: 32 }}>
                Language. Motor control. Social awareness. Independence. In many cases, no clear
                cause is ever found : leaving families without answers, prognosis, or treatment.
                This is one of the most underfunded areas in paediatric medicine.
              </BodyText>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <BtnRed onClick={() => navigate("about")}>Read Our Mission</BtnRed>
                <BtnOutline onClick={() => navigate("research")} color={T.ink}>View Research</BtnOutline>
              </div>
            </div>

            {/* Right — feature cards */}
            <div>
              {[
                { n: "01", t: "Scientific Research", d: "Funding rigorous investigation into biomarkers, genetics, and neuroimmune mechanisms of childhood regression." },
                { n: "02", t: "Family Support", d: "Building community infrastructure so no family faces this journey without understanding, connection, and resource." },
                { n: "03", t: "Clinical Education", d: "Publishing and disseminating knowledge to close the critical awareness gap in paediatric medicine." },
                { n: "04", t: "Policy Advocacy", d: "Making the evidential case for dedicated NHS commissioning and sustained research investment." },
              ].map(c => (
                <div key={c.n} style={{
                  display: "flex", gap: 20, padding: "22px 0",
                  borderBottom: `1.5px solid ${T.borderLight}`,
                  alignItems: "flex-start",
                }}>
                  <span className="fraunces" style={{ fontSize: "1.4rem", color: T.red, opacity: .5, lineHeight: 1, flexShrink: 0, minWidth: 36 }}>{c.n}</span>
                  <div>
                    <div className="jakarta" style={{ fontSize: ".88rem", fontWeight: 700, color: T.ink, marginBottom: 5 }}>{c.t}</div>
                    <BodyText style={{ fontSize: ".85rem" }}>{c.d}</BodyText>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PULLQUOTE ── */}
      <section style={{ background: T.green, padding: "72px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 28px", textAlign: "center" }}>
          <div className="fraunces" style={{ fontSize: "6rem", color: T.white, lineHeight: 1, opacity: .25, marginBottom: -24 }}>&ldquo;</div>
          <blockquote className="fraunces" style={{
            fontSize: "clamp(1.4rem,2.8vw,2.1rem)", fontWeight: 400,
            color: T.white, lineHeight: 1.55, fontStyle: "italic", marginBottom: 32,
          }}>
            He was four years old and could recite entire books from memory. Over six weeks, the words stopped. He stopped recognising me. Watching your child disappear while they are still in front of you is a specific kind of grief that has no name.
          </blockquote>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              border: "2px solid rgba(253,250,244,.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Fraunces',serif", fontSize: "1rem", color: T.white, flexShrink: 0,
            }}>HW</div>
            <div style={{ textAlign: "left" }}>
              <div className="jakarta" style={{ color: T.white, fontWeight: 700, fontSize: ".88rem" }}>Dr. Helena W.</div>
              <div className="jakarta" style={{ color: "rgba(253,250,244,.55)", fontSize: ".75rem" }}>Mother of Marcus, 7 · London</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST UPDATES ── */}
      <section style={{ padding: "88px 0", background: T.panel }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 18,
            borderBottom: `2px solid ${T.ink}`, paddingBottom: 16,
          }}>
            <div>
              <Eyebrow>Latest Dispatches</Eyebrow>
              <Headline size="md" style={{ marginBottom: 0 }}>News & Research</Headline>
            </div>
            <BtnOutline onClick={() => navigate("research")} color={T.ink} style={{ padding: "9px 20px", fontSize: ".76rem" }}>
              All Publications →
            </BtnOutline>
          </div>

          <div className="col-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { tag:"Research", date:"April 2025", title:"Biomarker Study Opens Early Detection Pathway", body:"A multi-centre study identifies neuroimmune markers with high specificity for autoimmune aetiology in childhood regression , a potential breakthrough in early diagnosis." },
              { tag:"Publication", date:"March 2025", title:"The Lancet Calls for Systematic Classification", body:"Landmark article proposing a unified diagnostic framework, drawing on 847 paediatric cases across 12 countries, drawing international medical attention." },
              { tag:"Charity", date:"Feb 2025", title:"Beyond Disintegration Officially Launches", body:"Our founding marks the beginning of a dedicated advocacy and research organisation. Our mission: no child should face this crisis without answers." },
            ].map((c, i) => (
              <article key={i} className="card" style={{ cursor: "pointer", overflow: "hidden" }} onClick={() => navigate("research")}>
                <div style={{ height: 4, background: i===0 ? T.red : i===1 ? T.green : T.amber }} />
                <div style={{ padding: "22px 22px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span className="jakarta" style={{ fontSize: ".63rem", letterSpacing: ".14em", textTransform: "uppercase", color: T.red, fontWeight: 700 }}>{c.tag}</span>
                    <span className="jakarta" style={{ fontSize: ".72rem", color: T.inkLight }}>{c.date}</span>
                  </div>
                  <h3 className="fraunces" style={{ fontSize: "1.1rem", color: T.ink, marginBottom: 10, lineHeight: 1.3, fontWeight: 400 }}>{c.title}</h3>
                  <BodyText style={{ fontSize: ".84rem" }}>{c.body}</BodyText>
                </div>
                <div style={{ padding: "12px 22px", borderTop: `1.5px solid ${T.borderLight}` }}>
                  <span className="jakarta" style={{ fontSize: ".73rem", color: T.red, fontWeight: 700 }}>Read more →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: T.red, padding: "72px 0",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", border: "2px solid rgba(253,250,244,.15)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
          <div className="mob-col" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <div>
              <Headline style={{ color: T.white, marginBottom: 10 }}>
                Ready to be part of the <em style={{ fontStyle: "italic" }}>solution?</em>
              </Headline>
              <p className="lora" style={{ color: "rgba(253,250,244,.7)", fontSize: "1rem", fontWeight: 400, maxWidth: 440, lineHeight: 1.7 }}>
                Every contribution directly funds research, family support, and clinical education.
              </p>
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button onClick={openDonate}
                onMouseEnter={e => { e.currentTarget.style.background = T.white; e.currentTarget.style.color = T.red; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.white; }}
                style={{
                  background: "transparent", color: T.white,
                  border: "2px solid rgba(253,250,244,.6)", borderRadius: 4,
                  padding: "12px 30px", fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontWeight: 700, fontSize: ".83rem", letterSpacing: ".06em",
                  textTransform: "uppercase", cursor: "pointer", transition: "all .22s",
                }}
              >Donate Now</button>
              <button onClick={() => navigate("community")}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(253,250,244,.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                style={{
                  background: "transparent", color: T.white,
                  border: "2px solid rgba(253,250,244,.3)", borderRadius: 4,
                  padding: "12px 30px", fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontWeight: 600, fontSize: ".83rem", letterSpacing: ".06em",
                  textTransform: "uppercase", cursor: "pointer", transition: "all .22s",
                }}
              >Join Community</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── ABOUT ──────────────────────────────────────────────────────── */
const About = ({ navigate, openDonate }) => (
  <div className="pi">
    <PageHero
      vol="Est. 2025 · England & Wales"
      eyebrow="About Us"
      title={<>Our Mission, Vision <em style={{ fontStyle:"italic",color:T.amber }}>&amp; Purpose</em></>}
      subtitle="We exist because a devastating condition demands urgent answers and affected families deserve more than silence."
    />
    <section style={{ padding: "88px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        <div className="col-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <div>
            <div className="rule-red" />
            <Eyebrow>Our Mission</Eyebrow>
            <Headline size="md">Why we <em style={{ fontStyle:"italic",color:T.red }}>exist</em></Headline>
            <BodyText style={{ marginBottom: 16 }}>
              Beyond Disintegration was founded by families who have lived through the unimaginable , watching a child who was thriving suddenly and catastrophically regress. We built this organisation because no family should face this crisis alone.
            </BodyText>
            <BodyText style={{ marginBottom: 28 }}>
              Our mission: fund rigorous scientific research into causes, mechanisms, and potential treatments for unexplained catastrophic developmental regression in children , while building the support infrastructure that affected families so desperately need.
            </BodyText>
            {/* Registration notice */}
            <div style={{ background: T.amberPale, border: `1.5px solid ${T.amber}`, borderRadius: 6, padding: "18px 20px" }}>
              <div className="jakarta" style={{ fontSize: ".68rem", letterSpacing: ".14em", textTransform: "uppercase", color: T.amber, fontWeight: 700, marginBottom: 8 }}>🏛 Charity Registration In Progress</div>
              <BodyText style={{ fontSize: ".85rem" }}>
                Beyond Disintegration is in the process of formal registration with the Charity Commission for England and Wales. All donations are held securely per our stated charitable objectives.
              </BodyText>
            </div>
          </div>
          <div>
            <div className="rule-green" />
            <Eyebrow color={T.green}>The Condition</Eyebrow>
            <Headline size="md">Understanding the <em style={{ fontStyle:"italic",color:T.green }}>crisis</em></Headline>
            <BodyText style={{ marginBottom: 14 }}>
              Unexplained catastrophic developmental regression , encompassing Childhood Disintegrative Disorder (CDD), acquired epileptic aphasia, FIRES, and related conditions , describes a group of devastating syndromes in which previously typically-developing children experience rapid, severe loss of acquired skills.
            </BodyText>
            <BodyText>
              Children may lose language, motor control, social awareness, and continence. In many cases, no cause is identified. This is one of the most underfunded areas in paediatric medicine globally.
            </BodyText>
          </div>
        </div>
      </div>
    </section>
    <section style={{ background: T.panel, padding: "72px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        <Eyebrow>Our Values</Eyebrow>
        <Headline>What guides <em style={{ fontStyle:"italic",color:T.red }}>everything</em> we do</Headline>
        <div className="col-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 36 }}>
          {[
            { n:"01", ic:"🔬", t:"Scientific Rigour", d:"We fund only the highest quality research and communicate findings honestly, even when complex or inconclusive." },
            { n:"02", ic:"💛", t:"Compassionate Support", d:"Every family is at the centre of everything we do. We listen before we lead, always." },
            { n:"03", ic:"📊", t:"Radical Transparency", d:"Every pound is accounted for publicly. We publish full allocation breakdowns without exception." },
            { n:"04", ic:"🌍", t:"Inclusive Community", d:"We welcome all families regardless of diagnosis, geography, background, or resources." },
            { n:"05", ic:"🤝", t:"Clinical Collaboration", d:"We work alongside never in opposition to medical professionals and research institutions." },
            { n:"06", ic:"✨", t:"Relentless Hope", d:"We refuse to accept that this condition cannot be understood, treated, and ultimately prevented." },
          ].map(v => (
            <div key={v.n} className="card" style={{ padding: "26px 22px" }}>
              <div style={{ fontSize: "1.6rem", marginBottom: 14 }}>{v.ic}</div>
              <div className="jakarta" style={{ fontSize: ".92rem", fontWeight: 700, color: T.ink, marginBottom: 8 }}>{v.t}</div>
              <BodyText style={{ fontSize: ".85rem" }}>{v.d}</BodyText>
            </div>
          ))}
        </div>
      </div>
    </section>
    <div style={{ padding: "64px 0", textAlign: "center" }}>
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 28px" }}>
        <Headline size="md">Support our <em style={{ fontStyle:"italic",color:T.amber }}>mission</em></Headline>
        <BodyText style={{ marginBottom: 28, textAlign: "center" }}>Every donation directly funds research, family support, and clinical education.</BodyText>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <BtnRed onClick={openDonate}>Donate Today</BtnRed>
          <BtnOutline onClick={() => navigate("involve")} color={T.green}>Volunteer With Us</BtnOutline>
        </div>
      </div>
    </div>
  </div>
);

/* ─── WHO WE ARE ──────────────────────────────────────────────────── */
const Who = () => (
  <div className="pi">
    <PageHero eyebrow="Who We Are" title={<>The people behind <em style={{ fontStyle:"italic",color:T.amber }}>the mission</em></>} subtitle="Founders, scientists, and advocates united by singular purpose." />
    <section style={{ padding: "88px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        <Eyebrow>Founding Team</Eyebrow>
        <Headline>Meet our <em style={{ fontStyle:"italic",color:T.red }}>founders</em></Headline>
        <div className="col-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginTop: 36 }}>
          {[
            { init:"SC", n:"Sarah Clarke", r:"Co-Founder & CEO", b:"Former NHS healthcare advocate with 15 years in patient rights and rare disease policy. Mother of an affected child." },
            { init:"DM", n:"Dr. David Mehra", r:"Research Director", b:"Consultant paediatric neurologist. Author of 30+ peer-reviewed publications in acquired neurological conditions." },
            { init:"RP", n:"Rachel Pemberton", r:"Family Support Lead", b:"Psychotherapist and specialist. Founder of the UK's first peer support group for childhood regression families." },
            { init:"JK", n:"James Kaur", r:"Head of Operations", b:"Chartered accountant with 20 years in non-profit governance and strategic financial management." },
          ].map(p => (
            <div key={p.n} className="card" style={{ overflow: "hidden" }}>
              <div style={{ height: 120, background: T.ink, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", border: `2px solid ${T.red}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces',serif", fontSize: "1.4rem", color: T.white }}>{p.init}</div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: T.red }} />
              </div>
              <div style={{ padding: "18px 18px" }}>
                <div className="fraunces" style={{ fontSize: ".96rem", fontWeight: 500, color: T.ink, marginBottom: 3 }}>{p.n}</div>
                <div className="jakarta" style={{ fontSize: ".64rem", letterSpacing: ".1em", textTransform: "uppercase", color: T.red, fontWeight: 700, marginBottom: 10 }}>{p.r}</div>
                <BodyText style={{ fontSize: ".82rem" }}>{p.b}</BodyText>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section style={{ background: T.panel, padding: "64px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        <Eyebrow color={T.green}>Scientific Advisory Board</Eyebrow>
        <Headline>Clinical & research <em style={{ fontStyle:"italic",color:T.green }}>advisors</em></Headline>
        <div className="col-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 32 }}>
          {[
            { init:"AH", n:"Prof. Amelia Hartley", r:"Paediatric Neurology · Oxford", b:"Professor of paediatric neuroscience. Specialist in epileptic encephalopathies and autoimmune conditions in children." },
            { init:"LN", n:"Dr. Lior Naveh", r:"Neuroimmunology · UCL", b:"Leading researcher in neuroinflammatory conditions. PI on multiple autoimmune encephalitis studies." },
            { init:"FO", n:"Dr. Fatima Osei", r:"Clinical Genetics · GOSH", b:"Consultant clinical geneticist. Advisor to NICE on rare and undiagnosed disease diagnostic pathways." },
          ].map(p => (
            <div key={p.n} className="card card-green" style={{ padding: "24px 22px", display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div style={{ width: 50, height: 50, borderRadius: "50%", border: `2px solid ${T.green}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces',serif", fontSize: ".96rem", color: T.green, flexShrink: 0 }}>{p.init}</div>
              <div>
                <div className="fraunces" style={{ fontSize: ".92rem", fontWeight: 500, color: T.ink, marginBottom: 3 }}>{p.n}</div>
                <div className="jakarta" style={{ fontSize: ".63rem", letterSpacing: ".1em", textTransform: "uppercase", color: T.green, fontWeight: 700, marginBottom: 8 }}>{p.r}</div>
                <BodyText style={{ fontSize: ".82rem" }}>{p.b}</BodyText>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

/* ─── RESEARCH ───────────────────────────────────────────────────── */
const Research = () => {
  const [filter, setFilter] = useState("all");
  const papers = [
    { type:"research", featured:true, tag:"The Lancet · Featured", title:"Childhood Developmental Regression: Towards a Unified Diagnostic Framework", authors:"Hartley A, Naveh L et al.", date:"March 2025", body:"Landmark multi-centre analysis proposing a systematic classification system, drawing on 847 paediatric cases across 12 countries. A pivotal step towards consistent diagnostic criteria." },
    { type:"research", tag:"Research", title:"Neuroimmune Biomarkers in Unexplained Childhood Regression", authors:"Dr. Lior Naveh et al.", date:"Jan 2025", body:"Identifies a panel of 8 immune markers with high specificity for autoimmune aetiology in 120 children with unexplained regression." },
    { type:"clinical", tag:"Clinical Guide", title:"Clinician's Guide to Assessing Acquired Developmental Regression", authors:"Beyond Disintegration", date:"2024", body:"Practical framework for paediatricians including diagnostic checklist, referral pathways, and investigation algorithm." },
    { type:"family", tag:"Family Resource", title:"After the Diagnosis: A Practical Guide for Families", authors:"Beyond Disintegration", date:"2024", body:"A compassionate, evidence-based guide covering immediate steps, emotional support, rights navigation, and community connection." },
    { type:"policy", tag:"Policy Paper", title:"Invisible Children: The Case for NHS Commissioning", authors:"Beyond Disintegration", date:"2024", body:"White paper making the evidential and ethical case for dedicated NHS commissioning of specialist diagnostic and therapeutic services." },
  ];
  const shown = filter === "all" ? papers : papers.filter(p => p.type === filter);
  return (
    <div className="pi">
      <PageHero eyebrow="Research & Resources" title={<>The science of <em style={{ fontStyle:"italic",color:T.amber }}>understanding</em></>} subtitle="A curated library of academic research, clinical guidance, and family resources." />
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {["all","research","clinical","family","policy"].map(f => {
              const ac = filter === f;
              return (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: "8px 18px", borderRadius: 4, cursor: "pointer",
                  border: `1.5px solid ${ac ? T.red : T.border}`,
                  background: ac ? T.red : "transparent",
                  color: ac ? T.white : T.inkMid,
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: ".74rem", fontWeight: 600,
                  letterSpacing: ".07em", textTransform: "capitalize",
                  transition: "all .2s",
                }}>{f === "all" ? "All Publications" : f.charAt(0).toUpperCase() + f.slice(1)}</button>
              );
            })}
          </div>
          {shown.map((p, i) => (
            <div key={i} className="card" style={{ marginBottom: 16, overflow: "hidden", background: p.featured ? T.ink : T.white }}>
              {p.featured && <div style={{ height: 4, background: `linear-gradient(90deg,${T.red},${T.amber})` }} />}
              <div style={{ padding: "24px 26px", display: "flex", justifyContent: "space-between", gap: 28, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                    {p.featured && <span className="jakarta" style={{ background: T.amber, color: T.ink, padding: "2px 10px", borderRadius: 3, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>★ Featured</span>}
                    <span className="jakarta" style={{ background: p.featured ? "rgba(253,250,244,.1)" : T.redPale, color: p.featured ? T.white : T.red, border: p.featured ? "1px solid rgba(253,250,244,.2)" : `1.5px solid ${T.red}`, padding: "2px 10px", borderRadius: 3, fontSize: ".6rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>{p.tag}</span>
                  </div>
                  <h3 className="fraunces" style={{ fontSize: p.featured ? "1.5rem" : "1.15rem", color: p.featured ? T.white : T.ink, marginBottom: 8, lineHeight: 1.3, fontWeight: 400 }}>{p.title}</h3>
                  <BodyText style={{ color: p.featured ? "rgba(253,250,244,.6)" : T.inkLight, fontSize: ".85rem", marginBottom: 10 }}>{p.body}</BodyText>
                  <div className="jakarta" style={{ display: "flex", gap: 18, fontSize: ".72rem", color: p.featured ? "rgba(253,250,244,.4)" : T.inkLight, flexWrap: "wrap" }}>
                    <span>✍ {p.authors}</span><span>📅 {p.date}</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
                  <button className="jakarta" style={{ background: p.featured ? "rgba(253,250,244,.08)" : T.redPale, border: p.featured ? "1.5px solid rgba(253,250,244,.2)" : `1.5px solid ${T.red}`, borderRadius: 4, padding: "9px 16px", color: p.featured ? T.white : T.red, fontSize: ".72rem", fontWeight: 600, letterSpacing: ".07em", cursor: "pointer", textTransform: "uppercase" }}>↓ Download PDF</button>
                  <button className="jakarta" style={{ background: "transparent", border: `1.5px solid ${p.featured ? "rgba(253,250,244,.15)" : T.border}`, borderRadius: 4, padding: "9px 16px", color: p.featured ? "rgba(253,250,244,.5)" : T.inkLight, fontSize: ".72rem", cursor: "pointer" }}>🔗 View Abstract</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

/* ─── STORIES ────────────────────────────────────────────────────── */
const Stories = ({ openDonate }) => (
  <div className="pi">
    <PageHero eyebrow="Family Stories" title={<>Voices of <em style={{ fontStyle:"italic",color:T.amber }}>lived experience</em></>} subtitle="Every family's story matters. These are shared with courage, received with deep respect." />
    <section style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ background: T.amberPale, border: `1.5px solid ${T.amber}`, borderRadius: 6, padding: "12px 18px", marginBottom: 44, fontSize: ".81rem" }}>
          <BodyText style={{ fontSize: ".81rem" }}>🛡️ All stories are shared with full informed consent. Names and details have been reviewed by contributors.</BodyText>
        </div>
        {/* Video */}
        <div style={{ background: T.ink, borderRadius: 8, border: `1.5px solid ${T.border}`, overflow: "hidden", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer", marginBottom: 10 }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${T.inkMid}, ${T.ink})` }} />
          <div style={{ width: 68, height: 68, borderRadius: "50%", background: T.red, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
            <div style={{ width: 0, height: 0, borderTop: "13px solid transparent", borderBottom: "13px solid transparent", borderLeft: `20px solid ${T.white}`, marginLeft: 4 }} />
          </div>
          <div style={{ position: "absolute", zIndex: 1, bottom: 20, left: 24 }}>
            <span className="fraunces" style={{ fontSize: "1.05rem", color: T.white, fontStyle: "italic" }}>Marcus's Story : A family's journey</span>
          </div>
        </div>
        <p className="jakarta" style={{ fontSize: ".74rem", color: T.inkLight, textAlign: "center", marginBottom: 48 }}>5 min · With consent of the Clarke family</p>

        {[
          { init:"HW", n:"Dr. Helena W.", d:"Mother of Marcus, 7 · London", q:"He was four years old and could recite entire books from memory. He loved dinosaurs and would name every species. Then over six weeks, the words stopped. He stopped recognising me. Nothing in my life had prepared me for watching your child disappear while they are still in front of you , not years in medicine, not my own losses. Beyond Disintegration gave us the first real framework we had to understand what was happening to our son." },
          { init:"KB", n:"Kofi & Beatrice A.", d:"Parents of Amara, 9 · Birmingham", q:"We spent three years being told there was nothing wrong. That she would 'catch up.' That we were anxious parents. By the time we got a diagnosis, Amara had lost almost all of the skills she'd built. We lost years we will never get back. What I want every parent to hear is this: your instincts are right. Keep pushing. And you are not alone , because Beyond Disintegration exists." },
          { init:"TM", n:"Theresa M., PhD", d:"Mother and scientist · Edinburgh", q:"Rory turned five and that was the last birthday that felt ordinary. He lost speech first. Then recognition. Then continence. I'm a researcher by profession , I know what critical evidence gaps look like. This condition has some of the worst I have ever encountered. Funding organisations like Beyond Disintegration is not just charitable , it is a medical emergency." },
        ].map(s => (
          <div key={s.n} className="card" style={{ padding: "32px 30px", marginBottom: 22, borderLeft: `4px solid ${T.green}` }}>
            <div className="fraunces" style={{ fontSize: "4rem", color: T.green, lineHeight: 1, opacity: .2, marginBottom: -14 }}>&ldquo;</div>
            <blockquote className="lora" style={{ fontSize: ".98rem", color: T.inkMid, lineHeight: 1.88, fontStyle: "italic", fontWeight: 400, marginBottom: 24, paddingTop: 10 }}>
              "{s.q}"
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", border: `2px solid ${T.green}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces',serif", fontSize: ".9rem", color: T.green, flexShrink: 0 }}>{s.init}</div>
              <div>
                <div className="jakarta" style={{ color: T.ink, fontWeight: 700, fontSize: ".86rem" }}>{s.n}</div>
                <div className="jakarta" style={{ fontSize: ".73rem", color: T.inkLight }}>{s.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    <div style={{ padding: "60px 0", textAlign: "center", borderTop: `1.5px solid ${T.border}` }}>
      <Headline size="md" style={{ textAlign: "center", marginBottom: 10 }}>Help fund the research that changes <em style={{ fontStyle:"italic",color:T.red }}>these stories.</em></Headline>
      <BtnRed onClick={openDonate} style={{ marginTop: 18 }}>Donate Now</BtnRed>
    </div>
  </div>
);

/* ─── QUOTES ─────────────────────────────────────────────────────── */
const Quotes = () => (
  <div className="pi">
    <PageHero eyebrow="Quotes & Reflections" title={<>Voices that <em style={{ fontStyle:"italic",color:T.amber }}>matter</em></>} subtitle="From parents, clinicians, and researchers words that capture the reality of this crisis." />
    <section style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 28px" }}>
        <div className="two-col-quotes" style={{ columns: 2, columnGap: 24 }}>
          {[
            { q:"This is not a rare disease in the typical sense. It is a common tragedy rendered invisible by diagnostic fragmentation and inadequate clinical coding.", a:"Prof. Amelia Hartley", r:"Paediatric Neurologist, University of Oxford" },
            { q:"I carried the guilt for years , that I had done something wrong, caused this. It took meeting other mothers to understand that this guilt is universal and unfounded.", a:"Anonymous Parent", r:"Member of our community" },
            { q:"The NHS is full of extraordinary clinicians who want to help. The problem isn't will , it's knowledge. Funding Beyond Disintegration fills gaps government has failed to address.", a:"Dr. James Farrington", r:"Consultant Paediatrician, NHS" },
            { q:"When my son was at his worst, I read research papers at 2am trying to understand. I hope future parents won't have to because the knowledge will already exist.", a:"Michael R.", r:"Father and advocate" },
            { q:"We have an ethical obligation to these children. They cannot advocate for themselves. Their parents are exhausted. It falls to us , as researchers and as a society to prioritise this work.", a:"Dr. Fatima Osei", r:"Clinical Geneticist, GOSH" },
            { q:"She still has moments brief, brilliant moments where you see who she was. Those moments are the reason we give everything to funding this research.", a:"Anonymous Parent", r:"Member of our community" },
          ].map((q, i) => (
            <blockquote key={i} className="card" style={{ breakInside: "avoid", padding: "28px 26px", marginBottom: 20, borderLeft: `4px solid ${i%2===0?T.red:T.green}` }}>
              <div className="fraunces" style={{ fontSize: "2.5rem", color: i%2===0?T.red:T.green, lineHeight: 1, opacity: .25, marginBottom: -10 }}>&ldquo;</div>
              <p className="lora" style={{ fontSize: "1rem", color: T.inkMid, lineHeight: 1.62, fontStyle: "italic", marginBottom: 18, fontWeight: 400 }}>"{q.q}"</p>
              <footer>
                <div className="jakarta" style={{ fontWeight: 700, color: T.ink, fontSize: ".83rem" }}>{q.a}</div>
                <div className="jakarta" style={{ fontSize: ".74rem", color: T.inkLight }}>{q.r}</div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  </div>
);

/* ─── INVOLVE ────────────────────────────────────────────────────── */
const Involve = ({ navigate, openDonate }) => (
  <div className="pi">
    <PageHero eyebrow="Get Involved" title={<>Join the <em style={{ fontStyle:"italic",color:T.amber }}>movement</em></>} subtitle="Many ways to support our work whatever your time, skills, or resources allow." />
    <section style={{ padding: "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        <div className="col-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {[
            { ic:"🔬", t:"Research Collaboration", d:"Are you a clinician or researcher? We actively seek collaborators for funded research projects, case studies, and clinical partnerships." },
            { ic:"🤝", t:"Volunteer", d:"We welcome volunteers in communications, fundraising, community support, legal, and administration." },
            { ic:"🏢", t:"Corporate Partnership", d:"Partner through payroll giving, cause-related marketing, employee fundraising, or sponsorship of specific research projects." },
            { ic:"📢", t:"Raise Awareness", d:"Share our mission, write to your MP, or speak to your employer. Visibility is vital for underrecognised conditions." },
            { ic:"💰", t:"Fundraise for Us", d:"Set up a fundraising challenge a marathon, sponsored event, or birthday fundraiser. Every penny goes to research and family support." },
            { ic:"⚖️", t:"Pro Bono Support", d:"We welcome pro bono support from legal, accountancy, HR, and communications professionals who share our values." },
          ].map(c => (
            <div key={c.t} className="card" style={{ padding: "28px 24px" }}>
              <div style={{ fontSize: "2rem", marginBottom: 16 }}>{c.ic}</div>
              <div className="jakarta" style={{ fontSize: ".93rem", fontWeight: 700, color: T.ink, marginBottom: 10 }}>{c.t}</div>
              <BodyText style={{ fontSize: ".85rem", marginBottom: 22 }}>{c.d}</BodyText>
              <button onClick={() => navigate("contact")} className="jakarta"
                style={{ background: "transparent", border: `1.5px solid ${T.border}`, borderRadius: 4, padding: "8px 18px", color: T.red, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", cursor: "pointer", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.red; e.currentTarget.style.background = T.redPale; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = "transparent"; }}
              >Get in Touch</button>
            </div>
          ))}
        </div>
      </div>
    </section>
    <div style={{ padding: "60px 0", textAlign: "center", background: T.panel, borderTop: `1.5px solid ${T.border}` }}>
      <Headline size="md" style={{ textAlign: "center", marginBottom: 10 }}>Or simply <em style={{ fontStyle:"italic",color:T.red }}>donate.</em></Headline>
      <BodyText style={{ marginBottom: 24, textAlign: "center" }}>Every contribution funds research that will change children's lives.</BodyText>
      <BtnRed onClick={openDonate}>Donate Now</BtnRed>
    </div>
  </div>
);

/* ─── DONATE PAGE ─────────────────────────────────────────────────── */
const Donate = () => {
  const [freq, sf] = useState("once");
  const [amt, sa] = useState(25);
  const [custom, sc] = useState("");
  const [gift, sg] = useState(true);
  const fa = custom ? parseInt(custom)||0 : amt;
  const wa = gift ? Math.round(fa * 1.25) : fa;
  return (
    <div className="pi">
      <PageHero eyebrow="Donate" title={<>Fund the research <em style={{ fontStyle:"italic",color:T.amber }}>that matters</em></>} subtitle="100% of donations fund research, family support, and clinical education." />
      <section style={{ padding: "64px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px" }}>
          <div className="col-2" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 48, alignItems: "start" }}>
            {/* Form */}
            <div style={{ background: T.white, border: `1.5px solid ${T.border}`, borderRadius: 8, padding: "36px 34px" }}>
              <div className="fraunces" style={{ fontSize: "1.5rem", color: T.ink, marginBottom: 24, fontWeight: 400 }}>Make a Donation</div>
              {/* Frequency tabs */}
              <div style={{ display: "inline-flex", border: `1.5px solid ${T.border}`, borderRadius: 4, overflow: "hidden", marginBottom: 26 }}>
                {["once","monthly","annual"].map(f => (
                  <button key={f} onClick={() => sf(f)} className="jakarta" style={{
                    padding: "9px 20px", border: "none", cursor: "pointer",
                    background: freq===f ? T.red : "transparent",
                    color: freq===f ? T.white : T.inkMid,
                    fontWeight: 600, fontSize: ".78rem", letterSpacing: ".05em", transition: "all .2s",
                    textTransform: "capitalize",
                  }}>{f==="once"?"Give Once":f.charAt(0).toUpperCase()+f.slice(1)}</button>
                ))}
              </div>
              <div className="jakarta" style={{ fontSize: ".68rem", letterSpacing: ".14em", textTransform: "uppercase", color: T.inkLight, marginBottom: 12 }}>Select Amount</div>
              <div style={{ display: "flex", gap: 9, flexWrap: "wrap", marginBottom: 22 }}>
                {[10,25,50,100,250].map(a => (
                  <button key={a} onClick={() => { sa(a); sc(""); }} className="jakarta" style={{
                    padding: "10px 18px", borderRadius: 4, cursor: "pointer",
                    border: `1.5px solid ${amt===a&&!custom ? T.red : T.border}`,
                    background: amt===a&&!custom ? T.redPale : "transparent",
                    color: amt===a&&!custom ? T.red : T.inkMid,
                    fontWeight: 700, fontSize: ".96rem", transition: "all .2s",
                  }}>£{a}</button>
                ))}
                <input type="number" placeholder="Other £" value={custom} onChange={e=>sc(e.target.value)} style={{ width: 96, padding: "10px 12px", borderColor: custom ? T.red : T.border }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 22, cursor: "pointer" }} onClick={() => sg(g=>!g)}>
                <input type="checkbox" checked={gift} readOnly />
                <span className="jakarta" style={{ fontSize: ".84rem", color: T.inkMid }}>Add Gift Aid <strong style={{ color: T.green }}>+25% at no extra cost</strong></span>
              </div>
              {fa > 0 && (
                <div style={{ background: T.greenPale, border: `1.5px solid ${T.green}`, borderRadius: 6, padding: "14px 16px", marginBottom: 22 }}>
                  <div className="jakarta" style={{ fontSize: ".67rem", letterSpacing: ".14em", textTransform: "uppercase", color: T.green, marginBottom: 6, fontWeight: 700 }}>Your Impact</div>
                  <div className="lora" style={{ fontSize: ".86rem", color: T.inkMid }}>
                    <strong style={{ color: T.ink }}>£{wa.toLocaleString()}</strong> total value (incl. Gift Aid).{" "}
                    {fa>=250?"Funds a full day of laboratory biomarker research.":fa>=100?"Supports one family through peer support for one month.":fa>=50?"Produces and posts our family guide to 2 families.":"Funds one hour of specialist research analysis."}
                  </div>
                </div>
              )}
              <div className="mob-col" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="jakarta" style={{ flex: 1, padding: 14, borderRadius: 4, border: "none", background: "#635BFF", color: "#fff", fontWeight: 700, fontSize: ".88rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>💳 Card (Stripe)</button>
                <button className="jakarta" style={{ flex: 1, padding: 14, borderRadius: 4, border: "none", background: "#0070E0", color: "#fff", fontWeight: 700, fontSize: ".88rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>🅿 PayPal</button>
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 16, paddingTop: 14, borderTop: `1.5px solid ${T.borderLight}` }}>
                {["🔒 SSL Secured","✓ PCI Compliant","🇬🇧 Gift Aid","✓ GDPR"].map(t => <span key={t} className="jakarta" style={{ fontSize: ".7rem", color: T.inkLight }}>{t}</span>)}
              </div>
            </div>
            {/* Impact info */}
            <div>
              <Eyebrow>Your Impact</Eyebrow>
              <Headline size="md">Where your money <em style={{ fontStyle:"italic",color:T.red }}>goes</em></Headline>
              <BodyText style={{ marginBottom: 28 }}>We publish full allocation breakdowns annually. Here is how every pound is deployed:</BodyText>
              <div className="col-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                {[{a:"£25",d:"1 hr research analysis"},{a:"£50",d:"Family guide to 2 families"},{a:"£100",d:"1 month family peer support"},{a:"£500",d:"Full day lab research"}].map(c => (
                  <div key={c.a} className="card" style={{ padding: "16px 14px", textAlign: "center" }}>
                    <div className="fraunces" style={{ fontSize: "1.6rem", color: T.red, marginBottom: 6 }}>{c.a}</div>
                    <BodyText style={{ fontSize: ".78rem", textAlign: "center" }}>{c.d}</BodyText>
                  </div>
                ))}
              </div>
              <div style={{ background: T.ink, borderRadius: 8, padding: "24px" }}>
                <div className="jakarta" style={{ fontSize: ".68rem", letterSpacing: ".14em", textTransform: "uppercase", color: T.amber, marginBottom: 18 }}>Fund Allocation</div>
                {[{l:"Research Funding",p:65,c:T.red},{l:"Family Support",p:20,c:T.green},{l:"Operations",p:10,c:T.amber},{l:"Advocacy",p:5,c:"rgba(253,250,244,.4)"}].map(b => (
                  <div key={b.l} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span className="jakarta" style={{ fontSize: ".8rem", color: "rgba(253,250,244,.65)" }}>{b.l}</span>
                      <span className="jakarta" style={{ fontSize: ".8rem", color: T.white, fontWeight: 700 }}>{b.p}%</span>
                    </div>
                    <div style={{ height: 5, background: "rgba(255,255,255,.08)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${b.p}%`, background: b.c, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── COMMUNITY ──────────────────────────────────────────────────── */
const Community = ({ showToast }) => {
  const [form, setF] = useState({ first:"", last:"", email:"", role:"", country:"UK", news:true, privacy:false, safe:false });
  const submit = e => {
    e.preventDefault();
    if (!form.privacy || !form.safe) { showToast("Please accept all required policies.", true); return; }
    showToast("✓ Application received! We'll review within 48 hours.");
    setF({ first:"",last:"",email:"",role:"",country:"UK",news:true,privacy:false,safe:false });
  };
  return (
    <div className="pi">
      <PageHero eyebrow="Community" title={<>You are <em style={{ fontStyle:"italic",color:T.amber }}>not alone</em></>} subtitle="A safe, moderated community for families, researchers, and advocates." />
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
          <div className="col-2" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 56, alignItems: "start" }}>
            <div>
              <Eyebrow>Our Community</Eyebrow>
              <Headline size="md">A safe space for <em style={{ fontStyle:"italic",color:T.green }}>every family</em></Headline>
              <BodyText style={{ marginBottom: 24 }}>A private, moderated community for families affected by childhood developmental regression whether diagnosed or still seeking answers. Led by lived experience.</BodyText>
              <div style={{ marginBottom: 28 }}>
                {["Peer support from families who truly understand","Moderated groups with trained facilitators","Research summaries in accessible language","Quarterly Q&As with clinical advisors","Monthly newsletter with research updates","Regional meet-up coordination"].map(i => (
                  <div key={i} style={{ display: "flex", gap: 11, padding: "10px 0", borderBottom: `1.5px solid ${T.borderLight}`, fontSize: ".88rem", color: T.inkLight }}>
                    <span style={{ color: T.green, flexShrink: 0 }}>✓</span>
                    <BodyText style={{ fontSize: ".88rem" }}>{i}</BodyText>
                  </div>
                ))}
              </div>
              <div style={{ background: T.amberPale, border: `1.5px solid ${T.amber}`, borderRadius: 8, padding: "22px" }}>
                <div className="jakarta" style={{ fontSize: ".82rem", fontWeight: 700, color: T.ink, marginBottom: 10 }}>🛡️ Safeguarding & Privacy</div>
                <BodyText style={{ fontSize: ".83rem", marginBottom: 12 }}>The safety of our community members is our highest priority. All members are verified. Moderated 7 days a week. UK GDPR compliant.</BodyText>
                {["UK GDPR compliant","No data sold or shared","ICO registered","Enhanced child data protection"].map(i => <div key={i} className="jakarta" style={{ fontSize: ".78rem", color: T.inkMid, padding: "4px 0", display: "flex", gap: 7 }}><span style={{ color: T.amber }}>◆</span>{i}</div>)}
              </div>
            </div>
            <div style={{ background: T.white, border: `1.5px solid ${T.border}`, borderRadius: 8, padding: "34px 30px" }}>
              <Eyebrow>Register</Eyebrow>
              <div className="fraunces" style={{ fontSize: "1.5rem", color: T.ink, marginBottom: 8, fontWeight: 400 }}>Join Our Community</div>
              <BodyText style={{ marginBottom: 24, fontSize: ".86rem" }}>Reviewed within 48 hours to maintain a safe, supportive space.</BodyText>
              <form onSubmit={submit}>
                <div className="col-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[{l:"First Name *",k:"first",ph:"First"},{l:"Last Name *",k:"last",ph:"Last"}].map(x => (
                    <div key={x.k}>
                      <label className="jakarta" style={{ fontSize: ".67rem", letterSpacing: ".1em", textTransform: "uppercase", color: T.inkLight, display: "block", marginBottom: 5 }}>{x.l}</label>
                      <input value={form[x.k]} onChange={e=>setF(p=>({...p,[x.k]:e.target.value}))} placeholder={x.ph} required />
                    </div>
                  ))}
                  <div style={{ gridColumn: "1/-1" }}>
                    <label className="jakarta" style={{ fontSize: ".67rem", letterSpacing: ".1em", textTransform: "uppercase", color: T.inkLight, display: "block", marginBottom: 5 }}>Email *</label>
                    <input type="email" value={form.email} onChange={e=>setF(p=>({...p,email:e.target.value}))} placeholder="your@email.com" required />
                  </div>
                  <div style={{ gridColumn: "1/-1" }}>
                    <label className="jakarta" style={{ fontSize: ".67rem", letterSpacing: ".1em", textTransform: "uppercase", color: T.inkLight, display: "block", marginBottom: 5 }}>Your Connection *</label>
                    <select value={form.role} onChange={e=>setF(p=>({...p,role:e.target.value}))} required>
                      <option value="">Please select...</option>
                      {["Parent / carer of an affected child","Medical professional","Researcher","Advocate / supporter","Other"].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div style={{ gridColumn: "1/-1" }}>
                    {[{k:"news",l:"Subscribe to monthly research newsletter"},{k:"privacy",l:"I agree to the Privacy Policy *"},{k:"safe",l:"I accept the Community Safeguarding Guidelines *"}].map(c => (
                      <div key={c.k} style={{ display: "flex", gap: 9, alignItems: "flex-start", marginBottom: 9 }}>
                        <input type="checkbox" checked={form[c.k]} onChange={e=>setF(p=>({...p,[c.k]:e.target.checked}))} style={{ marginTop: 3 }} />
                        <label className="lora" style={{ fontSize: ".83rem", color: T.inkMid, lineHeight: 1.6, cursor: "pointer" }}>{c.l}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <BtnRed onClick={submit} full style={{ marginTop: 18 }}>Apply to Join Community</BtnRed>
                <BodyText style={{ fontSize: ".72rem", marginTop: 10, textAlign: "center" }}>UK GDPR protected. We never share your information without consent.</BodyText>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── CONTACT ────────────────────────────────────────────────────── */
const Contact = ({ showToast }) => {
  const [form, setF] = useState({ name:"", email:"", org:"", subject:"", message:"", privacy:false });
  const submit = e => {
    e.preventDefault();
    showToast("✓ Message sent! We'll respond within 2 working days.");
    setF({ name:"",email:"",org:"",subject:"",message:"",privacy:false });
  };
  return (
    <div className="pi">
      <PageHero eyebrow="Contact" title={<>Get in <em style={{ fontStyle:"italic",color:T.amber }}>touch</em></>} subtitle="Whether you're a family, researcher, journalist, or supporter , we're here." />
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 28px" }}>
          <div className="col-2" style={{ display: "grid", gridTemplateColumns: ".72fr 1.28fr", gap: 48, alignItems: "start" }}>
            <div style={{ background: T.ink, borderRadius: 8, padding: "34px 28px", position: "sticky", top: 84 }}>
              <div className="fraunces" style={{ fontSize: "1.3rem", color: T.white, marginBottom: 24, fontWeight: 400 }}>Contact Info</div>
              {[{ic:"✉",t:"General",v:"hello@beyonddisintegration.org"},{ic:"🔬",t:"Research",v:"research@beyonddisintegration.org"},{ic:"💛",t:"Families",v:"support@beyonddisintegration.org"},{ic:"📰",t:"Press",v:"press@beyonddisintegration.org"}].map(c => (
                <div key={c.t} style={{ display: "flex", gap: 13, marginBottom: 18 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", border: `1.5px solid ${T.red}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".85rem", color: T.red, flexShrink: 0 }}>{c.ic}</div>
                  <div>
                    <div className="jakarta" style={{ fontSize: ".63rem", letterSpacing: ".12em", textTransform: "uppercase", color: T.amber, fontWeight: 700, marginBottom: 3 }}>{c.t}</div>
                    <div className="jakarta" style={{ fontSize: ".83rem", color: "rgba(253,250,244,.65)" }}>{c.v}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.1)" }}>
                <div className="jakarta" style={{ fontSize: ".63rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(253,250,244,.35)", marginBottom: 12 }}>Social Media</div>
                <div style={{ display: "flex", gap: 9 }}>
                  {["𝕏","in","f","◎","▶"].map((s,i) => (
                    <button key={i} style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,.15)", background: "transparent", color: "rgba(253,250,244,.5)", cursor: "pointer", transition: "all .2s", fontSize: ".8rem" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = T.red; e.currentTarget.style.color = T.red; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.15)"; e.currentTarget.style.color = "rgba(253,250,244,.5)"; }}
                    >{s}</button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ background: T.white, border: `1.5px solid ${T.border}`, borderRadius: 8, padding: "34px 30px" }}>
              <div className="fraunces" style={{ fontSize: "1.5rem", color: T.ink, marginBottom: 8, fontWeight: 400 }}>Send a Message</div>
              <BodyText style={{ fontSize: ".85rem", marginBottom: 24 }}>We respond to all enquiries within 2 working days.</BodyText>
              <form onSubmit={submit}>
                <div className="col-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[{l:"Full Name *",k:"name",t:"text",ph:"Your name",full:false},{l:"Email *",k:"email",t:"email",ph:"your@email.com",full:false},{l:"Organisation",k:"org",t:"text",ph:"Optional",full:true}].map(x => (
                    <div key={x.k} style={{ gridColumn: x.full?"1/-1":"auto" }}>
                      <label className="jakarta" style={{ fontSize: ".67rem", letterSpacing: ".1em", textTransform: "uppercase", color: T.inkLight, display: "block", marginBottom: 5 }}>{x.l}</label>
                      <input type={x.t} value={form[x.k]} onChange={e=>setF(p=>({...p,[x.k]:e.target.value}))} placeholder={x.ph} required={x.l.includes("*")} />
                    </div>
                  ))}
                  <div style={{ gridColumn: "1/-1" }}>
                    <label className="jakarta" style={{ fontSize: ".67rem", letterSpacing: ".1em", textTransform: "uppercase", color: T.inkLight, display: "block", marginBottom: 5 }}>Subject *</label>
                    <select value={form.subject} onChange={e=>setF(p=>({...p,subject:e.target.value}))} required>
                      <option value="">Select a topic...</option>
                      {["Family & Support","Research Collaboration","Corporate Partnership","Press & Media","Volunteer","Donation Query","General Enquiry"].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div style={{ gridColumn: "1/-1" }}>
                    <label className="jakarta" style={{ fontSize: ".67rem", letterSpacing: ".1em", textTransform: "uppercase", color: T.inkLight, display: "block", marginBottom: 5 }}>Message *</label>
                    <textarea value={form.message} onChange={e=>setF(p=>({...p,message:e.target.value}))} placeholder="Please write your message here..." required />
                  </div>
                  <div style={{ gridColumn: "1/-1", display: "flex", gap: 9, alignItems: "flex-start" }}>
                    <input type="checkbox" checked={form.privacy} onChange={e=>setF(p=>({...p,privacy:e.target.checked}))} style={{ marginTop: 3 }} required />
                    <label className="lora" style={{ fontSize: ".83rem", color: T.inkMid, lineHeight: 1.6, cursor: "pointer" }}>I agree to the Privacy Policy. My data will only be used to respond to this enquiry. *</label>
                  </div>
                </div>
                <BtnRed onClick={submit} style={{ marginTop: 18 }}>Send Message →</BtnRed>
                <BodyText style={{ fontSize: ".72rem", marginTop: 10 }}>🛡️ Spam-protected. Encrypted. UK GDPR compliant.</BodyText>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── DONATE MODAL ───────────────────────────────────────────────── */
const DonateModal = ({ open, onClose, showToast }) => {
  const [freq, sf] = useState("once");
  const [amt, sa] = useState(25);
  const [custom, sc] = useState("");
  if (!open) return null;
  const fa = custom ? parseInt(custom)||0 : amt;
  const pay = p => {
    onClose();
    showToast(p === "stripe" ? "💳 Redirecting to Stripe…" : "🅿 Redirecting to PayPal…");
  };
  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }} style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(26,17,8,.82)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, animation: "fadeIn .25s ease",
    }}>
      <div style={{
        background: T.white, border: `1.5px solid ${T.border}`,
        borderRadius: 10, maxWidth: 440, width: "100%",
        padding: "36px 32px", position: "relative",
        boxShadow: `8px 8px 0 ${T.red}`,
        maxHeight: "90vh", overflowY: "auto",
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", color: T.inkLight, fontSize: "1.3rem", cursor: "pointer" }}>×</button>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: T.red, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: "1.4rem" }}>💚</div>
          <div className="fraunces" style={{ fontSize: "1.6rem", color: T.ink, marginBottom: 5, fontWeight: 400 }}>Make a Donation</div>
          <BodyText style={{ fontSize: ".86rem", textAlign: "center" }}>Your support funds life-changing research.</BodyText>
        </div>
        <div style={{ display: "flex", border: `1.5px solid ${T.border}`, borderRadius: 4, overflow: "hidden", marginBottom: 22 }}>
          {["once","monthly"].map(f => <button key={f} onClick={() => sf(f)} className="jakarta" style={{ flex: 1, padding: "9px", border: "none", background: freq===f?T.red:"transparent", color: freq===f?T.white:T.inkMid, fontWeight: 600, fontSize: ".78rem", cursor: "pointer", transition: "all .2s" }}>{f==="once"?"Give Once":"Monthly"}</button>)}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
          {[10,25,50,100].map(a => <button key={a} onClick={() => { sa(a); sc(""); }} className="jakarta" style={{ flex: 1, minWidth: 56, padding: "10px 6px", border: `1.5px solid ${amt===a&&!custom?T.red:T.border}`, borderRadius: 4, cursor: "pointer", background: amt===a&&!custom?T.redPale:"transparent", color: amt===a&&!custom?T.red:T.inkMid, fontWeight: 700, fontSize: ".96rem", transition: "all .2s" }}>£{a}</button>)}
          <input type="number" placeholder="Other £" value={custom} onChange={e=>sc(e.target.value)} style={{ flex: 1, minWidth: 76, padding: "10px 9px" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <button onClick={() => pay("stripe")} className="jakarta" style={{ width: "100%", padding: 13, borderRadius: 4, border: "none", background: "#635BFF", color: "#fff", fontWeight: 700, fontSize: ".88rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            💳 Pay with Card (Stripe){fa > 0 ? ` · £${fa}` : ""}
          </button>
          <button onClick={() => pay("paypal")} className="jakarta" style={{ width: "100%", padding: 13, borderRadius: 4, border: "none", background: "#0070E0", color: "#fff", fontWeight: 700, fontSize: ".88rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            🅿 Pay with PayPal
          </button>
        </div>
        <BodyText style={{ fontSize: ".7rem", textAlign: "center", marginTop: 12 }}>🔒 Secure · PCI Compliant · Gift Aid eligible · GDPR protected</BodyText>
      </div>
    </div>
  );
};

/* ─── TOAST ──────────────────────────────────────────────────────── */
const Toast = ({ t }) => (
  <div style={{
    position: "fixed", bottom: 26, right: 26, zIndex: 9999,
    background: T.ink, border: `1.5px solid ${t.error ? T.red : T.green}`,
    borderLeft: `4px solid ${t.error ? T.red : T.green}`,
    borderRadius: 6, padding: "14px 20px",
    boxShadow: `4px 4px 0 ${t.error ? T.red : T.green}`,
    transform: t.visible ? "translateX(0)" : "translateX(110%)",
    transition: "transform .4s cubic-bezier(.25,.46,.45,.94)",
    maxWidth: 300, pointerEvents: t.visible ? "auto" : "none",
  }}>
    <div className="jakarta" style={{ fontSize: ".86rem", fontWeight: 700, color: T.white }}>{t.msg}</div>
  </div>
);

/* ─── FOOTER ─────────────────────────────────────────────────────── */
const Footer = ({ navigate, openDonate }) => (
  <footer style={{ background: T.ink, borderTop: `1.5px solid rgba(255,255,255,.06)`, padding: "60px 0 28px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
      <div className="col-4" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 44, paddingBottom: 44, borderBottom: "1px solid rgba(255,255,255,.08)", marginBottom: 32, textAlign: "center" }}>
        <div>
          <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 30, height: 30, background: T.red, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: 10, height: 10, border: "2px solid rgba(253,250,244,.8)", borderRadius: "50%" }} />
            </div>
            <span className="fraunces" style={{ fontSize: ".9rem", fontWeight: 500, color: T.white }}>Beyond <em style={{ fontStyle:"italic",color:T.amber }}>Disintegration</em></span>
          </button>
          <BodyText style={{ fontSize: ".83rem", color: "#ffffff", lineHeight: 1.8, marginBottom: 18 }}>
            Pioneering research into unexplained catastrophic developmental regression in children. Building hope through science, community, and compassion.
          </BodyText>
          <div className="jakarta" style={{ fontSize: ".68rem", color: "#ffffff", lineHeight: 1.7 }}>
            Charity registration pending.<br />beyonddisintegration.com
          </div>
        </div>
        {[
          { h:"Organisation", links:[{l:"About Us",p:"about"},{l:"Who We Are",p:"who"},{l:"Research",p:"research"},{l:"Stories",p:"stories"},{l:"Quotes",p:"quotes"}] },
          { h:"Get Involved", links:[{l:"Donate",p:"donate"},{l:"Volunteer",p:"involve"},{l:"Partnerships",p:"involve"},{l:"Community",p:"community"},{l:"Contact",p:"contact"}] },
          { h:"Legal", links:[{l:"Privacy Policy"},{l:"Cookie Policy"},{l:"GDPR Statement"},{l:"Safeguarding"},{l:"Accessibility"}] },
        ].map(col => (
          <div key={col.h}>
            <div className="jakarta" style={{ fontSize: ".64rem", letterSpacing: ".18em", textTransform: "uppercase", color: T.amber, fontWeight: 700, marginBottom: 16, textAlign: "center" }}>{col.h}</div>
            {col.links.map(l => (
              <button key={l.l} onClick={() => l.p && navigate(l.p)}
                className="jakarta"
                style={{ display: "block", width: "100%", background: "none", border: "none", color: "rgba(253,250,244,.45)", cursor: "pointer", padding: "4px 0", fontSize: ".84rem", transition: "color .2s", textAlign: "center" }}
                onMouseEnter={e => e.currentTarget.style.color = T.white}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(253,250,244,.45)"}
              >{l.l}</button>
            ))}
          </div>
        ))}
      </div>      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
        <div className="jakarta" style={{ fontSize: ".7rem", color: "#ffffff", lineHeight: 1.7 }}>
          © 2026 Beyond Disintegration. All rights reserved.<br />
          Charity registration pending · Charity Commission for England & Wales · WCAG 2.1 AA
        </div>
        <button onClick={openDonate}
          style={{ background: T.red, color: T.white, border: "2px solid transparent", borderRadius: 4, padding: "10px 24px", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: ".76rem", letterSpacing: ".06em", textTransform: "uppercase", cursor: "pointer", transition: "all .22s" }}
          onMouseEnter={e => { e.currentTarget.style.background = T.redDark; }}
          onMouseLeave={e => { e.currentTarget.style.background = T.red; }}
        >Donate Now</button>
      </div>
    </div>
  </footer>
);

/* ─── APP ────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage]     = useState("home");
  const [modal, setModal]   = useState(false);
  const [scrolled, setSc]   = useState(false);
  const [toast, setToast]   = useState({ visible: false, msg: "", error: false });
  const timer = useRef(null);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  useEffect(() => {
    const h = () => setSc(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navigate = useCallback(p => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const openDonate = useCallback(() => setModal(true), []);

  const showToast = useCallback((msg, error = false) => {
    clearTimeout(timer.current);
    setToast({ visible: true, msg, error });
    timer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 5000);
  }, []);

  const PAGES = {
    home:      <Home       navigate={navigate} openDonate={openDonate} />,
    about:     <About      navigate={navigate} openDonate={openDonate} />,
    who:       <Who />,
    research:  <Research />,
    stories:   <Stories    openDonate={openDonate} />,
    quotes:    <Quotes />,
    involve:   <Involve    navigate={navigate} openDonate={openDonate} />,
    donate:    <Donate />,
    community: <Community  showToast={showToast} />,
    contact:   <Contact    showToast={showToast} />,
  };

  return (
    <div style={{ minHeight: "100vh", background: T.cream }}>
      {/* Skip link */}
      <a href="#main" style={{
        position: "absolute", top: -100, left: 16, zIndex: 10000,
        background: T.red, color: T.white, padding: "9px 16px",
        borderRadius: 4, fontWeight: 700, textDecoration: "none",
        fontFamily: "'Plus Jakarta Sans',sans-serif", transition: "top .2s",
      }}
        onFocus={e => e.currentTarget.style.top = "16px"}
        onBlur={e => e.currentTarget.style.top = "-100px"}
      >Skip to main content</a>

      <Nav navigate={navigate} openDonate={openDonate} scrolled={scrolled} />

      <main id="main" style={{ paddingTop: 64 }}>
        {PAGES[page] || PAGES.home}
      </main>

      <Footer navigate={navigate} openDonate={openDonate} />
      <DonateModal open={modal} onClose={() => setModal(false)} showToast={showToast} />
      <Toast t={toast} />
    </div>
  );
}
