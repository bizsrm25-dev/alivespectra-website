import { Button, Container, Eyebrow } from "@/components/primitives";
import { RefractionHero } from "./refraction-hero";
import { HeroIntro } from "./hero-intro";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* One screen tall; pt clears the fixed header so the whole block —
          including the CTAs — sits above the fold. */}
      <Container className="grid min-h-[100svh] items-center gap-10 pt-20 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
        <HeroIntro className="flex flex-col gap-5">
          <Eyebrow accent="spine">
            Business consultancy • Dhaka • Since 2007
          </Eyebrow>
          <h1 className="max-w-[16ch] font-display text-[clamp(2.5rem,1.1rem+4vw,4.5rem)] leading-[1.03] font-semibold tracking-[-0.02em] text-pine">
            One idea, refracted into a full spectrum.
          </h1>
          <p className="t-body-lg max-w-prose text-ink/75">
            Alive Spectra refracts a single idea into strategy, capital,
            technology, and a ready-built ecosystem to deploy it.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="primary" href="/contact">
              Book a consultation
            </Button>
            <Button variant="ghost" href="/services">
              Explore the spectrum
            </Button>
          </div>
        </HeroIntro>

        <RefractionHero className="order-first lg:order-none" />
      </Container>
    </section>
  );
}
