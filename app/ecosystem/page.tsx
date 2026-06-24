import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, Eyebrow, Section } from "@/components/primitives";
import { concerns } from "@/data/concerns";

const description =
  "One parent, fourteen concerns — a ready-built ecosystem across technology, agriculture, real estate, media, commerce, and more.";

export const metadata: Metadata = {
  title: "Ecosystem",
  description,
  alternates: { canonical: "/ecosystem" },
  openGraph: {
    title: "Ecosystem · Alive Spectra Ltd.",
    description,
    url: "/ecosystem",
    type: "website",
  },
};

export default function EcosystemPage() {
  return (
    <Section>
      <Container className="flex flex-col gap-12 pt-16">
        <header className="flex flex-col gap-4">
          <Eyebrow accent="spine">The ecosystem</Eyebrow>
          <h1 className="t-h1 max-w-[20ch] text-pine">
            One parent, fourteen concerns.
          </h1>
          <p className="t-body-lg max-w-prose text-ink/75">
            A ready-built network across technology, agriculture, real estate,
            media, commerce, and more — so strategy ships with the capacity to
            execute.
          </p>
        </header>

        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {concerns.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/ecosystem/${c.slug}`}
                className="group flex h-full flex-col gap-2 bg-paper p-6 transition-colors hover:bg-paper-2"
              >
                <span className="t-mono text-xs text-teal">{c.category}</span>
                <span className="t-h4 text-ink transition-colors group-hover:text-pine">
                  {c.name}
                </span>
                <span className="t-body text-sm text-ink/60">
                  {c.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-start gap-4 border-t border-line pt-10">
          <h2 className="t-h3 text-pine">Put the ecosystem to work.</h2>
          <Button variant="primary" href="/contact">
            Book a consultation
          </Button>
        </div>
      </Container>
    </Section>
  );
}
