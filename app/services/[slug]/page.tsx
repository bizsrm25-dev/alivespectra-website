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
import { getService, services } from "@/data/services";
import { breadcrumbLd, faqLd, serviceLd } from "@/lib/json-ld";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return { title: "Service" };
  return {
    title: s.name,
    description: s.overview,
    alternates: { canonical: s.href },
    openGraph: {
      title: `${s.name} · Alive Spectra Ltd.`,
      description: s.overview,
      url: s.href,
      type: "website",
    },
  };
}

export default async function ServiceDetail({ params }: Params) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const idx = services.findIndex((x) => x.slug === s.slug);
  const num = String(idx + 1).padStart(2, "0");
  const prev = services[(idx - 1 + services.length) % services.length];
  const next = services[(idx + 1) % services.length];

  const jsonLd = [
    serviceLd(s),
    breadcrumbLd([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: s.name, url: s.href },
    ]),
    faqLd(s.faqs),
  ];

  return (
    <Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="flex flex-col gap-16 pt-16">
        {/* Hero */}
        <header className="flex flex-col gap-5">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: s.name },
            ]}
          />
          <Eyebrow marker={num} accent={s.hue}>
            Service
          </Eyebrow>
          <h1 className="max-w-[18ch] font-display text-[clamp(2.25rem,1.2rem+3vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-pine">
            {s.name}
          </h1>
          <p className="t-body-lg max-w-prose text-ink/75">{s.promise}</p>
          <div className="pt-1">
            <Button variant="primary" href="/contact">
              Book a consultation
            </Button>
          </div>
        </header>

        {/* Context + key services */}
        <section className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Eyebrow accent="var(--teal)">Context &amp; approach</Eyebrow>
            <p className="t-body-lg max-w-prose text-ink/80">{s.context}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Eyebrow accent="var(--teal)">Key services</Eyebrow>
            <ul className="flex flex-col">
              {s.keyServices.map((k) => (
                <li
                  key={k}
                  className="t-body flex items-baseline gap-3 border-t border-line py-3 text-ink/80"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: s.hue }}
                  />
                  {k}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ecosystem + proof */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-card border border-line bg-paper-2 p-6">
            <Eyebrow accent="var(--teal)">In the ecosystem</Eyebrow>
            <p className="t-body text-ink/80">{s.ecosystem.note}</p>
            <Link
              href={s.ecosystem.href}
              className="t-mono w-fit text-sm text-pine underline underline-offset-4 hover:text-teal"
            >
              {s.ecosystem.label} →
            </Link>
          </div>
          <div className="flex flex-col gap-3 rounded-card border border-line bg-paper-2 p-6">
            <Eyebrow accent="var(--teal)">Proof</Eyebrow>
            <Link
              href={s.project.href}
              className="group flex flex-1 flex-col justify-end"
            >
              <span className="t-h3 text-pine">{s.project.name}</span>
              <span className="t-mono mt-1 text-xs text-ink/55 group-hover:text-teal">
                View project →
              </span>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="flex flex-col gap-6">
          <Eyebrow accent="spine">FAQ</Eyebrow>
          <dl className="flex flex-col">
            {s.faqs.map((f) => (
              <div key={f.q} className="border-t border-line py-6">
                <dt className="t-h4 text-pine">{f.q}</dt>
                <dd className="t-body mt-2 max-w-prose text-ink/70">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Prev / next */}
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
