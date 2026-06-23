import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TagProps = { className?: string; children: ReactNode };

export function Tag({ className, children }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sharp border border-line px-2.5 py-1 font-mono text-xs text-ink/80",
        className,
      )}
    >
      {children}
    </span>
  );
}
