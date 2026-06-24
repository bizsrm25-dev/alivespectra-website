import type { Metadata } from "next";
import {
  Button,
  Container,
  Eyebrow,
  Hairline,
  Section,
} from "@/components/primitives";
import { personLd } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";

const description =
  "Alive Spectra — a premier Bangladesh consultancy since 2007, led by founder Abdur Razzaq Mamun. Our story, mission, CSR, and SDG commitments.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · Alive Spectra Ltd.",
    description,
    url: "/about",
    type: "website",
  },
};

const csr = [
  {
    title: "Entrepreneurship & SMEs",
    note: "Backing founders and small businesses to grow and create jobs.",
  },
  {
    title: "Education",
    note: "Skills, training, and access — including practical AI and business education.",
  },
  {
    title: "Community",
    note: "Investing in the communities our work and ecosystem touch.",
  },
  {
    title: "Environment",
    note: "Sustainable practice across agriculture, real estate, and operations.",
  },
  {
    title: "Ethical governance",
    note: "Honest advice and disciplined governance, on every engagement.",
  },
];

const sdgs = [
  { n: 4, label: "Quality Education" },
  { n: 8, label: "Decent Work & Economic Growth" },
  { n: 9, label: "Industry, Innovation & Infrastructure" },
  { n: 12, label: "Responsible Consumption & Production" },
  { n: 13, label: "Climate Action" },
  { n: 17, label: "Partnerships for the Goals" },
];

export default function AboutPage() {
  return (
    <Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd()) }}
      />
      <Container className="flex flex-col gap-16 pt-16">
        {/* Story */}
        <header className="flex flex-col gap-5">
          <Eyebrow accent="spine">About</Eyebrow>
          <h1 className="max-w-[20ch] font-display text-[clamp(2.25rem,1.2rem+3vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-pine">
            Seventeen years of changing the way of thinking.
          </h1>
          <p className="t-body-lg max-w-prose text-ink/80">
            Founded in 2007, Alive Spectra grew into a premier Bangladesh
            consultancy by doing one thing well: taking a single idea and
            refracting it into strategy, capital, technology, and a ready-built
            ecosystem to deploy it. Today that spectrum spans 10+ services, 14
            sister concerns, and a portfolio of projects across sectors.
          </p>
        </header>

        {/* Mission / vision */}
        <section className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Eyebrow accent="var(--teal)">Mission</Eyebrow>
            <p className="t-h4 text-pine">
              To help serious businesses grow — pairing sharp strategy with real
              access to capital, technology, and execution.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Eyebrow accent="var(--teal)">Vision</Eyebrow>
            <p className="t-h4 text-pine">
              An ecosystem where a good idea anywhere in Bangladesh can find
              everything it needs to become a lasting enterprise.
            </p>
          </div>
        </section>

        <Hairline />

        {/* Founder message */}
        <section className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="flex aspect-[4/5] w-full max-w-xs items-center justify-center rounded-card border border-line bg-paper-2">
            <span className="t-mono text-xs text-ink/40">Portrait</span>
          </div>
          <div className="flex flex-col gap-5">
            <Eyebrow accent="spine">Message from the founder</Eyebrow>
            <p className="t-body-lg max-w-prose text-ink/80">
              “I built Alive Spectra as the foundational entity for strategic
              incubation — the place an idea comes to be refracted into a real
              business. As an entrepreneur, investor, and strategist, I’ve also
              founded BizSolve, Agrovez, Alive Lighthouse, and Alive News24. The
              common thread is simple: do the work that makes ventures real, and
              stand behind it.”
            </p>
            <div className="flex flex-col">
              <span className="t-h4 text-pine">{siteConfig.founder}</span>
              <span className="t-mono text-xs text-teal">
                Founder &amp; Managing Director
              </span>
            </div>
          </div>
        </section>

        <Hairline />

        {/* CSR */}
        <section className="flex flex-col gap-6">
          <Eyebrow accent="spine">Responsibility</Eyebrow>
          <h2 className="t-h2 max-w-[20ch] text-pine">
            How we try to give back.
          </h2>
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {csr.map((c) => (
              <li key={c.title} className="flex flex-col gap-2 bg-paper p-6">
                <span className="t-h4 text-pine">{c.title}</span>
                <span className="t-body text-sm text-ink/65">{c.note}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* SDGs */}
        <section className="flex flex-col gap-6">
          <Eyebrow accent="var(--teal)">SDG alignment</Eyebrow>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {sdgs.map((s) => (
              <li
                key={s.n}
                className="flex items-center gap-4 rounded-card border border-line p-5"
              >
                <span className="t-display text-3xl text-teal">{s.n}</span>
                <span className="t-body text-sm text-ink/75">{s.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col items-start gap-4 border-t border-line pt-10">
          <h2 className="t-h3 text-pine">Work with us.</h2>
          <Button variant="primary" href="/contact">
            Book a consultation
          </Button>
        </div>
      </Container>
    </Section>
  );
}
