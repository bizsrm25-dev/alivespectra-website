export type Service = {
  slug: string;
  name: string;
  /** One-line promise — plain, specific, no buzzwords. */
  promise: string;
  href: string;
  /** Wavelength accent sampled along the spectrum (violet → red). Accent only. */
  hue: string;
};

export const services: Service[] = [
  {
    slug: "funding-investment-advisory",
    name: "Funding & Investment Advisory",
    promise:
      "Get investment-ready and reach capital through our in-house investor network.",
    href: "/services/funding-investment-advisory",
    hue: "#6c4cf1",
  },
  {
    slug: "it-digital-solutions",
    name: "IT & Digital Solutions",
    promise: "Build the digital backbone — software, platforms, and data.",
    href: "/services/it-digital-solutions",
    hue: "#4f6ef0",
  },
  {
    slug: "marketing-pr",
    name: "Marketing & PR",
    promise: "Earn attention and trust with strategy-led marketing and PR.",
    href: "/services/marketing-pr",
    hue: "#2f8fe8",
  },
  {
    slug: "management-consultancy",
    name: "Management Consultancy",
    promise: "Sharpen strategy, operations, and governance for durable growth.",
    href: "/services/management-consultancy",
    hue: "#2fa9a0",
  },
  {
    slug: "ai-training-consulting",
    name: "AI Training & Consulting",
    promise: "Put AI to work — practical training and adoption for your teams.",
    href: "/services/ai-training-consulting",
    hue: "#2fbe7e",
  },
  {
    slug: "fintech-consultation",
    name: "Fintech Consultation",
    promise:
      "Navigate fintech and regulation with advisors who know the market.",
    href: "/services/fintech-consultation",
    hue: "#8bb85a",
  },
  {
    slug: "budget-consultation",
    name: "Budget Consultation",
    promise: "Plan and control budgets that hold up under real-world pressure.",
    href: "/services/budget-consultation",
    hue: "#f2a93b",
  },
  {
    slug: "agriculture-consultancy",
    name: "Agriculture Consultancy",
    promise: "Modernise agribusiness end to end, backed by Agrovez.",
    href: "/services/agriculture-consultancy",
    hue: "#ea7d44",
  },
  {
    slug: "creative-advertising",
    name: "Creative & Advertising",
    promise: "Ideas that move markets — creative built to perform.",
    href: "/services/creative-advertising",
    hue: "#e5564b",
  },
];
