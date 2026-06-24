import Link from "next/link";

type Crumb = { label: string; href?: string };

export function Breadcrumb({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="t-mono flex flex-wrap items-center gap-2 text-xs text-ink/60">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link href={item.href} className="hover:text-pine">
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  className="text-ink"
                >
                  {item.label}
                </span>
              )}
              {!last ? (
                <span aria-hidden className="text-line">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
