# Design System — Alive Spectra (Phase 1)

**Date:** 2026-06-24
**Status:** Approved (design), pending implementation plan
**Scope:** The design system as the single source of truth — tokens, typography,
primitives, motion layer, and a `/styleguide` review route. **No business pages.**

## Goal

Establish the disciplined visual + motion foundation every later page builds on.
Base register = pine green + paper + ink; the spectrum is an accent only
(< ~5% of any viewport). Performance and reduced-motion safety are first-class.

## Approved aesthetic calibration

- **Type register:** Bold editorial — large Clash Display hero, dramatic (~1.333)
  scale jumps, type as a feature; body stays tight and quiet.
- **Shape language:** Architectural / sharp — near-zero radius (3px) on buttons
  and structure; soft radius (14px) reserved for cards/media.
- **Motion feel:** Brand "focus" reveal — default reveal is blur-to-sharp + slight
  upward drift, calm expo-out easing (~0.8s). Reduced motion → instant & visible.

## Architecture

Each primitive is one small, self-contained file with a typed prop interface.
Tokens are the only shared dependency, so restyling = editing `styles/tokens.css`.
Division of labor (per the brand guideline): **GSAP** for orchestrated scroll,
**Motion (Framer Motion)** for component-level reveals, **Lenis** for smooth scroll.

```
styles/
  tokens.css        # raw CSS vars (color [exists] + type scale, radius, motion, layout)
  typography.css    # reusable text-style classes (.t-display, .t-h1.. .t-eyebrow)
app/
  globals.css       # @import tailwind + tokens + typography; @theme inline; base resets
  styleguide/page.tsx
components/
  primitives/
    container.tsx · section.tsx · eyebrow.tsx · button.tsx · hairline.tsx · tag.tsx
    index.ts        # barrel export
  motion/
    smooth-scroll.tsx  # Lenis provider (client), synced to GSAP, reduced-motion aware
    reveal.tsx         # Motion-based blur-to-sharp reveal (client), reduced-motion aware
lib/
  use-gsap.ts       # GSAP context hook (auto-cleanup, no-op under reduced motion)
  utils.ts          # cn() — clsx + tailwind-merge
```

## Components / units

### 1. Tokens (`styles/tokens.css`) + theme mapping (`app/globals.css`)

Extend the existing color tokens with:

- **Type scale** (fluid `clamp()`): `--text-display` ~44→96px, `--text-h1` 36→64,
  `--text-h2` 28→48, `--text-h3` 22→32, `--text-h4` 18→24, `--text-body-lg` 17→20,
  `--text-body` 16, `--text-small` 14, `--text-eyebrow` 12.
- **Line-heights / tracking:** display 0.95 / tight; headings ~1.1; body 1.6.
- **Radius:** `--radius-sharp: 3px`, `--radius-card: 14px`, `--radius-pill: 999px`.
- **Motion:** `--ease-focus: cubic-bezier(0.16,1,0.3,1)`, `--dur-reveal: 0.8s`,
  `--dur-quick: 0.22s`.
- **Layout:** `--container-max: 75rem`, `--gutter` (responsive), `--space-section`
  (fluid vertical rhythm).
  Map fonts, colors, radius into the Tailwind v4 `@theme inline` block so utilities
  (`text-pine`, `rounded-sharp`, etc.) stay token-driven.

### 2. Typography (`styles/typography.css`)

Reusable classes usable in JSX and MDX: `.t-display`, `.t-h1`–`.t-h4`, `.t-body`,
`.t-body-lg`, `.t-eyebrow`, `.t-mono`. Headings → Clash, body → Hanken,
eyebrow/labels → Space Mono. Each sets size (clamp var) + leading + tracking.

### 3. Primitives (`components/primitives/`)

- **Container** — max-width + responsive gutter; `size?: "default" | "narrow" | "wide"`.
- **Section** — vertical rhythm from a single `--space-section` token (one padding
  source, no competing paddings); `tone?: "paper" | "pine"` for light/dark sections;
  `as?` for semantic element.
- **Eyebrow** — mono label; optional wavelength marker (`λ 01 — FUNDING`); `accent`
  defaults teal, accepts a spectrum hue.
- **Button** — `variant: "primary" | "ghost"`; sharp 3px radius; renders `<button>`
  or `<a>` when `href` is set; quick (`--dur-quick`) hover transition.
- **Hairline** — divider in `--line`; `orientation: "horizontal" | "vertical"`.
- **Tag** — small mono chip; sharp radius; hairline border.

### 4. Motion layer (reduced-motion-safe)

- **SmoothScroll** — inits Lenis, drives `ScrollTrigger.update` via `gsap.ticker`;
  under `prefers-reduced-motion` it does not init Lenis (native scroll). Added once
  in the root layout.
- **Reveal** — Motion `whileInView`: from `{opacity:0, y:16, filter:"blur(8px)"}`
  to sharp, `--ease-focus` / `--dur-reveal`; props `delay`, `as`. Under reduced
  motion (via `useReducedMotion`) renders children static and fully visible.
- **useGsap** — wraps GSAP work in `gsap.context()` with cleanup; no-ops under
  reduced motion. Foundation for the Spectrum Spine (next phase).

### 5. `/styleguide` route

One page rendering: color swatches (name + hex), the spectrum accent strip, each
type style as a specimen, all primitives in every variant, and live `Reveal`
demos. `metadata.robots = { index: false }`. The visual sign-off surface.

## Dependencies

Add `clsx` and `tailwind-merge` (for `cn()`). No other new dependencies — Lenis,
GSAP, and Motion are already installed.

## Out of scope (later phases)

The Spectrum Spine, global nav/footer shell, and all business pages. `useGsap` and
the tokens are built now so the spine drops in cleanly next.

## Success criteria

- `/styleguide` renders every token, type style, and primitive variant.
- `npm run type-check`, `npm run lint`, and `npm run build` all pass clean.
- Reduced-motion (`prefers-reduced-motion: reduce`) yields a calm, complete page
  with no blur/transform animation and native scroll.
- Spectrum stays an accent (< ~5% of the styleguide viewport).
