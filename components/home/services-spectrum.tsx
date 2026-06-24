import Link from "next/link";
import { Container, Eyebrow, Section } from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/data/services";

export function ServicesSpectrum() {
  return (
    <Section tone="paper">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <Eyebrow accent="spine">The spectrum</Eyebrow>
          <h2 className="t-h1 max-w-[18ch] text-pine">
            Nine services, refracted from one idea.
          </h2>
        </div>

        <ul className="flex flex-col">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={(i % 3) * 0.05}>
                <Link
                  href={s.href}
                  className="group flex flex-col gap-1.5 border-t border-line py-6 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="t-mono text-xs" style={{ color: s.hue }}>
                      λ {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="t-h3 text-ink transition-colors group-hover:text-pine">
                      {s.name}
                    </span>
                  </span>
                  <span className="t-body max-w-md text-ink/60 sm:text-right">
                    {s.promise}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
