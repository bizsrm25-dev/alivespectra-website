@AGENTS.md

# Alive Spectra Ltd. — Website

Business consultancy, Gulshan-1, Dhaka, Bangladesh. Founded 2007 (17 yrs).
Tagline: "Changing the way of thinking." Site: alivespectra.com
Founder & MD: Abdur Razzaq Mamun (also founded BizSolve, Agrovez, Alive
Lighthouse, Alive News24). Feature him on /about + a homepage founder moment.

## Creative concept: "Refraction"

The brand is a prism: one idea refracts into a spectrum of services, sister
concerns, and projects. Signature = the **"Spectrum Spine"** (a thin fixed
vertical line whose hue shifts with scroll: violet→blue→green→amber→red).
Spend boldness on hero + spine only; inner pages are calm, editorial, fast.

## Non-negotiables

- Base palette = pine green + paper + ink. The spectrum gradient is an
  **ACCENT ONLY** (< ~5% of any viewport).
- Display: **Clash Display**. Body: **Hanken Grotesk**. Mono/labels: **Space Mono**.
- Numbered markers only where order is real (the 4 growth plans).
- Performance: **LCP < 2.5s, INP < 200ms, CLS < 0.1.** Respect `prefers-reduced-motion`.
- Copy: plain, confident, specific. No buzzword soup, no filler.

## Design tokens

Single source of truth: `styles/tokens.css` (CSS variables), mapped into the
Tailwind v4 theme in `app/globals.css`. Use the utilities, not raw hexes:

```
Surfaces  --ink #0E1A16 · --paper #F5F7F6 · --paper-2 #ECF1EF
Greens    --pine #0C3A2E · --pine-2 #103B33 · --teal #2F7E6E · --teal-soft #6FB3A4
Hairline  --line #D7E0DC
Spectrum  --spec-violet #6C4CF1 · --spec-blue #2F8FE8 · --spec-green #2FBE7E
          --spec-amber #F2A93B · --spec-red #E5564B
          --spectrum (90deg gradient of the five above)  ← accent only
Fonts     font-display (Clash) · font-sans (Hanken) · font-mono (Space Mono)
```

## Stack

Next.js 16 (App Router, TS) · Tailwind v4 · Lenis · GSAP/ScrollTrigger (all
animation: spine, reveals, hero, micro-interactions) · MDX (insights) ·
RHF+Zod+Resend (forms) · GA4+Vercel Analytics · Vercel host.

## Sitemap

```
/                  Home — the refraction story, top services, proof, CTA
/about             Story (2007), founder's message, mission/vision, CSR, SDGs
/plans             Growth Plans ladder → /entrepreneurs /startups /smes /corporations
/services          Services overview (the spectrum) → 9 service detail pages
/ecosystem         14 sister concerns → /ecosystem/[slug]
/projects          Flagship projects → /projects/[slug]
/clients           Trust wall of client logos
/insights          MDX blog / SEO hub → /insights/[slug]   ← SEO engine, non-negotiable
/contact           Qualifying form + map + booking CTA
/privacy /terms    Legal
```

`/plans` and `/services` are the money pages — optimize hardest there.

## Content lives in

`data/*.ts` (services, plans, concerns, projects, clients) and `content/*.mdx`
(insights). Keep all JSON-LD valid. Site-wide constants in `lib/site.ts`.
Brand source material (profile, guideline, logos) in `brand/`.

## Contact / NAP (keep identical everywhere)

House 60, Road 28, Gulshan-1, Dhaka-1212, BD ·
+880 1919-666630 / +880 1939-903964 · alivespectra@gmail.com
