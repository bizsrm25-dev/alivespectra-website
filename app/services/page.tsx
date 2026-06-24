import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, Eyebrow, Section } from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/data/services";

const description =
  "Nine consultancy services — funding, IT, marketing, management, AI, fintech, budgeting, agriculture, and creative — refracted from one idea. Alive Spectra, Dhaka.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services · Alive Spectra Ltd.",
    description,
    url: "/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <Section>
      <Container className="flex flex-col gap-12 pt-16">
        <header className="flex flex-col gap-4">
          <Eyebrow accent="spine">The spectrum</Eyebrow>
          <h1 className="t-h1 max-w-[20ch] text-pine">
            Nine services, refracted from one idea.
          </h1>
          <p className="t-body-lg max-w-prose text-ink/75">
            One engagement can draw on many. Each service is a band of the same
            spectrum — strategy, capital, technology, and execution — backed by
            a ready-built ecosystem.
          </p>
        </header>

        <ul className="flex flex-col">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={(i % 3) * 0.05}>
                <Link
                  href={s.href}
                  className="group flex flex-col gap-1.5 border-t border-line py-6 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="t-mono text-xs" style={{ color: s.hue }}>
                      λ {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="t-h3 text-ink transition-colors group-hover:text-pine">
                      {s.name}
                    </span>
                  </span>
                  <span className="t-body max-w-md text-ink/60 sm:text-right">
                    {s.promise}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-start gap-4 border-t border-line pt-10">
          <h2 className="t-h3 text-pine">Not sure which fits?</h2>
          <p className="t-body max-w-prose text-ink/70">
            Tell us the outcome you’re after — we’ll point you to the right band
            of the spectrum.
          </p>
          <Button variant="primary" href="/contact">
            Book a consultation
          </Button>
        </div>
      </Container>
    </Section>
  );
}
