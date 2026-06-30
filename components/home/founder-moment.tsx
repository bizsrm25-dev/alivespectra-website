import Link from "next/link";
import Image from "next/image";
import { Container, Eyebrow, Section } from "@/components/primitives";
import { siteConfig } from "@/lib/site";

export function FounderMoment() {
  return (
    <Section tone="pine">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="reveal relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-card border border-paper/15 bg-pine-2">
          <Image
            src="/founder.jpg"
            alt={`${siteConfig.founder}, Founder & Managing Director of Alive Spectra`}
            fill
            sizes="(max-width: 1024px) 80vw, 320px"
            className="object-cover"
          />
        </div>

        <div className="reveal flex flex-col gap-6">
          <Eyebrow accent="var(--teal-soft)">From the founder</Eyebrow>
          <blockquote className="t-h2 max-w-[24ch] text-paper">
            “We don’t hand clients a strategy and walk away. We refract one idea
            into capital, technology, and a network ready to build it.”
          </blockquote>
          <div className="flex flex-col">
            <span className="t-h4 text-paper">{siteConfig.founder}</span>
            <span className="t-mono text-xs text-teal-soft">
              Founder &amp; Managing Director
            </span>
          </div>
          <Link
            href="/about"
            className="t-mono w-fit text-sm text-paper/70 underline underline-offset-4 hover:text-paper"
          >
            Read his message
          </Link>
        </div>
      </Container>
    </Section>
  );
}
