import { siInstagram, siX, siYoutube } from "simple-icons";
import { site } from "@/content/site";
import FooterNewsletter from "@/components/layout/FooterNewsletter";
import BrandLockup from "@/components/ui/BrandLockup";
import { FrameContent, SectionDecor } from "@/components/ui/SectionFrame";

const { footer } = site;

/** Marks come from simple-icons (imported individually, never the barrel). */
const socialIcons = {
  youtube: siYoutube,
  instagram: siInstagram,
  x: siX,
} as const;

/**
 * Phase 9 — footer (copy file section 10, motion spec section 9).
 *
 * The footer uses the same structural layer as the sections above: SectionDecor
 * draws the full-bleed top rule, the centered frame verticals and the dotted
 * band, so the lines continue from the closing CTA without a seam.
 *
 * Inside the frame: a rounded newsletter card, the brand lockup with the
 * tagline and social marks, four link columns separated by hairlines, then the
 * legal row (copyright, disclaimer, legal links) above the giant "PM TALKS"
 * wordmark, cut off by the bottom of the page.
 *
 * Links without a destination yet (`href: null` in content/site.ts) render as
 * plain text, so nothing here is a dead link. No motion beyond link colour.
 */
export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative isolate overflow-hidden bg-footer text-ink"
    >
      <SectionDecor />

      <FrameContent className="pt-[calc(var(--dot-band-height)+16px)]">
        {/* Newsletter card — the real `#newsletter` target */}
        <div className="shadow-soft rounded-[26px] border border-black/5 bg-bg p-[clamp(20px,2.4vw,34px)]">
          <FooterNewsletter />
        </div>

        {/* Brand + destination columns. One hairline between every column. */}
        <div className="mt-[clamp(40px,4.4vw,64px)] grid grid-cols-2 gap-x-[clamp(20px,2.6vw,40px)] gap-y-[clamp(32px,3.6vw,48px)] lg:grid-cols-[minmax(0,1.35fr)_repeat(4,minmax(0,1fr))]">
          {/* Identity column: lockup, tagline, social marks */}
          <div className="col-span-2 flex flex-col lg:col-span-1">
            <BrandLockup size="footer" className="w-fit shrink-0" />

            <p className="mt-[clamp(14px,1.4vw,18px)] max-w-[34ch] text-[13px] leading-[1.6] text-footer-link">
              {site.hero.support}
            </p>

            <ul className="mt-[clamp(20px,2.4vw,32px)] flex items-center gap-[18px] lg:mt-auto lg:pt-10">
              {footer.socials.map((social) => {
                const icon = socialIcons[social.icon];
                const glyph = (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[17px] w-[17px]"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={icon.path} />
                  </svg>
                );

                return (
                  <li key={social.icon} className="flex">
                    {social.href ? (
                      <a
                        href={social.href}
                        aria-label={social.label}
                        className="text-footer-link transition-colors duration-200 hover:text-ink"
                      >
                        {glyph}
                      </a>
                    ) : (
                      <span
                        role="img"
                        aria-label={social.label}
                        className="text-footer-link"
                      >
                        {glyph}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {footer.columns.map((column) => (
            <div
              key={column.title}
              className="lg:border-l lg:border-hairline lg:pl-[clamp(16px,1.6vw,24px)]"
            >
              <h2 className="text-[12.5px] font-medium leading-none text-ink">
                {column.title}
              </h2>
              <ul className="mt-[clamp(14px,1.4vw,18px)] space-y-[clamp(9px,0.9vw,13px)]">
                {column.links.map((link) => (
                  <li key={link.label} className="text-[13px] leading-[1.4]">
                    {link.href ? (
                      <a
                        href={link.href}
                        className="text-footer-link transition-colors duration-200 hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <span className="text-footer-link">{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom legal row. The divider is decoration and runs to the frame
            lines; the text stays inside the inset. */}
        <div className="-mx-[var(--frame-inset)] mt-[clamp(40px,4.6vw,68px)] border-t border-hairline">
          <div className="flex flex-col gap-[clamp(16px,1.8vw,24px)] px-[var(--frame-inset)] pt-[clamp(22px,2.4vw,30px)] md:flex-row md:items-start md:justify-between">
            <div className="max-w-[62ch]">
              <p className="text-[12.5px] leading-[1.5] text-ink">{footer.copyright}</p>
              <p className="mt-1 text-[11.5px] leading-[1.6] text-footer-link">
                {footer.disclaimer}
              </p>
            </div>

            <ul className="flex flex-wrap items-center gap-x-[clamp(16px,1.8vw,26px)] gap-y-2">
              {footer.legal.map((link) => (
                <li key={link.label} className="text-[12.5px] leading-[1.4]">
                  {link.href ? (
                    <a
                      href={link.href}
                      className="text-footer-link transition-colors duration-200 hover:text-ink"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span className="text-footer-link">{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FrameContent>

      {/* Giant wordmark: inside the content column, only the top half shows and
          the page edge cuts the rest (motion spec section 9). The wrapper's
          height is 0.39em, so roughly half the cap height stays visible. */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative z-10 mx-auto mt-[clamp(36px,4.4vw,68px)] h-[0.39em] w-full max-w-frame select-none overflow-hidden text-[clamp(48px,22vw,420px)]"
      >
        <span className="absolute inset-x-0 top-0 block whitespace-nowrap text-center font-serif leading-[0.78] tracking-[-0.02em] text-ghost">
          {footer.wordmark}
        </span>
      </div>
    </footer>
  );
}
