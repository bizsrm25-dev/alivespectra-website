import { Container, Eyebrow, Section } from "@/components/primitives";

/**
 * Placeholder review page — no real homepage yet. Stacked tall sections exist
 * only to exercise the shell: the Spectrum Spine's hue shift, spine-accented
 * eyebrows, and the nav's transparent→glass transition. Replace with the hero
 * in the next phase.
 */
const sections = [
  { eyebrow: "Refraction", title: "One idea, refracted into a full spectrum." },
  {
    eyebrow: "Strategy",
    title: "Scroll to watch the spine shift its wavelength.",
  },
  {
    eyebrow: "Capital",
    title: "The nav turns to glass past the first screen.",
  },
  {
    eyebrow: "Ecosystem",
    title: "Shell + spine only — the homepage comes next.",
  },
] as const;

export default function Home() {
  return (
    <>
      {sections.map((s, i) => (
        <Section key={s.eyebrow} tone={i % 2 === 1 ? "pine" : "paper"}>
          <Container className="flex min-h-[80vh] flex-col justify-center gap-4">
            <Eyebrow marker={String(i + 1).padStart(2, "0")} accent="spine">
              {s.eyebrow}
            </Eyebrow>
            <h2
              className={
                i % 2 === 1 ? "t-display text-paper" : "t-display text-pine"
              }
            >
              {s.title}
            </h2>
          </Container>
        </Section>
      ))}
    </>
  );
}
