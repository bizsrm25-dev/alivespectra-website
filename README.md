# Alive Spectra Ltd. — Website

Production-grade marketing site for **[alivespectra.com](https://alivespectra.com)** — a 17-year
business consultancy in Gulshan-1, Dhaka, Bangladesh. Tagline: _"Changing the way of thinking."_

Built around the **"Refraction"** creative concept: one idea refracted into a full spectrum of
services, sister concerns, and projects. See [`CLAUDE.md`](./CLAUDE.md) for the brand, design
tokens, sitemap, and non-negotiables, and [`brand/`](./brand) for the source profile, build
guideline, and logos.

> **Status:** full site built — home, services (+9), plans (+4), ecosystem (+14),
> projects (+5), clients, about, insights (MDX blog), and contact (Resend-backed),
> plus sitemap/robots/OG images and analytics. Content is in-brand placeholder
> copy to refine; legal pages and the Resend domain need finalising before launch.

---

## Tech stack

| Layer            | Choice                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------- |
| Framework        | [Next.js 16](https://nextjs.org) (App Router) + TypeScript                                |
| Styling          | [Tailwind CSS v4](https://tailwindcss.com) + CSS-variable token layer                     |
| Smooth scroll    | [Lenis](https://github.com/darkroomengineering/lenis)                                     |
| Animation        | [GSAP + ScrollTrigger](https://gsap.com) (spine, reveals, hero, micro-interactions)       |
| Fonts            | `next/font` — Clash Display (self-hosted), Hanken Grotesk + Space Mono (Google)           |
| Lint / format    | ESLint 9 (flat config) + Prettier (with Tailwind class sorting)                           |
| Hosting (target) | [Vercel](https://vercel.com)                                                              |

---

## Requirements

- **Node.js ≥ 20** (developed on Node 22)
- **npm** (the repo ships an `package-lock.json`)

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page hot-reloads as you edit.

> The first dev/build fetches the Google-hosted fonts (Hanken Grotesk, Space Mono) and caches
> them locally, so the **initial run needs network access**. Clash Display is already
> self-hosted in `app/fonts/clash-display/` and needs nothing.

### Scripts

| Command                | What it does               |
| ---------------------- | -------------------------- |
| `npm run dev`          | Start the local dev server |
| `npm run build`        | Production build           |
| `npm run start`        | Serve the production build |
| `npm run lint`         | ESLint                     |
| `npm run lint:fix`     | ESLint with autofix        |
| `npm run format`       | Prettier — write           |
| `npm run format:check` | Prettier — check only      |
| `npm run type-check`   | TypeScript, no emit        |

---

## Project structure

```
alivespectra.com/
├─ app/                  # App Router: routes, layout, global CSS
│  ├─ fonts/             # next/font setup (Clash Display .woff2 + index.ts)
│  ├─ globals.css        # Tailwind entry + token→theme mapping
│  ├─ layout.tsx         # Root layout (fonts + metadata)
│  └─ page.tsx           # Placeholder home (scaffold check)
├─ components/           # Reusable UI (primitives, shell, features)
├─ lib/                  # Utilities & config (e.g. site.ts — NAP/SEO constants)
├─ content/              # MDX content (e.g. /insights blog posts)
├─ data/                 # Typed data files (services, plans, projects, ...)
├─ styles/               # tokens.css — design tokens (CSS variables)
├─ public/               # Static assets served at /
└─ brand/                # Source material: profile PDF, guideline, logos (not deployed)
```

### Design tokens

All color tokens live as CSS variables in [`styles/tokens.css`](./styles/tokens.css) and are
mapped into the Tailwind theme in [`app/globals.css`](./app/globals.css). That makes them
available as utilities — `bg-paper`, `text-ink`, `text-pine`, `text-teal`, `border-line`, and the
spectrum accents (`text-spec-violet` … `text-spec-red`). Fonts map to `font-display` (Clash),
`font-sans` (Hanken), and `font-mono` (Space Mono).

**Rule:** the base palette is pine green + paper + ink; the spectrum gradient is an **accent only**
(< ~5% of any viewport).

### Absolute imports

Configured via `tsconfig.json` (`"@/*": ["./*"]`) — import from the root, e.g.
`import { siteConfig } from "@/lib/site";`.

---

## Deploy (Vercel)

1. Push this folder to a Git repository (GitHub/GitLab/Bitbucket).
2. In [Vercel](https://vercel.com/new), **Import Project** and select the repo.
3. Vercel auto-detects Next.js — no build settings needed (Build: `next build`, Output: `.next`).
4. Add the production domain `alivespectra.com` under **Settings → Domains**.
5. Add the environment variables below under **Settings → Environment Variables**.

Every push to the default branch ships to production; pull requests get preview deploys.

### Environment variables

Copy `.env.example` → `.env.local` for local dev. All are optional — the site
runs without them (the contact form returns a graceful error, analytics no-op).

| Variable            | Purpose                                                                                                                                                                                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`    | Resend key for the contact form email.                                                                                                                                                                                                                                                  |
| `CONTACT_TO`        | Where submissions are delivered (default `alivespectra@gmail.com`).                                                                                                                                                                                                                     |
| `RESEND_FROM`       | Sender. **Must be a verified-domain address in production** — verify `alivespectra.com` at [resend.com/domains](https://resend.com/domains), then set e.g. `Alive Spectra <hello@alivespectra.com>`. The test sender `onboarding@resend.dev` only delivers to the Resend account owner. |
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID (e.g. `G-XXXXXXX`). GA4 loads only when set.                                                                                                                                                                                                                         |

Vercel Analytics works automatically once deployed on Vercel — no key needed.

Prefer the CLI?

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

---

## Where to edit content (as the site grows)

- **Structured data** → `data/*.ts` (services, plans, sister concerns, projects, clients)
- **Long-form / blog** → `content/*.mdx`
- **Site-wide constants** (NAP, name, URL) → `lib/site.ts`
- **Brand source** (profile, guideline, logos) → `brand/`
