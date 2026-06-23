import { cn } from "@/lib/utils";

/**
 * The prism-swoosh mark (from brand/Main Logo), inlined as SVG with namespaced
 * gradient ids so multiple instances on one page don't collide. The SVG is
 * decorative; the link that wraps it carries the accessible name.
 */
export function Logo({
  withWordmark = true,
  className,
}: {
  withWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 464.73 515.26"
        className="h-7 w-auto"
        aria-hidden
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="as-grad-1"
            x1="405.93"
            y1="382.59"
            x2="107.79"
            y2="189.92"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#dd2428" />
            <stop offset="0.4" stopColor="#e8e61a" />
            <stop offset="0.58" stopColor="#06a64f" />
            <stop offset="0.77" stopColor="#20a0db" />
            <stop offset="1" stopColor="#822d8c" />
          </linearGradient>
          <linearGradient
            id="as-grad-2"
            x1="78.22"
            y1="486.73"
            x2="425.03"
            y2="354.9"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="as-grad-3"
            x1="76.29"
            y1="236.08"
            x2="243.61"
            y2="11.97"
            xlinkHref="#as-grad-2"
          />
        </defs>
        <path
          fill="url(#as-grad-1)"
          d="M48.37,261.63c-37.62,80.41,87,47.59,194.06,46s159.42,45.21,159.42,45.21S476.72,323.81,452,270.4s-117.62-43.3-197.38-51.35-96.79-65.23-96.79-65.23S86,181.22,48.37,261.63"
        />
        <path
          fill="#00a76d"
          d="M452,270.4s32.35,66.81-6,117-168.6,105.37-278.36,123.4-157.11-20.56-166-70.51,20.2-55.5,62.24-51,119.31,8.58,206.52-1.7,213-53.1,181.6-117.17"
        />
        <path
          fill="url(#as-grad-2)"
          opacity="0.5"
          d="M270.86,391.7c-7.13.83-14.4,1.6-21.63,2.28a982.09,982.09,0,0,1-113.09,3.91c-33.4-.75-35.95,115.92,6.23,112,7.87-.73,16.14-1.81,24.58-3.2,113.2-18.6,239.47-74.39,275.74-121.83,19.78-25.87,19.77-56.73,15.64-79.5a53,53,0,0,1-4.64,9.5c-25.16,41-112.42,68.58-182.83,76.88"
        />
        <path
          fill="#00a56d"
          d="M41.41,285.21s.15-11.42,17.37-55.59C79,177.83,125.69,103,189.67,30.44c74-84,138.25,30.08,151.6,52.11S402.58,172.37,405.7,183c5.71,19.57-102.74-56.27-177-51.85-72.6,4.33-164.23,76.74-187.32,154"
        />
        <path
          fill="url(#as-grad-2)"
          opacity="0.5"
          d="M279.71,15.68C267.8,7.84,254.61,3.06,240.58,4.37c-16.2,1.52-32.28,11.21-47.79,28.82C134.19,99.68,84.32,175.53,62.65,231.13c-.56,1.43-1.1,2.83-1.62,4.19C88.55,194.14,132.29,158,177,139.67c13-33,41.87-85,102.76-124"
        />
      </svg>
      {withWordmark ? (
        <span className="t-h4 font-semibold tracking-tight">Alive Spectra</span>
      ) : null}
    </span>
  );
}
