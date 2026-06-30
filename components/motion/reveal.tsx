import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /**
   * Accepted for call-site compatibility. Sequencing is handled globally by the
   * RevealController's batch stagger, so this is intentionally unused here.
   */
  delay?: number;
};

/**
 * Marks a block for the global scroll-reveal, run once and batched by
 * <RevealController/>. With JS off or under reduced motion the content is simply
 * visible — the hidden start state is gated on the `html.gsap` class.
 */
export function Reveal({ children, className }: RevealProps) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
