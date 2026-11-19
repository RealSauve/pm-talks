import { site } from "@/content/site";
import SectionFrame from "@/components/ui/SectionFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const { episodes, topics } = site;

/** Small generic UI glyphs (play, share, arrow) — not brand marks. */
const playGlyph = (
  <svg width="9" height="10" viewBox="0 0 9 10" fill="none" aria-hidden="true">
    <path d="M1 1.3L8 5L1 8.7V1.3Z" fill="currentColor" />
  </svg>
);

const shareGlyph = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6 7.5V1.5M6 1.5L3.5 4M6 1.5L8.5 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1.5 6.5V10.5H10.5V6.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * "Latest episodes" (motion spec section 5, copy file section 5):
 * - Heading row: two-tone H2 left, "All episodes" annotation right.
 * - Large white panel (20px radius, soft shadow): topics sidebar + a 3x3 grid
 *   of episode cards, with the now-playing card on the right.
 * Quiet styling: hairline dividers, muted metadata, no decorative motion.
 *
 * There is no episodes index page yet, so "All episodes" and the sidebar
 * topics render as static labels rather than dead #episodes self-links.
 * Wire them to real routes when those pages exist.
 */
export default function LatestEpisodes() {
  return (
    <SectionFrame
      id="episodes"
      label="Latest episodes"
      halo
      haloClassName="right-0 top-[34px] h-[clamp(200px,20vw,280px)] w-[clamp(280px,34vw,520px)]"
    >
      <div className="pb-[clamp(32px,3vw,48px)] pt-[calc(var(--dot-band-height)+16px)]">
        {/* Heading row */}
        <Reveal>
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
            <SectionHeading line1={episodes.heading.line1} line2={episodes.heading.line2} />

            <span className="shrink-0 text-[13px] text-quiet">{episodes.link.label}</span>
          </div>
        </Reveal>

        {/* Large near-white panel (24-32px radius, hairline border, soft shadow) */}
        <Reveal delay={0.1}>
          <div className="shadow-soft mt-[clamp(48px,5vw,80px)] rounded-[28px] border border-black/5 bg-surface p-[clamp(14px,1.8vw,24px)]">
            <div className="flex flex-col gap-5 lg:flex-row lg:gap-[clamp(16px,1.8vw,28px)]">
              {/* Topics sidebar (desktop) — static preview, not links yet */}
              <div className="hidden w-[164px] shrink-0 lg:block">
                <p className="text-[10.5px] uppercase tracking-[0.12em] text-quiet">Topics</p>
                <ul className="mt-3">
                  <li>
                    <span className="flex h-8 items-center gap-2 text-[13px] text-ink">
                      <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                      {episodes.library.allLabel}
                    </span>
                  </li>
                  {topics.tabs.map((tab) => (
                    <li key={tab.label}>
                      <span className="flex h-8 items-center gap-2 pl-3 text-[13px] text-quiet">
                        {tab.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card grid */}
              <div className="min-w-0 flex-1">
                {/* Topic row on smaller screens */}
                <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 lg:hidden">
                  <span className="text-[12px] text-ink">{episodes.library.allLabel}</span>
                  {topics.tabs.map((tab) => (
                    <span key={tab.label} className="text-[12px] text-quiet">
                      {tab.label}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {episodes.library.cards.map((card) => (
                    <div key={card.title} className="rounded-[6px] bg-bg px-3 py-3.5">
                      <p className="text-[10.5px] uppercase leading-none tracking-[0.1em] text-quiet">
                        {card.topic}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-[1.45] text-ink line-clamp-2">
                        {card.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Now playing */}
              <aside className="w-full shrink-0 rounded-[10px] border border-line p-4 lg:w-[264px]">
                <p className="text-[10.5px] uppercase leading-none tracking-[0.12em] text-quiet">
                  {episodes.player.label}
                </p>

                <div className="mt-3 flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px] bg-gradient-to-b from-blush-top to-blush-bottom">
                    <span className="font-serif text-[15px] italic leading-none text-ink/55">pm</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] leading-snug text-ink line-clamp-2">{episodes.player.title}</p>
                    <p className="mt-1 text-[11.5px] leading-snug text-quiet">{episodes.player.guest}</p>
                  </div>
                </div>

                {/* Controls (preview only — decorative) */}
                <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
                  <span
                    title={episodes.player.controls[0]}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-white"
                  >
                    {playGlyph}
                  </span>
                  <span
                    title={episodes.player.controls[1]}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-[10px] font-medium leading-none text-quiet"
                  >
                    15
                  </span>
                  <span
                    title={episodes.player.controls[2]}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-[10px] font-medium leading-none text-quiet"
                  >
                    30
                  </span>
                  <span
                    title={episodes.player.controls[3]}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-[10px] font-medium leading-none text-quiet"
                  >
                    1×
                  </span>
                  <span
                    title={episodes.player.controls[4]}
                    className="ml-1 flex h-7 w-7 items-center justify-center text-quiet"
                  >
                    {shareGlyph}
                  </span>
                </div>

                {/* Chapters */}
                <ul className="mt-4 border-t border-line pt-3">
                  {episodes.player.chapters.map((chapter) => (
                    <li
                      key={chapter.time}
                      className="flex items-baseline justify-between gap-3 py-1 text-[11.5px] leading-snug"
                    >
                      <span className="shrink-0 text-quiet">{chapter.time}</span>
                      <span className="truncate text-ink/75">{chapter.title}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionFrame>
  );
}
