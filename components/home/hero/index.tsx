import { Button, Container, Eyebrow, Section } from "@/components/primitives";
import { RefractionHero } from "./refraction-hero";

export function Hero() {
  return (
    <Section className="relative overflow-hidden">
      <Container className="grid min-h-[86vh] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-6">
          <Eyebrow accent="spine">
            Business consultancy • Dhaka • Since 2007
          </Eyebrow>
          <h1 className="t-display max-w-[15ch] text-pine">
            One idea, refracted into a full spectrum of execution.
          </h1>
          <p className="t-body-lg max-w-prose text-ink/75">
            Alive Spectra takes a single idea and refracts it into strategy,
            capital, technology, and a ready-built ecosystem to deploy it.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="primary" href="/contact">
              Book a consultation
            </Button>
            <Button variant="ghost" href="/services">
              Explore the spectrum
            </Button>
          </div>
        </div>

        <RefractionHero className="order-first lg:order-none" />
      </Container>
    </Section>
  );
}
