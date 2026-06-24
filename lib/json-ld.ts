import type { Service } from "@/data/services";
import { siteConfig } from "@/lib/site";

const abs = (path: string) => `${siteConfig.url}${path}`;

const orgRef = {
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
} as const;

/** schema.org Organization graph, derived from the single NAP source. */
export function organizationLd() {
  const { name, url, founder, contact } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    slogan: siteConfig.tagline,
    foundingDate: String(siteConfig.founded),
    founder: { "@type": "Person", name: founder },
    email: contact.email,
    telephone: contact.phones,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.line,
      addressLocality: contact.address.city,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
  };
}

/** ProfessionalService / LocalBusiness graph for local SEO. */
export function localBusinessLd() {
  return {
    ...organizationLd(),
    "@type": "ProfessionalService",
    areaServed: "Bangladesh",
  };
}

/** Service graph for a service detail page. */
export function serviceLd(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.overview,
    serviceType: s.name,
    areaServed: "Bangladesh",
    url: abs(s.href),
    provider: { ...orgRef },
  };
}

/** Person graph for the founder (used on /about). */
export function personLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.founder,
    jobTitle: "Founder & Managing Director",
    worksFor: { ...orgRef },
    url: abs("/about"),
  };
}

/** Article graph for an insights post. */
export function articleLd(a: {
  title: string;
  description: string;
  date: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    author: { "@type": "Person", name: siteConfig.founder },
    publisher: { ...orgRef },
    mainEntityOfPage: abs(a.url),
  };
}

/** BreadcrumbList from ordered { name, url } items (urls are site-relative). */
export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  };
}

/** FAQPage from { q, a } pairs. */
export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
