import Link from "next/link";
import { Button, Container, Eyebrow, Tag } from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/data/projects";

const featured = projects.slice(0, 3);

export function ProjectsTeaser() {
  return (
    <section className="bg-paper-2 py-[var(--space-section)]">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <Eyebrow accent="spine">Projects</Eyebrow>
          <h2 className="t-h1 max-w-[20ch] text-pine">
            Proof, built and operating.
          </h2>
        </div>

        <ul className="grid gap-6 md:grid-cols-3">
          {featured.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 0.06}>
                <Link
                  href={p.href}
                  className="group flex h-full flex-col gap-4 rounded-card border border-line bg-paper p-6 transition-colors hover:border-teal"
                >
                  <span className="flex flex-wrap gap-2">
                    <Tag>{p.sector}</Tag>
                    <Tag>{p.status}</Tag>
                  </span>
                  <span className="t-h3 mt-auto text-pine">{p.name}</span>
                  <span className="t-mono text-xs text-ink/55">
                    {p.location}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <div>
          <Button variant="ghost" href="/projects">
            See all projects
          </Button>
        </div>
      </Container>
    </section>
  );
}
