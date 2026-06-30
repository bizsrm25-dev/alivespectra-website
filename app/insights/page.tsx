import type { Metadata } from "next";
import { Container, Eyebrow, Section } from "@/components/primitives";
import { InsightsList } from "@/components/insights/insights-list";
import { getAllPosts, getAllTags } from "@/lib/insights";

const description =
  "Practical, locally-relevant thinking on funding, growth, ESG, AI, and building durable businesses in Bangladesh.";

export const metadata: Metadata = {
  title: "Insights",
  description,
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights · Alive Spectra Ltd.",
    description,
    url: "/insights",
    type: "website",
  },
};

export default function InsightsPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  return (
    <Section>
      <Container className="flex flex-col gap-10 pt-16">
        <header className="reveal flex flex-col gap-4">
          <Eyebrow accent="spine">Insights</Eyebrow>
          <h1 className="t-h1 max-w-[20ch] text-pine">
            Practical thinking for Bangladeshi businesses.
          </h1>
          <p className="t-body-lg max-w-prose text-ink/75">
            Notes on funding, growth, ESG, and AI — written to be useful, not to
            fill a feed.
          </p>
        </header>
        <InsightsList posts={posts} tags={tags} />
      </Container>
    </Section>
  );
}
