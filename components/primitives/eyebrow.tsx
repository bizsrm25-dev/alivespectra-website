import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  /** wavelength index, e.g. "01" renders "λ 01 — " */
  marker?: string;
  /**
   * Label color. A CSS color string, or the sentinel "spine" to track the live
   * Spectrum Spine hue (var(--spine-hue)). Defaults to teal.
   */
  accent?: string;
  className?: string;
};

export function Eyebrow({
  children,
  marker,
  accent = "var(--teal)",
  className,
}: EyebrowProps) {
  const color = accent === "spine" ? "var(--spine-hue)" : accent;
  return (
    <p className={cn("t-eyebrow", className)} style={{ color }}>
      {marker ? <span aria-hidden>λ {marker} — </span> : null}
      {children}
    </p>
  );
}
