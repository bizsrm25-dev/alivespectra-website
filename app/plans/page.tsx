import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, Eyebrow, Section } from "@/components/primitives";
import { plans } from "@/data/plans";

const description =
  "Business growth plans for every stage — entrepreneurs, startups, SMEs, and corporations. A ladder from first idea to enterprise scale.";

export const metadata: Metadata = {
  title: "Growth Plans",
  description,
  alternates: { canonical: "/plans" },
  openGraph: {
    title: "Growth Plans · Alive Spectra Ltd.",
    description,
    url: "/plans",
    type: "website",
  },
};

export default function PlansPage() {
  return (
    <Section>
      <Container className="flex flex-col gap-12 pt-16">
        <header className="flex flex-col gap-4">
          <Eyebrow accent="spine">Growth plans</Eyebrow>
          <h1 className="t-h1 max-w-[20ch] text-pine">
            A ladder from first idea to enterprise scale.
          </h1>
          <p className="t-body-lg max-w-prose text-ink/75">
            Four plans, one progression. Each rung meets you where you are and
            opens the next stage of growth.
          </p>
        </header>

        <ol className="flex flex-col">
          {plans.map((p) => (
            <li key={p.slug}>
              <Link
                href={p.href}
                className="group flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span className="t-display w-24 shrink-0 leading-none text-ink/15 tabular-nums transition-colors group-hover:text-ink/30 sm:w-36">
                  {String(p.rung).padStart(2, "0")}
                </span>
                <span className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="flex flex-col">
                    <span className="t-h3 text-ink transition-colors group-hover:text-pine">
                      {p.name}
                    </span>
                    <span className="t-mono text-xs text-teal">
                      {p.audience}
                    </span>
                  </span>
                  <span className="t-body max-w-md text-ink/60 sm:text-right">
                    {p.promise}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="flex flex-col items-start gap-4 border-t border-line pt-10">
          <h2 className="t-h3 text-pine">Not sure which rung you’re on?</h2>
          <p className="t-body max-w-prose text-ink/70">
            Tell us where the business is today — we’ll start at the right rung.
          </p>
          <Button variant="primary" href="/contact">
            Book a consultation
          </Button>
        </div>
      </Container>
    </Section>
  );
}
