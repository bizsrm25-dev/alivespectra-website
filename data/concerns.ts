export type Concern = {
  slug: string;
  name: string;
  category: string;
  description: string;
};

/** The 14 sister concerns. Slugs match the /ecosystem/<slug> routes. */
export const concerns: Concern[] = [
  {
    slug: "team-alive",
    name: "Team Alive",
    category: "Consulting & talent",
    description:
      "The consulting, advisory, and talent bench behind Alive Spectra engagements — and the hub of our investor network.",
  },
  {
    slug: "bizsolve",
    name: "BizSolve",
    category: "Technology",
    description:
      "The technology arm: software, platforms, and data builds for clients across the ecosystem.",
  },
  {
    slug: "alive-lighthouse",
    name: "Alive Lighthouse",
    category: "Brand & PR",
    description:
      "Brand, public relations, and market visibility — helping businesses be seen and trusted.",
  },
  {
    slug: "agrovez",
    name: "Agrovez",
    category: "Agriculture",
    description:
      "The agribusiness arm — from modern practice to market linkage and agri-projects.",
  },
  {
    slug: "alive-builders",
    name: "Alive Builders",
    category: "Real estate",
    description: "Construction and real-estate development.",
  },
  {
    slug: "alive-holidays",
    name: "Alive Holidays",
    category: "Travel",
    description: "Travel, tours, and hospitality experiences.",
  },
  {
    slug: "alive-service",
    name: "Alive Service",
    category: "Services",
    description: "Facility and business support services.",
  },
  {
    slug: "aratb2b",
    name: "AratB2B",
    category: "Commerce",
    description: "A B2B sourcing and procurement marketplace.",
  },
  {
    slug: "alive-bazaar",
    name: "Alive Bazaar",
    category: "Commerce",
    description: "Consumer retail and marketplace.",
  },
  {
    slug: "alive-lifestyle",
    name: "Alive Lifestyle",
    category: "Lifestyle",
    description: "Lifestyle products and experiences.",
  },
  {
    slug: "febrizo",
    name: "Febrizo",
    category: "Fashion & lifestyle",
    description: "A fashion and lifestyle brand.",
  },
  {
    slug: "alive-event-management",
    name: "Alive Event Management",
    category: "Events",
    description: "Events, activations, and production.",
  },
  {
    slug: "alive-news24",
    name: "Alive News24",
    category: "Media",
    description: "News and digital media.",
  },
  {
    slug: "intelligent-interior",
    name: "Intelligent Interior",
    category: "Interior",
    description: "Interior design and fit-out.",
  },
];

export const getConcern = (slug: string): Concern | undefined =>
  concerns.find((c) => c.slug === slug);
