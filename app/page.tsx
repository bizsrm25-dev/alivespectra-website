/**
 * Placeholder home — no real pages yet. This exists only to confirm the
 * scaffold renders: the three fonts load, the design tokens resolve, and the
 * spectrum accent is wired. Replace when building the homepage.
 */
export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col justify-center gap-7 px-6 py-24">
      <p className="font-mono text-xs tracking-[0.22em] text-teal uppercase">
        λ 00 — Scaffold ready
      </p>

      <h1 className="font-display text-6xl leading-[0.95] font-semibold tracking-tight text-pine">
        Alive Spectra
      </h1>

      <p className="max-w-prose font-sans text-lg leading-relaxed text-ink/80">
        Changing the way of thinking. The project scaffold is live — Next.js,
        Tailwind, Lenis, GSAP and Motion are installed, the Clash Display /
        Hanken Grotesk / Space Mono fonts are wired through{" "}
        <span className="font-mono text-sm text-teal">next/font</span>, and the
        design tokens are loaded. No pages yet.
      </p>

      <div className="h-px w-full bg-line" />

      {/* Spectrum accent — used sparingly, by design (< ~5% of the viewport). */}
      <div
        className="h-1.5 w-40 rounded-full"
        style={{ background: "var(--spectrum)" }}
        aria-hidden
      />
    </main>
  );
}
