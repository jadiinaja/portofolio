# Portfolio — RI_DEV

Personal portfolio for Baiq Rini Adekayanti — AI Engineer, Statistician & Government Innovator.
AAS (Australia Awards Scholarship) awardee, Pranata Komputer Ahli Muda at BPS Kabupaten Lombok Tengah.

---

## ✅ Completed

### Tech Stack (actual)
- **Vite + React 19** (not Next.js — migrated away from original spec)
- Inline styles (no Tailwind, no Framer Motion)
- Custom IntersectionObserver hook for scroll animations
- Custom SVG icon system (Lucide-style paths)
- Deployed target: Vercel

### File Structure (after P2 split)
```
portfolio.jsx          ← main entry, all section components
src/
  main.jsx             ← React root mount
  constants/themes.js  ← dark/light theme tokens
  hooks/useInView.js   ← IntersectionObserver hook
  components/icons.jsx ← SVG icon library (I.*, LI)
  data/index.js        ← projects, skillGroups, achievements, aboutItems, statusDot
  assets/hero.png
index.html             ← fonts (Space Grotesk + DM Mono), meta description
public/favicon.svg
```

### Design System
- Dark mode default, light mode toggle (persisted in localStorage)
- Primary accent: `#10B981` (Emerald Green)
- Secondary accent: `#F59E0B` (Muted Gold) — achievements/awards only
- Fonts: Space Grotesk (body) + DM Mono (labels/mono) — loaded in `index.html`
- Scrollbar: 3px, `#10B981` thumb
- Grid overlay + radial glow orbs in hero (CSS only)
- All animations: CSS keyframes + IntersectionObserver (no canvas, no heavy libs)

### Sections
1. **Loading screen** — spinner + fake progress bar, auto-dismiss
2. **Nav** — fixed, blur on scroll, theme toggle, mobile hamburger menu ✅
3. **Hero** — badge, H1 with shimmer animation, CTA row, parallax orbs, counter stats ✅
4. **Projects** — 3-col bento grid (2-col tablet, 1-col mobile), hover lift + glow
5. **Skills** — tag-pill grouped by category (no arbitrary percentages) ✅
6. **Achievements** — auto-fill grid, gold/standard card variants
7. **About** — 2-col layout, persona-focused text (not institution-focused) ✅
8. **Contact** — centered, 3 buttons (Email, LinkedIn, Instagram)
9. **Footer** — `Built by RI_DEV · {year}`
- **Scroll progress bar** — thin accent line at top of viewport ✅
- **Back-to-top button** — fixed bottom-right, appears on scroll ✅

### Motion
- Scroll progress bar (top of page)
- Parallax on hero orbs (scroll-linked translateY)
- Counter animation on hero stats (counts up on scroll-in)
- Card hover lift: `translateY(-5px) scale(1.01)` + deeper shadow
- Icon scale on card hover
- SectionHead fade+slide in on scroll
- `shimmer` keyframe on hero gradient text
- `prefers-reduced-motion` respected via CSS media query

### Contact links (live)
- Email: `baiqqrinia@gmail.com`
- LinkedIn: `https://au.linkedin.com/in/baiq-rini-adekayanti-59313356`
- Instagram: `https://www.instagram.com/rishinsa/`
- WhatsApp: removed

### Projects (current)
| # | Title | Status | Notes |
|---|-------|--------|-------|
| 1 | HaloSemeton — WhatsApp & Telegram AI Chatbot | Live | multi-agent, RAG, Supabase |
| 2 | SILA PST — Digital Guest Book & Queue | Live | React, Vercel |
| 3 | Economic Phenomena Dashboard | Deployed | news scraping, economic intelligence |
| 4 | AppScript & Bot Automation Suite | Deployed | rename scan docs, form-fill bots |
| 5 | Pembinaan Statistik Desa | Live | village statistical governance program |
| 6 | Data Education Pipeline | Deployed | Sheets→scrape→AI→infographic→WA |

---

## 🔲 Remaining / Future

### CV Download
- Button added in hero CTAs: `href="/resume.pdf"` with `download` attribute
- **Action needed**: place actual `resume.pdf` in `/public/` folder

### File Split (P2) — done structurally, one remaining concern
- `src/data/index.js` currently uses `iconKey` string references → looked up via `I[iconKey]` in components
- Consider migrating to a fully typed approach if TypeScript is added later

### Not yet done
- TypeScript migration (deferred — not blocking)
- Replace custom icon system with `lucide-react` package (deferred — working well as-is)
- Avatar/photo in hero section (deferred — needs asset)
- Project card links (no live URLs available yet for most projects)
- Active nav section highlight on scroll (deferred)

---

## Persona
Focus: **skills and impact over institutional identity**
- Hero badge: `AI ENGINEER · STATISTICIAN · AAS AWARDEE` (not BPS/5202)
- About title: "AI Engineer & Data Innovator" (not "Birokrat Inovatif")
- Footer: `Built by RI_DEV · {year}` (not BPS branding)
- Projects described by what they do, not which office they're in
