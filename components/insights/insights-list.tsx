"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/insights";
import { cn, formatDate } from "@/lib/utils";

export function InsightsList({
  posts,
  tags,
}: {
  posts: Post[];
  tags: string[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const shown = active ? posts.filter((p) => p.tags.includes(active)) : posts;

  const chip = (on: boolean) =>
    cn(
      "rounded-sharp border px-3 py-1 font-mono text-xs transition-colors",
      on
        ? "border-pine bg-pine text-paper"
        : "border-line text-ink/70 hover:text-pine",
    );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive(null)}
          className={chip(active === null)}
        >
          All
        </button>
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t)}
            className={chip(active === t)}
          >
            {t}
          </button>
        ))}
      </div>

      <ul className="flex flex-col">
        {shown.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/insights/${p.slug}`}
              className="group flex flex-col gap-2 border-t border-line py-7"
            >
              <span className="t-mono text-xs text-ink/50">
                {formatDate(p.date)} · {p.readingTime} min read
              </span>
              <span className="t-h3 text-ink transition-colors group-hover:text-pine">
                {p.title}
              </span>
              <span className="t-body max-w-prose text-ink/65">
                {p.excerpt}
              </span>
              <span className="flex flex-wrap gap-3 pt-1">
                {p.tags.map((t) => (
                  <span key={t} className="t-mono text-xs text-teal">
                    #{t}
                  </span>
                ))}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
