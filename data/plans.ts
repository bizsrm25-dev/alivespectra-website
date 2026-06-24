export type Plan = {
  slug: string;
  /** True order in the growth ladder (1–4) — numbering carries real meaning. */
  rung: number;
  name: string;
  audience: string;
  promise: string;
  href: string;
  overview: string;
  context: string;
  support: string[];
  ctaLabel: string;
};

export const plans: Plan[] = [
  {
    slug: "entrepreneurs",
    rung: 1,
    name: "Entrepreneurs",
    audience: "Idea & early stage",
    promise: "Turn an idea into a fundable, buildable venture.",
    href: "/plans/entrepreneurs",
    overview: "Turn a raw idea into a venture that can be funded and built.",
    context:
      "Early founders rarely fail for lack of ambition — they stall on structure, validation, and access. This plan gives an entrepreneur the guidance, the first systems, and the ecosystem doors to move from idea to a credible, fundable venture.",
    support: [
      "Idea validation and business modelling",
      "Skill development and mentorship",
      "Access to the Alive Spectra ecosystem",
      "Early funding readiness",
      "Build-to-Earn opportunities",
    ],
    ctaLabel: "Start with us",
  },
  {
    slug: "startups",
    rung: 2,
    name: "Startups",
    audience: "Building & raising",
    promise: "Find product–market fit and the capital to scale it.",
    href: "/plans/startups",
    overview: "Reach product–market fit and the capital to scale it.",
    context:
      "A startup's job is to find what works and fund the push to scale. This plan pairs hands-on growth support with access to our investor network, so traction and capital build together rather than in sequence.",
    support: [
      "Mentorship and growth strategy",
      "Funding access through our investor network",
      "Go-to-market and traction support",
      "R&D and product support",
      "Ecosystem partnerships",
    ],
    ctaLabel: "Build with us",
  },
  {
    slug: "smes",
    rung: 3,
    name: "SMEs",
    audience: "Growing & professionalising",
    promise: "Systematise operations and unlock the next stage of growth.",
    href: "/plans/smes",
    overview: "Professionalise operations and unlock the next stage of growth.",
    context:
      "Established SMEs hit ceilings that improvised processes can't pass. This plan brings the systems, governance, talent, and capital to professionalise the business and open the next stage of growth.",
    support: [
      "Operations and systems design",
      "Talent, training, and capability",
      "Funding and expansion capital",
      "Governance and controls",
      "Market expansion support",
    ],
    ctaLabel: "Scale with us",
  },
  {
    slug: "corporations",
    rung: 4,
    name: "Corporations",
    audience: "Transforming & expanding",
    promise: "Drive transformation, R&D, and ESG at enterprise scale.",
    href: "/plans/corporations",
    overview: "Drive transformation, R&D, and ESG at enterprise scale.",
    context:
      "At enterprise scale the work is transformation, innovation, and responsible growth. This plan supports corporations with strategy, R&D, ESG advisory, and the capital and partnerships to expand with confidence.",
    support: [
      "Transformation and change leadership",
      "R&D and innovation programmes",
      "ESG and responsible-growth advisory",
      "Capital, M&A, and partnerships",
      "Executive enablement and AI adoption",
    ],
    ctaLabel: "Transform with us",
  },
];

export const getPlan = (slug: string): Plan | undefined =>
  plans.find((p) => p.slug === slug);
