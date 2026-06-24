"use client";

import type { RefObject } from "react";
import { useReducedMotion } from "motion/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsap } from "@/lib/use-gsap";

const STOPS = ["#6c4cf1", "#2f8fe8", "#2fbe7e", "#f2a93b", "#e5564b"];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function colorAtProgress(p: number): string {
  const clamped = Math.min(Math.max(p, 0), 1);
  const span = STOPS.length - 1;
  const seg = Math.min(Math.floor(clamped * span), span - 1);
  const t = clamped * span - seg;
  const a = hexToRgb(STOPS[seg]);
  const b = hexToRgb(STOPS[seg + 1]);
  const mix = a.map((c, i) => Math.round(c + (b[i] - c) * t));
  return `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`;
}

/**
 * The site's signature: a thin fixed line at the left edge. A glowing "comet"
 * node rides the scroll position (a progress indicator — endorsed by the craft
 * animation rules) while its hue glides across the spectrum, written to the
 * shared `--spine-hue` (sampled by eyebrows). Under reduced motion: a static
 * pine hairline, no comet.
 */
export function SpectrumSpine() {
  const reduced = useReducedMotion();

  const ref = useGsap(({ gsap, scope }) => {
    const root = document.documentElement;
    // One-shot draw-in.
    gsap.from(scope, {
      scaleY: 0,
      transformOrigin: "top center",
      duration: 0.7,
      ease: "power2.out",
    });
    const st = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        root.style.setProperty("--spine-hue", colorAtProgress(self.progress));
        root.style.setProperty("--spine-progress", String(self.progress));
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      aria-hidden
      className="pointer-events-none fixed top-0 bottom-0 left-[clamp(12px,2vw,28px)] z-40 w-0.5"
      style={{
        background: "var(--spine-hue)",
        opacity: 0.4,
      }}
    >
      {!reduced ? (
        <span
          className="absolute left-1/2 h-24 w-px -translate-x-1/2 rounded-full"
          style={{
            top: 0,
            transform:
              "translate(-50%, calc(var(--spine-progress, 0) * (100vh - 6rem)))",
            background:
              "linear-gradient(to bottom, transparent, var(--spine-hue), transparent)",
            boxShadow: "0 0 18px 2px var(--spine-hue)",
          }}
        />
      ) : null}
    </div>
  );
}
