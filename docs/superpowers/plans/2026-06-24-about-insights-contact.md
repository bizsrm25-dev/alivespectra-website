# About · Insights · Contact — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans (inline). Steps `- [ ]`.

**Goal:** `/about`, `/insights` (MDX blog + 3 posts), `/contact` (RHF+Zod → Resend), with Person + Article JSON-LD.

**Architecture:** Add deps; `lib/insights.ts` (gray-matter + next-mdx-remote/rsc) + `content/insights/*.mdx`; `lib/contact-schema.ts` (shared zod) + `app/api/contact/route.ts` (Resend); pages for about/insights/contact. Reuse primitives, Breadcrumb, breadcrumbLd.

## Global Constraints

- Secrets via env only (`RESEND_API_KEY`/`CONTACT_TO`/`RESEND_FROM`); never in client/git/logs.
- Editorial craft; reduced-motion safe; form a11y (labels, aria-invalid, aria-describedby); per-page metadata; prerender all except `/api/contact`.
- Next 16: `await params`. Verify per task: `type-check`+`lint`+`build`. Commit per task (branch `feat/about-insights-contact`).

## Tasks

### Task 1: Deps + JSON-LD helpers

- [ ] `npm install react-hook-form zod @hookform/resolvers resend next-mdx-remote gray-matter`.
- [ ] `lib/json-ld.ts`: add `personLd()` (founder, `worksFor` Organization) and `articleLd({title,description,date,url})` (Article, author=founder, publisher=Organization).
- [ ] type-check. Commit.

### Task 2: /about

- [ ] `app/about/page.tsx`: metadata; sections — story, mission/vision, founder message (portrait slot + signed copy), CSR pillars, SDG grid (4,8,9,12,13,17); inject Person JSON-LD. Reuse Section/Container/Eyebrow/Button.
- [ ] type-check + lint + build. Commit.

### Task 3: Insights lib + seed posts

- [ ] `lib/insights.ts`: `Post` type (`slug,title,excerpt,date,tags,author,readingTime,content`); `getAllPosts()`, `getPost(slug)`, `getAllTags()` reading `content/insights/*.mdx` via `fs` + `gray-matter`; reading time = ceil(words/200).
- [ ] Create 3 `content/insights/*.mdx` posts (frontmatter + body, each links a service).
- [ ] type-check. Commit.

### Task 4: /insights index + article

- [ ] `app/insights/page.tsx`: metadata; client tag-filter over `getAllPosts()` cards (title, excerpt, date, reading time, tags) → `/insights/<slug>`.
- [ ] `app/insights/[slug]/page.tsx`: `generateStaticParams`, `dynamicParams=false`, `generateMetadata`; Breadcrumb + article header + `<MDXRemote source={content}/>` (next-mdx-remote/rsc) in a `.t-body` prose measure; related posts (shared tag); Article + BreadcrumbList JSON-LD.
- [ ] type-check + lint + build. Commit.

### Task 5: Contact schema + form + API

- [ ] `lib/contact-schema.ts`: zod `contactSchema` ({name, email, company?, stage enum [Entrepreneur,Startup,SME,Corporation], interests string[], message min 10, website honeypot optional}); export `ContactInput` type + `STAGES`.
- [ ] `components/contact/contact-form.tsx` (client): RHF + `zodResolver`; fields incl. stage select + interest checkboxes (service names) + hidden honeypot; submit → `fetch('/api/contact', POST json)`; submitting/success/error UI; a11y (labels, aria-invalid, aria-describedby).
- [ ] `app/api/contact/route.ts`: `export async function POST(req)`; parse JSON; `contactSchema.safeParse`; if `website` non-empty → return 200 (silently drop); per-IP in-memory rate limit (e.g. 5/min via Map keyed on `x-forwarded-for`); `new Resend(process.env.RESEND_API_KEY)` send (`from` RESEND_FROM, `to` CONTACT_TO, subject, text/html summary); return 400/502/200.
- [ ] type-check + lint + build. Commit.

### Task 6: /contact page

- [ ] `app/contact/page.tsx`: metadata; intro + `<ContactForm/>` + office block (Google Maps iframe for "House 60, Road 28, Gulshan-1, Dhaka-1212", phones/email from `siteConfig`).
- [ ] type-check + lint + build. Commit.

### Task 7: Verify

- [ ] `npm run dev`; `/about` (Person JSON-LD), `/insights` (+ filter) + an article (Article JSON-LD), `/contact` render; POST `/api/contact` with valid payload returns 200 (and, if the Resend test sender allows, delivers); honeypot/invalid rejected; all nav/footer links resolve; dev log clean. Commit fixes.

## Self-Review

**Spec coverage:** deps+JSON-LD (T1), about (T2), insights lib+posts (T3), insights pages (T4), contact schema/form/api (T5), contact page (T6), verify (T7). ✓
**Types:** `personLd/articleLd` (T1)→T2/T4; `Post`/getters (T3)→T4; `contactSchema/ContactInput/STAGES` (T5)→form+api+page. ✓
**Secrets:** API key only in route handler via `process.env`; never imported client-side. ✓
