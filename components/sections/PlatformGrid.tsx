import {
  siSpotify,
  siApplepodcasts,
  siYoutube,
  siYoutubemusic,
  siAudible,
  siIheartradio,
  siDeezer,
  siOvercast,
  siPocketcasts,
  siCastbox,
  siPodcastaddict,
  siPandora,
  siCastro,
  siPlayerfm,
  siRss,
  siPodcastindex,
} from "simple-icons";
import { site, type ListenCell } from "@/content/site";
import SectionFrame from "@/components/ui/SectionFrame";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Icon paths come from simple-icons (imported individually so the bundle only
 * includes what is used). No logo path is hand-drawn or traced here.
 */
const icons: Record<string, { path: string }> = {
  spotify: siSpotify,
  applepodcasts: siApplepodcasts,
  youtube: siYoutube,
  youtubemusic: siYoutubemusic,
  audible: siAudible,
  iheartradio: siIheartradio,
  deezer: siDeezer,
  overcast: siOvercast,
  pocketcasts: siPocketcasts,
  castbox: siCastbox,
  podcastaddict: siPodcastaddict,
  pandora: siPandora,
  castro: siCastro,
  playerfm: siPlayerfm,
  rss: siRss,
  podcastindex: siPodcastindex,
};

function PlatformIcon({ cell }: { cell: ListenCell }) {
  /* Newsletter is a generic hand-drawn envelope — it is not a brand mark. */
  if (cell.id === "newsletter") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-4 w-4 shrink-0 lg:h-5 lg:w-5"
      >
        <rect x="2.5" y="4.75" width="19" height="14.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.5 6.5L12 12.75L20.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  const icon = cell.iconSlug ? icons[cell.iconSlug] : undefined;
  if (!icon) return null; // text-only fallback for missing icons
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 lg:h-5 lg:w-5"
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

/**
 * Tiny 3px corner tick, inset 10px from the bottom corners, ~40% opacity
 * (detail from the reference grid).
 */
function CornerTicks() {
  return (
    <>
      <span aria-hidden="true" className="absolute bottom-[10px] left-[10px] h-[3px] w-[3px] rounded-full bg-[#6F6E6B]/40" />
      <span aria-hidden="true" className="absolute bottom-[10px] right-[10px] h-[3px] w-[3px] rounded-full bg-[#6F6E6B]/40" />
    </>
  );
}

function GridCell({ cell, className = "" }: { cell: ListenCell; className?: string }) {
  return (
    <a
      href={cell.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative flex aspect-[2/1] min-h-[clamp(64px,6.2vw,120px)] w-full min-w-0 items-center justify-center bg-bg px-2 text-quiet hover:bg-white/60 hover:text-ink focus-visible:bg-white/60 focus-visible:text-ink focus-visible:[outline:2px_solid_var(--accent)] focus-visible:[outline-offset:-2px] motion-safe:transition-[background-color,color] motion-safe:duration-[250ms] lg:px-4 ${className}`}
    >
      <CornerTicks />
      <span className="flex items-center gap-1.5 lg:gap-2">
        <PlatformIcon cell={cell} />
        <span className="font-normal leading-none tracking-normal whitespace-nowrap text-[clamp(9px,2.2vw,15px)] lg:text-[clamp(11px,1.1vw,15px)]">
          {cell.name}
          <span className="sr-only"> (opens in a new tab)</span>
        </span>
      </span>
    </a>
  );
}

/**
 * "Where to listen" platform grid (motion spec section 4):
 * - Shared frame (SectionFrame): top rule, vertical hairlines, dotted band.
 * - 6 columns x 3 rows + final row (label spans 3 cells + 3 cells) = 21 cells.
 *   Cells are 2:1 (min-height clamp(64px,6.2vw,120px)); the final row is
 *   slightly taller. 1px hairlines between every cell (gap-px over the shared
 *   hairline color). 3px corner ticks inset 10px at 40% opacity.
 * - Every cell: real listening platform — simple-icons mark + name, one quiet
 *   gray (--quiet, #6F6E6B, AA on --bg), never competing with the hero.
 * - No hover popovers or modals on the platform grid. Hover/focus only
 *   transitions the cell to ink text on rgba(255,255,255,0.6); no transition
 *   under prefers-reduced-motion.
 * - First row peeks in at the bottom edge of the first screen, under the hero.
 * - 3 columns below lg (so 3 columns at 375px).
 */
export default function PlatformGrid() {
  const cells = site.listen.cells;

  return (
    <SectionFrame
      id="listen"
      label="Where to listen"
      className="pb-[clamp(32px,3vw,48px)]"
    >
      <div className="pt-[calc(var(--dot-band-height)+16px)]">
        {/* Section label (copy file) — a real H2 for the document outline.
            Set at the standard section-H2 scale so it matches the rest of the page;
            the 48px gap gives the grid's first rule room under the heading. */}
        <SectionHeading
          line1={site.listen.label}
          align="center"
          className="mb-12"
        />

        {/* The cell rules are decoration, so the grid cancels the content inset
            and runs to the frame verticals. Cell contents stay centred. */}
        <div className="-mx-[var(--frame-inset)] grid grid-cols-3 gap-px border-y border-hairline bg-hairline lg:grid-cols-6">
          {/* Rows 1-3 (cells 1-18) */}
          {cells.slice(0, 18).map((cell) => (
            <GridCell key={cell.id} cell={cell} />
          ))}

          {/* Final wider row: label spanning 3 cells, slightly taller */}
          <div className="relative col-span-3 flex min-h-[clamp(72px,7vw,136px)] items-center justify-center bg-bg px-[var(--frame-inset)]">
            <CornerTicks />
            <p className="text-center text-[13px] text-muted">{site.listen.countriesLine}</p>
          </div>

          {/* Final row — last 3 cells */}
          {cells.slice(18).map((cell) => (
            <GridCell
              key={cell.id}
              cell={cell}
              className="aspect-auto min-h-[clamp(72px,7vw,136px)]"
            />
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
