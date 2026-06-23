# Alive Spectra Ltd. — Awwwards-Level Website Build Guideline

A complete, opinionated playbook for building **alivespectra.com** with Claude Code: strategy, design system, information architecture, SEO, lead generation, and a sequence of copy-paste-ready prompts.

> **Before you start:** Tech versions move fast and this guide was written against a knowledge cutoff. When you scaffold, let Claude Code pull the *current* stable versions (`npx create-next-app@latest`, latest Tailwind, Motion, GSAP, Lenis) rather than pinning the numbers below. The architecture and reasoning hold regardless of minor version bumps.

---

## 1. The strategic problem (read this first)

Alive Spectra isn't a single-service firm — it's an **ecosystem**: a parent consultancy wrapping 10+ services, 14 sister concerns, and a portfolio of flagship projects across IT, agriculture, healthcare, fintech, real estate, education, and tourism. It's led by a visible founder, **Abdur Razzaq Mamun (Founder & Managing Director)**, who also personally founded BizSolve, Agrovez, Alive Lighthouse, and Alive News24 — a real face to build trust around. Two traps follow from the breadth:

1. **Sprawl reads as unfocused.** A generic "we do everything" site signals a broker, not a partner. The site must make the breadth feel like *deliberate range*, not a directory dump.
2. **Trust is the real currency.** Buyers of consultancy/funding advisory are de-risking a big decision. Every page has one job underneath the visuals: *make a serious buyer believe these people will not waste their money or time.*

**Positioning line to design around:** Alive Spectra takes one idea and refracts it into a full spectrum of execution — strategy, capital, technology, and a ready-built ecosystem to deploy it. (Their own tagline, *"Changing the way of thinking,"* supports this.)

**Primary audiences, in priority order:**
- Funded/fundable founders & SMEs in Bangladesh seeking growth + capital (highest-intent, highest-value).
- Corporations needing R&D, ESG, transformation consulting.
- Investors/partners scouting the ecosystem and projects.
- Talent and trainees (AI courses, Build-to-Earn) — secondary, but good top-of-funnel.

**The single conversion goal:** booked consultations / qualified inbound leads. Everything else (clients grid, projects, SDGs) exists to earn that click.

---

## 2. Creative concept: "Refraction"

This is the spine of the award-level execution. Don't skip it — a strong concept is what separates an Awwwards site from a polished template.

**The metaphor:** the brand is a prism. A single white beam (the client's raw idea/capital) enters and *refracts* into a visible spectrum — each band is a service, a sister concern, a project. Light = thinking, clarity, energy. It's already in the name (*Spectra*) and the logo (the rainbow swoosh).

**How it shows up concretely:**
- **The signature element — the "Spectrum Spine":** a single thin vertical line runs down the page. As you scroll through sections it *shifts hue along the visible spectrum* (deep violet → blue → green → amber → red), and the active section's eyebrow/accent picks up the current wavelength. It's the one memorable thing; everything else stays disciplined and quiet around it.
- **Hero:** a controlled light-refraction moment — a beam entering a prism form (built from the logo geometry) and fanning into a spectrum that resolves into the service labels. WebGL is optional; a high-craft CSS/SVG + GSAP version performs better and is plenty for the wow. Avoid the gimmicky "particles everywhere" look.
- **Section transitions:** content reveals as if "coming into focus" (subtle blur-to-sharp + slight chromatic offset that resolves), echoing a lens focusing.
- **Restraint rule (important):** spend the boldness on the spine + hero only. Inner pages are calm, editorial, fast. One accessory removed before leaving the house.

**Why not the default look:** AI-corporate design clusters around cream-background + serif-display + terracotta, or near-black + one acid accent. Both are *defaults*, not choices. Refraction is specific to *this* brand and can't be mistaken for anyone else's. Hold the line on it.

---

## 3. Design system / tokens

Give these to Claude Code verbatim. They're derived from the profile's actual brand (deep pine green, the spectrum logo, the off-white diamond-lattice backgrounds).

### Color

```
--ink:        #0E1A16   /* near-black text on light */
--paper:      #F5F7F6   /* primary light background */
--paper-2:    #ECF1EF   /* faint lattice / panels */
--pine:       #0C3A2E   /* primary dark brand (cover/footer green) */
--pine-2:     #103B33   /* dark section backgrounds */
--teal:       #2F7E6E   /* secondary brand / TOC headings, badges */
--teal-soft:  #6FB3A4   /* hover/quiet accent */
--line:       #D7E0DC   /* hairlines on light */

/* The spectrum — used ONLY for the spine, the hero refraction,
   and tiny wavelength markers. Never fill big areas with it. */
--spec-violet:#6C4CF1
--spec-blue:  #2F8FE8
--spec-green: #2FBE7E
--spec-amber: #F2A93B
--spec-red:   #E5564B
--spectrum:   linear-gradient(90deg,#6C4CF1,#2F8FE8,#2FBE7E,#F2A93B,#E5564B);
```

Rule: the page is **green + paper + ink**. The spectrum is a *seasoning*, not a base. If it's covering more than ~5% of any viewport, it's overused.

### Typography (avoid the generic pairings)

- **Display:** `Clash Display` (Fontshare) — confident, geometric, slightly editorial. Used with restraint at large sizes.
- **Body:** `Hanken Grotesk` (Google Fonts) — warm, highly legible at small sizes.
- **Utility / data / eyebrows:** `Space Mono` or `Geist Mono` — for wavelength labels (e.g. `λ 01 — FUNDING`), stats, breadcrumbs. The mono ties into the "instrument / measurement" feel of light.

Alt pairing if Clash feels too trendy for the corporate buyer: `Cabinet Grotesk` (display) + `Inter`/`Geist` (body). Pick one and commit.

Type scale: fluid, `clamp()`-based. Big editorial display in the hero and section openers; tight, quiet body. Make the type a *feature*, not a delivery vehicle.

### Motion
- `Lenis` for smooth scroll (respect `prefers-reduced-motion` → disable).
- `GSAP + ScrollTrigger` for the orchestrated stuff (spine hue, hero, pinned section reveals).
- `Motion` (Framer Motion) for component-level hover/enter micro-interactions.
- Quality floor: 60fps, no layout shift, reduced-motion path that still looks intentional (instant, not broken).

### Layout
- Asymmetric editorial grid (12-col, generous margins, lots of negative space).
- Numbered markers **only where order is real** (the 4 growth plans are a ladder → numbering earns its place; a random services grid does not).
- Hairline rules in `--line`; near-zero border radius on structure, soft radius only on cards/media.

---

## 4. Information architecture / sitemap

```
/                         Home — the refraction story, top services, proof, CTA
/about                    Story (founded 2007), founder's message (Abdur Razzaq
                          Mamun), mission, vision, CSR, SDGs
/plans                    Business Growth Plans overview (the 4-rung ladder)
  /plans/entrepreneurs
  /plans/startups
  /plans/smes
  /plans/corporations
/services                 Services overview (the spectrum)
  /services/funding-investment-advisory
  /services/it-digital-solutions
  /services/marketing-pr
  /services/management-consultancy
  /services/ai-training-consulting
  /services/fintech-consultation
  /services/budget-consultation
  /services/agriculture-consultancy
  /services/creative-advertising
/ecosystem                Sister concerns (Team Alive, BizSolve, Agrovez, Alive
                          Lighthouse, Builders, Holidays, Service, AratB2B, Alive
                          Bazaar, Lifestyle, Febrizo, Event Mgmt, News24, Interior)
  /ecosystem/[slug]       Detail per concern
/projects                 Major projects portfolio (Diligence cluster, Unity
                          Hospital, Unity Agro, Pro Health Smart Hospital,
                          Prime Place, Cotbari/Mountain Heaven, Better Holdings)
  /projects/[slug]
/clients                  Trust wall (Unity, ICRC/Red Cross, Beacon, ASMACS, etc.)
/insights                 Blog / SEO content hub  ← critical for organic growth
  /insights/[slug]
/contact                  Form, map (Gulshan-1), phone, email, office
/privacy  /terms          Legal
```

Notes:
- `/plans` and `/services` are the money pages — they map to buyer intent. Optimize hardest here.
- `/insights` is non-negotiable for SEO. A consultancy with no content hub will never rank for the long-tail terms that bring qualified buyers.
- Keep one global, sticky, glass-morphic nav with a single prominent **"Book a consultation"** CTA.

---

## 5. Tech stack

Chosen for **SEO + performance + award-grade motion** simultaneously:

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | SSR/SSG = real SEO; route-level metadata; image/font optimization built in |
| Styling | **Tailwind CSS** (+ a small token layer in CSS vars) | fast, consistent, themeable |
| Smooth scroll | **Lenis** | the baseline feel of premium sites |
| Animation | **GSAP + ScrollTrigger** and **Motion** | orchestrated scroll + component micro-interactions |
| Content | **MDX** for `/insights`; typed TS data files for services/concerns/projects (or **Sanity** if non-devs will edit) | avoids a heavy CMS unless you need editors |
| Forms | **React Hook Form + Zod** → Next.js route handler → **Resend** (email) | validated, spam-resistant, no third-party form branding |
| Analytics | **GA4 + Vercel Analytics + Search Console** (consider **Plausible** for clean privacy) | measure the funnel |
| Hosting | **Vercel** | best-in-class Next.js perf, edge, OG image gen, preview deploys |
| Images | `next/image`, AVIF/WebP, blur placeholders | Core Web Vitals |

---

## 6. SEO strategy

### Technical (build it in from day one)
- Pre-render every marketing page (SSG/ISR). Never ship key content client-side only.
- `app/sitemap.ts` and `app/robots.ts` (dynamic, includes all routes).
- **Structured data (JSON-LD):**
  - `Organization` + `LocalBusiness` sitewide (NAP: *House 60, Road 28, Gulshan-1, Dhaka-1212, BD*; phones +880 1919-666630 / +880 1939-903964; founded 2007).
  - `Service` schema on each service page.
  - `BreadcrumbList` on inner pages.
  - `FAQPage` on pages with a FAQ block.
  - `Article` on `/insights/*`.
- Per-route `generateMetadata`: unique title + description, canonical, OpenGraph + Twitter cards.
- **Auto-generated OG images** via `next/og` (branded, per-page) — big CTR lift on shares.
- Core Web Vitals targets: **LCP < 2.5s, INP < 200ms, CLS < 0.1.** Audit motion against these — the refraction hero must not tank LCP (lazy-load the WebGL/heavy bits, prioritize the LCP text/image).

### On-page / keyword direction (localize for Bangladesh)
Anchor pages to real buyer queries, e.g.:
- "business consultancy firm in Bangladesh / Dhaka"
- "startup funding & investment advisory Bangladesh"
- "SME growth consulting Dhaka", "corporate ESG consulting Bangladesh"
- "AI training for finance professionals Bangladesh"
- "agriculture / agritech consultancy Bangladesh", "fintech regulatory advisory Bangladesh"
Map one primary intent per page; don't cannibalize.

### Local SEO
- Claim/optimize **Google Business Profile** (Gulshan-1 office), keep NAP identical everywhere (site, GBP, directories).
- Bangladesh business directory citations.

### Content hub
- `/insights` cadence: practical, locally-relevant pieces (e.g. "How Bangladeshi SMEs get investment-ready," "ESG basics for BD corporates"). This is what actually wins organic over time. Each post = internal links into the relevant service page.

---

## 7. Lead generation & conversion

- **One primary CTA** everywhere: *Book a consultation* (calendar embed like Cal.com/Calendly, or a qualifying form).
- **Qualifying contact form:** name, company, stage (Entrepreneur/Startup/SME/Corporation — mirrors the plans), interest (service multiselect), budget/timeline optional. Route to email via Resend + store in a sheet/DB. Honeypot + rate-limit for spam.
- **Trust scaffolding near every CTA:** "17 years • 2007" stat, client logos (ICRC, Beacon Pharma, ASMACS, Biomedica are credibility anchors — feature them), project proof, and the named, visible founder (a real face and signed message materially raises trust and E-E-A-T).
- **Lead magnet** (optional, strong): a downloadable "Investment-Readiness Checklist" or "Business Growth Plan comparison" gated by email → feeds the funnel.
- **WhatsApp / direct-call** click target (Bangladesh buyers convert on direct contact) — but keep it secondary to the booking CTA.
- Track: CTA clicks, form submits, scroll depth on `/plans` and `/services`, GBP calls.

---

## 8. The Claude Code prompts

**How to use these:** run them **one phase at a time**, in order. Review and test the output (and the live preview) before moving on. Don't paste all of them at once — Claude Code does its best work in focused, reviewable increments. Edit the bracketed bits to taste.

### Prompt 0 — Project setup & context

```
You're the lead engineer + design lead building the website for "Alive Spectra
Ltd.", a 17-year business consultancy in Gulshan, Dhaka, Bangladesh
(alivespectra.com). Tagline: "Changing the way of thinking."

Scaffold a production-grade project:
- Next.js (latest stable, App Router) + TypeScript
- Tailwind CSS (latest), with a CSS-variable token layer
- Lenis (smooth scroll), GSAP + ScrollTrigger, and Motion (framer-motion) installed
- ESLint + Prettier, absolute imports, a clean folder structure
  (app/, components/, lib/, content/, data/, styles/)
- next/font set up for: Clash Display (display), Hanken Grotesk (body),
  Space Mono (utility/mono). Self-host where possible.

Then create a CLAUDE.md at the project root capturing: the brand, the
"Refraction" creative concept, the design tokens (I'll paste them), the
sitemap, performance targets (LCP<2.5s, INP<200ms, CLS<0.1), and the rule
that the spectrum gradient is an accent only (<5% of any viewport).

Pull current stable versions — don't pin to old ones. Set up but don't build
pages yet; confirm the dev server runs.
```

### Prompt 1 — Design system & tokens

```
Implement the design system as the single source of truth before any page.

[PASTE the Color, Typography, Motion, Layout tokens from section 3 here]

Build:
- A tokens layer (CSS variables in :root) + Tailwind theme extension mapping
  to them.
- A fluid clamp()-based type scale and reusable text styles (display, h1-h4,
  body, eyebrow/mono-label).
- Base primitives: Container, Section (with consistent vertical rhythm —
  watch CSS specificity so section paddings don't cancel), Eyebrow (mono
  label like "λ 01 — FUNDING"), Button (primary/ghost), Hairline divider, Tag.
- A reduced-motion-safe motion utility layer (Lenis init, a useGsap hook, and
  reveal helpers) — all respecting prefers-reduced-motion.
- A /styleguide route rendering every token, type style, and primitive so I
  can review the system visually.

Keep it disciplined: green + paper + ink as the base, spectrum only as accent.
Show me the styleguide.
```

### Prompt 2 — The signature: Spectrum Spine + global shell

```
Build the global shell and the site's signature element.

Signature — "Spectrum Spine": a thin fixed vertical line near the left edge
that runs the full page. As the user scrolls between sections, its hue shifts
smoothly along the visible spectrum (violet→blue→green→amber→red) using GSAP
ScrollTrigger, and the active section's eyebrow accent samples the current
hue. It must be subtle, premium, and 60fps. Provide a reduced-motion fallback
(static green line, no hue animation).

Global shell:
- Sticky glass nav: logo (use the prism/spectrum mark), links (About, Plans,
  Services, Ecosystem, Projects, Clients, Insights), and one prominent
  "Book a consultation" CTA. Mobile: a crafted full-screen menu with a
  refined open/close transition.
- Footer: NAP block (House 60, Road 28, Gulshan-1, Dhaka-1212), phones
  +880 1919-666630 / +880 1939-903964, email alivespectra@gmail.com, sitemap
  columns, sister-concern quick links, socials, legal links.

No business pages yet — just shell + spine, reviewable on a placeholder page.
```

### Prompt 3 — Homepage

```
Build the homepage. It must feel like an Awwwards site while staying fast and
trustworthy. Sections, top to bottom:

1) HERO — the "Refraction" thesis. A controlled light-into-prism animation
   built from the logo geometry: a beam enters, fans into a spectrum that
   resolves into the core service labels. Prefer high-craft SVG/CSS + GSAP
   over heavy WebGL; if WebGL, lazy-load it and keep the LCP element as
   real text. Headline communicates: one idea, refracted into strategy +
   capital + technology + a ready ecosystem. Primary CTA: Book a consultation.
   Eyebrow: "Business consultancy • Dhaka • Since 2007".

2) PROOF BAR — "17 years / Founded 2007", multi-sector reach, a marquee of
   real client logos (ICRC, Beacon Pharmaceuticals, ASMACS, Unity Hospital,
   Better Holdings, etc.). Quiet, credible.

3) THE SPECTRUM (services) — services as bands of one spectrum: Funding &
   Investment, IT & Digital, Marketing & PR, Management, AI Training, Fintech,
   Budget, Agriculture, Creative & Advertising. On hover/scroll each band
   "comes into focus" (blur-to-sharp + slight chromatic offset resolving).
   Links to /services/*.

4) GROWTH PLANS LADDER — Entrepreneurs → Startups → SMEs → Corporations as a
   true 4-rung sequence (numbering earns its place here). One line each, link
   to /plans/*.

5) ECOSYSTEM TEASER — "One parent, many concerns": animated grid of sister
   concerns + a line about the 14-strong ecosystem. Link to /ecosystem.

6) PROJECTS TEASER — 2-3 flagship projects (Unity Hospital, Pro Health Smart
   Hospital, Prime Place) as editorial cards. Link to /projects.

7) FOUNDER MOMENT — a short, signed pull-quote from Abdur Razzaq Mamun
   (Founder & Managing Director) with his photo, positioning Alive Spectra as
   the foundational entity he drives strategic incubation through. One human
   sentence, not a wall of text. Links to the full message on /about. This is
   a trust anchor — keep it elegant and restrained.

8) CTA SECTION — strong close: trust stat + "Book a consultation" + direct
   contact. 

Write the copy yourself, in-brand (plain, confident, specific — no filler,
no buzzword soup). Implement full metadata + Organization/LocalBusiness
JSON-LD on this route. Optimize for LCP — audit it.
```

### Prompt 4 — Services (overview + detail template)

```
Build /services (overview) and a reusable detail template for the 9 service
pages, driven by a typed data file in data/services.ts so content is
maintainable.

For each service include: hero (name + one-sentence promise + wavelength
label), the market context and approach (paraphrase/expand from the profile —
e.g. IT consulting market growth, AI consulting CAGR, fintech to $556B, etc.,
but keep claims defensible and lightly sourced), a "Key Services" list, how it
connects to relevant sister concerns (e.g. IT→BizSolve, Agriculture→Agrovez,
Funding→the in-house investor network, Procurement→AratB2B), a relevant
project as proof, and a CTA.

Each detail page: unique generateMetadata, Service + BreadcrumbList JSON-LD,
and an optional FAQ block (FAQPage JSON-LD) targeting the localized buyer
query for that service. Editorial, calm, fast — the boldness lives on the home
page; these convert. Generate sensible slugs and internal links.
```

### Prompt 5 — Plans, Ecosystem, Projects, Clients

```
Build the remaining content sections, all data-driven (data/*.ts):

/plans + 4 detail pages (Entrepreneurs, Startups, SMEs, Corporations) — present
as a progressive ladder; each page lists its support system (Skill Dev,
Mentorship, Ecosystem/Funding Access, R&D, Build-to-Earn, etc. from the
profile) and the right CTA per audience.

/ecosystem + detail pages for the 14 sister concerns (Team Alive, BizSolve,
Alive Lighthouse, Agrovez, Alive Builders, Alive Holidays, Alive Service,
AratB2B, Alive Bazaar, Alive Lifestyle, Febrizo, Alive Event Management,
Alive News24, Intelligent Interior). Grid overview with a satisfying filter/
reveal; concise, real descriptions per the profile.

/projects + detail pages for major projects (Diligence Universal + Agro + Real
Estate + School, Cotbari/Mountain Heaven, Better Holdings, Unity Hospital,
Unity Agro Park, Pro Health Smart Hospital, Prime Place/Bismillah Prime Tower).
Editorial portfolio treatment with status/sector/location metadata.

/clients — a trust wall of logos with subtle hover, grouped or marquee'd
(Unity Hospital, ICRC, Beacon Pharmaceuticals, ASMACS, Biomedica, Go Green
Life, Banalata Agro Park, Laser Trend, TKB Aegis, Stanford Universal, Better
Holdings, Mountain Heaven, Pro Health, Diligence Group, etc.). Note: HolyLoy
and Asset Advisors are no longer featured — don't include them.

Consistent metadata + BreadcrumbList JSON-LD across all. Keep performance and
the calm inner-page register.
```

### Prompt 6 — About, Insights (blog), Contact

```
Build:

/about — story (founded 2007, 17 years, premier BD consultancy), mission and
vision (use the profile's points), a "Message from the Founder" section for
Abdur Razzaq Mamun (Founder & Managing Director) — photo, title, and an
editorial treatment of his message (entrepreneur, investor and strategist who
built Alive Spectra as the foundational entity for strategic incubation, and
also founded BizSolve, Agrovez, Alive Lighthouse and Alive News24); keep it
human and credible, not a bio dump. Then CSR (Entrepreneurship & SME
empowerment, education, community, environment, ethical governance), and an SDG
alignment section (SDGs 4, 8, 9, 12, 13, 17) rendered as a tasteful grid.
Add Person JSON-LD for the founder, linked to the Organization via founder/
employee, for E-E-A-T. In-brand copy.

/insights — an MDX-powered blog hub: index with cards + tag filtering, and a
typographic article template (Article JSON-LD, reading time, related posts,
internal links into service pages). Seed 3 sample posts on BD-relevant topics
(e.g. "Getting investment-ready as a Bangladeshi SME"). This is the SEO engine.

/contact — qualifying form (React Hook Form + Zod): name, company, stage
[Entrepreneur/Startup/SME/Corporation], interest [service multiselect],
message; submit via a Next.js route handler emailing through Resend, with a
honeypot + basic rate limit. Show office (Gulshan-1) with an embedded map,
phones, email, and a "Book a consultation" calendar embed. Clear success/error
states written in the interface's voice.
```

### Prompt 7 — SEO, structured data, OG images

```
Make the site fully search-optimized:
- app/sitemap.ts and app/robots.ts covering all routes dynamically.
- Verify unique generateMetadata (title, description, canonical, OpenGraph,
  Twitter) on every route; fix any duplicates/thin descriptions.
- Sitewide Organization + LocalBusiness JSON-LD (NAP, founding 2007, geo for
  Gulshan-1, sameAs socials, founder → Abdur Razzaq Mamun) + Person JSON-LD on
  /about; per-type JSON-LD already on inner pages — validate all of it.
- next/og dynamic OG image generation: a branded template (spectrum accent +
  page title) producing a unique share image per page.
- A lightweight SEO audit pass: heading hierarchy, alt text, internal linking
  between insights↔services, and localized keyword presence on /plans and
  /services. List anything still weak.
```

### Prompt 8 — Performance, accessibility, analytics, polish

```
Final hardening pass:
- Core Web Vitals: get LCP<2.5s, INP<200ms, CLS<0.1 on home, /services, /plans.
  Lazy-load heavy motion/WebGL, prioritize LCP assets, eliminate layout shift,
  serve AVIF/WebP via next/image with blur placeholders. Report before/after.
- Accessibility to WCAG AA: keyboard nav, visible focus, ARIA where needed,
  color-contrast check (the green/paper combos), and a genuinely usable
  prefers-reduced-motion path for the spine + hero.
- Analytics: GA4 + Vercel Analytics; event tracking on CTA clicks, form
  submits, and scroll depth on /plans and /services.
- Cross-browser + mobile QA; fix jank. Then do a self-critique screenshot pass
  and remove one thing that's overdesigned ("remove one accessory").
- Add a README with run/deploy (Vercel) instructions and where to edit content
  (data/*.ts, content/*.mdx).
```

---

## 9. Suggested CLAUDE.md (paste into the repo)

```md
# Alive Spectra Ltd. — Website

Business consultancy, Gulshan-1, Dhaka, Bangladesh. Founded 2007 (17 yrs).
Tagline: "Changing the way of thinking." Site: alivespectra.com
Founder & MD: Abdur Razzaq Mamun (also founded BizSolve, Agrovez, Alive
Lighthouse, Alive News24). Feature him on /about + a homepage founder moment.

## Creative concept: "Refraction"
The brand is a prism: one idea refracts into a spectrum of services, sister
concerns, and projects. Signature = the "Spectrum Spine" (a thin line whose hue
shifts with scroll). Spend boldness on hero + spine only; inner pages are calm,
editorial, fast.

## Non-negotiables
- Base palette = pine green + paper + ink. The spectrum gradient is an ACCENT
  ONLY (<5% of any viewport).
- Display: Clash Display. Body: Hanken Grotesk. Mono/labels: Space Mono.
- Numbered markers only where order is real (the 4 growth plans).
- Performance: LCP<2.5s, INP<200ms, CLS<0.1. Respect prefers-reduced-motion.
- Copy: plain, confident, specific. No buzzword soup, no filler.

## Stack
Next.js (App Router, TS) · Tailwind · Lenis · GSAP/ScrollTrigger · Motion ·
MDX (insights) · RHF+Zod+Resend (forms) · GA4+Vercel Analytics · Vercel host.

## Content lives in
data/*.ts (services, plans, concerns, projects, clients) and content/*.mdx
(insights). Keep all JSON-LD valid.

## Contact / NAP (keep identical everywhere)
House 60, Road 28, Gulshan-1, Dhaka-1212, BD ·
+880 1919-666630 / +880 1939-903964 · alivespectra@gmail.com
```

---

## 10. Pre-launch checklist

- [ ] All routes pre-rendered; no key content client-only
- [ ] Unique title/description/canonical/OG per page; OG images render
- [ ] JSON-LD validates (Rich Results Test) for Organization, LocalBusiness, Service, Breadcrumb, Article, FAQ
- [ ] sitemap.xml + robots.txt live; submitted to Google Search Console
- [ ] Google Business Profile claimed; NAP identical across site + GBP + directories
- [ ] Core Web Vitals green on mobile (the real test) for home, /services, /plans
- [ ] WCAG AA: keyboard, focus, contrast, reduced-motion
- [ ] Contact form delivers email + has spam protection; success/error states clear
- [ ] Analytics firing; CTA + form events tracked
- [ ] Real content proofread; client logos used with permission
- [ ] 404, favicon, web manifest, social cards
- [ ] Self-critique screenshot pass done; one overdesigned thing removed

---

### A few honest cautions
- **Don't let motion eat performance or trust.** A consultancy buyer who hits a janky, slow hero leaves. The refraction effect must be *lazy-loaded and reduced-motion-safe*, with real text as the LCP element.
- **Market-size stats** from the profile (CAGRs, "$556B fintech," etc.) are fine as context but keep them lightly attributed and defensible — don't overstate.
- **Get logo permissions** before publishing the clients wall (ICRC/Red Cross especially is sensitive about its emblem).
- **The content hub is the long game.** The fancy homepage gets you admiration; `/insights` published consistently is what actually drives qualified organic leads over 6–12 months.
