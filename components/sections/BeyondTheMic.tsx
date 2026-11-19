import { site } from "@/content/site";
import type { ProgramCard } from "@/content/site";
import SectionFrame from "@/components/ui/SectionFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const { beyondTheMic } = site;

const chevron = (
  <svg width="6" height="9" viewBox="0 0 6 9" fill="none" aria-hidden="true">
    <path
      d="M1 1l3.5 3.5L1 8"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** 20px stroke glyphs (envelope, download, conversation). Not brand marks. */
const icons: Record<ProgramCard["icon"], React.ReactNode> = {
  mail: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.75" y="4.75" width="14.5" height="10.5" rx="1.4" stroke="currentColor" strokeWidth="1.1" />
      <path d="M3.4 5.6L10 10.2l6.6-4.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  download: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3v7.4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M6.9 7.7L10 10.8l3.1-3.1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 12.9v2.3a1.3 1.3 0 001.3 1.3h9.4a1.3 1.3 0 001.3-1.3v-2.3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
  chat: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.6 4.2h10.8a1.4 1.4 0 011.4 1.4v5.6a1.4 1.4 0 01-1.4 1.4H9.3l-3.4 2.6v-2.6h-1.3a1.4 1.4 0 01-1.4-1.4V5.6a1.4 1.4 0 011.4-1.4z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M6.6 8.6h6.8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M6.6 10.9h4.3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
};

/**
 * "Beyond the mic" (copy file section 7, motion spec section 7): a program
 * directory, not a second card grid. Phase 5 already owns the three-up
 * editorial cards, so this section changes rhythm instead of repeating it —
 * heading held in a left column, three hairline-separated rows on the right.
 * Each row: stamped glyph, tag, title, short body, action at the far right.
 * Card ids stay as real anchors for the nav, Phase 5 and the closing CTA.
 */
export default function BeyondTheMic() {
  return (
    <SectionFrame
      id="beyond"
      label="Beyond the mic"
      className="pb-[clamp(48px,5vw,80px)] pt-[calc(var(--dot-band-height)+16px)]"
    >
      <div className="grid gap-y-12 xl:grid-cols-12 xl:gap-x-0">
        {/* Left: the section title holds the column; the list does the work.
            48px between heading and list — column gap on wide screens,
            row gap when the two columns stack. */}
        <Reveal className="xl:col-span-5 xl:pr-12">
          <SectionHeading
            line1={beyondTheMic.heading.line1}
            line2={beyondTheMic.heading.line2}
          />
        </Reveal>

        {/* Right: program rows, divided from the title column by one hairline. */}
        <ul className="divide-y divide-line border-y border-line xl:col-span-7 xl:border-l xl:border-hairline xl:pl-12">
          {beyondTheMic.cards.map((card, i) => (
            <li key={card.id} id={card.id} className="scroll-mt-20">
              <Reveal delay={i * 0.1}>
                <div className="grid grid-cols-[44px_1fr] items-start gap-x-4 gap-y-3 py-10 sm:grid-cols-[44px_1fr_auto] sm:items-center sm:gap-x-[clamp(16px,1.8vw,28px)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-line bg-surface text-ink">
                    {icons[card.icon]}
                  </span>

                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-quiet">
                      {card.tag}
                    </p>
                    <h3 className="mt-1.5 text-[clamp(17px,1.35vw,20px)] font-semibold leading-[1.3] tracking-[-0.01em] text-ink">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 max-w-[46ch] text-[14.5px] leading-[1.6] text-quiet">
                      {card.body}
                    </p>
                  </div>

                  <a
                    href={card.link.href}
                    className="col-start-2 inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-ink transition-colors duration-200 hover:text-accent sm:col-start-3 sm:self-center"
                  >
                    {card.link.label}
                    {chevron}
                  </a>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </SectionFrame>
  );
}
