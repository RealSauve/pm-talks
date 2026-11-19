import type { ReactNode } from "react";

interface SectionDecorProps {
  /** Soft dotted patch behind a floating card on the right. Hidden below md. */
  halo?: boolean;
  /** Position/size classes for the halo, relative to the frame. */
  haloClassName?: string;
}

/**
 * The shared structural layer: one full-bleed top hairline, the centered frame
 * with vertical hairlines at its edges, and the dotted band under the top rule.
 * Everything here is decorative — pointer-events are off and it sits at z-0,
 * behind the section content. The frame lines never get padded.
 *
 * Sections stack directly, so each frame's bottom edge meets the next frame's
 * top edge and the verticals read as one continuous line. The top rule spans
 * the viewport and crosses those verticals at exactly their x position.
 */
export function SectionDecor({ halo = false, haloClassName = "" }: SectionDecorProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      {/* Full-bleed rule at the section top. */}
      <div className="absolute inset-x-0 top-0 h-px bg-hairline" />

      {/* Frame: same inset and max width as the content, so the verticals meet
          the content edges and each other between sections. */}
      <div className="mx-auto h-full w-full max-w-frame px-6 lg:px-0">
        <div className="relative h-full border-x border-hairline">
          {/* Dotted band directly under the top rule, inside the frame. */}
          <div className="dot-band absolute inset-x-0 top-0 h-[var(--dot-band-height)]" />

          {halo && (
            <div className={`dot-halo absolute hidden md:block ${haloClassName}`} />
          )}
        </div>
      </div>
    </div>
  );
}

interface FrameContentProps {
  children: ReactNode;
  /** Vertical spacing classes only. Never add horizontal padding here. */
  className?: string;
}

/**
 * The frame's content column: the same max width and mobile inset as the
 * frame, then the shared `--frame-inset` around its children. Every section,
 * the closing CTA and the footer render through this, so content can never
 * land on the vertical hairlines.
 *
 * Full-width dividers stay edge to edge by cancelling the inset inside their
 * own wrapper (`-mx-[var(--frame-inset)]`), not by changing this component.
 */
export function FrameContent({ children, className = "" }: FrameContentProps) {
  return (
    <div
      className={`relative z-10 mx-auto w-full max-w-frame px-6 lg:px-0 ${className}`}
    >
      <div className="frame-inset">{children}</div>
    </div>
  );
}

interface SectionFrameProps extends SectionDecorProps {
  children: ReactNode;
  id?: string;
  /** Section classes only: background and scroll behaviour. */
  className?: string;
  /** Accessible name when the section has no visible heading of its own. */
  label?: string;
  /** Id of the heading that names the section. */
  labelledBy?: string;
}

/**
 * Every light section on the page renders through this wrapper, so the lines,
 * dots and content inset come from one implementation.
 */
export default function SectionFrame({
  children,
  id,
  className = "",
  label,
  labelledBy,
  halo,
  haloClassName,
}: SectionFrameProps) {
  return (
    <section
      id={id}
      aria-label={label}
      aria-labelledby={labelledBy}
      className={`relative isolate ${className}`}
    >
      <SectionDecor halo={halo} haloClassName={haloClassName} />
      <FrameContent>{children}</FrameContent>
    </section>
  );
}
