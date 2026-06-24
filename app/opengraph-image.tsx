import { ImageResponse } from "next/og";

export const alt = "Alive Spectra Ltd. — Changing the way of thinking";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded default OG card (pine + spectrum accent). Inherited site-wide.
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0c3a2e",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#6fb3a4",
          fontSize: 24,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        Business consultancy · Dhaka · Since 2007
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            display: "flex",
            color: "#f5f7f6",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          Alive Spectra
        </div>
        <div style={{ display: "flex", color: "#dbe6e1", fontSize: 38 }}>
          Changing the way of thinking.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          height: 14,
          width: "100%",
          borderRadius: 999,
          background:
            "linear-gradient(90deg,#6c4cf1,#2f8fe8,#2fbe7e,#f2a93b,#e5564b)",
        }}
      />
    </div>,
    { ...size },
  );
}
