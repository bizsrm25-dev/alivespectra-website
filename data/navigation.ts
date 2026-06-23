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

export const sisterConcerns: NavLink[] = [
  { label: "Team Alive", href: "/ecosystem/team-alive" },
  { label: "BizSolve", href: "/ecosystem/bizsolve" },
  { label: "Alive Lighthouse", href: "/ecosystem/alive-lighthouse" },
  { label: "Agrovez", href: "/ecosystem/agrovez" },
  { label: "Alive Builders", href: "/ecosystem/alive-builders" },
  { label: "Alive Holidays", href: "/ecosystem/alive-holidays" },
  { label: "Alive Service", href: "/ecosystem/alive-service" },
  { label: "AratB2B", href: "/ecosystem/aratb2b" },
  { label: "Alive Bazaar", href: "/ecosystem/alive-bazaar" },
  { label: "Alive Lifestyle", href: "/ecosystem/alive-lifestyle" },
  { label: "Febrizo", href: "/ecosystem/febrizo" },
  {
    label: "Alive Event Management",
    href: "/ecosystem/alive-event-management",
  },
  { label: "Alive News24", href: "/ecosystem/alive-news24" },
  { label: "Intelligent Interior", href: "/ecosystem/intelligent-interior" },
];

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
