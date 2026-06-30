import Link from "next/link";
import { Button, Container, Eyebrow, Section } from "@/components/primitives";
import { sisterConcerns } from "@/data/navigation";

export function EcosystemTeaser() {
  return (
    <Section tone="paper">
      <Container className="flex flex-col gap-10">
        <div className="reveal flex flex-col gap-4">
          <Eyebrow accent="spine">The ecosystem</Eyebrow>
          <h2 className="t-h1 max-w-[20ch] text-pine">
            One parent, fourteen concerns.
          </h2>
          <p className="t-body-lg max-w-prose text-ink/70">
            A ready-built network across IT, agriculture, real estate, media,
            and lifestyle — so strategy ships with the capacity to execute.
          </p>
        </div>

        <ul className="reveal grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
          {sisterConcerns.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="t-h4 flex h-full items-center bg-paper px-5 py-5 text-ink transition-colors hover:bg-paper-2 hover:text-pine"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>

        <div>
          <Button variant="ghost" href="/ecosystem">
            Explore the ecosystem
          </Button>
        </div>
      </Container>
    </Section>
  );
}
