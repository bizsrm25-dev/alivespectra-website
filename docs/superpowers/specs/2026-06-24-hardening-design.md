# Hardening — Alive Spectra (Phase 8)

**Date:** 2026-06-24
**Status:** Approved (in progress)
**Scope:** Legal pages, analytics (GA4 + Vercel, env-gated), a11y (skip link +
audit), perf/reduced-motion confirmation, README update, final self-critique.

## Decisions

- Analytics is **env-gated**: GA4 loads only when `NEXT_PUBLIC_GA_ID` is set;
  Vercel Analytics is inert off-Vercel. Nothing breaks without IDs.
- Legal pages are concise, honest placeholders (kill the `/privacy` + `/terms`
  404s); content to be finalised with counsel before launch.

## Work

1. **Legal** — `app/privacy/page.tsx`, `app/terms/page.tsx` (Section/Container,
   metadata, NAP from siteConfig). Add both to `app/sitemap.ts`.
2. **Analytics**
   - Dep: `@vercel/analytics`.
   - `lib/analytics.ts` — `track(event, params?)` → `window.gtag` if present
     (safe no-op otherwise).
   - `components/analytics/analytics.tsx` (client) — GA4 via `next/script`
     (only if `NEXT_PUBLIC_GA_ID`) + `<Analytics/>` from `@vercel/analytics/next`.
     Mounted in root layout.
   - `components/analytics/scroll-depth.tsx` (client) — fires `scroll_depth`
     (25/50/75/100) once each; mounted site-wide.
   - Contact form fires `track("contact_submit", { stage })` on success.
3. **A11y** — skip-to-content link in layout (→ `#content`), keyboard-reachable,
   visible on focus. Confirm focus-visible, reduced-motion, alt text, contrast.
4. **README** — document `NEXT_PUBLIC_GA_ID`, analytics, and the Resend
   domain-verification step.
5. **Self-critique** — one "remove an accessory" simplification if warranted.

## Quality floor / success criteria

- `type-check` + `lint` + `build` clean; `/privacy`, `/terms` prerender and are
  in the sitemap; no console errors.
- Analytics no-ops cleanly with no env IDs; GA script appears only when set.
- Skip link works (Tab from top → "Skip to content" → focuses main).
- Reduced-motion path remains calm (spine static, reveals instant).
- No remaining internal 404s.
