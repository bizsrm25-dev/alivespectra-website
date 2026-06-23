import type { Metadata } from "next";
import { clashDisplay, hankenGrotesk, spaceMono } from "./fonts";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
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
      className={`${clashDisplay.variable} ${hankenGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
