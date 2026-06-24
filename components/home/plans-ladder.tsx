import Link from "next/link";
import { Container, Eyebrow, Section } from "@/components/primitives";
import { plans } from "@/data/plans";

export function PlansLadder() {
  return (
    <Section tone="pine">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <Eyebrow accent="var(--teal-soft)">Growth plans</Eyebrow>
          <h2 className="t-h1 max-w-[20ch] text-paper">
            A ladder from first idea to enterprise scale.
          </h2>
        </div>

        <ol className="flex flex-col">
          {plans.map((p) => (
            <li key={p.slug}>
              <Link
                href={p.href}
                className="group flex flex-col gap-2 border-t border-paper/15 py-6 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span className="t-display w-16 text-paper/25 transition-colors group-hover:text-paper/60">
                  {String(p.rung).padStart(2, "0")}
                </span>
                <span className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="flex flex-col">
                    <span className="t-h3 text-paper">{p.name}</span>
                    <span className="t-mono text-xs text-teal-soft">
                      {p.audience}
                    </span>
                  </span>
                  <span className="t-body max-w-md text-paper/70 sm:text-right">
                    {p.promise}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
