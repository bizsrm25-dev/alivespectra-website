"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { mainNav } from "@/data/navigation";
import { Button } from "@/components/primitives";
import { cn, isNavActive } from "@/lib/utils";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
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

  const duration = reduced ? 0 : 0.4;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex flex-col bg-pine px-[var(--gutter)] pt-24 pb-12 text-paper outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
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
                <motion.div
                  key={item.href}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration, delay: reduced ? 0 : 0.05 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "t-h2 flex items-center gap-3 py-1 transition-opacity",
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
                </motion.div>
              );
            })}
          </nav>

          <div className="mt-auto pt-10">
            <Button variant="primary" href="/contact" onClick={onClose}>
              Book a consultation
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
