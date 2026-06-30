import type { Metadata } from "next";
import { Container, Eyebrow, Section } from "@/components/primitives";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site";

const description =
  "Book a consultation with Alive Spectra. Tell us your stage and what you're after — we reply fast. Office in Gulshan, Dhaka.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Alive Spectra Ltd.",
    description,
    url: "/contact",
    type: "website",
  },
};

const mapQuery = encodeURIComponent(
  "House 28, Road 1, Block A, Niketon, Gulshan, Dhaka 1212, Bangladesh",
);

export default function ContactPage() {
  const { contact } = siteConfig;
  return (
    <Section>
      <Container className="flex flex-col gap-12 pt-16">
        <header className="reveal flex flex-col gap-4">
          <Eyebrow accent="spine">Contact</Eyebrow>
          <h1 className="t-h1 max-w-[20ch] text-pine">Book a consultation.</h1>
          <p className="t-body-lg max-w-prose text-ink/75">
            Tell us your stage and what you’re after — we’ll point you to the
            right band of the spectrum and reply within a business day.
          </p>
        </header>

        <div className="reveal grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <ContactForm />

          <aside className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Eyebrow accent="var(--teal)">Office</Eyebrow>
              <address className="t-body text-ink/80 not-italic">
                {contact.address.line}
                <br />
                {contact.address.city}-{contact.address.postalCode},{" "}
                {contact.address.country}
              </address>
            </div>
            <div className="t-mono flex flex-col gap-1 text-sm text-ink/70">
              {contact.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/[^+\d]/g, "")}`}
                  className="hover:text-pine"
                >
                  {p}
                </a>
              ))}
              <a href={`mailto:${contact.email}`} className="hover:text-pine">
                {contact.email}
              </a>
            </div>
            <iframe
              title="Alive Spectra office — Niketon, Gulshan, Dhaka"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              className="h-72 w-full rounded-card border border-line"
            />
          </aside>
        </div>
      </Container>
    </Section>
  );
}
