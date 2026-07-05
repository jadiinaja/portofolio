# RI_DEV Portfolio

Personal portfolio site for Baiq Rini Adekayanti — AI Engineer, Statistician & Government Innovator.

## Stack

Static single-page site: React 19 + Vite, no backend, no database. All content is in `portfolio.jsx` / `src/data/index.js`.

## Local setup

```bash
npm install
npm run dev       # start dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint       # eslint
```

## Deploy

Static output — deploy `dist/` to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages). No environment variables required.

## Project structure

- `portfolio.jsx` — main page component (hero, projects, skills, achievements, about, contact)
- `src/data/index.js` — content data (projects, skills, achievements)
- `src/constants/themes.js` — light/dark theme tokens
- `src/components/icons.jsx` — inline SVG icon set
- `public/` — favicon, icon sprite, OG share image
