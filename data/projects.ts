export type Project = {
  slug: string;
  name: string;
  sector: string;
  location: string;
  status: string;
  href: string;
  overview: string;
  description: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "unity-hospital",
    name: "Unity Hospital",
    sector: "Healthcare",
    location: "Dhaka, Bangladesh",
    status: "Operational",
    href: "/projects/unity-hospital",
    overview: "A modern multi-specialty hospital serving its community.",
    description:
      "Unity Hospital brings quality, accessible care to its catchment — modern diagnostics, multi-specialty services, and a patient experience built around trust. Alive Spectra supported the venture across strategy and execution.",
    highlights: [
      "Multi-specialty clinical services",
      "Modern diagnostic facilities",
      "Community-focused access to care",
    ],
  },
  {
    slug: "pro-health-smart-hospital",
    name: "Pro Health Smart Hospital",
    sector: "Healthcare",
    location: "Bangladesh",
    status: "In development",
    href: "/projects/pro-health-smart-hospital",
    overview: "A next-generation smart hospital built around connected care.",
    description:
      "Pro Health Smart Hospital integrates digital systems into the core of clinical operations — connected records, smarter workflows, and a digital-first patient experience. A flagship of the ecosystem's technology-led approach to healthcare.",
    highlights: [
      "Connected clinical systems",
      "Digital-first patient experience",
      "Operational efficiency through technology",
    ],
  },
  {
    slug: "prime-place",
    name: "Prime Place",
    sector: "Real estate",
    location: "Dhaka, Bangladesh",
    status: "In development",
    href: "/projects/prime-place",
    overview: "A landmark mixed-use real-estate development.",
    description:
      "Prime Place is a mixed-use development designed to set a standard for quality and experience in its location — combining commercial and lifestyle space with considered design and delivery.",
    highlights: [
      "Mixed-use commercial and lifestyle space",
      "Design-led, quality delivery",
      "Landmark location",
    ],
  },
  {
    slug: "unity-agro-park",
    name: "Unity Agro Park",
    sector: "Agriculture",
    location: "Bangladesh",
    status: "In development",
    href: "/projects/unity-agro-park",
    overview: "An integrated agro park modernising the value chain.",
    description:
      "Unity Agro Park brings modern practice, processing, and market linkage together in one integrated operation — raising productivity and value across the agricultural chain, delivered with Agrovez.",
    highlights: [
      "Integrated modern agriculture",
      "Processing and value addition",
      "Stronger market linkage",
    ],
  },
  {
    slug: "diligence-universal",
    name: "Diligence Universal",
    sector: "Diversified group",
    location: "Bangladesh",
    status: "Operational",
    href: "/projects/diligence-universal",
    overview: "A diversified group spanning multiple sectors.",
    description:
      "The Diligence cluster spans multiple sectors — a diversified group reflecting Alive Spectra's range across industry, services, and investment, and a proof point for building durable, multi-sector ventures.",
    highlights: [
      "Multi-sector group",
      "Industry, services, and investment",
      "Built for durable growth",
    ],
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
