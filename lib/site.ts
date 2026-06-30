/**
 * Site-wide constants. Keep the NAP (name/address/phone) identical here,
 * on Google Business Profile, and in any directory citations — consistency
 * matters for local SEO.
 */
export const siteConfig = {
  name: "Alive Spectra Ltd.",
  shortName: "Alive Spectra",
  tagline: "Changing the way of thinking",
  url: "https://alivespectra.com",
  description:
    "Alive Spectra refracts one idea into a full spectrum of execution — strategy, capital, technology, and a ready-built ecosystem. Business consultancy in Gulshan-1, Dhaka, since 2007.",
  founded: 2007,
  founder: "Abdur Razzaq Mamun",
  contact: {
    email: "support@alivespectra.com",
    phones: ["+880 1919-666630", "+880 1939-903964"],
    address: {
      line: "House 60, Road 28, Gulshan-1",
      city: "Dhaka",
      postalCode: "1212",
      country: "BD",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
