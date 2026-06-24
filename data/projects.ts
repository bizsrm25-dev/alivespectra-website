export type Project = {
  slug: string;
  name: string;
  sector: string;
  location: string;
  status: string;
  href: string;
};

export const projects: Project[] = [
  {
    slug: "unity-hospital",
    name: "Unity Hospital",
    sector: "Healthcare",
    location: "Dhaka, Bangladesh",
    status: "Operational",
    href: "/projects/unity-hospital",
  },
  {
    slug: "pro-health-smart-hospital",
    name: "Pro Health Smart Hospital",
    sector: "Healthcare",
    location: "Bangladesh",
    status: "In development",
    href: "/projects/pro-health-smart-hospital",
  },
  {
    slug: "prime-place",
    name: "Prime Place",
    sector: "Real estate",
    location: "Dhaka, Bangladesh",
    status: "In development",
    href: "/projects/prime-place",
  },
  {
    slug: "unity-agro-park",
    name: "Unity Agro Park",
    sector: "Agriculture",
    location: "Bangladesh",
    status: "In development",
    href: "/projects/unity-agro-park",
  },
  {
    slug: "diligence-universal",
    name: "Diligence Universal",
    sector: "Diversified group",
    location: "Bangladesh",
    status: "Operational",
    href: "/projects/diligence-universal",
  },
];
