import { site } from "@/content/site";

/**
 * Top announcement strip: full-width dark translucent (.glass-dark without
 * border), 32px tall, centered text + small play-arrow (motion spec section 2).
 * Collapses on scroll by animating grid-template-rows 1fr -> 0fr.
 */
export default function AnnouncementBar({ hidden }: { hidden: boolean }) {
  return (
    <div
      aria-hidden={hidden}
      inert={hidden}
      className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
      }`}
    >
      <div className="min-h-0">
        <a
          href={site.announcement.href}
          className="glass-dark border-none! flex h-8 w-full items-center justify-center gap-2 text-[13px] tracking-[0.02em] text-white/80 transition-colors duration-200 hover:text-white"
        >
          <span>{site.announcement.text}</span>
          <span>{site.announcement.linkLabel}</span>
          <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true" className="shrink-0">
            <path d="M1.5 0.5L7 4L1.5 7.5V0.5Z" fill="currentColor" />
          </svg>
        </a>
      </div>
    </div>
  );
}
