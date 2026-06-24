"use client";

import type { RefObject } from "react";
import { useGsap } from "@/lib/use-gsap";
import { cn } from "@/lib/utils";

const RAYS = [
  { x2: 550, y2: 110, color: "var(--spec-violet)" },
  { x2: 550, y2: 162, color: "var(--spec-blue)" },
  { x2: 550, y2: 214, color: "var(--spec-green)" },
  { x2: 550, y2: 266, color: "var(--spec-amber)" },
  { x2: 550, y2: 318, color: "var(--spec-red)" },
];

/**
 * The Refraction visual: a beam enters a prism and fans into the spectrum.
 * Decorative (aria-hidden) — the message lives in the headline and the
 * services section. SSR renders the resolved composition (no CLS, works with no
 * JS); GSAP animates it in on hydrate; useGsap no-ops under reduced motion.
 */
export function RefractionHero({ className }: { className?: string }) {
  const ref = useGsap(({ gsap, scope }) => {
    const q = gsap.utils.selector(scope);
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(q(".as-beam"), { scaleX: 0, svgOrigin: "10 220", duration: 0.6 })
      .from(
        q(".as-prism"),
        { opacity: 0, scale: 0.85, svgOrigin: "300 220", duration: 0.5 },
        "-=0.2",
      )
      .from(
        q(".as-rays"),
        { opacity: 0, scale: 0, svgOrigin: "350 220", duration: 0.8 },
        "-=0.1",
      );
  }, []);

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={cn("w-full", className)}
      aria-hidden
    >
      <svg
        viewBox="0 0 560 440"
        className="h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          className="as-beam"
          x1="10"
          y1="220"
          x2="250"
          y2="220"
          stroke="var(--ink)"
          strokeWidth="2"
          strokeOpacity="0.45"
        />
        <polygon
          className="as-prism"
          points="250,150 250,290 350,220"
          stroke="var(--pine)"
          strokeWidth="2"
          fill="var(--pine)"
          fillOpacity="0.04"
        />
        <g className="as-rays" strokeWidth="2.5" strokeLinecap="round">
          {RAYS.map((r) => (
            <line
              key={r.y2}
              x1="350"
              y1="220"
              x2={r.x2}
              y2={r.y2}
              stroke={r.color}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
