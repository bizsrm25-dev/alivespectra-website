import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-[var(--container-max)]",
  wide: "max-w-[90rem]",
} as const;

type ContainerProps = {
  as?: ElementType;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
};

export function Container({
  as: Tag = "div",
  size = "default",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-[var(--gutter)]",
        sizes[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
