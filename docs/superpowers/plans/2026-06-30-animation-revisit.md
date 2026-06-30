# Animation Revisit — Implementation Plan

> Spec: `docs/superpowers/specs/2026-06-30-animation-revisit-design.md`.
> Verify each task: `type-check` + `lint` + `build`. Branch `feat/animation-revisit`.

## Tasks

### AR-1: GSAP reveal foundation

- [ ] `app/globals.css`: add `html.gsap .reveal { opacity:0; transform:translateY(16px) }` and a `will-change` helper; respect `motion-reduce`.
- [ ] `components/motion/reveal-controller.tsx` (client): reduced-motion guard; add `gsap` class pre-paint; `ScrollTrigger.batch(".reveal", once, stagger reveal); re-init on pathname change; cleanup.
- [ ] `components/motion/reveal.tsx`: rewrite to a class-based marker (`reveal`), drop Framer. Keep `delay?`/`className`/`as?` API minimal.
- [ ] Mount `<RevealController/>` in `app/layout.tsx`.
- [ ] type-check.

### AR-2: Remove Framer Motion (mobile menu → GSAP/CSS)

- [ ] Rewrite `components/shell/mobile-menu.tsx` without `motion/react` (CSS/GSAP transitions, keep a11y: dialog, esc, scroll-lock, focus, stagger via CSS).
- [ ] `npm remove motion`. Grep to confirm no `motion/react` imports remain.
- [ ] type-check + lint + build.

### AR-3: Nav micro-interactions

- [ ] `site-header.tsx` + `mobile-menu.tsx`: animated `scaleX` underline on hover/focus (CSS, origin-left), keep active spectrum underline + `aria-current`. Logo hover nudge in `logo.tsx`. `motion-reduce` safe.
- [ ] type-check + lint + build.

### AR-4: Hero intro timeline

- [ ] `components/home/hero/index.tsx` (or a child client cmp): GSAP `context` intro timeline (eyebrow→headline→subcopy→CTAs), once; reduced-motion sets final state. Cleanup.
- [ ] type-check + lint + build.

### AR-5: Consistent reveals + hover affordances

- [ ] Wrap major section blocks across all pages in `<Reveal>` (home/about/services/plans/ecosystem/projects/clients/insights/contact) — section level.
- [ ] Shared restrained hover (arrow shift / subtle translate) on plan rungs, service rows, project & ecosystem cards, buttons; `motion-reduce` safe.
- [ ] type-check + lint + build.

### AR-6: Verify + perf pass

- [ ] Build clean; `motion` gone from `package.json`. Reveals fire once on every page; content present with JS off + reduced motion (curl HTML has section text, not opacity:0 inline). Nav underline animates. Hero plays once. No console errors; scroll smooth.
- [ ] Commit; merge to main.

## Self-review

Engine consolidation (AR-1/2), nav (AR-3), hero (AR-4), consistency+affordances (AR-5), verify (AR-6). Reduced-motion + SEO-safe initial state covered. Net JS decreases (Framer removed). ✓
