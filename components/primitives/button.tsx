import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-sharp px-5 py-2.5 font-sans text-sm font-medium transition-[background-color,border-color,transform] [transition-duration:var(--dur-quick)] hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:pointer-events-none disabled:opacity-50";

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

/**
 * Renders a `<button>`, or a Next `<Link>` when `href` is set (so internal
 * navigation is client-side and prefetched; external/hash hrefs still work).
 */
export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);
  if (props.href !== undefined) {
    return (
      <Link
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement> & {
          href: string;
        })}
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
