# Design System (Phase 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Alive Spectra design system — tokens, typography, primitives, a reduced-motion-safe motion layer, and a `/styleguide` review route — as the single source of truth before any business page.

**Architecture:** Tokens (CSS variables) are the only shared dependency; each primitive is a small, self-contained file with a typed prop interface, so restyling = editing tokens. GSAP drives orchestrated scroll, Motion drives component-level reveals, Lenis provides smooth scroll. Everything degrades to a calm, complete page under `prefers-reduced-motion`.

**Tech Stack:** Next.js 16 (App Router, TS) · Tailwind CSS v4 (`@theme`) · Motion (Framer Motion) · GSAP + ScrollTrigger · Lenis · clsx + tailwind-merge.

## Global Constraints

- Base palette = **pine green + paper + ink**. The spectrum gradient is an **ACCENT ONLY** (< ~5% of any viewport).
- Fonts: display = **Clash Display** (`font-display`), body = **Hanken Grotesk** (`font-sans`), mono/labels = **Space Mono** (`font-mono`).
- Shape language: **architectural/sharp** — `rounded-sharp` (3px) on buttons + structure; `rounded-card` (14px) reserved for cards/media.
- Motion: default reveal = **blur-to-sharp + upward drift**, `--ease-focus` (cubic-bezier(0.16,1,0.3,1)) / `--dur-reveal` (0.8s). **Respect `prefers-reduced-motion`** everywhere → instant & visible, native scroll.
- Performance targets (hold these as later pages land): LCP < 2.5s, INP < 200ms, CLS < 0.1.
- No new dependencies beyond `clsx` + `tailwind-merge`.
- Verification per task: `npm run type-check`, `npm run lint`, `npm run build` pass clean; visual tasks confirmed on `/styleguide`. (No unit-test runner in this project by design.)
- Commits are optional and assume `git init` has been run; skip commit steps if the repo is not under git yet.

---

## File Structure

- `styles/tokens.css` — **modify**: add type scale, leading/tracking, motion, layout vars (color tokens already present).
- `styles/typography.css` — **create**: reusable text-style classes.
- `app/globals.css` — **modify**: import typography, add radius to `@theme`, base resets.
- `lib/utils.ts` — **create**: `cn()`.
- `components/primitives/{container,section,eyebrow,button,hairline,tag}.tsx` + `index.ts` — **create**.
- `components/motion/{smooth-scroll,reveal}.tsx` — **create**.
- `lib/use-gsap.ts` — **create**.
- `app/layout.tsx` — **modify**: wrap children in `SmoothScroll`.
- `app/styleguide/page.tsx` — **create**: the review route.

---

### Task 1: Tokens + radius theme + base resets

**Files:**

- Modify: `styles/tokens.css`
- Modify: `app/globals.css`

**Interfaces:**

- Produces: CSS vars `--text-display|h1|h2|h3|h4|body-lg|body|small|eyebrow`, `--leading-display|heading|body`, `--tracking-display|eyebrow`, `--ease-focus`, `--dur-reveal|quick`, `--container-max`, `--gutter`, `--space-section`; Tailwind utilities `rounded-sharp|card|pill`.

- [ ] **Step 1: Append scale/motion/layout tokens to `styles/tokens.css`** (inside the existing `:root`, after the spectrum block):

```css
/* Type scale — fluid clamp(), bold editorial */
--text-display: clamp(2.75rem, 1.2rem + 6.5vw, 6rem); /* 44 → 96 */
--text-h1: clamp(2.25rem, 1.45rem + 3.4vw, 4rem); /* 36 → 64 */
--text-h2: clamp(1.75rem, 1.2rem + 2.3vw, 3rem); /* 28 → 48 */
--text-h3: clamp(1.375rem, 1.05rem + 1.35vw, 2rem); /* 22 → 32 */
--text-h4: clamp(1.125rem, 1rem + 0.55vw, 1.5rem); /* 18 → 24 */
--text-body-lg: clamp(1.0625rem, 1rem + 0.3vw, 1.25rem); /* 17 → 20 */
--text-body: 1rem;
--text-small: 0.875rem;
--text-eyebrow: 0.75rem;

/* Leading & tracking */
--leading-display: 0.95;
--leading-heading: 1.1;
--leading-body: 1.6;
--tracking-display: -0.02em;
--tracking-eyebrow: 0.18em;

/* Motion */
--ease-focus: cubic-bezier(0.16, 1, 0.3, 1);
--dur-reveal: 0.8s;
--dur-quick: 0.22s;

/* Layout */
--container-max: 75rem; /* 1200px */
--gutter: clamp(1.25rem, 0.5rem + 3vw, 3rem);
--space-section: clamp(4rem, 2rem + 8vw, 8rem);
```

- [ ] **Step 2: Add radius scale + base resets to `app/globals.css`.** Add the radius lines inside the existing `@theme inline` block:

```css
/* Radius — sharp on structure, soft on cards/media */
--radius-sharp: 3px;
--radius-card: 14px;
--radius-pill: 999px;
```

Then add a typography import directly below the existing `@import "../styles/tokens.css";` line:

```css
@import "../styles/typography.css";
```

(Body base + reduced-motion block already exist in globals.css — leave them.)

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: `✓ Compiled successfully`. (typography.css does not exist yet — Step from Task 2 creates it; if running tasks strictly in order, temporarily skip the typography `@import` until Task 2, or create an empty `styles/typography.css` first.)

- [ ] **Step 4: Commit** (if git): `git add styles/tokens.css app/globals.css && git commit -m "feat(design): add type/motion/layout tokens + radius scale"`

---

### Task 2: Typography text styles

**Files:**

- Create: `styles/typography.css`

**Interfaces:**

- Produces: classes `.t-display`, `.t-h1`–`.t-h4`, `.t-body-lg`, `.t-body`, `.t-eyebrow`, `.t-mono` (consumed by primitives + styleguide + future MDX).

- [ ] **Step 1: Create `styles/typography.css`**

```css
@layer components {
  .t-display {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: var(--text-display);
    line-height: var(--leading-display);
    letter-spacing: var(--tracking-display);
  }
  .t-h1 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: var(--text-h1);
    line-height: var(--leading-heading);
    letter-spacing: -0.01em;
  }
  .t-h2 {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: var(--text-h2);
    line-height: var(--leading-heading);
  }
  .t-h3 {
    font-family: var(--font-display);
    font-weight: 500;
    font-size: var(--text-h3);
    line-height: 1.2;
  }
  .t-h4 {
    font-family: var(--font-display);
    font-weight: 500;
    font-size: var(--text-h4);
    line-height: 1.3;
  }
  .t-body-lg {
    font-family: var(--font-sans);
    font-size: var(--text-body-lg);
    line-height: var(--leading-body);
  }
  .t-body {
    font-family: var(--font-sans);
    font-size: var(--text-body);
    line-height: var(--leading-body);
  }
  .t-eyebrow {
    font-family: var(--font-mono);
    font-size: var(--text-eyebrow);
    text-transform: uppercase;
    letter-spacing: var(--tracking-eyebrow);
    font-weight: 400;
  }
  .t-mono {
    font-family: var(--font-mono);
    font-size: var(--text-small);
  }
}
```

- [ ] **Step 2: Verify** — `npm run build` → `✓ Compiled successfully`.
- [ ] **Step 3: Commit** (if git): `git add styles/typography.css && git commit -m "feat(design): reusable typography text styles"`

---

### Task 3: `cn()` utility + dependencies

**Files:**

- Modify: `package.json` (via install)
- Modify: `lib/utils.ts` (create if absent — currently `lib/site.ts` exists, `lib/utils.ts` does not)

**Interfaces:**

- Produces: `cn(...inputs: ClassValue[]): string` from `@/lib/utils` (consumed by every primitive).

- [ ] **Step 1: Install deps** — `npm install clsx tailwind-merge`
- [ ] **Step 2: Create `lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge class names, de-duplicating conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: Verify** — `npm run type-check` → no errors.
- [ ] **Step 4: Commit** (if git): `git add package.json package-lock.json lib/utils.ts && git commit -m "chore: add cn() class-merge helper"`

---

### Task 4: Static primitives — Container, Section, Hairline, Tag

**Files:**

- Create: `components/primitives/container.tsx`, `section.tsx`, `hairline.tsx`, `tag.tsx`, `index.ts`

**Interfaces:**

- Produces:
  - `Container({ as?, size?: "narrow"|"default"|"wide", className?, children })`
  - `Section({ as?, tone?: "paper"|"pine", className?, children })`
  - `Hairline({ orientation?: "horizontal"|"vertical", className? })`
  - `Tag({ className?, children })`

- [ ] **Step 1: `container.tsx`**

```tsx
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-[var(--container-max)]",
  wide: "max-w-[90rem]",
} as const;

type ContainerProps = {
  as?: ElementType;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
};

export function Container({
  as: Tag = "div",
  size = "default",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-[var(--gutter)]",
        sizes[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: `section.tsx`** (single padding source — no competing paddings)

```tsx
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  paper: "bg-paper text-ink",
  pine: "bg-pine text-paper",
} as const;

type SectionProps = {
  as?: ElementType;
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
};

export function Section({
  as: Tag = "section",
  tone = "paper",
  className,
  children,
}: SectionProps) {
  return (
    <Tag className={cn("py-[var(--space-section)]", tones[tone], className)}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 3: `hairline.tsx`**

```tsx
import { cn } from "@/lib/utils";

type HairlineProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

export function Hairline({
  orientation = "horizontal",
  className,
}: HairlineProps) {
  return (
    <span
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "block bg-line",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
    />
  );
}
```

- [ ] **Step 4: `tag.tsx`**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TagProps = { className?: string; children: ReactNode };

export function Tag({ className, children }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sharp border border-line px-2.5 py-1 font-mono text-xs text-ink/80",
        className,
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 5: `index.ts`** (barrel; Eyebrow/Button added in Task 5)

```ts
export { Container } from "./container";
export { Section } from "./section";
export { Hairline } from "./hairline";
export { Tag } from "./tag";
```

- [ ] **Step 6: Verify** — `npm run type-check` && `npm run lint` → clean.
- [ ] **Step 7: Commit** (if git): `git add components/primitives && git commit -m "feat(design): Container, Section, Hairline, Tag primitives"`

---

### Task 5: Interactive primitives — Eyebrow, Button

**Files:**

- Create: `components/primitives/eyebrow.tsx`, `button.tsx`
- Modify: `components/primitives/index.ts`

**Interfaces:**

- Produces:
  - `Eyebrow({ marker?: string, accent?: string (CSS color, default var(--teal)), className?, children })`
  - `Button({ variant?: "primary"|"ghost", href?, className?, ...native })` — renders `<a>` when `href` set, else `<button>`.

- [ ] **Step 1: `eyebrow.tsx`**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  /** wavelength index, e.g. "01" renders "λ 01 — " */
  marker?: string;
  /** CSS color for the label; defaults to teal, can sample a spectrum hue */
  accent?: string;
  className?: string;
};

export function Eyebrow({
  children,
  marker,
  accent = "var(--teal)",
  className,
}: EyebrowProps) {
  return (
    <p className={cn("t-eyebrow", className)} style={{ color: accent }}>
      {marker ? <span aria-hidden>λ {marker} — </span> : null}
      {children}
    </p>
  );
}
```

- [ ] **Step 2: `button.tsx`**

```tsx
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sharp px-5 py-2.5 font-sans text-sm font-medium transition-colors [transition-duration:var(--dur-quick)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-pine text-paper hover:bg-pine-2",
  ghost: "border border-line bg-transparent text-ink hover:bg-paper-2",
} as const;

type Variant = keyof typeof variants;

type ButtonProps =
  | ({
      variant?: Variant;
      href: string;
    } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({
      variant?: Variant;
      href?: undefined;
    } & ButtonHTMLAttributes<HTMLButtonElement>);

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);
  if (props.href !== undefined) {
    return (
      <a
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }
  return (
    <button
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
```

- [ ] **Step 3: Extend `index.ts`** — add:

```ts
export { Eyebrow } from "./eyebrow";
export { Button } from "./button";
```

- [ ] **Step 4: Verify** — `npm run type-check` && `npm run lint` → clean.
- [ ] **Step 5: Commit** (if git): `git add components/primitives && git commit -m "feat(design): Eyebrow + Button primitives"`

---

### Task 6: Motion foundation — useGsap + SmoothScroll

**Files:**

- Create: `lib/use-gsap.ts`, `components/motion/smooth-scroll.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**

- Produces:
  - `useGsap(callback, deps?) => React.RefObject<HTMLElement>` — scope ref; runs `callback` in a `gsap.context`, no-op under reduced motion.
  - `<SmoothScroll>{children}</SmoothScroll>` — client provider.

- [ ] **Step 1: `lib/use-gsap.ts`**

```tsx
"use client";

import { useEffect, useRef, type DependencyList } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Run GSAP work scoped to a ref, with auto-cleanup. No-ops under reduced motion. */
export function useGsap(
  callback: (ctx: { gsap: typeof gsap; scope: HTMLElement }) => void,
  deps: DependencyList = [],
) {
  const scopeRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => callback({ gsap, scope }), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return scopeRef;
}
```

- [ ] **Step 2: `components/motion/smooth-scroll.tsx`**

```tsx
"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 3: Wrap children in `app/layout.tsx`** — import and wrap the body content:

```tsx
import { SmoothScroll } from "@/components/motion/smooth-scroll";
```

Change the body to:

```tsx
<body className="flex min-h-full flex-col font-sans">
  <SmoothScroll>{children}</SmoothScroll>
</body>
```

- [ ] **Step 4: Verify** — `npm run build` → compiles; start `npm run dev`, load `/`, confirm no console/SSR errors and scroll works.
- [ ] **Step 5: Commit** (if git): `git add lib/use-gsap.ts components/motion app/layout.tsx && git commit -m "feat(motion): Lenis smooth-scroll + useGsap, reduced-motion safe"`

---

### Task 7: Reveal component

**Files:**

- Create: `components/motion/reveal.tsx`

**Interfaces:**

- Produces: `<Reveal delay?={number} className?={string}>{children}</Reveal>` — blur-to-sharp reveal on enter; static & visible under reduced motion.

- [ ] **Step 1: `components/motion/reveal.tsx`**

```tsx
"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify** — `npm run type-check` && `npm run lint` → clean.
- [ ] **Step 3: Commit** (if git): `git add components/motion/reveal.tsx && git commit -m "feat(motion): Reveal (blur-to-sharp), reduced-motion safe"`

---

### Task 8: `/styleguide` review route

**Files:**

- Create: `app/styleguide/page.tsx`

**Interfaces:**

- Consumes: all primitives from `@/components/primitives`, `Reveal` from `@/components/motion/reveal`, typography classes.

- [ ] **Step 1: Create `app/styleguide/page.tsx`**

```tsx
import type { Metadata } from "next";
import {
  Button,
  Container,
  Eyebrow,
  Hairline,
  Section,
  Tag,
} from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const colors = [
  ["--ink", "#0E1A16"],
  ["--paper", "#F5F7F6"],
  ["--paper-2", "#ECF1EF"],
  ["--pine", "#0C3A2E"],
  ["--pine-2", "#103B33"],
  ["--teal", "#2F7E6E"],
  ["--teal-soft", "#6FB3A4"],
  ["--line", "#D7E0DC"],
] as const;

const spectrum = [
  ["--spec-violet", "#6C4CF1"],
  ["--spec-blue", "#2F8FE8"],
  ["--spec-green", "#2FBE7E"],
  ["--spec-amber", "#F2A93B"],
  ["--spec-red", "#E5564B"],
] as const;

export default function Styleguide() {
  return (
    <Section>
      <Container className="flex flex-col gap-16">
        <header className="flex flex-col gap-3">
          <Eyebrow marker="00">Design System</Eyebrow>
          <h1 className="t-display text-pine">Styleguide</h1>
          <p className="t-body-lg max-w-prose text-ink/80">
            Tokens, type, and primitives — the single source of truth. Base is
            pine + paper + ink; the spectrum is an accent only.
          </p>
        </header>

        <Hairline />

        {/* Color */}
        <section className="flex flex-col gap-5">
          <h2 className="t-h3 text-pine">Color</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {colors.map(([name, hex]) => (
              <div key={name} className="flex flex-col gap-2">
                <span
                  className="h-16 w-full rounded-sharp border border-line"
                  style={{ background: `var(${name})` }}
                />
                <span className="t-mono text-ink/70">{name}</span>
                <span className="t-mono text-ink/50">{hex}</span>
              </div>
            ))}
          </div>

          <h3 className="t-h4 mt-4 text-pine">Spectrum (accent only)</h3>
          <span
            className="h-3 w-full rounded-pill"
            style={{ background: "var(--spectrum)" }}
            aria-hidden
          />
          <div className="grid grid-cols-5 gap-4">
            {spectrum.map(([name, hex]) => (
              <div key={name} className="flex flex-col gap-2">
                <span
                  className="h-10 w-full rounded-sharp"
                  style={{ background: `var(${name})` }}
                />
                <span className="t-mono text-ink/50">{hex}</span>
              </div>
            ))}
          </div>
        </section>

        <Hairline />

        {/* Type */}
        <section className="flex flex-col gap-6">
          <h2 className="t-h3 text-pine">Typography</h2>
          <p className="t-display text-pine">Display — Clash</p>
          <p className="t-h1 text-ink">Heading 1</p>
          <p className="t-h2 text-ink">Heading 2</p>
          <p className="t-h3 text-ink">Heading 3</p>
          <p className="t-h4 text-ink">Heading 4</p>
          <p className="t-body-lg max-w-prose text-ink/80">
            Body large — Hanken Grotesk. Warm, highly legible, calm. The type is
            a feature, not a delivery vehicle.
          </p>
          <p className="t-body max-w-prose text-ink/80">
            Body — Hanken Grotesk at the default size for sustained reading.
          </p>
          <Eyebrow marker="01">Eyebrow / mono label</Eyebrow>
        </section>

        <Hairline />

        {/* Primitives */}
        <section className="flex flex-col gap-6">
          <h2 className="t-h3 text-pine">Primitives</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Book a consultation</Button>
            <Button variant="ghost">Explore services</Button>
            <Button variant="primary" href="#">
              Primary link
            </Button>
            <Button variant="ghost" href="#">
              Ghost link
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Tag>17 years</Tag>
            <Tag>Founded 2007</Tag>
            <Tag>Gulshan-1, Dhaka</Tag>
          </div>
          <div className="flex flex-wrap gap-4">
            <Eyebrow marker="02" accent="var(--spec-violet)">
              Funding
            </Eyebrow>
            <Eyebrow marker="03" accent="var(--spec-blue)">
              IT &amp; Digital
            </Eyebrow>
            <Eyebrow marker="04" accent="var(--spec-amber)">
              Agriculture
            </Eyebrow>
          </div>
        </section>

        <Hairline />

        {/* Tones */}
        <Section tone="pine" className="rounded-card">
          <Container>
            <Eyebrow marker="05" accent="var(--teal-soft)">
              Dark tone
            </Eyebrow>
            <p className="t-h2 mt-3 text-paper">
              A pine section reads calm and confident.
            </p>
          </Container>
        </Section>

        <Hairline />

        {/* Motion */}
        <section className="flex flex-col gap-6">
          <h2 className="t-h3 text-pine">Motion — Reveal</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[0, 0.1, 0.2].map((d) => (
              <Reveal
                key={d}
                delay={d}
                className="rounded-card border border-line p-6"
              >
                <p className="t-h4 text-pine">Comes into focus</p>
                <p className="t-body mt-2 text-ink/70">
                  Blur-to-sharp + drift. Delay {d}s.
                </p>
              </Reveal>
            ))}
          </div>
        </section>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Verify build + type** — `npm run type-check` && `npm run lint` && `npm run build` → all clean; `/styleguide` listed as a static route.
- [ ] **Step 3: Visual verify** — `npm run dev`, open `http://localhost:3000/styleguide`. Confirm: three fonts render distinctly, colors/spectrum show, primitives in all variants, pine tone block, Reveal blocks animate in on scroll.
- [ ] **Step 4: Reduced-motion verify** — in browser devtools, emulate `prefers-reduced-motion: reduce`, reload `/styleguide`: Reveal blocks appear instantly & fully visible, native scroll (no Lenis), no layout shift.
- [ ] **Step 5: Commit** (if git): `git add app/styleguide/page.tsx && git commit -m "feat(design): /styleguide review route"`

---

## Self-Review

**Spec coverage:**

- Tokens + theme mapping → Task 1. ✓
- Fluid type scale + reusable text styles → Tasks 1 (vars) + 2 (classes). ✓
- Primitives (Container, Section, Eyebrow, Button, Hairline, Tag) → Tasks 4 + 5. ✓
- Motion layer (Lenis init, useGsap, reveal helper), reduced-motion-safe → Tasks 6 + 7. ✓
- `/styleguide` rendering every token/type/primitive → Task 8. ✓
- `clsx` + `tailwind-merge` dependency → Task 3. ✓
- Success criteria (type-check/lint/build pass; reduced-motion calm; spectrum < ~5%) → Task 8 verify steps. ✓

**Type consistency:** `cn` (Task 3) used by all primitives; `Section` tone keys `paper|pine`, `Container` size keys `narrow|default|wide`, `Button` variant keys `primary|ghost`, `Eyebrow` `marker`/`accent` — all consistent between definitions (Tasks 4/5) and usage (Task 8). `Reveal` `delay`/`className` consistent (Task 7 → Task 8). `useGsap` defined Task 6, consumed in a later phase (the Spine), not in this plan — intentional.

**Placeholder scan:** none — every step contains concrete code or an exact command + expected result.

**Ordering note:** Task 1 imports `styles/typography.css`, created in Task 2. The plan flags this in Task 1 Step 3 (create an empty file first or add the import in Task 2). Resolve by creating `styles/typography.css` at the start of Task 2 before the import is exercised, or move the `@import` line into Task 2.
