import { useState, useEffect, useRef, useCallback } from "react";
import BDLogoColour from "./assets/BDLogo_colour.png";
import BDLogoLight from "./assets/BDLogo_onecolour_light.png";

// Beyond Disintegration — Tailwind v4 Version

/* ─── Animated Counter ─────────────────────────────────────────── */
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
    }, { threshold: 0.5 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [to, dur]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
};

/* ─── Shared Atoms ──────────────────────────────────────────────── */
const Eyebrow = ({ children, color = "blue" }) => (
  <div className={`flex items-center gap-2.5 mb-3 font-mont text-[0.66rem] tracking-[0.22em] uppercase font-bold ${color === "blue" ? "text-[#3D3B8E]" : "text-[#7B78C8]"}`}>
    <span className={`w-5 h-0.5 flex-shrink-0 ${color === "blue" ? "bg-[#3D3B8E]" : "bg-[#7B78C8]"}`} />
    {children}
  </div>
);

const Headline = ({ children, size = "lg", className = "" }) => {
  const sizes = {
    xl: "text-[clamp(3.2rem,7vw,6rem)]",
    lg: "text-[clamp(2rem,4vw,3.5rem)]",
    md: "text-[clamp(1.6rem,3vw,2.5rem)]",
    sm: "text-[clamp(1.3rem,2.5vw,1.8rem)]",
  };
  return (
    <h2 className={`font-mont font-extrabold text-[#1A1A2E] leading-[1.15] mb-5 ${sizes[size]} ${className}`}>
      {children}
    </h2>
  );
};

const BodyText = ({ children, className = "" }) => (
  <p className={`font-mont text-[0.97rem] text-[#6B6B8A] leading-[1.85] font-normal ${className}`}>
    {children}
  </p>
);

const BtnBlue = ({ children, onClick, full = false, className = "" }) => (
  <button
    onClick={onClick}
    className={`font-mont font-bold text-[0.83rem] tracking-[0.06em] uppercase text-white bg-[#3D3B8E] border-2 border-[#3D3B8E] rounded-md px-7 py-3 transition-all duration-200 hover:bg-[#2E2C6E] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#2E2C6E] cursor-pointer ${full ? "w-full" : ""} ${className}`}
  >{children}</button>
);

const BtnOutline = ({ children, onClick, dark = false, className = "" }) => (
  <button
    onClick={onClick}
    className={`font-mont font-semibold text-[0.83rem] tracking-[0.06em] uppercase rounded-md px-7 py-3 border-2 transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer ${dark
      ? "border-[#1A1A2E] text-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-white hover:shadow-[4px_4px_0_#1A1A2E]"
      : "border-[#3D3B8E] text-[#3D3B8E] hover:bg-[#3D3B8E] hover:text-white hover:shadow-[4px_4px_0_#3D3B8E]"
    } ${className}`}
  >{children}</button>
);

const BtnLav = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`font-mont font-bold text-[0.83rem] tracking-[0.06em] uppercase text-white bg-[#7B78C8] border-2 border-[#7B78C8] rounded-md px-7 py-3 transition-all duration-200 hover:bg-[#3D3B8E] hover:border-[#3D3B8E] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#3D3B8E] cursor-pointer ${className}`}
  >{children}</button>
);

const Card = ({ children, className = "", lavender = false, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white border border-[#DCDAEC] rounded-lg transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 ${lavender
      ? "hover:border-[#7B78C8] hover:shadow-[4px_4px_0_#7B78C8]"
      : "hover:border-[#3D3B8E] hover:shadow-[4px_4px_0_#3D3B8E]"
    } ${onClick ? "cursor-pointer" : ""} ${className}`}
  >{children}</div>
);

/* ─── Page Hero ─────────────────────────────────────────────────── */
const PageHero = ({ eyebrow, title, subtitle }) => (
  <div className="bg-[#2D2D3A] py-28 pt-36 relative overflow-hidden">
    <div className="absolute top-[-100px] right-[-80px] w-96 h-96 rounded-full border-2 border-[#3D3B8E] opacity-20" />
    <div className="absolute bottom-[-60px] left-[30%] w-48 h-48 rounded-full border-2 border-[#7B78C8] opacity-15" />
    <div className="max-w-6xl mx-auto px-7 relative z-10">
      <Eyebrow color="lav">{eyebrow}</Eyebrow>
      <h1 className="font-mont font-extrabold text-white leading-[1.1] max-w-2xl mb-5 text-[clamp(2.8rem,6vw,5rem)] animate-[fadeUp_0.65s_ease_both]">
        {title}
      </h1>
      {subtitle && (
        <p className="font-mont text-white/60 text-[1.05rem] font-normal max-w-lg leading-[1.75]">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

/* ─── Navigation ────────────────────────────────────────────────── */
const NAV = [
  { l: "About",       p: "about"     },
  { l: "Who We Are",  p: "who"       },
  { l: "Research",    p: "research"  },
  { l: "Stories",     p: "stories"   },
  { l: "Get Involved",p: "involve"   },
  { l: "Community",   p: "community" },
  { l: "Contact",     p: "contact"   },
];

const Nav = ({ navigate, scrolled }) => {
  const [mob, setMob] = useState(false);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] backdrop-blur-md transition-all duration-300 border-b ${scrolled ? "bg-white border-[#DCDAEC]" : "bg-white/97 border-[#ECEAF5]"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-[68px]">

        {/* Logo */}
        <button onClick={() => navigate("home")} className="bg-none border-none cursor-pointer flex items-center gap-2.5 p-0">
          <img
            src={BDLogoColour}
            alt="Beyond Disintegration"
            className="h-11 w-auto object-contain"
            onError={e => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback */}
          <div className="hidden items-center gap-2">
            <div className="w-9 h-9 bg-[#3D3B8E] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-extrabold text-xs">BD</span>
            </div>
            <div>
              <div className="font-mont text-[0.9rem] font-extrabold text-[#1A1A2E] leading-tight">Beyond Disintegration</div>
              <div className="font-mont text-[0.58rem] tracking-[0.12em] uppercase text-[#6B6B8A]">Research Charity</div>
            </div>
          </div>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV.map(i => (
            <button
              key={i.p}
              onClick={() => navigate(i.p)}
              className="font-mont text-[0.78rem] font-semibold tracking-[0.05em] uppercase text-[#6B6B8A] bg-none border-none cursor-pointer py-1 relative transition-colors duration-200 hover:text-[#1A1A2E] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-0.5 after:bg-[#3D3B8E] after:transition-all after:duration-250 hover:after:w-full"
            >{i.l}</button>
          ))}
          <button
            onClick={() => navigate("contact")}
            className="font-mont font-bold text-[0.75rem] tracking-[0.06em] uppercase text-white bg-[#3D3B8E] border-2 border-[#3D3B8E] rounded-md px-5 py-2 transition-all duration-200 hover:bg-[#2E2C6E] cursor-pointer"
          >Get In Touch</button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMob(o => !o)}
          className="md:hidden flex flex-col gap-1.5 bg-none border-none cursor-pointer p-1"
        >
          {[0, 1, 2].map(i => (
            <span key={i} className={`block w-5 h-0.5 bg-[#1A1A2E] rounded transition-all duration-300 ${mob && i === 1 ? "opacity-0" : ""} ${mob && i === 0 ? "rotate-45 translate-x-0.5 translate-y-2" : ""} ${mob && i === 2 ? "-rotate-45 translate-x-0.5 -translate-y-2" : ""}`} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {mob && (
        <div className="md:hidden bg-white border-t border-[#DCDAEC] px-6 pb-6 pt-4">
          {NAV.map(i => (
            <button
              key={i.p}
              onClick={() => { navigate(i.p); setMob(false); }}
              className="block w-full text-left bg-none border-none border-b border-[#ECEAF5] py-3 font-mont text-[0.93rem] text-[#2D2D4E] cursor-pointer"
            >{i.l}</button>
          ))}
          <BtnBlue onClick={() => { navigate("contact"); setMob(false); }} full className="mt-3.5">
            Get In Touch
          </BtnBlue>
        </div>
      )}
    </nav>
  );
};

/* ─── HOME ──────────────────────────────────────────────────────── */
const Home = ({ navigate }) => (
  <div className="animate-[fadeIn_0.35s_ease]">

    {/* Hero */}
    <section className="min-h-screen bg-[#F8F8FC] relative overflow-hidden flex flex-col justify-center pt-[68px]">
      <div className="absolute top-[8%] right-[4%] w-[420px] h-[420px] rounded-full bg-[#3D3B8E] opacity-5" />
      <div className="absolute top-[15%] right-[8%] w-[280px] h-[280px] rounded-full border-2 border-[#3D3B8E] opacity-10" />
      <div className="absolute bottom-[10%] left-[2%] w-40 h-40 rounded-full border-2 border-[#7B78C8] opacity-15" />

      <div className="max-w-6xl mx-auto px-7 py-16 relative z-10 w-full">
        <div className="flex items-center gap-4 text-[0.7rem] tracking-[0.18em] uppercase text-[#6B6B8A] mb-9 font-mont font-semibold animate-[fadeUp_0.65s_ease_both]">
          <span className="w-8 h-px bg-[#DCDAEC]" />
          <span>Parent-Led Organisation</span>
          <span className="w-8 h-px bg-[#DCDAEC]" />
          <span className="text-[#3D3B8E]">England &amp; Wales</span>
        </div>

        <h1 className="font-mont font-extrabold text-[#1A1A2E] leading-[1.05] max-w-[900px] mb-8 text-[clamp(3rem,7vw,6rem)] animate-[fadeUp_0.65s_0.12s_ease_both]">
          When a child's world<br />
          falls{" "}
          <em className="not-italic text-[#3D3B8E]">silent,</em>
          <br />
          <span className="text-[70%] text-[#6B6B8A] font-normal">
            we find the{" "}
            <em className="not-italic text-[#7B78C8] font-semibold">answers.</em>
          </span>
        </h1>

        <div className="max-w-[580px] mb-11 animate-[fadeUp_0.65s_0.24s_ease_both]">
          <BodyText>
            Beyond Disintegration brings hope through medical research into unexplained
            catastrophic developmental regression in children , one of medicine's most
            devastating and underrecognised crises. We exist because these children deserve answers.
          </BodyText>
        </div>

        <div className="flex gap-3.5 flex-wrap mb-14 animate-[fadeUp_0.65s_0.36s_ease_both]">
          <BtnBlue onClick={() => navigate("about")}>Discover Our Mission</BtnBlue>
          <BtnOutline onClick={() => navigate("involve")}>Get Involved</BtnOutline>
          <BtnLav onClick={() => navigate("research")}>View Research</BtnLav>
        </div>

        {/* Registration notice */}
        <div className="bg-white border border-[#DCDAEC] border-l-4 border-l-[#3D3B8E] rounded-lg p-5 max-w-[520px] animate-[fadeUp_0.65s_0.36s_ease_both]">
          <div className="font-mont text-[0.68rem] tracking-[0.12em] uppercase text-[#3D3B8E] font-bold mb-2">
            🏛 Charity Registration In Progress
          </div>
          <BodyText className="text-[0.85rem]">
            Beyond Disintegration is currently registering as a Charitable Incorporated
            Organisation (CIO) in England and Wales. Donations will open once registration
            is complete. Contact us to be notified.
          </BodyText>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#6B6B8A]">
        <div className="w-px h-10 bg-gradient-to-b from-[#3D3B8E] to-transparent" />
        <span className="font-mont text-[0.58rem] tracking-[0.2em] uppercase">Scroll</span>
      </div>
    </section>

    {/* Stats Band */}
    <div className="bg-[#2D2D3A]">
      <div className="max-w-6xl mx-auto px-7 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {[
            { n: 100000, pre: "1 in ", suf: "", l: "Children estimated affected" },
            { n: 70,     pre: "", suf: "%", l: "Cases remain poorly understood" },
            { n: 2,      pre: "~", suf: " per 100k", l: "Historical CDD prevalence" },
            { n: 0,      pre: "", suf: "", l: "Urgent research needed" },
          ].map((s, i) => (
            <div key={i} className={`py-8 px-7 text-center ${i < 3 ? "border-r border-white/8" : ""}`}>
              <div className="font-mont text-[2.4rem] font-extrabold text-white leading-none mb-2.5">
                {i === 3 ? "No Known Cure" : <Counter to={s.n} prefix={s.pre} suffix={s.suf} />}
              </div>
              <div className="font-mont text-[0.72rem] tracking-[0.1em] uppercase text-white/70">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* About Split */}
    <section className="py-24 bg-[#F8F8FC]">
      <div className="max-w-6xl mx-auto px-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[72px] items-start">
          <div>
            <Eyebrow>The Condition</Eyebrow>
            <Headline>
              A child's world, erased{" "}
              <em className="not-italic text-[#3D3B8E]">without warning</em>
            </Headline>
            <BodyText className="mb-4">
              Some children experience profound developmental regression , skills that were once
              secure begin to disappear. Language fades. Social connection weakens. Play stops.
              Awareness of the world around them can seem to diminish.
            </BodyText>
            <BodyText className="mb-8">
              This loss may occur suddenly over days or weeks, or gradually across several months.
              After extensive investigation, many children are diagnosed within the autism spectrum,
              yet their presentations appear clinically distinct. Without targeted research,
              meaningful answers remain limited.
            </BodyText>
            <div className="flex gap-3 flex-wrap">
              <BtnBlue onClick={() => navigate("about")}>Read Our Mission</BtnBlue>
              <BtnOutline onClick={() => navigate("research")} dark>View Research</BtnOutline>
            </div>
          </div>

          <div>
            {[
              { n: "01", t: "Scientific Research", d: "Raising funds to support early-stage medical and scientific research into causes, mechanisms, and outcomes of catastrophic developmental regression." },
              { n: "02", t: "Family Connection", d: "Building a network of families affected by catastrophic regression, offering connection, shared knowledge, and collective advocacy." },
              { n: "03", t: "Raising Awareness", d: "Increasing awareness among clinicians, researchers, policymakers, and the wider public about this devastating and underrecognised condition." },
              { n: "04", t: "Research Pathways", d: "Supporting development of future research exploring neurological, genetic, metabolic, immunological, and encephalopathic causes." },
            ].map(c => (
              <div key={c.n} className="flex gap-5 py-5 border-b border-[#ECEAF5] items-start">
                <span className="font-mont text-[1.2rem] text-[#3D3B8E] opacity-50 leading-none flex-shrink-0 min-w-[36px] font-extrabold">{c.n}</span>
                <div>
                  <div className="font-mont text-[0.88rem] font-bold text-[#1A1A2E] mb-1.5">{c.t}</div>
                  <BodyText className="text-[0.85rem]">{c.d}</BodyText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Pullquote */}
    <section className="bg-[#3D3B8E] py-[72px]">
      <div className="max-w-[900px] mx-auto px-7 text-center">
        <div className="font-mont text-[6rem] text-white leading-none opacity-20 mb-[-24px] font-extrabold">&ldquo;</div>
        <blockquote className="font-mont text-[clamp(1.2rem,2.5vw,1.8rem)] font-normal text-white leading-[1.6] italic mb-8">
          Emmett is still in there, and his story deserves to be more than a footnote in a broad spectrum.
        </blockquote>
        <div className="flex items-center justify-center gap-3.5">
          <div className="w-11 h-11 rounded-full border-2 border-white/40 flex items-center justify-center font-mont text-[0.8rem] text-white flex-shrink-0 font-bold">E</div>
          <div className="text-left">
            <div className="font-mont text-white font-bold text-[0.88rem]">Parent of Emmett</div>
            <div className="font-mont text-white/55 text-[0.75rem]">Beyond Disintegration Community</div>
          </div>
        </div>
      </div>
    </section>

    {/* Latest Research */}
    <section className="py-22 bg-[#F0EFF8]">
      <div className="max-w-6xl mx-auto px-7">
        <div className="flex justify-between items-end mb-12 flex-wrap gap-4 border-b-2 border-[#1A1A2E] pb-4">
          <div>
            <Eyebrow>Latest Research</Eyebrow>
            <Headline size="md" className="mb-0">Key Publications</Headline>
          </div>
          <BtnOutline onClick={() => navigate("research")} dark className="text-[0.76rem] py-2 px-5">
            All Publications →
          </BtnOutline>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { tag: "Research · 2025", title: "Towards an Agreed Approach to Investigate Children with Developmental Regression", body: "A consensus study proposing structured clinical pathways for investigating children presenting with developmental regression.", authors: "Furley K, Hunter MF et al.", color: "bg-[#3D3B8E]" },
            { tag: "Research · 2023", title: "Developmental Regression in Children: Current and Future Directions", body: "A comprehensive review exploring causes, clinical definitions, and investigation strategies for developmental regression.", authors: "Furley K, Mehra C et al.", color: "bg-[#7B78C8]" },
            { tag: "Research · 2018", title: "Childhood Disintegrative Disorder and Autism Spectrum Disorder: A Systematic Review", body: "Examining childhood disintegrative disorder and its relationship to ASD, highlighting differences in severity and presentation.", authors: "Mehra C, Sil A et al.", color: "bg-[#B8B5E0]" },
          ].map((c, i) => (
            <Card key={i} onClick={() => navigate("research")} className="overflow-hidden">
              <div className={`h-1 ${c.color}`} />
              <div className="p-5 pb-4">
                <span className="font-mont text-[0.63rem] tracking-[0.14em] uppercase text-[#3D3B8E] font-bold">{c.tag}</span>
                <h3 className="font-mont text-[1rem] text-[#1A1A2E] mt-3 mb-2.5 leading-[1.4] font-bold">{c.title}</h3>
                <BodyText className="text-[0.84rem] mb-2.5">{c.body}</BodyText>
                <div className="font-mont text-[0.75rem] text-[#6B6B8A]">{c.authors}</div>
              </div>
              <div className="px-5 py-3 border-t border-[#ECEAF5]">
                <span className="font-mont text-[0.73rem] text-[#3D3B8E] font-bold">Read more →</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-[#7B78C8] py-[72px] relative overflow-hidden">
      <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full border-2 border-white/15" />
      <div className="max-w-6xl mx-auto px-7 relative z-10">
        <div className="flex items-center justify-between gap-8 flex-wrap">
          <div>
            <Headline className="text-white mb-2.5">
              Ready to be part of the <em className="not-italic">solution?</em>
            </Headline>
            <p className="font-mont text-white/80 text-[1rem] font-normal max-w-[440px] leading-[1.7]">
              Get involved, share our mission, or connect with our community.
              Together we can build recognition and drive research forward.
            </p>
          </div>
          <div className="flex gap-3.5 flex-wrap">
            <button
              onClick={() => navigate("involve")}
              className="font-mont font-bold text-[0.83rem] tracking-[0.06em] uppercase text-white border-2 border-white/70 rounded-md px-7 py-3 bg-transparent transition-all duration-200 hover:bg-white hover:text-[#7B78C8] cursor-pointer"
            >Get Involved</button>
            <button
              onClick={() => navigate("community")}
              className="font-mont font-semibold text-[0.83rem] tracking-[0.06em] uppercase text-white border-2 border-white/30 rounded-md px-7 py-3 bg-transparent transition-all duration-200 hover:bg-white/15 cursor-pointer"
            >Join Community</button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

/* ─── ABOUT ──────────────────────────────────────────────────────── */
const About = ({ navigate }) => (
  <div className="animate-[fadeIn_0.35s_ease]">
    <PageHero eyebrow="About Us" title="Our Mission, Vision & Purpose" subtitle="We exist because a devastating condition demands urgent answers and affected families deserve more than silence." />

    <section className="py-22">
      <div className="max-w-6xl mx-auto px-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="w-14 h-0.5 bg-[#3D3B8E] mb-5" />
            <Eyebrow>Our Mission</Eyebrow>
            <Headline size="md">Why we <em className="not-italic text-[#3D3B8E]">exist</em></Headline>
            <BodyText className="mb-4">
              Beyond Disintegration is a parent-led organisation, currently in the process of
              registering as a UK Charitable Incorporated Organisation (CIO), with the hope of
              developing international reach and impact.
            </BodyText>
            <BodyText className="mb-4">
              We were brought together by a shared and devastating experience. Our children were
              developing beautifully, reaching milestones, learning language, connecting with the
              world. Then, at some point in early childhood, something changed.
            </BodyText>
            <BodyText className="mb-7">
              Our mission: to raise awareness of unexplained catastrophic developmental regression
              in children and to fund medical and scientific research that improves understanding,
              recognition, and future outcomes for affected children and families.
            </BodyText>
            <div className="bg-[#ECEAF5] border border-[#DCDAEC] border-l-4 border-l-[#7B78C8] rounded-lg p-5">
              <div className="font-mont text-[0.68rem] tracking-[0.14em] uppercase text-[#7B78C8] font-bold mb-2">🏛 Charity Registration In Progress</div>
              <BodyText className="text-[0.85rem]">
                Beyond Disintegration is in the process of formal registration with the Charity Commission for England and Wales. At present, we are not accepting donations until registration is complete.
              </BodyText>
            </div>
          </div>
          <div>
            <div className="w-14 h-0.5 bg-[#7B78C8] mb-5" />
            <Eyebrow color="lav">The Condition</Eyebrow>
            <Headline size="md">Understanding the <em className="not-italic text-[#7B78C8]">crisis</em></Headline>
            <BodyText className="mb-4">Childhood Disintegrative Disorder (CDD), also known as Heller's syndrome, was historically recognised as a distinct developmental condition characterised by profound loss of previously acquired language, social, and motor skills following a period of typical early development.</BodyText>
            <BodyText className="mb-4">In modern diagnostic systems including DSM-5, CDD was removed as a separate diagnosis and absorbed into Autism Spectrum Disorder. While the children affected have not disappeared, the removal of a distinct diagnostic identity has reduced visibility of this group within research and clinical classification.</BodyText>
            <BodyText>Beyond Disintegration exists to change this through recognition, research, and collaboration, we believe meaningful progress is possible.</BodyText>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#F0EFF8] py-[72px]">
      <div className="max-w-6xl mx-auto px-7">
        <Eyebrow>Key Facts</Eyebrow>
        <Headline>What the <em className="not-italic text-[#3D3B8E]">evidence shows</em></Headline>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-9">
          {[
            { ic: "📋", t: "CDD Was a Recognised Diagnosis", d: "Childhood Disintegrative Disorder was a distinct diagnosis in earlier DSM editions, now absorbed into ASD reducing research visibility for this group." },
            { ic: "⚡", t: "Profound and Disabling", d: "Severe regression involving loss of language, social skills, and independence after normal development is rare but devastating. Historically estimated at 1-2 per 100,000 children." },
            { ic: "📉", t: "Outcomes Are Often Severe", d: "Many children do not regain lost language or functional independence and require ongoing, lifelong support." },
            { ic: "🔬", t: "No Known Cure", d: "There is currently no known cure for catastrophic developmental regression once it has occurred. Interventions focus on supportive therapies and symptom management." },
            { ic: "📚", t: "Research Remains Limited", d: "Research specifically focused on profound developmental regression remains limited and often involves small patient cohorts." },
            { ic: "🎯", t: "Subgroup Recognition Is Essential", d: "Without subgroup recognition, important biological differences may remain hidden and opportunities to develop targeted treatments are lost." },
          ].map(v => (
            <Card key={v.t} className="p-6">
              <div className="text-[1.6rem] mb-3.5">{v.ic}</div>
              <div className="font-mont text-[0.9rem] font-bold text-[#1A1A2E] mb-2">{v.t}</div>
              <BodyText className="text-[0.85rem]">{v.d}</BodyText>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="max-w-[800px] mx-auto px-7">
        <Eyebrow>Our Story</Eyebrow>
        <Headline size="md">How Beyond Disintegration <em className="not-italic text-[#3D3B8E]">began</em></Headline>
        <BodyText className="mb-4">Soraya Willis is the founder of Beyond Disintegration and a parent to a child who experienced unexplained catastrophic developmental regression.</BodyText>
        <BodyText className="mb-4">Like many families, our journey began with hope. Our children were developing, learning, speaking, and engaging with the world as expected. Then, without clear cause, those skills began to disappear.</BodyText>
        <BodyText className="mb-4">What followed was a long and often distressing search for answers. As we connected with other families across the UK and internationally, it became clear that these cases were rare, severe, and under-recognised.</BodyText>
        <BodyText className="mb-8">Beyond Disintegration was founded to help change that. This organisation exists because of our children, and because of the belief that <em>unexplained should never mean unexplored.</em></BodyText>
        <BtnBlue onClick={() => navigate("who")}>Meet Our Team</BtnBlue>
      </div>
    </section>
  </div>
);

/* ─── WHO WE ARE ─────────────────────────────────────────────────── */
const Who = () => (
  <div className="animate-[fadeIn_0.35s_ease]">
    <PageHero eyebrow="Who We Are" title="The people behind the mission" subtitle="Trustees, medical advisors, and community leaders united by purpose." />

    <section className="py-22">
      <div className="max-w-6xl mx-auto px-7">
        <Eyebrow>Trustees</Eyebrow>
        <Headline>Our <em className="not-italic text-[#3D3B8E]">founding board</em></Headline>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-9">
          {[
            { init: "SW", n: "Soraya Willis", r: "Founder · Trustee (Founding Chair)", b: "Founder of Beyond Disintegration and parent to a child who experienced unexplained catastrophic developmental regression." },
            { init: "JW", n: "Jane Woolner",  r: "Trustee (Treasurer)", b: "Trustee responsible for financial governance and accountability of the organisation." },
            { init: "MK", n: "Morolu Kocsis", r: "Trustee (Legal)", b: "Trustee providing legal oversight and governance support to the organisation." },
          ].map(p => (
            <Card key={p.n} className="overflow-hidden">
              <div className="h-24 bg-[#2D2D3A] flex items-center justify-center relative">
                <div className="w-[60px] h-[60px] rounded-full border-2 border-[#3D3B8E] flex items-center justify-center font-mont text-[1.2rem] font-extrabold text-white">{p.init}</div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3D3B8E]" />
              </div>
              <div className="p-4">
                <div className="font-mont text-[0.96rem] font-bold text-[#1A1A2E] mb-1">{p.n}</div>
                <div className="font-mont text-[0.64rem] tracking-[0.1em] uppercase text-[#3D3B8E] font-bold mb-2.5">{p.r}</div>
                <BodyText className="text-[0.82rem]">{p.b}</BodyText>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-[#F0EFF8] py-16">
      <div className="max-w-6xl mx-auto px-7">
        <Eyebrow color="lav">Medical &amp; Scientific Advisory Board</Eyebrow>
        <Headline>Clinical <em className="not-italic text-[#7B78C8]">&amp; research advisors</em></Headline>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {[
            { init: "CW", n: "Dr Christian Winiger, BMBS BMedSci", r: "Medical Director & Safeguarding Lead", b: "Medical Director overseeing clinical governance and safeguarding responsibilities." },
            { init: "KS", n: "Dr Kamlesh Sheth", r: "Scientific Mentor & Strategic Advisor", b: "Providing scientific mentorship and strategic advisory support to the organisation's research direction." },
            { init: "WB", n: "Dr Wasan Bajallan, MBBS MRCPsych", r: "Clinical Advisor (Psychiatry)", b: "Clinical advisor with specialist psychiatric expertise supporting the organisation's clinical work." },
          ].map(p => (
            <Card key={p.n} lavender className="p-6 flex gap-4 items-start">
              <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full border-2 border-[#7B78C8] flex items-center justify-center font-mont text-[0.9rem] font-extrabold text-[#7B78C8]">{p.init}</div>
              <div>
                <div className="font-mont text-[0.9rem] font-bold text-[#1A1A2E] mb-1">{p.n}</div>
                <div className="font-mont text-[0.63rem] tracking-[0.1em] uppercase text-[#7B78C8] font-bold mb-2">{p.r}</div>
                <BodyText className="text-[0.82rem]">{p.b}</BodyText>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16">
      <div className="max-w-6xl mx-auto px-7">
        <Eyebrow>Community Leadership</Eyebrow>
        <Headline>Our <em className="not-italic text-[#3D3B8E]">community team</em></Headline>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          {[
            { init: "AW", n: "Alexis Wilson", r: "Director of Community Advocacy", b: "Leading community advocacy, supporting families and building the voice of the Beyond Disintegration community." },
            { init: "RP", n: "Rachel Parker",  r: "Social Media Lead", b: "Managing Beyond Disintegration's social media presence and public communications." },
          ].map(p => (
            <Card key={p.n} className="p-6 flex gap-4 items-start">
              <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full border-2 border-[#3D3B8E] flex items-center justify-center font-mont text-[0.9rem] font-extrabold text-[#3D3B8E]">{p.init}</div>
              <div>
                <div className="font-mont text-[0.92rem] font-bold text-[#1A1A2E] mb-1">{p.n}</div>
                <div className="font-mont text-[0.63rem] tracking-[0.1em] uppercase text-[#3D3B8E] font-bold mb-2">{p.r}</div>
                <BodyText className="text-[0.82rem]">{p.b}</BodyText>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 bg-[#ECEAF5] border border-[#DCDAEC] border-l-4 border-l-[#7B78C8] rounded-lg p-6">
          <div className="font-mont text-[0.82rem] font-bold text-[#1A1A2E] mb-2.5">Community &amp; Volunteer Network</div>
          <BodyText className="text-[0.85rem]">Beyond Disintegration is supported by a growing network of parent volunteers, families, and supporters who contribute their time, ideas, and lived experience to help shape and strengthen our work.</BodyText>
        </div>
      </div>
    </section>
  </div>
);

/* ─── RESEARCH ───────────────────────────────────────────────────── */
const Research = () => {
  const [filter, setFilter] = useState("all");
  const papers = [
    { type: "research", tag: "Developmental Medicine & Child Neurology · 2025", title: "Towards an Agreed Approach to Investigate Children with Developmental Regression", authors: "Furley K, Hunter MF, Gawade G, Williams K and colleagues", body: "A consensus study proposing structured clinical pathways for investigating children presenting with developmental regression.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12506058/" },
    { type: "research", tag: "Developmental Medicine & Child Neurology · 2023", title: "Developmental Regression in Children: Current and Future Directions", authors: "Furley K, Mehra C, Kochel RP, Absoud M and colleagues", body: "A comprehensive review exploring causes, clinical definitions, and investigation strategies for developmental regression.", url: "https://pubmed.ncbi.nlm.nih.gov/37839389/" },
    { type: "research", tag: "Developmental Medicine & Child Neurology · 2018", title: "Childhood Disintegrative Disorder and Autism Spectrum Disorder: A Systematic Review", authors: "Mehra C, Sil A, Hedderly T, Kyriakopoulos M, Baird G, Absoud M and colleagues", body: "A systematic review examining childhood disintegrative disorder and its relationship to ASD.", url: "https://doi.org/10.1111/dmcn.14126" },
    { type: "research", tag: "PubMed · 2021", title: "Childhood Disintegrative Disorder (CDD): Symptomatology of the Norwegian Patient Population", authors: "Norwegian CDD Study", body: "Study examining the symptomatology and family experience of CDD in the Norwegian patient population.", url: "https://pubmed.ncbi.nlm.nih.gov/33934283/" },
    { type: "research", tag: "Archives of Disease in Childhood · 2022", title: "Social Determinants and Inequality in Neurodevelopmental Conditions", authors: "Absoud M", body: "A review exploring how healthcare inequality and access influence outcomes for children with neurodevelopmental conditions.", url: "https://pubmed.ncbi.nlm.nih.gov/36302394/" },
    { type: "media", tag: "Irish Times · Feb 2022", title: "Victoria White : Personal Account", authors: "Victoria White, mother", body: "A personal account published in the Irish Times exploring a family's experience of childhood developmental regression.", url: "#" },
    { type: "books", tag: "Book", title: "When Autism Strikes on Families Cope with Childhood Disintegrative Disorder", authors: "Robert A. Catalano, MD", body: "A medical author's account exploring how families navigate childhood disintegrative disorder.", url: "#" },
    { type: "books", tag: "Book", title: "Mommy Will Help Me", authors: "Alexis Wilson", body: "A personal account by Alexis Wilson, Director of Community Advocacy at Beyond Disintegration.", url: "#" },
  ];
  const shown = filter === "all" ? papers : papers.filter(p => p.type === filter);

  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <PageHero eyebrow="Research & Resources" title="The science of understanding" subtitle="A curated library of academic research, clinical publications, and family resources." />
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-7">
          <div className="flex gap-2 flex-wrap mb-10">
            {["all", "research", "media", "books"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`font-mont text-[0.74rem] font-semibold tracking-[0.07em] capitalize px-4 py-2 rounded-md border transition-all duration-200 cursor-pointer ${filter === f ? "bg-[#3D3B8E] text-white border-[#3D3B8E]" : "bg-transparent text-[#2D2D4E] border-[#DCDAEC] hover:border-[#3D3B8E]"}`}
              >{f === "all" ? "All Publications" : f.charAt(0).toUpperCase() + f.slice(1)}</button>
            ))}
          </div>
          {shown.map((p, i) => (
            <Card key={i} className="mb-4 overflow-hidden">
              <div className="p-6 flex justify-between gap-7 flex-wrap items-start">
                <div className="flex-1 min-w-[260px]">
                  <span className="font-mont bg-[rgba(61,59,142,0.08)] text-[#3D3B8E] border border-[#3D3B8E] px-2.5 py-0.5 rounded text-[0.62rem] font-bold tracking-[0.1em] uppercase inline-block mb-3">{p.tag}</span>
                  <h3 className="font-mont text-[1.1rem] text-[#1A1A2E] mb-2 leading-[1.4] font-bold">{p.title}</h3>
                  <BodyText className="text-[0.85rem] mb-2.5">{p.body}</BodyText>
                  <div className="font-mont text-[0.74rem] text-[#6B6B8A]">✍ {p.authors}</div>
                </div>
                {p.url && p.url !== "#" && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-[rgba(61,59,142,0.08)] border border-[#3D3B8E] rounded px-4 py-2 text-[#3D3B8E] font-mont text-[0.72rem] font-semibold tracking-[0.07em] no-underline uppercase hover:bg-[#3D3B8E] hover:text-white transition-all duration-200"
                  >Read Article →</a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

/* ─── STORIES ────────────────────────────────────────────────────── */
const Stories = () => (
  <div className="animate-[fadeIn_0.35s_ease]">
    <PageHero eyebrow="Lived Experience" title="Voices that matter" subtitle="Poems, reflections, and quotes from families living with unexplained catastrophic developmental regression." />
    <section className="py-20">
      <div className="max-w-[880px] mx-auto px-7">
        <div className="bg-[#ECEAF5] border border-[#DCDAEC] border-l-4 border-l-[#7B78C8] rounded-lg px-4 py-3 mb-11">
          <BodyText className="text-[0.81rem]">🛡️ All content is shared with full informed consent. Where personal stories, images, or videos are shared, informed consent has been obtained from the individuals or families involved.</BodyText>
        </div>

        {/* Poem */}
        <div className="bg-white border border-[#DCDAEC] border-l-4 border-l-[#3D3B8E] rounded-lg p-9 mb-7">
          <Eyebrow>Poem</Eyebrow>
          <pre className="font-mont text-[1rem] text-[#2D2D4E] leading-[2.1] italic mb-6 whitespace-pre-line">{`Years ago, there was a boy,
Full of life and bringing joy.
But bit by bit, like slipping sand,
He vanished from our outstretched hand.

First, his voice, then eyes went cold,
A shadow of the boy we'd hold.
We'd call his name, he wouldn't hear,
Each passing day, he'd disappear.

Like puzzle pieces lost in air,
Bit by bit, he wasn't there.
His essence faded, soft and slow,
What took him? We might never know.`}</pre>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#3D3B8E] flex items-center justify-center font-mont text-[0.8rem] font-extrabold text-[#3D3B8E] flex-shrink-0">PS</div>
            <div>
              <div className="font-mont text-[#1A1A2E] font-bold text-[0.86rem]">Paulina Sheridan</div>
              <div className="font-mont text-[0.73rem] text-[#6B6B8A]">Parent · Beyond Disintegration Community</div>
            </div>
          </div>
        </div>

        {/* The Lasts */}
        <div className="bg-white border border-[#DCDAEC] border-l-4 border-l-[#7B78C8] rounded-lg p-8 mb-7">
          <Eyebrow color="lav">Reflection</Eyebrow>
          <h3 className="font-mont text-[1.2rem] text-[#1A1A2E] font-extrabold mb-4">The Lasts</h3>
          <BodyText className="mb-3.5 italic">There were so many lasts we did not recognise at the time. The last kiss, the last time he told me he loved me, the last joke we shared, the last nursery rhyme he sang, the last time he clapped, the last time he played with his brother, the last time he understood me, the last drawing, the last wave, the last 'goodbye mama'.</BodyText>
          <BodyText className="mb-3.5 italic">What it is to witness so many lasts while a child still lives, I will never understand. So many ordinary moments passed without warning, quietly becoming memories before we even knew they were ending.</BodyText>
          <BodyText className="italic">Now, I see that child only in my dreams. I hold on to hope that one day, somehow, I will see him again in my waking world too.</BodyText>
          <div className="mt-5 font-mont text-[0.8rem] text-[#6B6B8A]">— Reflection from Cassian's parent</div>
        </div>

        {/* Quotes */}
        <Eyebrow className="mt-12">Parent Voices</Eyebrow>
        <Headline size="sm" className="mb-7">Quotes from <em className="not-italic text-[#3D3B8E]">our community</em></Headline>
        {[
          { q: "Emmett is still in there, and his story deserves to be more than a footnote in a broad spectrum.", who: "Parent of Emmett" },
          { q: "This was not a slow drift into autism. This was an acute neurological collapse, and one from which Emmett has never recovered.", who: "Parent of Emmett" },
          { q: "He had normal development, speaking in two languages, and was advanced for his age. Then he slowly lost more and more of his speech until now only one word remains, and even that is becoming garbled.", who: "Parent of Jordi" },
          { q: "His previous normal developmental history was ignored by the assessors.", who: "Parent of Jordi" },
          { q: "We found out later that they believed Joen was severely autistic and that we were deluded in believing he had ever been able to speak.", who: "Parent of Joen" },
          { q: "When we showed staff videos of Joen before his regression, they were astounded. They could not believe the difference between his before and after.", who: "Parent of Joen" },
          { q: "Even through all of this, we know without a shadow of a doubt that he is still in there, waiting to be set free.", who: "Parent of Joen" },
          { q: "Over just a few days his personality changed dramatically.", who: "Parent of James" },
          { q: "She did not recognise familiar people, including close family members, and was unable to understand or respond to spoken language directed at her.", who: "Parent of Ruby" },
          { q: "No ongoing meaningful support, investigations or services have been offered, and no one is interested in finding answers.", who: "Parent of Ruby" },
        ].map((s, i) => (
          <div key={i} className={`bg-white border border-[#DCDAEC] rounded-lg p-6 mb-4 border-l-4 ${i % 2 === 0 ? "border-l-[#3D3B8E]" : "border-l-[#7B78C8]"}`}>
            <div className={`font-mont text-[3rem] leading-none opacity-20 mb-[-10px] font-extrabold ${i % 2 === 0 ? "text-[#3D3B8E]" : "text-[#7B78C8]"}`}>&ldquo;</div>
            <blockquote className="font-mont text-[0.97rem] text-[#2D2D4E] leading-[1.85] italic mb-4 pt-2.5">"{s.q}"</blockquote>
            <div className="font-mont font-bold text-[#1A1A2E] text-[0.86rem]">{s.who}</div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

/* ─── INVOLVE ────────────────────────────────────────────────────── */
const Involve = ({ navigate }) => (
  <div className="animate-[fadeIn_0.35s_ease]">
    <PageHero eyebrow="Get Involved" title="Join the movement" subtitle="Many ways to support our work , whatever your time, skills, or resources allow." />
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-7">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { ic: "🔬", t: "Research Collaboration", d: "Are you a clinician or researcher? We actively seek collaborators for research projects, case studies, and clinical partnerships." },
            { ic: "🤝", t: "Volunteer", d: "We welcome volunteers in communications, fundraising, community support, legal, and administration." },
            { ic: "🏢", t: "Corporate Partnership", d: "Partner with us through employee fundraising, cause-related marketing, or sponsorship of specific research projects." },
            { ic: "📢", t: "Raise Awareness", d: "Share our mission, write to your MP, or speak to your employer. Visibility is vital for underrecognised conditions." },
            { ic: "💰", t: "Fundraise for Us", d: "Set up a fundraising challenge for a marathon, sponsored event, or birthday fundraiser. Donations open once charity registration is complete." },
            { ic: "⚖️", t: "Pro Bono Support", d: "We welcome pro bono support from legal, accountancy, HR, and communications professionals who share our values." },
          ].map(c => (
            <Card key={c.t} className="p-7">
              <div className="text-[2rem] mb-4">{c.ic}</div>
              <div className="font-mont text-[0.93rem] font-bold text-[#1A1A2E] mb-2.5">{c.t}</div>
              <BodyText className="text-[0.85rem] mb-5">{c.d}</BodyText>
              <button onClick={() => navigate("contact")}
                className="font-mont text-[0.72rem] font-bold tracking-[0.07em] uppercase text-[#3D3B8E] bg-transparent border border-[#DCDAEC] rounded-md px-4 py-2 transition-all duration-200 hover:border-[#3D3B8E] hover:bg-[rgba(61,59,142,0.08)] cursor-pointer"
              >Get in Touch</button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </div>
);

/* ─── COMMUNITY ──────────────────────────────────────────────────── */
const Community = ({ showToast }) => {
  const [form, setF] = useState({ first: "", last: "", email: "", role: "", news: true, privacy: false, safe: false });
  const submit = e => {
    e.preventDefault();
    if (!form.privacy || !form.safe) { showToast("Please accept all required policies.", true); return; }
    showToast("✓ Application received! We'll review within 48 hours.");
    setF({ first: "", last: "", email: "", role: "", news: true, privacy: false, safe: false });
  };
  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <PageHero eyebrow="Community" title="You are not alone" subtitle="A safe, moderated community for families, researchers, and advocates." />
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-7">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-14 items-start">
            <div>
              <Eyebrow>Our Community</Eyebrow>
              <Headline size="md">A safe space for <em className="not-italic text-[#7B78C8]">every family</em></Headline>
              <BodyText className="mb-6">A private, moderated community for families affected by childhood developmental regression whether diagnosed or still seeking answers.</BodyText>
              <div className="mb-7">
                {["Peer support from families who truly understand", "Moderated groups with trained facilitators", "Research summaries in accessible language", "Quarterly Q&As with clinical advisors", "Monthly newsletter with research updates", "Regional meet-up coordination"].map(item => (
                  <div key={item} className="flex gap-3 py-2.5 border-b border-[#ECEAF5]">
                    <span className="text-[#3D3B8E] flex-shrink-0 font-bold">✓</span>
                    <BodyText className="text-[0.88rem]">{item}</BodyText>
                  </div>
                ))}
              </div>
              <div className="bg-[#ECEAF5] border border-[#DCDAEC] border-l-4 border-l-[#7B78C8] rounded-lg p-5">
                <div className="font-mont text-[0.82rem] font-bold text-[#1A1A2E] mb-2.5">🛡️ Safeguarding &amp; Privacy</div>
                <BodyText className="text-[0.83rem] mb-3">The safety of our community members is our highest priority. All members are verified. Moderated 7 days a week. UK GDPR compliant.</BodyText>
                {["UK GDPR compliant", "No data sold or shared", "ICO registered", "Enhanced child data protection"].map(item => (
                  <div key={item} className="font-mont text-[0.78rem] text-[#2D2D4E] py-1 flex gap-1.5">
                    <span className="text-[#7B78C8]">◆</span>{item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#DCDAEC] rounded-lg p-8">
              <Eyebrow>Register</Eyebrow>
              <div className="font-mont text-[1.5rem] text-[#1A1A2E] mb-2 font-extrabold">Join Our Community</div>
              <BodyText className="mb-6 text-[0.86rem]">Reviewed within 48 hours to maintain a safe, supportive space.</BodyText>
              <form onSubmit={submit}>
                <div className="grid grid-cols-2 gap-3">
                  {[{ l: "First Name *", k: "first", ph: "First" }, { l: "Last Name *", k: "last", ph: "Last" }].map(x => (
                    <div key={x.k}>
                      <label className="font-mont text-[0.67rem] tracking-[0.1em] uppercase text-[#6B6B8A] block mb-1.5 font-semibold">{x.l}</label>
                      <input value={form[x.k]} onChange={e => setF(p => ({ ...p, [x.k]: e.target.value }))} placeholder={x.ph} required className="w-full font-mont bg-white border border-[#DCDAEC] text-[#1A1A2E] rounded px-3 py-2.5 text-[0.94rem] outline-none transition-all duration-200 focus:border-[#3D3B8E] focus:shadow-[0_0_0_3px_rgba(61,59,142,0.08)]" />
                    </div>
                  ))}
                  <div className="col-span-2">
                    <label className="font-mont text-[0.67rem] tracking-[0.1em] uppercase text-[#6B6B8A] block mb-1.5 font-semibold">Email *</label>
                    <input type="email" value={form.email} onChange={e => setF(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" required className="w-full font-mont bg-white border border-[#DCDAEC] text-[#1A1A2E] rounded px-3 py-2.5 text-[0.94rem] outline-none transition-all duration-200 focus:border-[#3D3B8E] focus:shadow-[0_0_0_3px_rgba(61,59,142,0.08)]" />
                  </div>
                  <div className="col-span-2">
                    <label className="font-mont text-[0.67rem] tracking-[0.1em] uppercase text-[#6B6B8A] block mb-1.5 font-semibold">Your Connection *</label>
                    <select value={form.role} onChange={e => setF(p => ({ ...p, role: e.target.value }))} required className="w-full font-mont bg-white border border-[#DCDAEC] text-[#1A1A2E] rounded px-3 py-2.5 text-[0.94rem] outline-none transition-all duration-200 focus:border-[#3D3B8E]">
                      <option value="">Please select...</option>
                      {["Parent / carer of an affected child", "Medical professional", "Researcher", "Advocate / supporter", "Other"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    {[{ k: "news", l: "Subscribe to monthly research newsletter" }, { k: "privacy", l: "I agree to the Privacy Policy *" }, { k: "safe", l: "I accept the Community Safeguarding Guidelines *" }].map(c => (
                      <div key={c.k} className="flex gap-2.5 items-start mb-2.5">
                        <input type="checkbox" checked={form[c.k]} onChange={e => setF(p => ({ ...p, [c.k]: e.target.checked }))} className="mt-0.5 w-4 h-4 accent-[#3D3B8E] cursor-pointer flex-shrink-0" />
                        <label className="font-mont text-[0.83rem] text-[#2D2D4E] leading-[1.6] cursor-pointer">{c.l}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <BtnBlue onClick={submit} full className="mt-4">Apply to Join Community</BtnBlue>
                <BodyText className="text-[0.72rem] mt-2.5 text-center">UK GDPR protected. We never share your information without consent.</BodyText>
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
  const [form, setF] = useState({ name: "", email: "", org: "", subject: "", message: "", privacy: false });
  const submit = e => {
    e.preventDefault();
    showToast("✓ Message sent! We'll respond within 2 working days.");
    setF({ name: "", email: "", org: "", subject: "", message: "", privacy: false });
  };
  const inputCls = "w-full font-mont bg-white border border-[#DCDAEC] text-[#1A1A2E] rounded px-3 py-2.5 text-[0.94rem] outline-none transition-all duration-200 focus:border-[#3D3B8E] focus:shadow-[0_0_0_3px_rgba(61,59,142,0.08)]";
  const labelCls = "font-mont text-[0.67rem] tracking-[0.1em] uppercase text-[#6B6B8A] block mb-1.5 font-semibold";
  return (
    <div className="animate-[fadeIn_0.35s_ease]">
      <PageHero eyebrow="Contact" title="Get in touch" subtitle="Whether you're a family, researcher, journalist, or supporter , we're here." />
      <section className="py-20">
        <div className="max-w-[1080px] mx-auto px-7">
          <div className="grid grid-cols-1 md:grid-cols-[0.72fr_1.28fr] gap-12 items-start">
            <div className="bg-[#2D2D3A] rounded-lg p-8 md:sticky md:top-[84px]">
              <div className="font-mont text-[1.2rem] text-white mb-6 font-extrabold">Contact Info</div>
              {[{ ic: "✉", t: "General", v: "hello@beyonddisintegration.com" }, { ic: "💛", t: "Families", v: "Contact via form" }, { ic: "📰", t: "Press", v: "Contact via form" }].map(c => (
                <div key={c.t} className="flex gap-3 mb-4">
                  <div className="w-[34px] h-[34px] rounded-full border border-[#3D3B8E] flex items-center justify-center text-[0.85rem] text-[#3D3B8E] flex-shrink-0">{c.ic}</div>
                  <div>
                    <div className="font-mont text-[0.63rem] tracking-[0.12em] uppercase text-[#7B78C8] font-bold mb-0.5">{c.t}</div>
                    <div className="font-mont text-[0.83rem] text-white/65">{c.v}</div>
                  </div>
                </div>
              ))}
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="font-mont text-[0.7rem] text-white/40 mb-2 tracking-[0.1em] uppercase">Based in England &amp; Wales</div>
                <BodyText className="text-[0.8rem] text-white/50">Charity registration pending with the Charity Commission for England and Wales.</BodyText>
              </div>
            </div>

            <div className="bg-white border border-[#DCDAEC] rounded-lg p-8">
              <div className="font-mont text-[1.5rem] text-[#1A1A2E] mb-2 font-extrabold">Send a Message</div>
              <BodyText className="text-[0.85rem] mb-6">We respond to all enquiries within 2 working days.</BodyText>
              <form onSubmit={submit}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Full Name *</label>
                    <input value={form.name} onChange={e => setF(p => ({ ...p, name: e.target.value }))} placeholder="Your name" required className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Email *</label>
                    <input type="email" value={form.email} onChange={e => setF(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" required className={inputCls} />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Organisation</label>
                    <input value={form.org} onChange={e => setF(p => ({ ...p, org: e.target.value }))} placeholder="Optional" className={inputCls} />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Subject *</label>
                    <select value={form.subject} onChange={e => setF(p => ({ ...p, subject: e.target.value }))} required className={inputCls}>
                      <option value="">Select a topic...</option>
                      {["Family & Support", "Research Collaboration", "Corporate Partnership", "Press & Media", "Volunteer", "General Enquiry"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Message *</label>
                    <textarea value={form.message} onChange={e => setF(p => ({ ...p, message: e.target.value }))} placeholder="Please write your message here..." required className={`${inputCls} resize-y min-h-[130px]`} />
                  </div>
                  <div className="col-span-2 flex gap-2.5 items-start">
                    <input type="checkbox" checked={form.privacy} onChange={e => setF(p => ({ ...p, privacy: e.target.checked }))} className="mt-0.5 w-4 h-4 accent-[#3D3B8E] cursor-pointer flex-shrink-0" required />
                    <label className="font-mont text-[0.83rem] text-[#2D2D4E] leading-[1.6] cursor-pointer">I agree to the Privacy Policy. My data will only be used to respond to this enquiry. *</label>
                  </div>
                </div>
                <BtnBlue onClick={submit} className="mt-4">Send Message →</BtnBlue>
                <BodyText className="text-[0.72rem] mt-2.5">🛡️ Spam-protected. Encrypted. UK GDPR compliant.</BodyText>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── TOAST ──────────────────────────────────────────────────────── */
const Toast = ({ t }) => (
  <div className={`fixed bottom-6 right-6 z-[9999] bg-[#2D2D3A] border border-[#7B78C8] border-l-4 border-l-[#7B78C8] rounded-md px-5 py-3.5 shadow-[4px_4px_0_#7B78C8] max-w-[300px] transition-transform duration-[400ms] ${t.visible ? "translate-x-0" : "translate-x-[110%]"} pointer-events-${t.visible ? "auto" : "none"}`}>
  <div className="font-mont text-[0.86rem] font-bold text-white">{t.msg}</div>
</div>
);

/* ─── FOOTER ─────────────────────────────────────────────────────── */
const Footer = ({ navigate }) => (
  <footer className="bg-[#2D2D3A] border-t border-white/6 pt-16 pb-7">
    <div className="max-w-6xl mx-auto px-7">
      <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-11 pb-11 border-b border-white/8 mb-8">
        <div>
          <button onClick={() => navigate("home")} className="bg-none border-none cursor-pointer p-0 flex items-center gap-2.5 mb-4">
            <img src={BDLogoLight} alt="Beyond Disintegration" className="h-10 w-auto object-contain"
              onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }} />
            <span className="hidden font-mont text-[0.9rem] font-extrabold text-white">Beyond Disintegration</span>
          </button>
          <BodyText className="text-[0.83rem] text-white/60 leading-[1.8] mb-4">
            Advancing medical research into unexplained catastrophic developmental regression in children. Building hope through science, community, and compassion.
          </BodyText>
          <div className="font-mont text-[0.68rem] text-white/35 leading-[1.7]">Charity registration pending.<br />beyonddisintegration.com</div>
        </div>
        {[
          { h: "Organisation", links: [{ l: "About Us", p: "about" }, { l: "Who We Are", p: "who" }, { l: "Research", p: "research" }, { l: "Lived Experience", p: "stories" }] },
          { h: "Get Involved", links: [{ l: "Get Involved", p: "involve" }, { l: "Community", p: "community" }, { l: "Contact", p: "contact" }] },
          { h: "Legal", links: [{ l: "Privacy Policy" }, { l: "GDPR Statement" }, { l: "Safeguarding" }, { l: "Accessibility" }] },
        ].map(col => (
          <div key={col.h}>
            <div className="font-mont text-[0.64rem] tracking-[0.18em] uppercase text-[#7B78C8] font-bold mb-4">{col.h}</div>
            {col.links.map(l => (
              <button key={l.l} onClick={() => l.p && navigate(l.p)}
                className="block w-full text-left bg-none border-none text-white/40 cursor-pointer py-1 font-mont text-[0.84rem] transition-colors duration-200 hover:text-white"
              >{l.l}</button>
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-start flex-wrap gap-3.5">
        <div className="font-mont text-[0.7rem] text-white/30 leading-[1.8]">
          © 2026 Beyond Disintegration. All rights reserved.<br />
          Charity registration pending · Charity Commission for England &amp; Wales<br />
          The information on this website is for general awareness and educational purposes only.
        </div>
        <button onClick={() => navigate("contact")}
          className="font-mont font-bold text-[0.76rem] tracking-[0.06em] uppercase text-white bg-[#3D3B8E] border-2 border-transparent rounded-md px-6 py-2.5 transition-all duration-200 hover:bg-[#2E2C6E] cursor-pointer"
        >Get In Touch</button>
      </div>
    </div>
  </footer>
);

/* ─── APP ────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setSc] = useState(false);
  const [toast, setToast] = useState({ visible: false, msg: "", error: false });
  const timer = useRef(null);

  useEffect(() => {
    const h = () => setSc(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navigate = useCallback(p => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const showToast = useCallback((msg, error = false) => {
    clearTimeout(timer.current);
    setToast({ visible: true, msg, error });
    timer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 5000);
  }, []);

  const PAGES = {
    home:      <Home      navigate={navigate} />,
    about:     <About     navigate={navigate} />,
    who:       <Who />,
    research:  <Research />,
    stories:   <Stories />,
    involve:   <Involve   navigate={navigate} />,
    community: <Community showToast={showToast} />,
    contact:   <Contact   showToast={showToast} />,
  };

  return (
    <div className="min-h-screen bg-[#F8F8FC]">
      <a href="#main"
        className="absolute top-[-100px] left-4 z-[10000] bg-[#3D3B8E] text-white px-4 py-2 rounded font-bold no-underline font-mont transition-all duration-200 focus:top-4"
      >Skip to main content</a>
      <Nav navigate={navigate} scrolled={scrolled} />
      <main id="main" className="pt-[68px]">
        {PAGES[page] || PAGES.home}
      </main>
      <Footer navigate={navigate} />
      <Toast t={toast} />
    </div>
  );
}