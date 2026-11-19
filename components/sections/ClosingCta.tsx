import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { FrameContent, SectionDecor } from "@/components/ui/SectionFrame";
import { site } from "@/content/site";

const { closingCta } = site;

/**
 * Phase 8 — closing CTA (copy file section 9, motion spec section 9).
 *
 * A quiet close after the dark stories section: centered two-tone serif line,
 * one sentence of body, two separated buttons (gray fill, then white).
 *
 * The structural layer is the shared one (SectionDecor): full-bleed top rule,
 * frame verticals, dotted band. This section adds only its own blue glow, held
 * behind the decor, and closes the copy in a hairline band.
 *
 * The heading is split across two lines for the display treatment; the words
 * are exactly the copy file's. Buttons link to the program rows / sponsor
 * anchor until real destinations exist.
 */
export default function ClosingCta() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-bg py-[clamp(40px,4.6vw,64px)]"
    >
      {/* Blue glow from the bottom edge + white focal wash (globals.css) */}
      <div aria-hidden="true" className="cta-glow pointer-events-none absolute inset-0 z-0" />

      <SectionDecor />

      <FrameContent>
        {/* The band rules are decoration: they cancel the content inset and
            meet the frame verticals. Only the copy stays inset. */}
        <div className="-mx-[var(--frame-inset)] border-y border-hairline px-[var(--frame-inset)] py-[clamp(44px,5.2vw,78px)]">
          <Reveal className="text-center">
            <SectionHeading
              id="cta-heading"
              line1={closingCta.heading.line1}
              line2={closingCta.heading.line2}
              align="center"
            />

            <p className="mx-auto mt-[clamp(12px,1.4vw,18px)] max-w-[44ch] text-[15px] leading-[1.6] text-balance text-quiet">
              {closingCta.body}
            </p>

            {/* Equal-width pair with a small gap: gray fill first, white second. */}
            <div className="mt-[clamp(26px,2.8vw,38px)] flex justify-center gap-[clamp(12px,1vw,16px)]">
              {closingCta.buttons.map((button) => (
                <Button
                  key={button.label}
                  variant={button.variant}
                  size="cta"
                  href={button.href}
                  className={
                    button.variant === "solid-white" ? "hover:bg-bg" : "hover:bg-line"
                  }
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </Reveal>
        </div>
      </FrameContent>
    </section>
  );
}
