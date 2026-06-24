# Services — Alive Spectra (Phase 4)

**Date:** 2026-06-24
**Status:** Approved (design), pending implementation plan
**Scope:** `/services` overview + a reusable detail template for the 9 service
pages, data-driven, with Service + BreadcrumbList + FAQPage JSON-LD.

## Approved calibration

- **Copy:** defensible, in-brand, qualitative — no hard market stats.
- **FAQ:** 2–3 FAQs per service with FAQPage JSON-LD.

## Architecture

Expand `data/services.ts`; build `/services` (overview) and
`/services/[slug]` (detail, `generateStaticParams` over the 9). Add JSON-LD
helpers and a reusable `Breadcrumb` primitive. Reuse existing primitives,
`Reveal`, hue-accented `Eyebrow`, and the spectrum-accent discipline.

```
data/services.ts                      # expanded Service type + content
lib/json-ld.ts                        # + serviceLd, breadcrumbLd, faqLd
components/primitives/breadcrumb.tsx  # new, reusable; exported from barrel
app/services/page.tsx                 # overview
app/services/[slug]/page.tsx          # detail template
```

## Data model (`data/services.ts`)

Extend the current `{ slug, name, promise, href, hue }` with:

```ts
type Service = {
  slug: string; name: string; promise: string; href: string; hue: string;
  overview: string;          // one-line positioning
  context: string;           // qualitative market/approach paragraph (no hard stats)
  keyServices: string[];     // 4–6 items
  ecosystem: { label: string; href: string; note: string }; // linked sister concern
  project: { name: string; href: string };                   // proof link
  faqs: { q: string; a: string }[];                          // 2–3
};
```

Ecosystem links use real mappings (IT → BizSolve, Agriculture → Agrovez,
Funding → in-house investor network/Team Alive, etc.). Project links reference
`data/projects.ts` slugs where sensible.

## Overview page (`/services`)

`generateMetadata`; hero (eyebrow "The spectrum", title, intro); the 9 services
as an editorial list — each row: wavelength `λ NN` in the service hue, name,
promise, link to detail; closing CTA. Calm, fast.

## Detail template (`/services/[slug]`)

`generateStaticParams` from `services`; `notFound()` for unknown slugs;
per-slug `generateMetadata` (title = name, description = overview, canonical
`/services/<slug>`, OG/Twitter). Sections:

1. `Breadcrumb` (Home / Services / [name]) + hero (hue eyebrow `λ NN`, name, promise).
2. Context & approach paragraph.
3. Key services list.
4. Ecosystem connection ("Delivered with [concern]" → `/ecosystem/[slug]`).
5. Project proof card → project href.
6. FAQ (2–3).
7. CTA — Book a consultation.
8. Prev / next service nav (wraps around the 9).

JSON-LD injected: `Service` (name, description, provider = Organization,
areaServed Bangladesh, serviceType), `BreadcrumbList`, `FAQPage`.

## `Breadcrumb` primitive

`Breadcrumb({ items: { label: string; href?: string }[] })` — mono, hairline
separators; last item is current (no link). Emits only markup; JSON-LD is
separate (`breadcrumbLd`).

## Quality floor

Editorial hierarchy (display headline as event, generous space), spectrum stays
accent-only, reduced-motion-safe reveals, keyboard + visible focus, all routes
prerender, no CLS.

## Out of scope

`/plans`, `/ecosystem`, `/projects`, `/clients`, `/about`, `/insights`,
`/contact` (later phases). `Breadcrumb` + JSON-LD helpers are built reusably here.

## Success criteria

- `type-check` + `lint` + `build` clean; `/services` and all 9
  `/services/<slug>` prerender (`generateStaticParams`).
- Each detail page: unique title/description, Service + Breadcrumb + FAQPage
  JSON-LD present, working ecosystem/project/CTA links, prev/next nav.
- Reduced motion safe; spectrum accent-only.
