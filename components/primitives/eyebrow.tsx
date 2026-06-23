import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  /** wavelength index, e.g. "01" renders "λ 01 — " */
  marker?: string;
  /** CSS color for the label; defaults to teal, can sample a spectrum hue */
  accent?: string;
  className?: string;
};

export function Eyebrow({
  children,
  marker,
  accent = "var(--teal)",
  className,
}: EyebrowProps) {
  return (
    <p className={cn("t-eyebrow", className)} style={{ color: accent }}>
      {marker ? <span aria-hidden>λ {marker} — </span> : null}
      {children}
    </p>
  );
}
