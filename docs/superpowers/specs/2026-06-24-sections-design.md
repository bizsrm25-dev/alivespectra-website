# Plans · Ecosystem · Projects · Clients (Phase 5)

**Date:** 2026-06-24
**Status:** Approved (design), pending implementation plan
**Scope:** Four content sections — overviews + concise/complete detail pages
(plans, ecosystem, projects) + the clients trust wall. Reuses Breadcrumb +
breadcrumbLd from Phase 4.

## Approved calibration

- **Detail depth:** concise & complete — every route exists (no 404s), focused
  defensible content per page.
- **Clients:** grouped monochrome logo wall, no per-client detail pages.

## Data

- **`data/concerns.ts`** (new) — 14 sister concerns: `{ slug, name, category,
  description }`. `data/navigation.ts` `sisterConcerns` derives from it (single
  source; footer + homepage ecosystem teaser keep working).
- **`data/plans.ts`** — extend with `overview`, `context`, `support: string[]`,
  `ctaLabel`.
- **`data/projects.ts`** — extend with `overview`, `description`,
  `highlights: string[]`.

## Routes (all prerendered via `generateStaticParams`; `dynamicParams = false`)

- `/plans` — 4-rung ladder overview + CTA.
- `/plans/[slug]` ×4 — breadcrumb, hero (rung № + name + audience + promise),
  context, support-system list, CTA, prev/next along the ladder.
- `/ecosystem` — overview grid grouped by category + CTA.
- `/ecosystem/[slug]` ×14 — breadcrumb, hero (name + category), description,
  "back to ecosystem" + Contact CTA.
- `/projects` — editorial cards of all projects + CTA.
- `/projects/[slug]` ×5 — breadcrumb, hero (name + sector/location/status tags),
  description, highlights, CTA, prev/next.
- `/clients` — grouped logo wall (hover→color), trust line, CTA. ICRC held.

## SEO / reuse

Per-page `generateMetadata` (title, description, canonical, OG). BreadcrumbList
JSON-LD on every detail page via `breadcrumbLd` + `Breadcrumb`. Reuse primitives,
`Reveal`, hue `Eyebrow`, `Tag`, editorial hierarchy, spectrum-accent discipline.

## Quality floor

Editorial, calm, fast; reduced-motion safe; keyboard + visible focus; all routes
prerender; no CLS; no broken internal links (this phase resolves the dangling
`/plans/*`, `/ecosystem/*`, `/projects/*` links).

## Out of scope

`/about`, `/insights`, `/contact` (Phase 6); sitemap/robots/OG-images (Phase 7).

## Success criteria

- `type-check` + `lint` + `build` clean; `/plans`, `/ecosystem`, `/projects`,
  `/clients` + all 4 plan / 14 concern / 5 project detail routes prerender.
- Each detail page: unique metadata + BreadcrumbList JSON-LD + working links.
- Homepage/services links into these sections all resolve (no 404).
