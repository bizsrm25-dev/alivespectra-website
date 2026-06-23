"use client";

import type { RefObject } from "react";
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
 * The site's signature: a thin fixed line at the left edge whose hue glides
 * across the visible spectrum as you scroll. Writes the live color into the
 * shared `--spine-hue` variable (sampled by eyebrows). Under reduced motion
 * useGsap no-ops, so the line stays pine.
 */
export function SpectrumSpine() {
  const ref = useGsap(() => {
    const root = document.documentElement;
    const st = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        root.style.setProperty("--spine-hue", colorAtProgress(self.progress));
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
        boxShadow: "0 0 12px 0 var(--spine-hue)",
      }}
    />
  );
}
