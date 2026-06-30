import type { Metadata } from "next";
import { clashDisplay, hankenGrotesk, spaceMono } from "./fonts";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { RevealController } from "@/components/motion/reveal-controller";
import { SpectrumSpine, SiteHeader, SiteFooter } from "@/components/shell";
import { Analytics } from "@/components/analytics/analytics";
import { ScrollDepth } from "@/components/analytics/scroll-depth";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alivespectra.com"),
  title: {
    default: "Alive Spectra Ltd. — Changing the way of thinking",
    template: "%s · Alive Spectra Ltd.",
  },
  description:
    "Alive Spectra refracts one idea into a full spectrum of execution — strategy, capital, technology, and a ready-built ecosystem. Business consultancy in Gulshan-1, Dhaka, since 2007.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${hankenGrotesk.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col font-sans">
        <a
          href="#content"
          className="sr-only rounded-sharp focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-pine focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <RevealController />
          <SpectrumSpine />
          <SiteHeader />
          <main id="content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </SmoothScroll>
        <Analytics />
        <ScrollDepth />
      </body>
    </html>
  );
}
