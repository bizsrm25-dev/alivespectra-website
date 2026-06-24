import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Breadcrumb,
  Button,
  Container,
  Eyebrow,
  Section,
} from "@/components/primitives";
import { concerns, getConcern } from "@/data/concerns";
import { breadcrumbLd } from "@/lib/json-ld";

export const dynamicParams = false;

export function generateStaticParams() {
  return concerns.map((c) => ({ slug: c.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = getConcern(slug);
  if (!c) return { title: "Ecosystem" };
  const href = `/ecosystem/${c.slug}`;
  return {
    title: `${c.name} — ${c.category}`,
    description: c.description,
    alternates: { canonical: href },
    openGraph: {
      title: `${c.name} · Alive Spectra Ltd.`,
      description: c.description,
      url: href,
      type: "website",
    },
  };
}

export default async function ConcernDetail({ params }: Params) {
  const { slug } = await params;
  const c = getConcern(slug);
  if (!c) notFound();

  const href = `/ecosystem/${c.slug}`;
  const jsonLd = [
    breadcrumbLd([
      { name: "Home", url: "/" },
      { name: "Ecosystem", url: "/ecosystem" },
      { name: c.name, url: href },
    ]),
  ];

  return (
    <Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="flex flex-col gap-10 pt-16">
        <header className="flex flex-col gap-5">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Ecosystem", href: "/ecosystem" },
              { label: c.name },
            ]}
          />
          <Eyebrow accent="spine">{c.category}</Eyebrow>
          <h1 className="max-w-[18ch] font-display text-[clamp(2.25rem,1.2rem+3vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-pine">
            {c.name}
          </h1>
          <p className="t-body-lg max-w-prose text-ink/80">{c.description}</p>
          <p className="t-body max-w-prose text-ink/60">
            {c.name} is part of the Alive Spectra ecosystem — one of fourteen
            concerns we draw on so strategy ships with the capacity to execute.
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-4 border-t border-line pt-8">
          <Button variant="primary" href="/contact">
            Work with {c.name}
          </Button>
          <Link
            href="/ecosystem"
            className="t-mono text-sm text-pine underline underline-offset-4 hover:text-teal"
          >
            ← All concerns
          </Link>
        </div>
      </Container>
    </Section>
  );
}
