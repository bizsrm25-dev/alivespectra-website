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
import { getPlan, plans } from "@/data/plans";
import { breadcrumbLd } from "@/lib/json-ld";

export const dynamicParams = false;

export function generateStaticParams() {
  return plans.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getPlan(slug);
  if (!p) return { title: "Plan" };
  return {
    title: `${p.name} — Growth Plan`,
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

export default async function PlanDetail({ params }: Params) {
  const { slug } = await params;
  const p = getPlan(slug);
  if (!p) notFound();

  const idx = plans.findIndex((x) => x.slug === p.slug);
  const num = String(p.rung).padStart(2, "0");
  const lower = idx > 0 ? plans[idx - 1] : null;
  const higher = idx < plans.length - 1 ? plans[idx + 1] : null;

  const jsonLd = [
    breadcrumbLd([
      { name: "Home", url: "/" },
      { name: "Plans", url: "/plans" },
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
              { label: "Plans", href: "/plans" },
              { label: p.name },
            ]}
          />
          <Eyebrow accent="spine">Growth plan · Rung {num}</Eyebrow>
          <h1 className="max-w-[18ch] font-display text-[clamp(2.25rem,1.2rem+3vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-pine">
            {p.name}
          </h1>
          <p className="t-mono text-xs text-teal">{p.audience}</p>
          <p className="t-body-lg max-w-prose text-ink/75">{p.context}</p>
          <div className="pt-1">
            <Button variant="primary" href="/contact">
              {p.ctaLabel}
            </Button>
          </div>
        </header>

        <section className="flex flex-col gap-4">
          <Eyebrow accent="var(--teal)">What you get</Eyebrow>
          <ul className="flex flex-col">
            {p.support.map((s) => (
              <li
                key={s}
                className="t-body flex items-baseline gap-3 border-t border-line py-3 text-ink/80"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                />
                {s}
              </li>
            ))}
          </ul>
        </section>

        <nav className="flex justify-between gap-4 border-t border-line pt-6">
          {lower ? (
            <Link href={lower.href} className="group flex flex-col">
              <span className="t-mono text-xs text-ink/50">
                ← Earlier stage
              </span>
              <span className="t-h4 text-ink transition-colors group-hover:text-pine">
                {lower.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {higher ? (
            <Link href={higher.href} className="group flex flex-col text-right">
              <span className="t-mono text-xs text-ink/50">Next stage →</span>
              <span className="t-h4 text-ink transition-colors group-hover:text-pine">
                {higher.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </Container>
    </Section>
  );
}
