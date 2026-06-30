import type { Metadata } from "next";
import Image from "next/image";
import { Button, Container, Eyebrow, Section } from "@/components/primitives";
import { clients } from "@/data/clients";

const featured = clients.filter((c) => c.featured && !c.holdForPermission);

const description =
  "Trusted by clients across healthcare, pharmaceuticals, agriculture, real estate, and more — 17 years of work in Bangladesh.";

export const metadata: Metadata = {
  title: "Clients",
  description,
  alternates: { canonical: "/clients" },
  openGraph: {
    title: "Clients · Alive Spectra Ltd.",
    description,
    url: "/clients",
    type: "website",
  },
};

export default function ClientsPage() {
  return (
    <Section>
      <Container className="flex flex-col gap-12 pt-16">
        <header className="reveal flex flex-col gap-4">
          <Eyebrow accent="spine">Clients</Eyebrow>
          <h1 className="t-h1 max-w-[20ch] text-pine">
            Trusted across sectors.
          </h1>
          <p className="t-body-lg max-w-prose text-ink/75">
            Seventeen years of work shows up in the companies we keep — across
            pharmaceuticals, healthcare, agriculture, real estate, and beyond.
          </p>
        </header>

        <ul className="reveal grid grid-cols-2 gap-x-12 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((c) => (
            <li key={c.name} className="relative h-20">
              <Image
                src={c.logo}
                alt={c.name}
                fill
                unoptimized
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                className="object-contain opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-start gap-4 border-t border-line pt-10">
          <h2 className="t-h3 text-pine">Join them.</h2>
          <p className="t-body max-w-prose text-ink/70">
            Logos shown with permission. Tell us what you’re building.
          </p>
          <Button variant="primary" href="/contact">
            Book a consultation
          </Button>
        </div>
      </Container>
    </Section>
  );
}
