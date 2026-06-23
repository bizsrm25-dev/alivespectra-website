# Spectrum Spine + Global Shell — Alive Spectra (Phase 2)

**Date:** 2026-06-24
**Status:** Approved (design), pending implementation plan
**Scope:** The site's signature element (Spectrum Spine) and global shell (nav,
mobile menu, footer), reviewable on a placeholder page. **No business pages.**

## Goal

Ship the one memorable thing — a scroll-driven spectrum line — plus the global
chrome every page sits inside. Spend the boldness here; keep it disciplined
(spine is a hairline, base stays pine + paper + ink).

## Approved calibration

- **Spine hue:** continuous interpolation across violet→blue→green→amber→red,
  tied to overall scroll progress; eyebrows sample the live hue. Reduced motion →
  static pine line.
- **Nav:** transparent over the hero, transitions to glass (backdrop-blur +
  translucent paper + bottom hairline) after scrolling past the hero.
- **Mobile menu:** full-screen pine overlay, large Clash links, staggered reveal,
  spectrum accent on the active item.

## Architecture

New `components/shell/` module + `data/navigation.ts` (single source of truth for
links), wired once into the root layout. Spine + header are client components;
footer is a server component. Reuses the existing tokens, `SmoothScroll`, and
`useGsap`. A shared CSS variable `--spine-hue` is the only cross-component channel.

```
data/navigation.ts            # mainNav, footerColumns, sisterConcerns, socials, legal
components/shell/
  spectrum-spine.tsx          # client: scroll → interpolate hue → set --spine-hue
  logo.tsx                    # inline prism-swoosh SVG mark + optional wordmark
  site-header.tsx             # client: transparent→glass nav, links, CTA, hamburger
  mobile-menu.tsx             # client: full-screen pine overlay, a11y complete
  site-footer.tsx             # server: NAP, sitemap cols, concerns, socials, legal
  index.ts                    # barrel
app/layout.tsx                # mount SpectrumSpine + SiteHeader + SiteFooter
app/page.tsx                  # placeholder: tall sections to review spine + nav
styles/tokens.css             # add --spine-hue default (var(--pine))
components/primitives/eyebrow.tsx  # add accent="spine" support
```

## Components / units

### 1. `--spine-hue` token
Add `--spine-hue: var(--pine);` to `:root` in `styles/tokens.css`. Default pine so
the spine and any spine-accented eyebrow are calm before JS runs / under reduced
motion.

### 2. Eyebrow `accent="spine"` (modify existing primitive)
`accent` already accepts a CSS color string. Add a sentinel: when
`accent === "spine"`, render with `color: var(--spine-hue)`. Backwards-compatible.

### 3. SpectrumSpine (`components/shell/spectrum-spine.tsx`, client)
- Fixed line: `left: clamp(12px, 2vw, 28px)`, `top/bottom: 0`, `width: 2px`,
  subtle glow (`box-shadow`), `z-index` below the header.
- One ScrollTrigger over `document.documentElement`, `scrub: true`. `onUpdate`
  takes `self.progress` (0→1), interpolates RGB across the five spectrum hexes
  (`SPECTRUM_STOPS` constant), and sets `--spine-hue` on `document.documentElement`
  via a cached setter.
- Reduced motion (checked in `useGsap`): no ScrollTrigger; `--spine-hue` stays pine.
- 60fps: scrubbed updates only; no layout reads in `onUpdate`.

### 4. Logo (`components/shell/logo.tsx`)
Inline the prism-swoosh SVG (from `brand/Main Logo/Alive Spectra Logo.svg`, keeps
its own rainbow gradient) at a controlled height; optional `withWordmark` renders
"Alive Spectra" in Clash beside it. Decorative SVG gets `aria-hidden`; the link
wrapping it carries the accessible name.

### 5. SiteHeader (`components/shell/site-header.tsx`, client)
- Fixed top; renders `Logo` (links to `/`), `mainNav` links, and a primary
  `Button` "Book a consultation" (`href="/contact"`).
- Transparent→glass: a 1px sentinel at the top of `<main>`; an IntersectionObserver
  toggles a `scrolled` state when the sentinel leaves the viewport. `scrolled` adds
  `bg-paper/70 backdrop-blur border-b border-line`.
- Mobile: hamburger button toggles `MobileMenu`; `aria-expanded`/`aria-controls`.
- Keyboard accessible; visible focus on every interactive element.

### 6. MobileMenu (`components/shell/mobile-menu.tsx`, client)
- Full-screen `fixed inset-0` pine panel; `mainNav` as large Clash links + the CTA;
  staggered Motion reveal; spectrum accent bar on the active route (`usePathname`).
- A11y: scroll-lock while open, focus trap, `Esc` to close, restore focus to the
  toggle on close, `role="dialog" aria-modal="true"`.
- Reduced motion (`useReducedMotion`): instant open/close, no stagger.

### 7. SiteFooter (`components/shell/site-footer.tsx`, server)
Pine-toned. NAP block (House 60, Road 28, Gulshan-1, Dhaka-1212; phones
+880 1919-666630 / +880 1939-903964; alivespectra@gmail.com — pulled from
`lib/site.ts`), sitemap columns + sister-concern quick links + socials + legal
(from `data/navigation.ts`), and a copyright line.

### 8. data/navigation.ts
Typed exports:
- `mainNav: { label: string; href: string }[]`
- `footerColumns: { title: string; links: { label; href }[] }[]`
- `sisterConcerns: { label: string; href: string }[]` (14 concerns)
- `socials: { label: string; href: string }[]`
- `legal: { label: string; href: string }[]`

### 9. Layout + placeholder
- `app/layout.tsx`: inside `SmoothScroll`, render `SpectrumSpine`, `SiteHeader`,
  `<main id="content">{children}</main>`, `SiteFooter`.
- `app/page.tsx`: replace with ~4 tall stacked `Section`s (alternating
  paper/pine), each opening with an `Eyebrow accent="spine"`, enough height to
  exercise the hue shift and the nav transition. Clearly a placeholder.

## Out of scope (later phases)

The refraction hero animation and all business pages. The spine + shell must look
right around an empty/placeholder hero.

## Success criteria

- `type-check`, `lint`, `build` pass clean; new routes prerender.
- On the placeholder page: spine hue shifts smoothly while scrolling; spine-accented
  eyebrows track it; nav starts transparent over the first section and becomes glass
  after; mobile menu opens full-screen with working `Esc`/focus-trap/scroll-lock.
- Reduced motion: spine static pine, nav still functional, menu instant — page
  fully usable, nothing broken.
- Spine remains a hairline; spectrum stays < ~5% of the viewport.
