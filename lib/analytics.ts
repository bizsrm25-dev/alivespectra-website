type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire an analytics event. No-ops safely when GA isn't configured. */
export function track(event: string, params?: Params): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params ?? {});
}
