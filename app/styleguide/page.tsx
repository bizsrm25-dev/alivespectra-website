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
            <Tag>Gulshan, Dhaka</Tag>
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
