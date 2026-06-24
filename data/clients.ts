export type Client = {
  name: string;
  /** Path under /public. */
  logo: string;
  featured: boolean;
  /** Hold from display until logo-usage rights are confirmed. */
  holdForPermission?: boolean;
};

export const clients: Client[] = [
  {
    name: "Beacon Pharmaceuticals",
    logo: "/logos/beacon-pharmaceuticals.png",
    featured: true,
  },
  { name: "ASMACS", logo: "/logos/asmacs.svg", featured: true },
  { name: "Biomedica", logo: "/logos/biomedica.png", featured: true },
  { name: "Unity Hospital", logo: "/logos/unity-hospital.png", featured: true },
  {
    name: "Better Holdings",
    logo: "/logos/better-holdings.svg",
    featured: true,
  },
  {
    name: "Banalata Agro Park",
    logo: "/logos/banalata-agro-park.svg",
    featured: true,
  },
  { name: "Laser Trend", logo: "/logos/laser-trend.svg", featured: true },
  { name: "TKB Aegis", logo: "/logos/tkb-aegis.svg", featured: true },
  {
    name: "Stanford Universal",
    logo: "/logos/stanford-universal.svg",
    featured: true,
  },
  {
    name: "Mountain Heaven",
    logo: "/logos/mountain-heaven.png",
    featured: true,
  },
  { name: "Pro Health", logo: "/logos/pro-health.svg", featured: true },
  {
    name: "Diligence Group",
    logo: "/logos/diligence-group.svg",
    featured: true,
  },
  { name: "Go Green Life", logo: "/logos/go-green-life.svg", featured: true },
  { name: "Unity Agro", logo: "/logos/unity-agro.png", featured: true },
  // Red Cross emblem is permission-sensitive — held until rights are confirmed.
  {
    name: "ICRC",
    logo: "/logos/icrc.png",
    featured: true,
    holdForPermission: true,
  },
];
