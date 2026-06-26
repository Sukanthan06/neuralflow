# NeuralFlow — AI-Driven Data Automation Platform

> Built for **Frontend Battle 3.0** — IIT Bhubaneswar | June 2026

A premium, high-converting SaaS landing page for an AI data automation 
platform. Built under a 4-hour time constraint as part of the qualifying 
round of Frontend Battle 3.0, hosted by the Web and Design Society, 
IIT Bhubaneswar.

🔗 **Live Demo:** https://neuralflow-jnyh.vercel.app/

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + custom CSS variables
- **Language:** TypeScript
- **Fonts:** JetBrains Mono + Inter (Google Fonts)
- **Deployment:** Vercel

---

## Features

### Feature 1 — Matrix-Driven Pricing & Currency Switcher
- Toggle between **Monthly and Annual** billing (20% annual discount)
- Switch between **INR (₹), USD ($), and EUR (€)** currencies
- Prices computed dynamically using a **multi-dimensional configuration 
  matrix** — no hardcoded UI values
- State updates are **strictly isolated to price text nodes** — 
  changing currency or billing cycle does not trigger a global re-render. 
  Verified via Chrome DevTools performance tab.

### Feature 2 — Bento-to-Accordion with State Persistence
- **Desktop (≥768px):** Core features displayed in a CSS bento grid 
  with varying card sizes
- **Mobile (<768px):** Automatically reflows into a touch-optimized 
  accordion list
- **Context transfer on resize:** Active bento card index is tracked 
  via `useRef`. On viewport crossing the 768px breakpoint, the 
  corresponding accordion panel opens automatically — and vice versa.
- Built with **zero external UI or animation libraries** — 
  all transitions use native CSS and the Web Animations API.

---

## Performance & SEO

- ✅ Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`)
- ✅ Full Open Graph + Twitter Card meta tags
- ✅ Accessible image alt attributes on all SVGs
- ✅ Entry animations complete within 500ms threshold
- ✅ Hardware-accelerated transitions (transform + opacity only)
- ✅ No layout thrashing or global re-renders

---

## Assets Used

All assets provided in the official asset package:

- **Color Palette:** Arctic Powder `#F1F6F4`, Mystic Mint `#D9E8E2`, 
  Forsythia `#FFC801`, Deep Saffron `#FF9932`, 
  Nocturnal Expedition `#114C5A`, Oceanic Noir `#172B36`
- **Fonts:** JetBrains Mono (headers/code), Inter (body/UI)
- **SVGs:** arrow-path, arrow-trending-up, chart-pie, chevron-down, 
  chevron-left, chevron-right, chevron-up, chevron-up-solid, 
  cog-8-tooth, cube-16-solid, link, link-solid, search, x-mark

---

## Project Structure
neuralflow-app/

├── app/

│   ├── components/

│   │   ├── Nav.tsx

│   │   ├── Hero.tsx

│   │   ├── FeaturesSection.tsx   ← Bento/Accordion (Feature 2)

│   │   ├── PricingSection.tsx    ← Currency Switcher (Feature 1)

│   │   ├── SocialProof.tsx

│   │   └── Footer.tsx

│   ├── globals.css

│   ├── layout.tsx                ← SEO metadata

│   └── page.tsx

├── public/

│   └── icons/                    ← All provided SVG assets

├── tailwind.config.ts

└── next.config.mjs

---

## Animation Rules followed

| Type | Duration | Easing |
|---|---|---|
| Hover / Toggle | 150–200ms | ease-out |
| Layout reflow | 300–400ms | ease-in-out |
| Entry animations | ≤ 500ms | ease-out |

---

*Frontend Battle 3.0 — Web and Design Society, IIT Bhubaneswar*