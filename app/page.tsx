import type { Metadata } from "next";
import {
  EcosystemTeaser,
  FounderMoment,
  Hero,
  HomeCta,
  PlansLadder,
  ProjectsTeaser,
  ProofBar,
  ServicesSpectrum,
} from "@/components/home";
import { localBusinessLd, organizationLd } from "@/lib/json-ld";

const description =
  "Alive Spectra refracts one idea into a full spectrum of execution — strategy, capital, technology, and a ready-built ecosystem. Business consultancy in Gulshan, Dhaka, since 2007.";

export const metadata: Metadata = {
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Alive Spectra Ltd. — Changing the way of thinking",
    description,
    url: "/",
    siteName: "Alive Spectra Ltd.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alive Spectra Ltd. — Changing the way of thinking",
    description,
  },
};

export default function Home() {
  const jsonLd = [organizationLd(), localBusinessLd()];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ProofBar />
      <ServicesSpectrum />
      <PlansLadder />
      <EcosystemTeaser />
      <ProjectsTeaser />
      <FounderMoment />
      <HomeCta />
    </>
  );
}
