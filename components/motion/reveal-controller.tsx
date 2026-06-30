"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * One batched scroll-reveal for the whole page. Mounted once in the layout.
 * Adds `gsap` to <html> (so the hidden start state in globals.css only applies
 * when JS runs and motion is allowed), then animates every `.reveal` in with a
 * gentle stagger via a single ScrollTrigger.batch. Re-inits on route change.
 * Under prefers-reduced-motion it does nothing — content stays fully visible.
 */
export function RevealController() {
  const pathname = usePathname();

  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("gsap");

    const ctx = gsap.context(() => {
      gsap.set(".reveal", { y: 16 });
      ScrollTrigger.batch(".reveal", {
        once: true,
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.08,
            overwrite: true,
            onComplete: () =>
              batch.forEach((el) => {
                (el as HTMLElement).style.willChange = "";
              }),
          }),
      });
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [pathname]);

  return null;
}
