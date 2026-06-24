export type Plan = {
  slug: string;
  /** True order in the growth ladder (1–4) — numbering carries real meaning. */
  rung: number;
  name: string;
  audience: string;
  promise: string;
  href: string;
};

export const plans: Plan[] = [
  {
    slug: "entrepreneurs",
    rung: 1,
    name: "Entrepreneurs",
    audience: "Idea & early stage",
    promise: "Turn an idea into a fundable, buildable venture.",
    href: "/plans/entrepreneurs",
  },
  {
    slug: "startups",
    rung: 2,
    name: "Startups",
    audience: "Building & raising",
    promise: "Find product–market fit and the capital to scale it.",
    href: "/plans/startups",
  },
  {
    slug: "smes",
    rung: 3,
    name: "SMEs",
    audience: "Growing & professionalising",
    promise: "Systematise operations and unlock the next stage of growth.",
    href: "/plans/smes",
  },
  {
    slug: "corporations",
    rung: 4,
    name: "Corporations",
    audience: "Transforming & expanding",
    promise: "Drive transformation, R&D, and ESG at enterprise scale.",
    href: "/plans/corporations",
  },
];
