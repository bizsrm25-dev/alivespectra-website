"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/data/navigation";
import { Button } from "@/components/primitives";
import { cn, isNavActive } from "@/lib/utils";

/**
 * Full-screen mobile menu. Always mounted so it can transition in/out via CSS
 * (opacity + per-item rise/stagger); `inert` keeps it out of tab order and the
 * a11y tree while closed. Reduced motion is handled by the global CSS safety net.
 */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  // Esc to close + scroll-lock + initial focus while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      inert={!open}
      tabIndex={-1}
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-pine px-[var(--gutter)] pt-24 pb-12 text-paper transition-opacity duration-300 ease-out outline-none",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-6 right-[var(--gutter)] font-mono text-sm text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-soft"
      >
        Close ✕
      </button>

      <nav className="flex flex-col gap-2">
        {mainNav.map((item, i) => {
          const active = isNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              style={{ transitionDelay: open ? `${0.04 * i + 0.05}s` : "0s" }}
              className={cn(
                "t-h2 flex items-center gap-3 py-1 transition-[opacity,transform] duration-500 ease-out",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                active ? "text-paper" : "text-paper/80 hover:text-paper",
              )}
            >
              {active ? (
                <span
                  aria-hidden
                  className="h-5 w-1 rounded-pill"
                  style={{ background: "var(--spectrum)" }}
                />
              ) : null}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-10">
        <Button variant="primary" href="/contact" onClick={onClose}>
          Book a consultation
        </Button>
      </div>
    </div>
  );
}
