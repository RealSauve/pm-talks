interface SectionHeadingProps {
  id?: string;
  line1: string;
  /** Optional second clause. When omitted the heading stays on one line. */
  line2?: string;
  /** "light" for light sections (ink / muted), "dark" for dark sections (near-white / dark-muted). */
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

/**
 * Section H2 (AGENTS.md typography): Instrument Serif 400,
 * clamp(24px, 2.1vw, 34px), line-height 1.15.
 * Line 1 in --ink (or near-white on dark); an optional line 2 is italic in
 * --muted (or --dark-muted). Geist stays for all non-display type.
 */
export default function SectionHeading({
  id,
  line1,
  line2,
  tone = "light",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const toneClass =
    tone === "light"
      ? "text-ink [&_span]:text-muted"
      : "text-white [&_span]:text-dark-muted";

  return (
    <h2
      id={id}
      className={`font-serif text-[clamp(24px,2.1vw,34px)] font-normal leading-[1.15] text-balance ${
        align === "center" ? "text-center" : ""
      } ${toneClass} ${className}`}
    >
      {line1}
      {line2 ? (
        <>
          <br />
          <span className="italic">{line2}</span>
        </>
      ) : null}
    </h2>
  );
}
