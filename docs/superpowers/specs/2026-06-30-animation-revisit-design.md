# Animation Revisit — Alive Spectra

**Date:** 2026-06-30
**Status:** Approved
**Decisions:** GSAP-only (remove Framer Motion) · micro-interactions + unified
reveals + hero polish (no route transitions) · calm & editorial · reduced-motion
safe throughout · performance is a hard constraint (must not get laggy).

## Problem

Motion is uneven and flat: the `Reveal` (Framer Motion) is applied to only ~3
sections, the nav only swaps colour on hover, and the hero has no entrance. Two
animation engines ship (GSAP+Lenis and Framer Motion).

## 1. Engine consolidation

- Remove the `motion` dependency. It is only used by `Reveal` and `MobileMenu`.
- Rebuild both with GSAP (already bundled for the spine + Lenis). One engine,
  smaller JS.

## 2. Unified reveal system (one observer, not many)

- `components/motion/reveal-controller.tsx` (client, mounted once in layout):
  - On mount, if `prefers-reduced-motion` → do nothing (content stays visible).
  - Else add `gsap` class to `<html>` in a layout effect (pre-paint), then run a
    single `ScrollTrigger.batch(".reveal", { once: true, onEnter: batch =>
gsap.to(batch, { opacity: 1, y: 0, stagger: 0.08, duration: 0.7,
ease: "power2.out" }) })`.
  - Re-init on `pathname` change (kill old triggers, refresh).
- `components/motion/reveal.tsx`: `<Reveal as? className?>` renders an element
  with class `reveal`. No per-component ScrollTrigger.
- `app/globals.css`: `html.gsap .reveal { opacity: 0; transform: translateY(16px); }`
  — gated on `html.gsap` so no-JS / reduced-motion / crawlers get full content
  (no hidden text, SEO-safe). `will-change` only while animating.
- Apply `<Reveal>` to the major section blocks of every page (home, about,
  services, plans, ecosystem, projects, clients, insights, contact) — section
  level, not every element, to avoid overload.

## 3. Nav micro-interactions

- Desktop + mobile nav links: a left-anchored underline that wipes in via
  `transform: scaleX(0→1)` (GPU; no layout thrash) on hover/focus, plus the
  existing colour ease. Active page keeps the spectrum underline; hover uses a
  pine underline. Pure CSS (`origin-left scale-x-0 → hover:scale-x-100`,
  `motion-reduce:transition-none`) — no JS per link.
- Logo: subtle mark scale/opacity nudge on hover (CSS).

## 4. Hero polish

- One GSAP intro timeline on mount: eyebrow → headline (rise/clip) → subcopy →
  CTAs, gentle stagger, `ease: power3.out`. Runs once. Reduced-motion → set
  final state instantly (no animation). Cleaned up via `gsap.context`.

## 5. Consistent hover affordances

- Shared, restrained language for plan rungs / service rows / project &
  ecosystem cards / buttons: arrow shift or subtle translate on hover, CSS-only,
  `motion-reduce` safe. Replaces today's ad-hoc colour-only changes.

## 6. Performance guardrails

- Transforms/opacity only; `once: true` reveals; one batch trigger per page;
  GSAP context cleanup on unmount/route change; `prefers-reduced-motion`
  short-circuits all JS motion; no route transitions; Framer Motion removed
  (net JS decreases). Verify build + a manual scroll/INP sanity check.

## Out of scope

Route/page transitions, layout or visual redesign, palette changes.

## Success criteria

- `type-check` + `lint` + `build` clean; `motion` removed from deps.
- Reveals fire once, consistently, on all pages; content visible with JS off and
  under reduced motion.
- Nav links show an animated underline on hover; active state still clear.
- Hero plays a one-time entrance; instant under reduced motion.
- No scroll jank; no hidden-content SEO regression.
