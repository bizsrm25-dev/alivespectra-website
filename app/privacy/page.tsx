import type { Metadata } from "next";
import { Container, Eyebrow, Section } from "@/components/primitives";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Alive Spectra Ltd. collects, uses, and protects the information you share with us.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const { contact } = siteConfig;
  return (
    <Section>
      <Container size="narrow" className="flex flex-col gap-8 pt-16">
        <header className="flex flex-col gap-3">
          <Eyebrow accent="spine">Legal</Eyebrow>
          <h1 className="t-h1 text-pine">Privacy Policy</h1>
          <p className="t-mono text-xs text-ink/50">Last updated: June 2026</p>
        </header>

        <div className="t-body flex flex-col gap-5 text-ink/80">
          <p>
            This policy explains how {siteConfig.name} handles the information
            you share with us. It’s a working summary — we’ll publish the full,
            counsel-reviewed version before any wide launch.
          </p>
          <h2 className="t-h4 mt-2 text-pine">What we collect</h2>
          <p>
            When you contact us, we collect the details you submit — typically
            your name, email, company, and message — so we can respond. We don’t
            sell your data.
          </p>
          <h2 className="t-h4 mt-2 text-pine">How we use it</h2>
          <p>
            We use your information only to reply to your enquiry, deliver
            services you’ve asked for, and keep records of our correspondence.
          </p>
          <h2 className="t-h4 mt-2 text-pine">Analytics</h2>
          <p>
            We may use privacy-respecting analytics to understand, in aggregate,
            how the site is used. This does not identify you personally.
          </p>
          <h2 className="t-h4 mt-2 text-pine">Contact</h2>
          <p>
            Questions about your data? Email{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-pine underline underline-offset-4 hover:text-teal"
            >
              {contact.email}
            </a>{" "}
            or write to us at {contact.address.line}, {contact.address.city}-
            {contact.address.postalCode}.
          </p>
        </div>
      </Container>
    </Section>
  );
}
