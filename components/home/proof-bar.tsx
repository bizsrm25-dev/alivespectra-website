import Image from "next/image";
import { Container } from "@/components/primitives";
import { clients } from "@/data/clients";

const featured = clients.filter((c) => c.featured && !c.holdForPermission);

export function ProofBar() {
  return (
    <section className="border-y border-line bg-paper py-14">
      <Container className="flex flex-col gap-8">
        <div className="reveal flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <p className="t-h4 text-pine">17 years · Founded 2007</p>
          <p className="t-mono max-w-md text-ink/60">
            Trusted across healthcare, agriculture, fintech, real estate, and
            education.
          </p>
        </div>
        <ul className="reveal grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-16 lg:gap-y-12">
          {featured.map((c) => (
            <li key={c.name} className="relative h-16">
              <Image
                src={c.logo}
                alt={c.name}
                fill
                unoptimized
                sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                className="object-contain opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
