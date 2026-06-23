import Link from "next/link";
import {
  footerColumns,
  legal,
  sisterConcerns,
  socials,
} from "@/data/navigation";
import { siteConfig } from "@/lib/site";
import { Logo } from "./logo";

export function SiteFooter() {
  const { contact } = siteConfig;
  return (
    <footer className="bg-pine text-paper">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter)] py-[var(--space-section)]">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1.4fr]">
          {/* Brand + NAP */}
          <div className="flex flex-col gap-4">
            <Logo />
            <address className="t-body text-paper/70 not-italic">
              {contact.address.line}
              <br />
              {contact.address.city}-{contact.address.postalCode},{" "}
              {contact.address.country}
            </address>
            <div className="t-mono flex flex-col gap-1 text-paper/70">
              {contact.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/[^+\d]/g, "")}`}
                  className="hover:text-paper"
                >
                  {p}
                </a>
              ))}
              <a href={`mailto:${contact.email}`} className="hover:text-paper">
                {contact.email}
              </a>
            </div>
          </div>

          {/* Sitemap columns */}
          {footerColumns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="t-eyebrow text-teal-soft">{col.title}</p>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="t-body text-paper/80 hover:text-paper"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Ecosystem */}
          <div className="flex flex-col gap-3">
            <p className="t-eyebrow text-teal-soft">Ecosystem</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {sisterConcerns.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="font-sans text-sm text-paper/80 hover:text-paper"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-mono text-paper/50">
            © {new Date().getFullYear()} {siteConfig.name}. {siteConfig.tagline}
            .
          </p>
          <div className="flex flex-wrap gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="t-mono text-paper/60 hover:text-paper"
              >
                {s.label}
              </a>
            ))}
            {legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="t-mono text-paper/60 hover:text-paper"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
