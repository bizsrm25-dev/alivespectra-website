import type { Metadata } from "next";
import type { ComponentProps } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  Breadcrumb,
  Container,
  Eyebrow,
  Section,
} from "@/components/primitives";
import { getAllPosts, getPost } from "@/lib/insights";
import { articleLd, breadcrumbLd } from "@/lib/json-ld";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return { title: "Insights" };
  const url = `/insights/${p.slug}`;
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: `${p.title} · Alive Spectra Ltd.`,
      description: p.excerpt,
      url,
      type: "article",
    },
  };
}

const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="t-h3 mt-10 text-pine" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="t-h4 mt-8 text-pine" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="t-body-lg mt-5 text-ink/80" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="mt-4 flex flex-col gap-2" {...props} />
  ),
  li: (props: ComponentProps<"li">) => (
    <li className="t-body text-ink/80" {...props} />
  ),
  a: (props: ComponentProps<"a">) => (
    <a
      className="text-pine underline underline-offset-4 hover:text-teal"
      {...props}
    />
  ),
};

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const url = `/insights/${p.slug}`;
  const related = getAllPosts()
    .filter((x) => x.slug !== p.slug && x.tags.some((t) => p.tags.includes(t)))
    .slice(0, 2);

  const jsonLd = [
    articleLd({ title: p.title, description: p.excerpt, date: p.date, url }),
    breadcrumbLd([
      { name: "Home", url: "/" },
      { name: "Insights", url: "/insights" },
      { name: p.title, url },
    ]),
  ];

  return (
    <Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="flex flex-col gap-10 pt-16">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Insights", href: "/insights" },
            { label: p.title },
          ]}
        />
        <header className="flex flex-col gap-4">
          <Eyebrow accent="spine">{p.tags[0] ?? "Insights"}</Eyebrow>
          <h1 className="max-w-[24ch] font-display text-[clamp(2rem,1.2rem+2.6vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-pine">
            {p.title}
          </h1>
          <p className="t-mono text-xs text-ink/50">
            {formatDate(p.date)} · {p.readingTime} min read · {p.author}
          </p>
        </header>

        <article className="max-w-[68ch]">
          <MDXRemote source={p.content} components={mdxComponents} />
        </article>

        {related.length > 0 ? (
          <section className="flex flex-col gap-4 border-t border-line pt-10">
            <Eyebrow accent="var(--teal)">Related</Eyebrow>
            <ul className="flex flex-col gap-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/insights/${r.slug}`}
                    className="t-h4 text-ink transition-colors hover:text-pine"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="border-t border-line pt-8">
          <Link
            href="/insights"
            className="t-mono text-sm text-pine underline underline-offset-4 hover:text-teal"
          >
            ← All insights
          </Link>
        </div>
      </Container>
    </Section>
  );
}
