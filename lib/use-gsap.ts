"use client";

import { useEffect, useRef, type DependencyList } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Run GSAP work scoped to a ref, with automatic cleanup via gsap.context().
 * No-ops under prefers-reduced-motion. Foundation for the Spectrum Spine.
 */
export function useGsap(
  callback: (ctx: { gsap: typeof gsap; scope: HTMLElement }) => void,
  deps: DependencyList = [],
) {
  const scopeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => callback({ gsap, scope }), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}
