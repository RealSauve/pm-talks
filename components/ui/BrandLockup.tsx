import Image from "next/image";

type Tone = "light" | "dark";

interface BrandLockupProps {
  /** light = white wordmark over the hero; dark = ink wordmark on light bands. */
  tone?: Tone;
  /** nav ≈ 20px wordmark, footer ≈ 20-22px. The mark scales with it. */
  size?: "nav" | "footer";
  className?: string;
}

/**
 * Logo mark + "PMTalks" wordmark. One component for the header and the footer,
 * so the brand reads the same in both places.
 *
 * The wordmark uses Geist at 600 (the site's UI heading weight). Instrument
 * Serif ships 400 only and AGENTS.md forbids increasing its weight, so the
 * display face is not used for the brand name.
 *
 * The whole lockup is the home link. The mark is decorative (empty alt) because
 * the link already carries the accessible name; the text stays visible at every
 * width and scales down instead of being hidden.
 */
export default function BrandLockup({
  tone = "dark",
  size = "nav",
  className = "",
}: BrandLockupProps) {
  const isFooter = size === "footer";

  return (
    <a
      href="#top"
      aria-label="PMTalks, back to top"
      className={`inline-flex items-center gap-[9px] rounded-[3px] transition-colors duration-[250ms] focus-visible:outline-offset-4 ${
        tone === "light" ? "text-white" : "text-ink"
      } ${className}`}
    >
      <Image
        src={tone === "light" ? "/brand/Light Version Logo.png" : "/brand/LogoIpsum Asset.png"}
        alt=""
        width={86}
        height={96}
        priority={!isFooter}
        className={`w-auto shrink-0 ${
          isFooter ? "h-[clamp(19px,1.6vw,26px)]" : "h-[clamp(16px,1.4vw,24px)]"
        }`}
      />
      <span
        className={`font-sans font-semibold leading-none tracking-[-0.03em] ${
          isFooter ? "text-[clamp(20px,1.55vw,22px)]" : "text-[clamp(15px,1.35vw,20px)]"
        }`}
      >
        PMTalks
      </span>
    </a>
  );
}
