import { siteConfig } from "@/lib/site";

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
