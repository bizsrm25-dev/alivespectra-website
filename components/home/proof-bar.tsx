import Image from "next/image";
import { Container } from "@/components/primitives";
import { clients } from "@/data/clients";

const featured = clients.filter((c) => c.featured && !c.holdForPermission);

export function ProofBar() {
  return (
    <section className="border-y border-line bg-paper py-14">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <p className="t-h4 text-pine">17 years · Founded 2007</p>
          <p className="t-mono max-w-md text-ink/60">
            Trusted across healthcare, agriculture, fintech, real estate, and
            education.
          </p>
        </div>
        <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
          {featured.map((c) => (
            <li key={c.name} className="flex items-center justify-center">
              <Image
                src={c.logo}
                alt={c.name}
                width={150}
                height={44}
                unoptimized
                className="h-9 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
