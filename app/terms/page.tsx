import type { Metadata } from "next";
import { Container, Eyebrow, Section } from "@/components/primitives";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern your use of the Alive Spectra Ltd. website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const { contact } = siteConfig;
  return (
    <Section>
      <Container size="narrow" className="flex flex-col gap-8 pt-16">
        <header className="flex flex-col gap-3">
          <Eyebrow accent="spine">Legal</Eyebrow>
          <h1 className="t-h1 text-pine">Terms of Use</h1>
          <p className="t-mono text-xs text-ink/50">Last updated: June 2026</p>
        </header>

        <div className="t-body flex flex-col gap-5 text-ink/80">
          <p>
            These terms govern your use of the {siteConfig.name} website. This
            is a working summary — the full, counsel-reviewed version will be
            published before any wide launch.
          </p>
          <h2 className="t-h4 mt-2 text-pine">Use of the site</h2>
          <p>
            The content here is provided for general information. It isn’t
            formal advice, and an engagement begins only under a written
            agreement.
          </p>
          <h2 className="t-h4 mt-2 text-pine">Intellectual property</h2>
          <p>
            The brand, content, and design of this site belong to{" "}
            {siteConfig.name}. Client and partner logos remain the property of
            their respective owners and are used with permission.
          </p>
          <h2 className="t-h4 mt-2 text-pine">Liability</h2>
          <p>
            We work to keep the site accurate and available but make no
            warranties to that effect, and aren’t liable for losses arising from
            its use.
          </p>
          <h2 className="t-h4 mt-2 text-pine">Contact</h2>
          <p>
            Questions about these terms? Email{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-pine underline underline-offset-4 hover:text-teal"
            >
              {contact.email}
            </a>
            .
          </p>
        </div>
      </Container>
    </Section>
  );
}
