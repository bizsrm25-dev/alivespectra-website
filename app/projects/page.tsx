import type { Metadata } from "next";
import Link from "next/link";
import {
  Button,
  Container,
  Eyebrow,
  Section,
  Tag,
} from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/data/projects";

const description =
  "Major projects across healthcare, real estate, agriculture, and diversified industry — proof of Alive Spectra's range, built and operating.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects · Alive Spectra Ltd.",
    description,
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <Section>
      <Container className="flex flex-col gap-12 pt-16">
        <header className="flex flex-col gap-4">
          <Eyebrow accent="spine">Projects</Eyebrow>
          <h1 className="t-h1 max-w-[20ch] text-pine">
            Proof, built and operating.
          </h1>
          <p className="t-body-lg max-w-prose text-ink/75">
            Flagship projects across sectors — evidence that strategy and
            capital turn into things that run in the real world.
          </p>
        </header>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={(i % 3) * 0.06}>
                <Link
                  href={p.href}
                  className="group flex h-full flex-col gap-4 rounded-card border border-line bg-paper p-6 transition-colors hover:border-teal"
                >
                  <span className="flex flex-wrap gap-2">
                    <Tag>{p.sector}</Tag>
                    <Tag>{p.status}</Tag>
                  </span>
                  <span className="t-h3 mt-auto text-pine">{p.name}</span>
                  <span className="t-body text-sm text-ink/65">
                    {p.overview}
                  </span>
                  <span className="t-mono text-xs text-ink/50">
                    {p.location}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-start gap-4 border-t border-line pt-10">
          <h2 className="t-h3 text-pine">Have a project in mind?</h2>
          <Button variant="primary" href="/contact">
            Book a consultation
          </Button>
        </div>
      </Container>
    </Section>
  );
}
