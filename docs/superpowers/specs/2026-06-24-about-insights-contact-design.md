# About · Insights · Contact (Phase 6)

**Date:** 2026-06-24
**Status:** Approved (design), pending implementation plan
**Scope:** `/about`, `/insights` (MDX blog + 3 seed posts), `/contact` (RHF + Zod
form → Resend route handler). Adds Person + Article JSON-LD helpers.

## Dependencies

`react-hook-form`, `zod`, `@hookform/resolvers`, `resend`, `next-mdx-remote`,
`gray-matter`.

## Env

`.env.local` (gitignored): `RESEND_API_KEY`, `CONTACT_TO` (default
alivespectra@gmail.com), `RESEND_FROM` (default `onboarding@resend.dev` until
domain verified). `.env.example` documents them.

## /about

`app/about/page.tsx` — story (founded 2007, 17 yrs), mission & vision, founder
message (Abdur Razzaq Mamun, portrait slot + signed editorial copy), CSR pillars,
SDG grid (4, 8, 9, 12, 13, 17). `generateMetadata` + **Person JSON-LD** (founder,
worksFor Organization) via new `personLd()` in `lib/json-ld.ts`.

## /insights (MDX)

- Posts: `content/insights/*.mdx`, frontmatter `{ title, excerpt, date, tags[],
  author }`.
- `lib/insights.ts` — `getAllPosts()` (sorted by date), `getPost(slug)`,
  reading-time calc, all `tags`. Uses `gray-matter`; body rendered with
  `next-mdx-remote/rsc`.
- `app/insights/page.tsx` — index: cards (title, excerpt, date, reading time,
  tags) + client-side tag filter. `generateMetadata`.
- `app/insights/[slug]/page.tsx` — article template (editorial type), reading
  time, related posts (shared tag), Breadcrumb + **Article + BreadcrumbList
  JSON-LD**, `generateStaticParams`, `dynamicParams=false`.
- 3 seed posts (BD-relevant), each internally linking a service.

## /contact

- `lib/contact-schema.ts` — shared zod schema: `name`, `email`, `company?`,
  `stage` (enum), `interests` (string[]), `message`, `website` (honeypot, must be
  empty).
- `components/contact/contact-form.tsx` (client) — RHF + zodResolver; stage
  select, interest checkboxes (from `services`); honeypot hidden field;
  submitting/success/error states in-brand; posts JSON to `/api/contact`.
- `app/api/contact/route.ts` — parse + zod-validate; honeypot → silent 200;
  best-effort in-memory per-IP rate limit; send via Resend (`RESEND_FROM` →
  `CONTACT_TO`) with a readable summary; 400 on invalid, 502 on send failure,
  200 on success. Never logs the API key.
- `app/contact/page.tsx` — form + office block (Google Maps embed for Gulshan-1,
  phones, email from `siteConfig`). `generateMetadata`.

## Quality floor

Editorial hierarchy; reduced-motion safe; **form a11y** (labels, `aria-invalid`,
error text linked via `aria-describedby`, keyboard, visible focus); MDX article
typographic measure 60–70ch; per-page metadata; all routes prerender except the
API route; no secrets in client bundle or git.

## Out of scope

Sitemap/robots/OG-images (Phase 7); perf/a11y/analytics polish (Phase 8).

## Success criteria

- `type-check` + `lint` + `build` clean; `/about`, `/insights`, 3
  `/insights/<slug>`, `/contact` prerender; `/api/contact` responds.
- Contact form validates (incl. honeypot), POSTs, and Resend sends to `CONTACT_TO`
  (test sender delivers to the Resend account owner until domain verified).
- About has Person JSON-LD; insights articles have Article + Breadcrumb JSON-LD.
- Every nav/footer link now resolves.
