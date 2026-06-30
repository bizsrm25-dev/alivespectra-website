"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/navigation";
import { Button } from "@/components/primitives";
import { cn, isNavActive } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Glass once scrolled ~60% of a viewport past the top (past the hero).
  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          scrolled
            ? "border-b border-line bg-paper/70 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[var(--container-max)] items-center justify-between px-[var(--gutter)]">
          <Link
            href="/"
            aria-label="Alive Spectra — home"
            className="rounded-sharp focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
          >
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {mainNav.map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative font-sans text-sm transition-colors",
                    active ? "text-pine" : "text-ink/80 hover:text-pine",
                  )}
                >
                  {item.label}
                  {active ? (
                    <span
                      aria-hidden
                      className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-pill"
                      style={{ background: "var(--spectrum)" }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              href="/contact"
              className="hidden sm:inline-flex"
            >
              Book a consultation
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="font-mono text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal lg:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu">
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  );
}
