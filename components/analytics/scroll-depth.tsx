"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const MARKS = [25, 50, 75, 100];

/** Fires a `scroll_depth` event once at each 25/50/75/100% threshold. */
export function ScrollDepth() {
  useEffect(() => {
    const fired = new Set<number>();
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;
      const pct = (el.scrollTop / max) * 100;
      for (const m of MARKS) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          track("scroll_depth", { percent: m });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
