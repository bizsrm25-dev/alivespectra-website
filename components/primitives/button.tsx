import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sharp px-5 py-2.5 font-sans text-sm font-medium transition-colors [transition-duration:var(--dur-quick)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-pine text-paper hover:bg-pine-2",
  ghost: "border border-line bg-transparent text-ink hover:bg-paper-2",
} as const;

type Variant = keyof typeof variants;

type ButtonProps =
  | ({
      variant?: Variant;
      href: string;
    } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({
      variant?: Variant;
      href?: undefined;
    } & ButtonHTMLAttributes<HTMLButtonElement>);

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);
  if (props.href !== undefined) {
    return (
      <a
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }
  return (
    <button
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
