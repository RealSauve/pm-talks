"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import SectionHeading from "@/components/ui/SectionHeading";

const { listenerStories } = site;
const slides = listenerStories.slides;

const prevIcon = (
  <svg width="10" height="17" viewBox="0 0 10 17" fill="none" aria-hidden="true">
    <path d="M8.5 1.5L2 8.5l6.5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const nextIcon = (
  <svg width="10" height="17" viewBox="0 0 10 17" fill="none" aria-hidden="true">
    <path d="M1.5 1.5L8 8.5l-6.5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const pauseIcon = (
  <svg width="9" height="10" viewBox="0 0 9 10" fill="none" aria-hidden="true">
    <path d="M1.4 1v8M7.6 1v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const playIcon = (
  <svg width="9" height="10" viewBox="0 0 9 10" fill="none" aria-hidden="true">
    <path d="M1.4 1.2L7.8 5L1.4 8.8V1.2Z" fill="currentColor" />
  </svg>
);

const watchIcon = (
  <svg width="7" height="8" viewBox="0 0 7 8" fill="none" aria-hidden="true">
    <path d="M1 1.1L6 4L1 6.9V1.1Z" fill="currentColor" />
  </svg>
);

/**
 * "Listener stories" (copy file section 8, motion spec section 8).
 *
 * We only have three host clips and no testimonials, so all three stay on
 * screen at `sm` and up: the carousel advances *emphasis* rather than sliding
 * three-of-three, which would show the same cards again. Arrows and the
 * 4.5s auto-advance brighten one card at a time; hovering a card brightens
 * it too. Below `sm` the row becomes a swipe strip with one card and a peek.
 *
 * Videos: muted, looping, posters for every clip. They play only while the
 * section is on screen and pause when the tab is hidden. Under 640px, with
 * prefers-reduced-motion or saveData, posters only (no video elements), and
 * auto-advance is off.
 */
export default function ListenerCarousel() {
  const reduceMotion = useReducedMotion();
  const [restricted, setRestricted] = useState(false);
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [inView, setInView] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  /* Poster-only conditions: small viewport or saveData (reduced motion joins them). */
  useEffect(() => {
    const save = Boolean(
      (navigator as { connection?: { saveData?: boolean } }).connection?.saveData,
    );
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setRestricted(query.matches || save);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const posterOnly = Boolean(reduceMotion || restricted);

  /* Play only while the section is on screen. */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (posterOnly) return;
    videoRefs.current.forEach((video) => {
      if (!video) return;
      if (inView && !document.hidden) {
        video.play().catch(() => {
          /* Autoplay may be rejected; the poster stays visible. */
        });
      } else {
        video.pause();
      }
    });
  }, [posterOnly, inView]);

  /* Pause everything while the tab is hidden. */
  useEffect(() => {
    const onVisibility = () => {
      if (posterOnly) return;
      videoRefs.current.forEach((video) => {
        if (!video) return;
        if (document.hidden) video.pause();
        else if (inView) video.play().catch(() => {});
      });
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [posterOnly, inView]);

  const scrollToCard = useCallback(
    (index: number) => {
      const row = rowRef.current;
      if (!row || row.scrollWidth <= row.clientWidth) return;
      const card = row.children[index] as HTMLElement | undefined;
      if (!card) return;
      row.scrollTo({
        left: card.offsetLeft - row.offsetLeft,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion],
  );

  const go = useCallback(
    (direction: 1 | -1) => {
      const next = (active + direction + slides.length) % slides.length;
      setActive(next);
      scrollToCard(next);
    },
    [active, scrollToCard],
  );

  /* Auto-advance: desktop only, paused on hover/focus, by choice, or offscreen. */
  useEffect(() => {
    if (reduceMotion || restricted || userPaused || hovered || focusWithin || !inView) {
      return;
    }
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [reduceMotion, restricted, userPaused, hovered, focusWithin, inView]);

  /* Swiping the mobile strip updates the emphasis. */
  const onRowScroll = () => {
    const row = rowRef.current;
    if (!row || row.scrollWidth <= row.clientWidth) return;
    const center = row.scrollLeft + row.clientWidth / 2;
    let nearest = 0;
    let distance = Infinity;
    Array.from(row.children).forEach((child, index) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft - row.offsetLeft + card.clientWidth / 2;
      const delta = Math.abs(cardCenter - center);
      if (delta < distance) {
        distance = delta;
        nearest = index;
      }
    });
    setActive(nearest);
  };

  return (
    <section
      ref={sectionRef}
      id="stories"
      aria-label="Listener stories"
      className="bg-dark py-[clamp(56px,6vw,88px)] text-white"
    >
      <div className="mx-auto w-full max-w-[clamp(900px,74vw,1400px)] px-6 lg:px-0">
        {/* Heading + controls */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <SectionHeading
            tone="dark"
            line1={listenerStories.heading.line1}
            line2={listenerStories.heading.line2}
          />

          <div className="flex items-center gap-1 self-end sm:self-auto">
            {!reduceMotion && !restricted && (
              <button
                type="button"
                onClick={() => setUserPaused((paused) => !paused)}
                aria-label={userPaused ? "Resume auto-advance" : "Pause auto-advance"}
                className="mr-2 flex h-9 w-9 items-center justify-center rounded-[3px] text-white/50 transition-colors duration-200 hover:text-white"
              >
                {userPaused ? playIcon : pauseIcon}
              </button>
            )}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous clip"
              aria-controls="story-row"
              className="flex h-10 w-10 items-center justify-center rounded-[3px] text-white/55 transition-colors duration-200 hover:text-white"
            >
              {prevIcon}
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next clip"
              aria-controls="story-row"
              className="flex h-10 w-10 items-center justify-center rounded-[3px] text-white/55 transition-colors duration-200 hover:text-white"
            >
              {nextIcon}
            </button>
          </div>
        </div>

        {/* Row: three host clips. Emphasis follows the active card. */}
        <div
          id="story-row"
          ref={rowRef}
          onScroll={onRowScroll}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocusWithin(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setFocusWithin(false);
            }
          }}
          className="-mx-6 mt-[clamp(28px,3.4vw,48px)] flex snap-x snap-mandatory scroll-pl-6 gap-[clamp(12px,1.4vw,20px)] overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:scroll-pl-0 sm:px-0 sm:snap-none [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, index) => {
            const isActive = index === active;
            return (
              <figure
                key={slide.label}
                className="w-[78vw] max-w-[340px] shrink-0 snap-start sm:w-[clamp(240px,25vw,330px)] sm:max-w-none sm:shrink"
              >
                <div className="group relative aspect-square overflow-hidden rounded-[6px] bg-dark">
                  {posterOnly && slide.video.poster ? (
                    <Image
                      src={slide.video.poster}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 78vw, 330px"
                      className="object-cover"
                    />
                  ) : posterOnly ? (
                    <div className="absolute inset-0 bg-white/5" aria-hidden="true" />
                  ) : (
                    <video
                      ref={(node) => {
                        videoRefs.current[index] = node;
                      }}
                      src={slide.video.src}
                      poster={slide.video.poster ?? undefined}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}

                  {/* Dim everything but the active card; hovering lifts it. */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 bg-dark/50 transition-opacity duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0 ${
                      isActive ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/14 px-2.5 py-1 text-[10px] font-medium uppercase leading-none tracking-[0.12em] text-white/90 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  >
                    {watchIcon}
                    Watch
                  </span>
                </div>

                <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-[12px] leading-none">
                  <span className="text-white/70">{slide.label}</span>
                  <span className="shrink-0 tracking-[0.04em] text-white/55">{slide.stat}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
