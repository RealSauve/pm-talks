import { site } from "@/content/site";
import type { FeatureCard } from "@/content/site";
import SectionFrame from "@/components/ui/SectionFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const { topics } = site;

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

/** Card 1: soft sand ribbons on off-white, echoing the reference art. */
function MinimalCover() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-btn-light">
      <div className="absolute inset-0 bg-[radial-gradient(110%_110%_at_88%_88%,rgba(239,221,215,0.5),rgba(246,241,236,0)_58%)]" />
      <div className="absolute -left-[30%] -top-[86%] h-[250%] w-[78%] rotate-[34deg] rounded-[50%] border-[2px] border-ghost/90 blur-[1.5px]" />
      <div className="absolute -left-[12%] -top-[70%] h-[238%] w-[64%] rotate-[28deg] rounded-[50%] border-[26px] border-white/70 blur-[5px]" />
      <div className="absolute left-[10%] -top-[62%] h-[224%] w-[56%] rotate-[22deg] rounded-[50%] border-[10px] border-ghost/60 blur-[3px]" />
      <div className="absolute -bottom-[74%] -right-[26%] h-[210%] w-[74%] rotate-[16deg] rounded-[50%] border-[40px] border-white/60 blur-[7px]" />
    </div>
  );
}

/** Card 2: dark still with a centred white award-style badge. */
function BadgeCover() {
  return (
    <div className="absolute inset-0 bg-dark">
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_72%_8%,rgba(122,90,60,0.55)_0%,rgba(24,20,17,0.2)_45%,rgba(11,11,11,0)_75%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[46%] max-w-[170px] rounded-[6px] bg-surface px-3.5 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
          <p className="text-[12.5px] font-semibold leading-none tracking-[-0.01em] text-ink">
            PM TALKS
          </p>
          <p className="mt-1.5 text-[8px] font-medium uppercase leading-none tracking-[0.16em] text-quiet">
            Top episode
          </p>
          <p className="mt-2 text-[10px] font-medium leading-none tracking-[0.08em] text-accent">
            2025
          </p>
        </div>
      </div>
    </div>
  );
}

/** Card 3: light still with a dark editorial report cover. */
function ReportCover() {
  return (
    <div className="absolute inset-0 bg-surface">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-[78%] w-[44%] flex-col bg-dark p-3 shadow-[0_18px_36px_rgba(0,0,0,0.18)]">
          <p className="text-[6.5px] font-medium uppercase leading-none tracking-[0.2em] text-white/60">
            PM Talks
          </p>
          <div className="mt-2.5 h-px w-5 bg-white/25" />
          <div className="mt-2.5 space-y-1">
            <div className="h-[3px] w-[82%] bg-white/30" />
            <div className="h-[2px] w-[56%] bg-white/16" />
            <div className="h-[2px] w-[68%] bg-accent/75" />
          </div>
          <p className="mt-auto text-[6.5px] uppercase leading-none tracking-[0.2em] text-white/40">
            2026 report
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * 3:2 cover box. Artwork is decorative (hidden from AT); the NEW pill is real
 * text so it is announced.
 */
function Cover({ feature }: { feature: FeatureCard }) {
  return (
    <div className="relative aspect-[3/2] overflow-hidden rounded-[4px]">
      <div aria-hidden="true" className="absolute inset-0">
        {feature.cover === "minimal" && <MinimalCover />}
        {feature.cover === "badge" && <BadgeCover />}
        {feature.cover === "report" && <ReportCover />}
      </div>

      {feature.badge && (
        <span className="absolute left-3 top-3 rounded-full bg-surface/95 px-2 py-[3px] text-[9px] font-medium uppercase leading-none tracking-[0.14em] text-ink shadow-sm">
          {feature.badge}
        </span>
      )}
    </div>
  );
}

/**
 * "Topic explorer" (copy file section 6, owner revision): three equal editorial
 * feature cards in place of the old tabbed split-card block. Heading row stays;
 * cards are bare on the page background — cover, headline, 3-line summary,
 * bottom text link. Reveals stagger 100ms; no other motion.
 */
export default function TopicExplorer() {
  return (
    <SectionFrame
      id="topics"
      label="Topic explorer"
      className="pb-[clamp(32px,3vw,48px)] pt-[calc(var(--dot-band-height)+16px)]"
    >
      {/* Heading row */}
      <Reveal>
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
          <SectionHeading line1={topics.heading.line1} line2={topics.heading.line2} />
          <span className="shrink-0 text-[13px] text-quiet">{topics.link.label}</span>
        </div>
      </Reveal>

      {/* Three editorial features */}
      <div className="mt-12 grid gap-x-[clamp(20px,2.6vw,40px)] gap-y-[clamp(36px,4vw,56px)] md:grid-cols-3">
        {topics.features.map((feature, index) => (
          <Reveal key={feature.id} delay={index * 0.1} className="h-full">
            <article className="flex h-full flex-col">
              <Cover feature={feature} />

              <h3 className="mt-[clamp(18px,1.8vw,26px)] text-balance text-[clamp(18px,1.45vw,21px)] font-semibold leading-[1.3] tracking-[-0.01em] text-ink md:min-h-[2.6em]">
                {feature.title}
              </h3>

              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-quiet">
                {feature.summary}
              </p>

              <a
                href={feature.link.href}
                className="mt-auto inline-flex w-fit items-center gap-1.5 pt-[clamp(20px,2.2vw,30px)] text-[13px] font-medium text-ink transition-colors duration-200 hover:text-accent"
              >
                {feature.link.label}
                {chevron}
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  );
}
