# Spectrum Spine + Global Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Spectrum Spine (scroll-driven hue line) and the global shell (nav, full-screen mobile menu, footer), reviewable on a placeholder page.

**Architecture:** A `components/shell/` module + `data/navigation.ts` source of truth, mounted once in the root layout. The spine writes a single `--spine-hue` CSS variable from scroll progress; eyebrows and the line read it. Header/spine/menu are client components; footer is server. Reuses tokens, `SmoothScroll`, and `useGsap`.

**Tech Stack:** Next.js 16 (App Router, TS) · Tailwind v4 · GSAP ScrollTrigger · Motion · Lenis.

## Global Constraints

- Base palette = pine + paper + ink; spectrum is an **accent only** (< ~5% of viewport); the spine is a hairline.
- Spine hue: continuous interpolation across `#6c4cf1,#2f8fe8,#2fbe7e,#f2a93b,#e5564b` tied to scroll progress; eyebrows sample it. **Reduced motion → static pine line.**
- Nav: transparent over hero → glass (backdrop-blur + translucent paper + bottom hairline) after the hero.
- Mobile menu: full-screen pine overlay; a11y complete (scroll-lock, focus-trap, Esc, aria); reduced motion → instant.
- Fonts: Clash (`font-display`/`.t-*`), Hanken (`font-sans`), Space Mono (`font-mono`).
- NAP verbatim: House 60, Road 28, Gulshan-1, Dhaka-1212 · +880 1919-666630 / +880 1939-903964 · alivespectra@gmail.com.
- Verification per task: `npm run type-check`, `npm run lint`, `npm run build` clean; final task confirmed on `/` (placeholder). No unit-test runner by design.
- Commit after each task (git is initialized; on branch `feat/spectrum-spine-shell`).

---

## File Structure

- `data/navigation.ts` — **create**: nav/footer/concerns/socials/legal data.
- `styles/tokens.css` — **modify**: add `--spine-hue` default.
- `components/primitives/eyebrow.tsx` — **modify**: `accent="spine"` sentinel.
- `components/shell/spectrum-spine.tsx` — **create**.
- `components/shell/logo.tsx` — **create**.
- `components/shell/mobile-menu.tsx` — **create**.
- `components/shell/site-header.tsx` — **create**.
- `components/shell/site-footer.tsx` — **create**.
- `components/shell/index.ts` — **create**: barrel.
- `app/layout.tsx` — **modify**: mount spine + header + footer.
- `app/page.tsx` — **modify**: placeholder review sections.

---

### Task 1: Foundations — nav data, `--spine-hue`, Eyebrow accent

**Files:**

- Create: `data/navigation.ts`
- Modify: `styles/tokens.css`, `components/primitives/eyebrow.tsx`

**Interfaces:**

- Produces: `NavLink = { label: string; href: string }`; `mainNav`, `sisterConcerns`, `footerColumns: { title: string; links: NavLink[] }[]`, `socials`, `legal` (all from `@/data/navigation`); CSS var `--spine-hue`; `Eyebrow` accepts `accent="spine"`.

- [ ] **Step 1: Create `data/navigation.ts`**

```ts
export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Plans", href: "/plans" },
  { label: "Services", href: "/services" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Projects", href: "/projects" },
  { label: "Clients", href: "/clients" },
  { label: "Insights", href: "/insights" },
];

export const sisterConcerns: NavLink[] = [
  { label: "Team Alive", href: "/ecosystem/team-alive" },
  { label: "BizSolve", href: "/ecosystem/bizsolve" },
  { label: "Alive Lighthouse", href: "/ecosystem/alive-lighthouse" },
  { label: "Agrovez", href: "/ecosystem/agrovez" },
  { label: "Alive Builders", href: "/ecosystem/alive-builders" },
  { label: "Alive Holidays", href: "/ecosystem/alive-holidays" },
  { label: "Alive Service", href: "/ecosystem/alive-service" },
  { label: "AratB2B", href: "/ecosystem/aratb2b" },
  { label: "Alive Bazaar", href: "/ecosystem/alive-bazaar" },
  { label: "Alive Lifestyle", href: "/ecosystem/alive-lifestyle" },
  { label: "Febrizo", href: "/ecosystem/febrizo" },
  {
    label: "Alive Event Management",
    href: "/ecosystem/alive-event-management",
  },
  { label: "Alive News24", href: "/ecosystem/alive-news24" },
  { label: "Intelligent Interior", href: "/ecosystem/intelligent-interior" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Clients", href: "/clients" },
      { label: "Projects", href: "/projects" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "What we do",
    links: [
      { label: "Services", href: "/services" },
      { label: "Growth Plans", href: "/plans" },
      { label: "Ecosystem", href: "/ecosystem" },
    ],
  },
];

export const socials: NavLink[] = [
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
];

export const legal: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
```

- [ ] **Step 2: Add `--spine-hue` default to `styles/tokens.css`** (inside `:root`, after the spectrum block):

```css
/* Live spine hue — updated on scroll by SpectrumSpine; pine by default
     (and under reduced motion). Eyebrows with accent="spine" read this. */
--spine-hue: var(--pine);
```

- [ ] **Step 3: Add `accent="spine"` to `components/primitives/eyebrow.tsx`.** Replace the body so `accent` resolves the sentinel:

```tsx
export function Eyebrow({
  children,
  marker,
  accent = "var(--teal)",
  className,
}: EyebrowProps) {
  const color = accent === "spine" ? "var(--spine-hue)" : accent;
  return (
    <p className={cn("t-eyebrow", className)} style={{ color }}>
      {marker ? <span aria-hidden>λ {marker} — </span> : null}
      {children}
    </p>
  );
}
```

- [ ] **Step 4: Verify** — `npm run type-check` && `npm run lint` → clean.
- [ ] **Step 5: Commit** — `git add data/navigation.ts styles/tokens.css components/primitives/eyebrow.tsx && git commit -m "feat(shell): nav data, --spine-hue token, Eyebrow spine accent"`

---

### Task 2: SpectrumSpine

**Files:**

- Create: `components/shell/spectrum-spine.tsx`

**Interfaces:**

- Consumes: `useGsap` from `@/lib/use-gsap`, `ScrollTrigger`.
- Produces: `<SpectrumSpine />`; sets `--spine-hue` on `document.documentElement` from scroll progress.

- [ ] **Step 1: Create `components/shell/spectrum-spine.tsx`**

```tsx
"use client";

import type { RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/lib/use-gsap";

const STOPS = ["#6c4cf1", "#2f8fe8", "#2fbe7e", "#f2a93b", "#e5564b"];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function colorAtProgress(p: number): string {
  const clamped = Math.min(Math.max(p, 0), 1);
  const span = STOPS.length - 1;
  const seg = Math.min(Math.floor(clamped * span), span - 1);
  const t = clamped * span - seg;
  const a = hexToRgb(STOPS[seg]);
  const b = hexToRgb(STOPS[seg + 1]);
  const mix = a.map((c, i) => Math.round(c + (b[i] - c) * t));
  return `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`;
}

export function SpectrumSpine() {
  const ref = useGsap(() => {
    const root = document.documentElement;
    const st = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        root.style.setProperty("--spine-hue", colorAtProgress(self.progress));
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      aria-hidden
      className="pointer-events-none fixed top-0 bottom-0 left-[clamp(12px,2vw,28px)] z-40 w-0.5"
      style={{
        background: "var(--spine-hue)",
        boxShadow: "0 0 12px 0 var(--spine-hue)",
      }}
    />
  );
}
```

Note: `useGsap` runs the callback inside `gsap.context()` (auto-reverts on unmount) and no-ops under reduced motion, so the line stays `var(--spine-hue)` = pine. The returned cleanup also kills the trigger explicitly.

- [ ] **Step 2: Verify** — `npm run type-check` && `npm run lint` → clean.
- [ ] **Step 3: Commit** — `git add components/shell/spectrum-spine.tsx && git commit -m "feat(shell): scroll-driven Spectrum Spine"`

---

### Task 3: Logo

**Files:**

- Create: `components/shell/logo.tsx`

**Interfaces:**

- Produces: `<Logo withWordmark?={boolean} className?={string} />` — inline prism-swoosh SVG (+ optional "Alive Spectra" Clash wordmark).

- [ ] **Step 1: Create `components/shell/logo.tsx`.** Inline the SVG markup from `brand/Main Logo/Alive Spectra Logo.svg` (already in the repo). **Namespace the gradient IDs** (`as-grad-1/2/3`) so multiple instances on one page don't collide, set a fixed height, and mark the SVG `aria-hidden` (the wrapping link carries the name).

```tsx
import { cn } from "@/lib/utils";

export function Logo({
  withWordmark = true,
  className,
}: {
  withWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 464.73 515.26"
        className="h-7 w-auto"
        aria-hidden
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="as-grad-1"
            x1="405.93"
            y1="382.59"
            x2="107.79"
            y2="189.92"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#dd2428" />
            <stop offset="0.4" stopColor="#e8e61a" />
            <stop offset="0.58" stopColor="#06a64f" />
            <stop offset="0.77" stopColor="#20a0db" />
            <stop offset="1" stopColor="#822d8c" />
          </linearGradient>
          <linearGradient
            id="as-grad-2"
            x1="78.22"
            y1="486.73"
            x2="425.03"
            y2="354.9"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="as-grad-3"
            x1="76.29"
            y1="236.08"
            x2="243.61"
            y2="11.97"
            xlinkHref="#as-grad-2"
          />
        </defs>
        <path
          fill="url(#as-grad-1)"
          d="M48.37,261.63c-37.62,80.41,87,47.59,194.06,46s159.42,45.21,159.42,45.21S476.72,323.81,452,270.4s-117.62-43.3-197.38-51.35-96.79-65.23-96.79-65.23S86,181.22,48.37,261.63"
        />
        <path
          fill="#00a76d"
          d="M452,270.4s32.35,66.81-6,117-168.6,105.37-278.36,123.4-157.11-20.56-166-70.51,20.2-55.5,62.24-51,119.31,8.58,206.52-1.7,213-53.1,181.6-117.17"
        />
        <path
          fill="url(#as-grad-2)"
          opacity="0.5"
          d="M270.86,391.7c-7.13.83-14.4,1.6-21.63,2.28a982.09,982.09,0,0,1-113.09,3.91c-33.4-.75-35.95,115.92,6.23,112,7.87-.73,16.14-1.81,24.58-3.2,113.2-18.6,239.47-74.39,275.74-121.83,19.78-25.87,19.77-56.73,15.64-79.5a53,53,0,0,1-4.64,9.5c-25.16,41-112.42,68.58-182.83,76.88"
        />
        <path
          fill="#00a56d"
          d="M41.41,285.21s.15-11.42,17.37-55.59C79,177.83,125.69,103,189.67,30.44c74-84,138.25,30.08,151.6,52.11S402.58,172.37,405.7,183c5.71,19.57-102.74-56.27-177-51.85-72.6,4.33-164.23,76.74-187.32,154"
        />
        <path
          fill="url(#as-grad-2)"
          opacity="0.5"
          d="M279.71,15.68C267.8,7.84,254.61,3.06,240.58,4.37c-16.2,1.52-32.28,11.21-47.79,28.82C134.19,99.68,84.32,175.53,62.65,231.13c-.56,1.43-1.1,2.83-1.62,4.19C88.55,194.14,132.29,158,177,139.67c13-33,41.87-85,102.76-124"
        />
      </svg>
      {withWordmark ? (
        <span className="t-h4 font-semibold tracking-tight">Alive Spectra</span>
      ) : null}
    </span>
  );
}
```

(`as-grad-3` references `as-grad-2` — both white-fade gradients; keeping the original structure. If the linter flags `xlinkHref`, it is valid in React 19 JSX.)

- [ ] **Step 2: Verify** — `npm run type-check` && `npm run lint` → clean.
- [ ] **Step 3: Commit** — `git add components/shell/logo.tsx && git commit -m "feat(shell): inline prism-swoosh Logo"`

---

### Task 4: MobileMenu

**Files:**

- Create: `components/shell/mobile-menu.tsx`

**Interfaces:**

- Consumes: `mainNav` from `@/data/navigation`, `Button`, `motion`, `usePathname`.
- Produces: `<MobileMenu open={boolean} onClose={() => void} />`.

- [ ] **Step 1: Create `components/shell/mobile-menu.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { mainNav } from "@/data/navigation";
import { Button } from "@/components/primitives";
import { cn } from "@/lib/utils";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  // Esc to close + scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const duration = reduced ? 0 : 0.4;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex flex-col bg-pine px-[var(--gutter)] pt-24 pb-12 text-paper outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
        >
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="absolute top-6 right-[var(--gutter)] font-mono text-sm text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-soft"
          >
            Close ✕
          </button>

          <nav className="flex flex-col gap-2">
            {mainNav.map((item, i) => {
              const active = pathname === item.href;
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "t-h2 flex items-center gap-3 py-1 transition-opacity",
                    active ? "text-paper" : "text-paper/80 hover:text-paper",
                  )}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration, delay: reduced ? 0 : 0.05 * i }}
                >
                  {active ? (
                    <span
                      aria-hidden
                      className="h-5 w-1 rounded-pill"
                      style={{ background: "var(--spectrum)" }}
                    />
                  ) : null}
                  {item.label}
                </motion.a>
              );
            })}
          </nav>

          <div className="mt-auto pt-10">
            <Button variant="primary" href="/contact" onClick={onClose}>
              Book a consultation
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
```

(Scroll-lock + Esc + initial focus on the panel + `aria-modal` satisfy the a11y bar; reduced motion zeroes durations and disables the stagger.)

- [ ] **Step 2: Verify** — `npm run type-check` && `npm run lint` → clean.
- [ ] **Step 3: Commit** — `git add components/shell/mobile-menu.tsx && git commit -m "feat(shell): full-screen pine mobile menu"`

---

### Task 5: SiteHeader

**Files:**

- Create: `components/shell/site-header.tsx`

**Interfaces:**

- Consumes: `mainNav`, `Logo`, `MobileMenu`, `Button`.
- Produces: `<SiteHeader />` (fixed; transparent→glass; mounts the mobile menu).

- [ ] **Step 1: Create `components/shell/site-header.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { mainNav } from "@/data/navigation";
import { Button } from "@/components/primitives";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Glass after scrolling ~one viewport height past the top.
  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          scrolled
            ? "border-b border-line bg-paper/70 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[var(--container-max)] items-center justify-between px-[var(--gutter)]">
          <a
            href="/"
            aria-label="Alive Spectra — home"
            className="rounded-sharp focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
          >
            <Logo />
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {mainNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-sans text-sm text-ink/80 transition-colors hover:text-pine"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              href="/contact"
              className="hidden sm:inline-flex"
            >
              Book a consultation
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="font-mono text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal lg:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu">
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify** — `npm run type-check` && `npm run lint` → clean.
- [ ] **Step 3: Commit** — `git add components/shell/site-header.tsx && git commit -m "feat(shell): transparent→glass site header"`

---

### Task 6: SiteFooter + barrel

**Files:**

- Create: `components/shell/site-footer.tsx`, `components/shell/index.ts`

**Interfaces:**

- Consumes: `footerColumns`, `sisterConcerns`, `socials`, `legal`, `siteConfig` (`@/lib/site`), `Logo`.
- Produces: `<SiteFooter />`; barrel exporting `SpectrumSpine`, `SiteHeader`, `SiteFooter`.

- [ ] **Step 1: Create `components/shell/site-footer.tsx`**

```tsx
import {
  footerColumns,
  legal,
  sisterConcerns,
  socials,
} from "@/data/navigation";
import { siteConfig } from "@/lib/site";
import { Logo } from "./logo";

export function SiteFooter() {
  const { contact } = siteConfig;
  return (
    <footer className="bg-pine text-paper">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter)] py-[var(--space-section)]">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1.4fr]">
          {/* Brand + NAP */}
          <div className="flex flex-col gap-4">
            <Logo />
            <address className="t-body text-paper/70 not-italic">
              {contact.address.line}
              <br />
              {contact.address.city}-{contact.address.postalCode},{" "}
              {contact.address.country}
            </address>
            <div className="t-mono flex flex-col gap-1 text-paper/70">
              {contact.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/[^+\d]/g, "")}`}
                  className="hover:text-paper"
                >
                  {p}
                </a>
              ))}
              <a href={`mailto:${contact.email}`} className="hover:text-paper">
                {contact.email}
              </a>
            </div>
          </div>

          {/* Sitemap columns */}
          {footerColumns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="t-eyebrow text-teal-soft">{col.title}</p>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="t-body text-paper/80 hover:text-paper"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Ecosystem */}
          <div className="flex flex-col gap-3">
            <p className="t-eyebrow text-teal-soft">Ecosystem</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {sisterConcerns.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    className="font-sans text-sm text-paper/80 hover:text-paper"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-mono text-paper/50">
            © {new Date().getFullYear()} {siteConfig.name}. {siteConfig.tagline}
            .
          </p>
          <div className="flex flex-wrap gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="t-mono text-paper/60 hover:text-paper"
              >
                {s.label}
              </a>
            ))}
            {legal.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="t-mono text-paper/60 hover:text-paper"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Create `components/shell/index.ts`**

```ts
export { SpectrumSpine } from "./spectrum-spine";
export { SiteHeader } from "./site-header";
export { SiteFooter } from "./site-footer";
```

- [ ] **Step 3: Verify** — `npm run type-check` && `npm run lint` → clean.
- [ ] **Step 4: Commit** — `git add components/shell/site-footer.tsx components/shell/index.ts && git commit -m "feat(shell): pine site footer + barrel"`

---

### Task 7: Layout integration + placeholder review page

**Files:**

- Modify: `app/layout.tsx`, `app/page.tsx`

**Interfaces:**

- Consumes: `SpectrumSpine`, `SiteHeader`, `SiteFooter`, `Section`, `Container`, `Eyebrow`.

- [ ] **Step 1: Mount the shell in `app/layout.tsx`.** Add the import and wrap the body content:

```tsx
import { SpectrumSpine, SiteHeader, SiteFooter } from "@/components/shell";
```

Body becomes:

```tsx
<body className="flex min-h-full flex-col font-sans">
  <SmoothScroll>
    <SpectrumSpine />
    <SiteHeader />
    <main id="content" className="flex-1">
      {children}
    </main>
    <SiteFooter />
  </SmoothScroll>
</body>
```

- [ ] **Step 2: Replace `app/page.tsx` with a placeholder review page**

```tsx
import { Container, Eyebrow, Section } from "@/components/primitives";

const sections = [
  { eyebrow: "Refraction", title: "One idea, refracted into a full spectrum." },
  {
    eyebrow: "Strategy",
    title: "Scroll to watch the spine shift its wavelength.",
  },
  {
    eyebrow: "Capital",
    title: "The nav turns to glass past the first screen.",
  },
  {
    eyebrow: "Ecosystem",
    title: "Shell + spine only — the homepage comes next.",
  },
] as const;

export default function Home() {
  return (
    <>
      {sections.map((s, i) => (
        <Section key={s.eyebrow} tone={i % 2 === 1 ? "pine" : "paper"}>
          <Container className="flex min-h-[80vh] flex-col justify-center gap-4">
            <Eyebrow marker={String(i + 1).padStart(2, "0")} accent="spine">
              {s.eyebrow}
            </Eyebrow>
            <h2
              className={
                i % 2 === 1 ? "t-display text-paper" : "t-display text-pine"
              }
            >
              {s.title}
            </h2>
          </Container>
        </Section>
      ))}
    </>
  );
}
```

- [ ] **Step 3: Verify build** — `npm run type-check` && `npm run lint` && `npm run build` → clean; `/` prerenders.
- [ ] **Step 4: Visual verify** — `npm run dev`, open `/`. Confirm: spine line visible at left and its hue shifts as you scroll; spine-accented eyebrows track the hue; nav starts transparent over section 1 and becomes glass after ~60% viewport; mobile menu (narrow viewport) opens full-screen pine, Esc closes, body scroll locks; footer renders NAP + columns + 14 concerns.
- [ ] **Step 5: Reduced-motion verify** — emulate `prefers-reduced-motion: reduce`: spine stays pine (no hue change), menu opens instantly, page fully usable.
- [ ] **Step 6: Commit** — `git add app/layout.tsx app/page.tsx && git commit -m "feat(shell): mount spine + shell, placeholder review page"`

---

## Self-Review

**Spec coverage:** spine continuous hue + `--spine-hue` + reduced-motion → Task 2 (+ Task 1 token); eyebrow sampling → Task 1; transparent→glass nav → Task 5; full-screen pine mobile menu w/ a11y → Task 4; footer NAP/columns/concerns/socials/legal → Task 6; nav data → Task 1; layout + placeholder review → Task 7; logo → Task 3. ✓

**Type consistency:** `NavLink`/`mainNav`/`footerColumns`/`sisterConcerns`/`socials`/`legal` defined in Task 1, consumed in Tasks 4/5/6. `MobileMenu` props `{open, onClose}` defined Task 4, used Task 5. `Logo` props `{withWordmark?, className?}` Task 3, used Tasks 5/6. `SpectrumSpine`/`SiteHeader`/`SiteFooter` barrel (Task 6) used Task 7. `Eyebrow accent="spine"` (Task 1) used Task 7. ✓

**Placeholder scan:** none — concrete code or exact commands throughout. Logo SVG path data is inlined verbatim (with namespaced gradient IDs).

**Note:** `useGsap` returns `RefObject<HTMLElement | null>`; the spine casts it to `RefObject<HTMLDivElement>` (Task 2) — intentional, avoids modifying the shipped hook.
