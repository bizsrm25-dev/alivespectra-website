import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Breadcrumb,
  Button,
  Container,
  Eyebrow,
  Section,
  Tag,
} from "@/components/primitives";
import { getProject, projects } from "@/data/projects";
import { breadcrumbLd } from "@/lib/json-ld";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project" };
  return {
    title: p.name,
    description: p.overview,
    alternates: { canonical: p.href },
    openGraph: {
      title: `${p.name} · Alive Spectra Ltd.`,
      description: p.overview,
      url: p.href,
      type: "website",
    },
  };
}

export default async function ProjectDetail({ params }: Params) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  const jsonLd = [
    breadcrumbLd([
      { name: "Home", url: "/" },
      { name: "Projects", url: "/projects" },
      { name: p.name, url: p.href },
    ]),
  ];

  return (
    <Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="flex flex-col gap-14 pt-16">
        <header className="flex flex-col gap-5">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: p.name },
            ]}
          />
          <div className="flex flex-wrap gap-2">
            <Tag>{p.sector}</Tag>
            <Tag>{p.status}</Tag>
            <Tag>{p.location}</Tag>
          </div>
          <h1 className="max-w-[18ch] font-display text-[clamp(2.25rem,1.2rem+3vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-pine">
            {p.name}
          </h1>
          <p className="t-body-lg max-w-prose text-ink/80">{p.description}</p>
        </header>

        <section className="flex flex-col gap-4">
          <Eyebrow accent="var(--teal)">Highlights</Eyebrow>
          <ul className="flex flex-col">
            {p.highlights.map((h) => (
              <li
                key={h}
                className="t-body flex items-baseline gap-3 border-t border-line py-3 text-ink/80"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                />
                {h}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap items-center gap-4 border-t border-line pt-8">
          <Button variant="primary" href="/contact">
            Start a project with us
          </Button>
          <Link
            href="/projects"
            className="t-mono text-sm text-pine underline underline-offset-4 hover:text-teal"
          >
            ← All projects
          </Link>
        </div>

        <nav className="flex justify-between gap-4 border-t border-line pt-6">
          <Link href={prev.href} className="group flex flex-col">
            <span className="t-mono text-xs text-ink/50">← Previous</span>
            <span className="t-h4 text-ink transition-colors group-hover:text-pine">
              {prev.name}
            </span>
          </Link>
          <Link href={next.href} className="group flex flex-col text-right">
            <span className="t-mono text-xs text-ink/50">Next →</span>
            <span className="t-h4 text-ink transition-colors group-hover:text-pine">
              {next.name}
            </span>
          </Link>
        </nav>
      </Container>
    </Section>
  );
}
