import { Button, Container, Section } from "@/components/primitives";
import { siteConfig } from "@/lib/site";

export function HomeCta() {
  const { contact } = siteConfig;
  return (
    <Section tone="pine" className="border-t border-paper/10">
      <Container className="reveal flex flex-col items-start gap-6">
        <p className="t-mono text-xs text-teal-soft">
          17 years · Gulshan-1, Dhaka
        </p>
        <h2 className="t-display max-w-[16ch] text-paper">
          Let’s refract your next idea.
        </h2>
        <p className="t-body-lg max-w-prose text-paper/75">
          Book a consultation, or reach us directly — we reply fast.
        </p>
        <div className="flex flex-wrap items-center gap-5 pt-2">
          <Button
            variant="primary"
            href="/contact"
            className="bg-paper text-pine hover:bg-paper-2"
          >
            Book a consultation
          </Button>
          <a
            href={`tel:${contact.phones[0].replace(/[^+\d]/g, "")}`}
            className="t-mono text-sm text-paper/80 hover:text-paper"
          >
            {contact.phones[0]}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="t-mono text-sm text-paper/80 hover:text-paper"
          >
            {contact.email}
          </a>
        </div>
      </Container>
    </Section>
  );
}
