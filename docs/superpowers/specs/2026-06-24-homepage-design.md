# Homepage — Alive Spectra (Phase 3)

**Date:** 2026-06-24
**Status:** Approved (design), pending implementation plan
**Scope:** The full homepage — 8 sections including the Refraction hero — plus
typed content data files and homepage JSON-LD. No other business pages.

## Goal

Ship a homepage that feels Awwwards-level yet fast and trustworthy: the
Refraction thesis up top, proof and the service spectrum, the growth-plans
ladder, ecosystem/projects teasers, a founder trust anchor, and a strong CTA.

## Approved calibration

- **Hero:** high-craft SVG/CSS + GSAP refraction (beam → prism → spectrum →
  service labels). Lazy; LCP = real headline text. Reduced motion → resolved
  static composition.
- **Scope:** full 8-section homepage + Organization/LocalBusiness JSON-LD.
- **Client proof:** real client logos (mostly SVG), quiet monochrome (grayscale,
  color on hover). **ICRC held out** (`holdForPermission`) pending rights.

## Architecture

`components/home/` section components assembled in `app/page.tsx`. Content lives
in typed `data/*.ts` files (shared with later detail pages). Selected client
logos are copied to `public/logos/`. JSON-LD is built in `lib/json-ld.ts` from
`siteConfig`. Reuses tokens, primitives, `Reveal`, `Section`/`Container`.

```
data/services.ts   data/plans.ts   data/projects.ts   data/clients.ts
lib/json-ld.ts
public/logos/<client>.{svg,png}
components/home/
  hero/refraction-hero.tsx   # client: GSAP timeline + static fallback
  hero/index.tsx             # server: headline/eyebrow/CTA (LCP) + lazy visual
  proof-bar.tsx
  services-spectrum.tsx
  plans-ladder.tsx
  ecosystem-teaser.tsx
  projects-teaser.tsx
  founder-moment.tsx
  home-cta.tsx
  index.ts
app/page.tsx                 # assembles sections + JSON-LD + generateMetadata
```

## Content data (typed)

- **services.ts** — 9 items: `{ slug, name, promise, href, hue }` where `hue` is a
  hex sampled along the spectrum (violet→red across the 9). Slugs match the
  guideline sitemap (`funding-investment-advisory`, `it-digital-solutions`,
  `marketing-pr`, `management-consultancy`, `ai-training-consulting`,
  `fintech-consultation`, `budget-consultation`, `agriculture-consultancy`,
  `creative-advertising`).
- **plans.ts** — 4 rungs: `{ slug, rung, name, audience, promise, href }`
  (entrepreneurs, startups, smes, corporations).
- **projects.ts** — flagships: `{ slug, name, sector, location, status, href }`
  (Unity Hospital, Pro Health Smart Hospital, Prime Place, + Unity Agro Park,
  Diligence Universal — homepage features the first three).
- **clients.ts** — `{ name, logo, featured, holdForPermission? }`. Use the SVG/PNG
  files in `brand/Logos of Clients` (copied to `public/logos/`): Beacon Pharma,
  ASMACS, Biomedica, Unity Hospital, Better Holdings (BHL), Banalata Agro Park,
  Laser Trend, TKB Aegis, Stanford Universal, Mountain Heaven, Pro Health,
  Diligence Group, Go Green Life (GGLBD), Unity Agro. ICRC → `holdForPermission`.

## Sections

1. **Hero (`components/home/hero/`)** — server `index.tsx` renders eyebrow
   ("Business consultancy • Dhaka • Since 2007"), the LCP headline ("One idea,
   refracted into a full spectrum of execution — strategy, capital, technology,
   and a ready-built ecosystem."), subcopy, and "Book a consultation" + "Explore
   the spectrum". `refraction-hero.tsx` (client, dynamically imported, no SSR) is
   the GSAP beam→prism→spectrum visual that resolves into the 9 service labels;
   `useReducedMotion`/`useGsap` → static resolved composition. The visual is
   decorative (`aria-hidden`); the labels also exist as real links in the
   services section, so nothing is animation-only.
2. **Proof bar** — "17 years · since 2007" + sector line + monochrome client-logo
   marquee (`data/clients.ts`, featured & not held). Grayscale, color on hover;
   `next/image` for raster, inline/`<img>` for SVG.
3. **Services spectrum** — 9 bands from `data/services.ts`; each band: wavelength
   `Eyebrow` (its `hue`), name, one-line promise, link to `href`; `Reveal`
   blur-to-sharp on scroll. Disciplined — hue is a small accent per band.
4. **Plans ladder** — `data/plans.ts` as a numbered 4-rung sequence (numbering is
   real order); each rung links to its plan.
5. **Ecosystem teaser** — "One parent, many concerns" + a grid of the 14
   `sisterConcerns` (reuse `data/navigation.ts`), link to `/ecosystem`.
6. **Projects teaser** — first 3 of `data/projects.ts` as editorial cards
   (sector/location/status), link to `/projects`.
7. **Founder moment** — signed pull-quote from Abdur Razzaq Mamun (Founder & MD),
   text-forward, portrait slot (placeholder block, no asset yet), link to
   `/about`. Restrained, elegant — a trust anchor.
8. **CTA close** — "17 years" trust stat + "Book a consultation" + direct contact
   (phone/email from `siteConfig`), on a pine tone.

## SEO

- `lib/json-ld.ts`: `organizationLd()` + `localBusinessLd()` from `siteConfig`
  (name, url, founder, NAP, founded 2007, Gulshan-1 geo, sameAs socials).
- `app/page.tsx`: `generateMetadata` (title, description, canonical, OG/Twitter)
  and a `<script type="application/ld+json">` with both graphs.

## Quality floor

- LCP = the server-rendered hero headline; the GSAP visual is dynamically
  imported (`ssr: false`) and never blocks it.
- Spectrum stays accent-only; reduced motion safe on hero + every `Reveal`;
  keyboard + visible focus; logos have meaningful `alt`; no CLS (reserve hero
  visual space).

## Out of scope

`/services`, `/plans`, `/ecosystem`, `/projects`, `/clients`, `/about`,
`/insights`, `/contact` detail pages (later phases). Data files are built now so
those pages reuse them.

## Success criteria

- `type-check` + `lint` + `build` clean; `/` prerenders (hero visual hydrates
  client-side).
- All 8 sections render with in-brand copy; client logos show monochrome→color;
  services/plans/projects come from data files.
- JSON-LD validates shape (Organization + LocalBusiness) in the page source.
- Reduced motion: hero static & complete, reveals instant; page fully usable.
