import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  paper: "bg-paper text-ink",
  pine: "bg-pine text-paper",
} as const;

type SectionProps = {
  as?: ElementType;
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
};

/**
 * Vertical rhythm comes from a single `--space-section` padding source — no
 * competing per-element paddings, so section spacing never cancels out.
 */
export function Section({
  as: Tag = "section",
  tone = "paper",
  className,
  children,
}: SectionProps) {
  return (
    <Tag className={cn("py-[var(--space-section)]", tones[tone], className)}>
      {children}
    </Tag>
  );
}
