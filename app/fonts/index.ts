import { Hanken_Grotesk, Space_Mono } from "next/font/google";
import localFont from "next/font/local";

/**
 * Display — Clash Display (Fontshare), self-hosted from ./clash-display.
 * Used with restraint at large sizes (headlines, section openers).
 * Exposed as the `--font-clash-display` CSS variable → `font-display` utility.
 */
export const clashDisplay = localFont({
  src: [
    {
      path: "./clash-display/ClashDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./clash-display/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./clash-display/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./clash-display/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/**
 * Body — Hanken Grotesk (Google Fonts), self-hosted by next/font at build time.
 * Warm, highly legible at small sizes. → `--font-hanken-grotesk` / `font-sans`.
 */
export const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});

/**
 * Utility / data / eyebrows — Space Mono (Google Fonts).
 * For wavelength labels ("λ 01 — FUNDING"), stats, breadcrumbs.
 * → `--font-space-mono` / `font-mono`.
 */
export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});
