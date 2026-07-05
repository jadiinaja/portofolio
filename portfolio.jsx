import { useState, useEffect, useRef } from "react";
import { themes } from "./src/constants/themes";
import { ThemeCtx, useTheme } from "./src/constants/ThemeContext";
import { useInView } from "./src/hooks/useInView";
import { I, LI } from "./src/components/icons";
import { projects, skillGroups, achievements, aboutItems, statusDot } from "./src/data/index";

// ─── Stat Counter ─────────────────────────────────────────────────────────────
function StatCounter({ value, label }) {
  const t = useTheme();
  const [ref, inView] = useInView(0.3);
  const isNumeric = !isNaN(parseInt(value));
  const numVal    = parseInt(value);
  const suffix    = isNumeric ? value.replace(String(numVal), "") : "";
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || !isNumeric) return;
    let cur = 0;
    const step = numVal / (1400 / 16);
    const timer = setInterval(() => {
      cur += step;
      if (cur >= numVal) { setCount(numVal); clearInterval(timer); return; }
      setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, numVal, isNumeric]);

  return (
    <div ref={ref}>
      <div style={{ fontSize:26, fontWeight:700, color:t.text, fontFamily:"'DM Mono',monospace", letterSpacing:-0.5 }}>
        {isNumeric ? `${count}${suffix}` : value}
      </div>
      <div style={{ fontSize:11, color:t.textDim, letterSpacing:1.5, marginTop:4, textTransform:"uppercase" }}>{label}</div>
    </div>
  );
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
function ThemeToggle({ mode, onToggle }) {
  const t = useTheme();
  const isDark = mode === "dark";
  return (
    <button onClick={onToggle} title={isDark ? "Switch to light" : "Switch to dark"}
      style={{
        width:52, height:28, borderRadius:99,
        background: isDark ? "rgba(16,185,129,0.15)" : "rgba(5,150,105,0.12)",
        border:`1px solid ${t.accentBorder}`, cursor:"pointer", position:"relative",
        transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)", flexShrink:0,
      }}
      aria-label="Toggle color mode">
      <span style={{
        position:"absolute", top:3, left: isDark ? 26 : 3,
        width:20, height:20, borderRadius:"50%", background:t.accentGrad,
        display:"flex", alignItems:"center", justifyContent:"center",
        transition:"left 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow:`0 1px 6px ${isDark ? "rgba(16,185,129,0.4)" : "rgba(5,150,105,0.35)"}`,
      }}>
        {isDark ? <I.Moon size={11} color="#fff" /> : <I.Sun size={11} color="#fff" />}
      </span>
    </button>
  );
}

// ─── Skill Group ──────────────────────────────────────────────────────────────
function SkillGroup({ group, index }) {
  const t = useTheme();
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      marginBottom:32,
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(16px)",
      transition:`all 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
    }}>
      <div style={{ fontSize:10, color:t.accent, letterSpacing:3, fontFamily:"'DM Mono',monospace", marginBottom:12, textTransform:"uppercase" }}>
        {group.category}
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
        {group.items.map(item => (
          <span key={item}
            style={{ fontSize:12, padding:"5px 13px", borderRadius:99, background:t.accentSoft, color:t.textSub, border:`1px solid ${t.accentBorder}`, fontFamily:"'DM Mono',monospace", transition:"all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color=t.accent; e.currentTarget.style.borderColor=`${t.accent}60`; }}
            onMouseLeave={e => { e.currentTarget.style.color=t.textSub; e.currentTarget.style.borderColor=t.accentBorder; }}
          >{item}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ p, index }) {
  const t = useTheme();
  const [hov, setHov] = useState(false);
  const [ref, inView] = useInView();
  const Icon       = I[p.iconKey];
  const accentCol  = p.gold ? t.amber : t.accent;
  const accentSoft = p.gold ? t.amberSoft : t.accentSoft;
  const accentBdr  = p.gold ? t.amberBorder : t.accentBorder;

  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        gridColumn: p.wide ? "span 2" : "span 1",
        background: hov ? t.surfaceHover : t.surface,
        border:`1px solid ${hov ? t.borderHover : t.border}`,
        borderRadius:20, padding:"28px 26px",
        transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)",
        transform: inView
          ? (hov ? "translateY(-5px) scale(1.01)" : "translateY(0) scale(1)")
          : "translateY(28px) scale(0.97)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? "0ms" : `${index * 55}ms`,
        backdropFilter:"blur(14px) saturate(180%)", WebkitBackdropFilter:"blur(14px) saturate(180%)",
        position:"relative", overflow:"hidden",
        boxShadow: hov
          ? `0 16px 40px ${accentCol}18, 0 0 0 1px ${accentCol}18, inset 0 1px 0 rgba(255,255,255,0.1)`
          : "0 1px 3px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}>
      <div style={{ position:"absolute", top:0, right:0, width:220, height:220, background:`radial-gradient(circle at top right, ${accentCol}12, transparent 65%)`, pointerEvents:"none", opacity: hov ? 1 : 0.5, transition:"opacity 0.4s" }} />

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:18, position:"relative" }}>
        <div style={{ width:44, height:44, borderRadius:12, background: hov ? accentSoft : t.surface, border:`1px solid ${hov ? accentBdr : t.border}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.3s", transform: hov ? "scale(1.08)" : "scale(1)" }}>
          <Icon size={20} color={accentCol} />
        </div>
        <span style={{ fontSize:9, fontFamily:"'DM Mono',monospace", padding:"4px 10px", borderRadius:99, background:`${statusDot[p.status]}12`, border:`1px solid ${statusDot[p.status]}30`, color:statusDot[p.status], letterSpacing:1.8, fontWeight:600, display:"flex", alignItems:"center", gap:5 }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background:statusDot[p.status], boxShadow: p.status==="Live" ? `0 0 5px ${statusDot[p.status]}` : "none", animation: p.status==="Live" ? "pulse 2s ease infinite" : "none" }} />
          {p.status}
        </span>
      </div>

      <h3 style={{ margin:"0 0 4px", fontSize:16, fontWeight:600, color:t.text, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:-0.3 }}>{p.title}</h3>
      <p style={{ margin:"0 0 12px", fontSize:11, color:accentCol, fontFamily:"'DM Mono',monospace", letterSpacing:0.4, opacity:0.9 }}>{p.subtitle}</p>
      <p style={{ margin:"0 0 20px", fontSize:13, color:t.textSub, lineHeight:1.7 }}>{p.desc}</p>

      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {p.tags.map(tg => (
          <span key={tg} style={{ fontSize:11, padding:"3px 9px", borderRadius:99, background:t.tagBg, color:t.tagText, border:`1px solid ${t.tagBorder}`, fontFamily:"'DM Mono',monospace" }}>{tg}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Achievement Card ─────────────────────────────────────────────────────────
function AchCard({ a, index }) {
  const t = useTheme();
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  const Icon = I[a.iconKey];
  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding:"24px 22px", borderRadius:18,
        background: hov ? (a.gold ? t.amberSoft : t.surfaceHover) : (a.gold ? t.amberSoft : t.surface),
        border:`1px solid ${a.gold ? (hov ? t.amberBorder : `${t.amber}22`) : (hov ? t.accentBorder : t.border)}`,
        transform: inView ? (hov ? "translateY(-4px)" : "translateY(0)") : "translateY(18px)",
        opacity: inView ? 1 : 0,
        transition:`all 0.45s cubic-bezier(0.16,1,0.3,1) ${index * 70}ms`,
        backdropFilter:"blur(12px) saturate(180%)", WebkitBackdropFilter:"blur(12px) saturate(180%)",
        boxShadow: hov
          ? `0 8px 24px ${a.gold ? t.amber : t.accent}14, inset 0 1px 0 rgba(255,255,255,0.1)`
          : "inset 0 1px 0 rgba(255,255,255,0.05)",
      }}>
      <div style={{ width:40, height:40, borderRadius:10, marginBottom:14, background: a.gold ? t.amberSoft : t.surface, border:`1px solid ${a.gold ? t.amberBorder : t.border}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform 0.3s", transform: hov ? "scale(1.1)" : "scale(1)" }}>
        <Icon size={18} color={a.gold ? t.amber : t.textSub} />
      </div>
      <h3 style={{ fontSize:13, fontWeight:600, color:a.gold ? t.amber : t.text, margin:"0 0 8px", fontFamily:"'Space Grotesk',sans-serif" }}>{a.title}</h3>
      <p style={{ fontSize:12, color:t.textSub, margin:0, lineHeight:1.7 }}>{a.desc}</p>
    </div>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHead({ label, title, amber = false }) {
  const t = useTheme();
  const [ref, inView] = useInView(0.2);
  return (
    <div ref={ref} style={{ marginBottom:52, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)", transition:"all 0.6s cubic-bezier(0.16,1,0.3,1)" }}>
      <div style={{ fontSize:10, color: amber ? t.amber : t.accent, letterSpacing:4, fontFamily:"'DM Mono',monospace", marginBottom:12, textTransform:"uppercase" }}>
        / {label}
      </div>
      <h2 style={{ fontSize:34, fontWeight:700, color:t.text, letterSpacing:-0.8, lineHeight:1.2 }}>{title}</h2>
    </div>
  );
}

// ─── Main Portfolio ───────────────────────────────────────────────────────────
export default function Portfolio() {
  const [loaded,    setLoaded]    = useState(false);
  const [loadPct,   setLoadPct]   = useState(0);
  const [scrolled,  setScrolled]  = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [mode, setMode] = useState(() => localStorage.getItem("theme") || "dark");

  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  const t = themes[mode];

  const toggleMode = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("theme", next);
  };

  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.transition = "background 0.4s";
  }, [t.bg]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadPct(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(() => setLoaded(true), 300); return 100; }
        return Math.min(p + Math.random() * 12 + 3, 100);
      });
    }, 65);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const el = document.documentElement;
      setScrollPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
      // parallax via ref — no state rerender
      if (orb1Ref.current) orb1Ref.current.style.transform = `translateY(${y * 0.18}px)`;
      if (orb2Ref.current) orb2Ref.current.style.transform = `translateY(${y * 0.1}px)`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const TRANS = "background 0.4s, color 0.3s, border-color 0.3s, box-shadow 0.3s";

  if (!loaded) {
    return (
      <div style={{ minHeight:"100vh", background:t.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", transition:TRANS }}>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.2)}}`}</style>
        <div style={{ marginBottom:32, position:"relative" }}>
          <div style={{ width:52, height:52, border:`1px solid ${t.accentBorder}`, borderTopColor:t.accent, borderRadius:"50%", animation:"spin 1.1s linear infinite" }} />
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <I.Spark size={17} color={t.accent} />
          </div>
        </div>
        <div style={{ color:t.accent, fontSize:10, letterSpacing:4, marginBottom:28 }}>INITIALIZING</div>
        <div style={{ width:180, height:2, background:t.skillTrack, borderRadius:99, position:"relative" }}>
          <div style={{ position:"absolute", top:0, left:0, height:"100%", width:`${Math.min(loadPct,100)}%`, background:t.accentGrad, borderRadius:99, transition:"width 0.07s ease", boxShadow:`0 0 8px ${t.accent}55` }} />
        </div>
        <div style={{ color:t.textDim, fontSize:10, letterSpacing:2, marginTop:14 }}>{Math.min(Math.floor(loadPct),100)}%</div>
      </div>
    );
  }

  return (
    <ThemeCtx.Provider value={t}>
      <div style={{ minHeight:"100vh", background:t.bg, color:t.text, fontFamily:"'Space Grotesk',sans-serif", overflowX:"hidden", transition:TRANS }}>
        <style>{`
          @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          @keyframes pulse   { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:1;transform:scale(1.18)} }
          @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
          @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
          .shimmer-text {
            background: linear-gradient(135deg, #10B981, #34D399, #10B981);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: shimmer 4s linear infinite;
          }
          * { box-sizing:border-box; margin:0; padding:0; }
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width:3px; }
          ::-webkit-scrollbar-track { background:${t.bg}; }
          ::-webkit-scrollbar-thumb { background:${t.accent}; border-radius:99px; }
          a { text-decoration:none; color:inherit; }
          @media (prefers-reduced-motion:reduce) { *,*::before,*::after { animation-duration:.01ms !important; transition-duration:.01ms !important; } }
          @media (max-width:768px) {
            .bento  { grid-template-columns:1fr !important; }
            .bento > * { grid-column:span 1 !important; }
            .s2col  { grid-template-columns:1fr !important; }
            .navlinks { display:none !important; }
            .hambtn { display:flex !important; }
            .herobtns { flex-direction:column; align-items:flex-start; }
            .statsrow { gap:28px !important; }
          }
          @media (min-width:769px) { .hambtn { display:none !important; } }
          @media (max-width:960px) and (min-width:769px) { .bento { grid-template-columns:repeat(2,1fr) !important; } }
        `}</style>

        {/* ── Scroll progress ── */}
        <div style={{ position:"fixed", top:0, left:0, height:2, zIndex:200, width:`${scrollPct}%`, background:t.accentGrad, transition:"width 0.05s linear", pointerEvents:"none" }} />

        {/* ── Mobile menu ── */}
        {menuOpen && (
          <div style={{ position:"fixed", inset:0, zIndex:150, background:t.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:36, animation:"fadeUp 0.25s ease" }}>
            {["Projects","Skills","About","Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                style={{ fontSize:28, fontWeight:700, color:t.textSub, letterSpacing:-0.5, transition:"color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = t.accent}
                onMouseLeave={e => e.currentTarget.style.color = t.textSub}
              >{item}</a>
            ))}
            <a href="https://au.linkedin.com/in/baiq-rini-adekayanti-59313356" target="_blank" rel="noopener noreferrer"
              style={{ marginTop:8, display:"inline-flex", alignItems:"center", gap:8, fontSize:14, color:t.accent, fontFamily:"'DM Mono',monospace" }}>
              <LI size={15} color={t.accent} /> View LinkedIn
            </a>
          </div>
        )}

        {/* ── Nav ── */}
        <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, height:64, padding:"0 40px", display:"flex", justifyContent:"space-between", alignItems:"center", background: scrolled ? t.navBg : "transparent", backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none", WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none", borderBottom: scrolled ? `1px solid ${t.border}` : "none", transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:8, background:t.accentGrad, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 14px ${t.accent}40` }}>
              <I.Spark size={15} color="#fff" />
            </div>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:13, color:t.text, letterSpacing:1.5, fontWeight:500 }}>
              RI<span style={{ color:t.accent }}>_</span>DEV
            </span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:32 }}>
            <div className="navlinks" style={{ display:"flex", gap:32 }}>
              {["Projects","Skills","About","Contact"].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`}
                  style={{ fontSize:13, color:t.textMuted, letterSpacing:0.3, fontWeight:500, transition:"color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = t.accent}
                  onMouseLeave={e => e.currentTarget.style.color = t.textMuted}
                >{item}</a>
              ))}
            </div>
            <ThemeToggle mode={mode} onToggle={toggleMode} />
            <button className="hambtn" onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", padding:4 }}>
              {menuOpen ? <I.X size={22} color={t.text} /> : <I.Menu size={22} color={t.text} />}
            </button>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section id="home" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"120px 40px 80px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(${t.gridLine} 1px,transparent 1px),linear-gradient(90deg,${t.gridLine} 1px,transparent 1px)`, backgroundSize:"56px 56px", maskImage:"radial-gradient(ellipse 75% 55% at 50% 0%,black,transparent)", WebkitMaskImage:"radial-gradient(ellipse 75% 55% at 50% 0%,black,transparent)" }} />
          {/* orbs — animated via ref, no state rerender */}
          <div ref={orb1Ref} style={{ position:"absolute", top:"14%", right:"7%", width:480, height:480, background:`radial-gradient(circle,${t.glow1} 0%,transparent 65%)`, pointerEvents:"none", animation:"float 9s ease-in-out infinite" }} />
          <div ref={orb2Ref} style={{ position:"absolute", bottom:"16%", left:"4%", width:320, height:320, background:`radial-gradient(circle,${t.glow2} 0%,transparent 65%)`, pointerEvents:"none", animation:"float 11s ease-in-out infinite reverse" }} />

          <div style={{ maxWidth:700, position:"relative", zIndex:1 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:28, padding:"7px 16px", border:`1px solid ${t.accentBorder}`, borderRadius:99, background:t.accentSoft, animation:"fadeUp 0.7s ease both" }}>
              <span style={{ width:6, height:6, background:t.accent, borderRadius:"50%", animation:"pulse 2s ease infinite" }} />
              <span style={{ fontSize:11, color:t.accent, letterSpacing:2.5, fontFamily:"'DM Mono',monospace", fontWeight:500 }}>
                AI ENGINEER · STATISTICIAN · AAS AWARDEE
              </span>
            </div>

            <h1 style={{ fontSize:"clamp(36px,5.5vw,62px)", fontWeight:700, lineHeight:1.1, margin:"0 0 22px", color:t.text, letterSpacing:-1.5, animation:"fadeUp 0.7s ease 0.1s both" }}>
              Transforming<br />
              <span className="shimmer-text">Statistics</span>{" "}Into Impact
            </h1>

            <p style={{ fontSize:16, color:t.textMuted, lineHeight:1.78, margin:"0 0 44px", maxWidth:530, animation:"fadeUp 0.7s ease 0.2s both" }}>
              Statistician, Government Innovator & AI Engineer — building automation systems
              that bridge national data with grassroots communities across Indonesia.
            </p>

            <div className="herobtns" style={{ display:"flex", gap:12, flexWrap:"wrap", animation:"fadeUp 0.7s ease 0.3s both" }}>
              <a href="#projects" style={{ padding:"13px 26px", background:t.accentGrad, color:"#fff", borderRadius:10, fontSize:14, fontWeight:600, transition:"all 0.25s", display:"inline-flex", alignItems:"center", gap:8, boxShadow:`0 4px 16px ${t.accent}30` }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 10px 28px ${t.accent}45`; }}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 4px 16px ${t.accent}30`; }}
              >View Projects <I.Arrow size={14} color="#fff" /></a>

              <a href="#contact" style={{ padding:"13px 26px", border:`1px solid ${t.accentBorder}`, color:t.textSub, borderRadius:10, fontSize:14, fontWeight:500, transition:"all 0.25s", display:"inline-flex", alignItems:"center", gap:8, background:t.surface }}
                onMouseEnter={e => { e.currentTarget.style.background=t.accentSoft; e.currentTarget.style.color=t.accent; e.currentTarget.style.borderColor=`${t.accent}50`; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background=t.surface; e.currentTarget.style.color=t.textSub; e.currentTarget.style.borderColor=t.accentBorder; e.currentTarget.style.transform="translateY(0)"; }}
              >Contact Me</a>

              <a href="https://au.linkedin.com/in/baiq-rini-adekayanti-59313356" target="_blank" rel="noopener noreferrer"
                style={{ padding:"13px 26px", border:`1px solid ${t.border}`, color:t.textMuted, borderRadius:10, fontSize:14, fontWeight:500, transition:"all 0.25s", display:"inline-flex", alignItems:"center", gap:8, background:"transparent" }}
                onMouseEnter={e => { e.currentTarget.style.color=t.text; e.currentTarget.style.borderColor=t.textMuted; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.color=t.textMuted; e.currentTarget.style.borderColor=t.border; e.currentTarget.style.transform="translateY(0)"; }}
              ><LI size={14} color="currentColor" /> View LinkedIn</a>
            </div>

            <div className="statsrow" style={{ display:"flex", gap:52, marginTop:68, animation:"fadeUp 0.7s ease 0.4s both" }}>
              {[["6+","Live Projects"],["3","Innovation Systems"],["AAS","Scholar"]].map(([n,l]) => (
                <StatCounter key={l} value={n} label={l} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" style={{ padding:"80px 40px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"-10%", left:"-6%", width:420, height:420, background:`radial-gradient(circle,${t.glow1} 0%,transparent 65%)`, pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-15%", right:"-8%", width:380, height:380, background:`radial-gradient(circle,${t.glow2} 0%,transparent 65%)`, pointerEvents:"none" }} />
          <div style={{ maxWidth:980, margin:"0 auto", position:"relative" }}>
            <SectionHead label="Projects" title="Built. Deployed. Impactful." />
            <div className="bento" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
              {projects.map((p,i) => <ProjectCard key={p.id} p={p} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" style={{ padding:"80px 40px", background:t.bgAlt, transition:TRANS, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"5%", right:"-8%", width:400, height:400, background:`radial-gradient(circle,${t.glow2} 0%,transparent 65%)`, pointerEvents:"none" }} />
          <div style={{ maxWidth:980, margin:"0 auto", position:"relative" }}>
            <SectionHead label="Skills" title="Technical Arsenal" />
            <div className="s2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 72px" }}>
              {skillGroups.map((g,i) => <SkillGroup key={g.category} group={g} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── Achievements ── */}
        <section style={{ padding:"80px 40px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"-8%", left:"50%", width:520, height:340, background:`radial-gradient(circle,${t.glow1} 0%,transparent 65%)`, pointerEvents:"none" }} />
          <div style={{ maxWidth:980, margin:"0 auto", position:"relative" }}>
            <SectionHead label="Achievements" title="Recognition & Milestones" amber />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16 }}>
              {achievements.map((a,i) => <AchCard key={i} a={a} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" style={{ padding:"80px 40px", background:t.bgAlt, transition:TRANS, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", bottom:"-10%", left:"-6%", width:380, height:380, background:`radial-gradient(circle,${t.glow2} 0%,transparent 65%)`, pointerEvents:"none" }} />
          <div className="s2col" style={{ maxWidth:980, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"center", position:"relative" }}>
            <div>
              <SectionHead label="About" title={<>AI Engineer &<br />Data Innovator</>} />
              <p style={{ fontSize:14, color:t.textSub, lineHeight:1.85, marginBottom:16 }}>
                Statistician turned AI Engineer — I build automation systems and data intelligence solutions that bridge cutting-edge technology with the real needs of government and communities.
              </p>
              <p style={{ fontSize:14, color:t.textSub, lineHeight:1.85, marginBottom:32 }}>
                From multi-agent chatbots to news-based economic dashboards — every system is designed for real-world impact, not just a technology showcase.
              </p>
              <a href="#contact" style={{ display:"inline-flex", alignItems:"center", gap:8, color:t.accent, fontSize:13, fontWeight:600, transition:"gap 0.25s" }}
                onMouseEnter={e => e.currentTarget.style.gap="14px"}
                onMouseLeave={e => e.currentTarget.style.gap="8px"}
              >Get in touch <I.Arrow size={14} color={t.accent} /></a>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {aboutItems.map(({ iconKey, label }) => {
                const Icon = I[iconKey];
                return (
                  <div key={label} style={{ padding:"17px 14px", borderRadius:14, background:t.surface, border:`1px solid ${t.border}`, display:"flex", alignItems:"center", gap:12, transition:"all 0.25s", backdropFilter:"blur(12px) saturate(180%)", WebkitBackdropFilter:"blur(12px) saturate(180%)" }}
                    onMouseEnter={e => { e.currentTarget.style.background=t.accentSoft; e.currentTarget.style.borderColor=t.accentBorder; e.currentTarget.style.transform="translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background=t.surface; e.currentTarget.style.borderColor=t.border; e.currentTarget.style.transform="translateY(0)"; }}
                  >
                    <div style={{ width:32, height:32, borderRadius:8, flexShrink:0, background:t.accentSoft, border:`1px solid ${t.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <Icon size={15} color={t.accent} />
                    </div>
                    <span style={{ fontSize:12, color:t.textSub, fontWeight:500, lineHeight:1.3 }}>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" style={{ padding:"80px 40px 120px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"10%", left:"50%", transform:"translateX(-50%)", width:600, height:400, background:`radial-gradient(circle,${t.glow1} 0%,transparent 65%)`, pointerEvents:"none" }} />
          <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center", position:"relative" }}>
            <div style={{ fontSize:10, color:t.accent, letterSpacing:4, fontFamily:"'DM Mono',monospace", marginBottom:20, textTransform:"uppercase" }}>/ Contact</div>

            {/* availability badge */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, marginBottom:20, padding:"5px 14px", borderRadius:99, background:t.accentSoft, border:`1px solid ${t.accentBorder}` }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:t.accent, animation:"pulse 2s ease infinite" }} />
              <span style={{ fontSize:11, color:t.accent, fontFamily:"'DM Mono',monospace", letterSpacing:1.5 }}>OPEN TO COLLABORATION</span>
            </div>

            <h2 style={{ fontSize:38, fontWeight:700, color:t.text, margin:"0 0 16px", lineHeight:1.15, letterSpacing:-1 }}>
              Let's Build Impactful<br />
              <span className="shimmer-text">Innovation Together</span>
            </h2>
            <p style={{ fontSize:14, color:t.textSub, margin:"0 auto 48px", lineHeight:1.78, maxWidth:420 }}>
              Interested in collaborating on data projects, automation, or government digital innovation? Let's connect.
            </p>
            <div style={{ display:"flex", justifyContent:"center", gap:10, flexWrap:"wrap" }}>
              {[
                { label:"Email",     href:"mailto:baiqqrinia@gmail.com",                                  Icon:I.Mail },
                { label:"LinkedIn",  href:"https://au.linkedin.com/in/baiq-rini-adekayanti-59313356",    Icon:LI     },
                { label:"Instagram", href:"https://www.instagram.com/rishinsa/",                         Icon:I.IG   },
              ].map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", gap:9, padding:"11px 22px", borderRadius:10, border:`1px solid ${t.border}`, color:t.textMuted, fontSize:13, fontWeight:500, transition:"all 0.25s", background:t.surface, backdropFilter:"blur(10px) saturate(180%)", WebkitBackdropFilter:"blur(10px) saturate(180%)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=t.accentBorder; e.currentTarget.style.color=t.accent; e.currentTarget.style.background=t.accentSoft; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 8px 20px ${t.accent}18`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=t.border; e.currentTarget.style.color=t.textMuted; e.currentTarget.style.background=t.surface; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
                >
                  <Icon size={15} color="currentColor" />{label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ padding:"24px 40px", borderTop:`1px solid ${t.border}`, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8, transition:TRANS }}>
          <span style={{ fontSize:11, color:t.textDim, fontFamily:"'DM Mono',monospace", letterSpacing:0.5 }}>Designed with data, creativity, and impact.</span>
          <span style={{ fontSize:11, color:t.textDim, fontFamily:"'DM Mono',monospace", letterSpacing:0.5 }}>Built by RI_DEV · {new Date().getFullYear()}</span>
        </footer>

        {/* ── Back to top ── */}
        <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })} aria-label="Back to top"
          style={{ position:"fixed", bottom:32, right:32, zIndex:99, width:44, height:44, borderRadius:"50%", background:t.accentGrad, border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", boxShadow:`0 4px 16px ${t.accent}40`, opacity: scrolled ? 1 : 0, transform: scrolled ? "scale(1) translateY(0)" : "scale(0.8) translateY(8px)", transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)", pointerEvents: scrolled ? "auto" : "none" }}
          onMouseEnter={e => { e.currentTarget.style.transform="scale(1.1) translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 24px ${t.accent}55`; }}
          onMouseLeave={e => { e.currentTarget.style.transform="scale(1) translateY(0)"; e.currentTarget.style.boxShadow=`0 4px 16px ${t.accent}40`; }}
        >
          <I.ChevUp size={18} color="#fff" />
        </button>
      </div>
    </ThemeCtx.Provider>
  );
}
