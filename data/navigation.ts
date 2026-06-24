import { concerns } from "@/data/concerns";

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Plans", href: "/plans" },
  { label: "Services", href: "/services" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Projects", href: "/projects" },
  { label: "Clients", href: "/clients" },
  { label: "Insights", href: "/insights" },
];

/** Derived from the single concerns source so footer + teaser stay in sync. */
export const sisterConcerns: NavLink[] = concerns.map((c) => ({
  label: c.name,
  href: `/ecosystem/${c.slug}`,
}));

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Clients", href: "/clients" },
      { label: "Projects", href: "/projects" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "What we do",
    links: [
      { label: "Services", href: "/services" },
      { label: "Growth Plans", href: "/plans" },
      { label: "Ecosystem", href: "/ecosystem" },
    ],
  },
];

export const socials: NavLink[] = [
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
];

export const legal: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
