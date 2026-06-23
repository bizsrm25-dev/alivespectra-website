import { cn } from "@/lib/utils";

type HairlineProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

export function Hairline({
  orientation = "horizontal",
  className,
}: HairlineProps) {
  return (
    <span
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "block bg-line",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
    />
  );
}
