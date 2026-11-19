"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Button from "@/components/ui/Button";
import { site } from "@/content/site";
import HeroVideoStack from "./HeroVideoStack";

const CLIP_INTERVAL_MS = 4500;
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero: full-bleed rotating video clips + rotating quote; headline and buttons
 * stay put (motion spec section 3). Announcement bar and nav overlay it.
 * Shorter than the viewport so the first row of the next section peeks in.
 *
 * Load-in sequence: video fades up from dark -> headline line 1 -> line 2
 * (masked rise) -> quote -> buttons. 12px rise, stagger 120ms.
 */
export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const hoverPaused = useRef(false);

  /* Quote/clip rotation every 4.5s; pauses on hover and focus; disabled for
     reduced motion. */
  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      if (!hoverPaused.current) {
        setQuoteIndex((index) => (index + 1) % site.hero.quotes.length);
      }
    }, CLIP_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const quotes = site.hero.quotes;

  const loadIn = (delay: number) => ({
    initial: reduceMotion ? false : ({ opacity: 0, y: 12 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay },
  });

  return (
    <section
      id="top"
      className="relative isolate h-[calc(100svh-140px)] min-h-[560px] w-full overflow-hidden"
      onMouseEnter={() => {
        hoverPaused.current = true;
      }}
      onMouseLeave={() => {
        hoverPaused.current = false;
      }}
      onFocusCapture={() => {
        hoverPaused.current = true;
      }}
      onBlurCapture={() => {
        hoverPaused.current = false;
      }}
    >
      <HeroVideoStack clips={site.hero.clips} activeIndex={quoteIndex} />

      {/* Dark gradient (motion spec section 2) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: site.hero.overlay }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.28) 100%)",
        }}
      />

      {/* Load-in: video fades up from dark */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-black"
        initial={reduceMotion ? false : { opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      />

      {/* Text block: anchored to the bottom of the hero, centered */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center px-6 pb-[clamp(32px,6vh,72px)] text-center">
        {/* Quote line: normal flow above the H1. All quotes stacked in one grid
            cell so the container always holds the tallest quote and the
            headline never jumps on change. 400ms crossfade + 4px drift. */}
        <div className="mx-auto mb-[clamp(14px,1.4vw,28px)] grid w-[min(90vw,440px)] text-center">
          {quotes.map((quote, index) => (
            <motion.p
              key={quote}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={index === quoteIndex ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
              transition={{ duration: 0.4, ease: EASE }}
              aria-hidden={index !== quoteIndex}
              className="[grid-area:1/1] text-[clamp(12px,0.95vw,15px)] font-normal leading-[1.5] text-[rgba(255,255,255,0.55)] text-balance"
            >
              &ldquo;{quote}&rdquo;
            </motion.p>
          ))}
        </div>

        {/* Two-tone serif headline; line 2 rises word-masked after line 1.
            Lines stay nowrap on desktop, wrap below 640px. */}
        <h1 className="font-serif text-[clamp(34px,3.8vw,72px)] font-normal leading-[1.12] tracking-[-0.01em] text-white [text-shadow:0_1px_24px_rgba(0,0,0,0.25)]">
          <motion.span className="block md:whitespace-nowrap" {...loadIn(0.15)}>
            {site.hero.headline.line1}
          </motion.span>
          <span className="block overflow-hidden pb-[0.2em]">
            <motion.span
              className="block italic text-white/[0.62] md:whitespace-nowrap"
              initial={reduceMotion ? false : { y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
            >
              {site.hero.headline.line2}
            </motion.span>
          </span>
        </h1>

        {/* Glass + solid buttons touching (no gap) */}
        <motion.div className="mt-[clamp(28px,2.4vw,46px)] flex" {...loadIn(0.95)}>
          {site.hero.buttons.map((button) => (
            <Button
              key={button.label}
              variant={button.variant}
              size="hero"
              href={button.href}
            >
              {button.label}
            </Button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
