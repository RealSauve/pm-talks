"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { VideoClip } from "@/content/site";

interface HeroVideoStackProps {
  clips: VideoClip[];
  /** Index of the currently active clip (shared with the quote rotation). */
  activeIndex: number;
}

/**
 * One stacked <video> per clip, crossfaded by opacity (700ms). Never swaps src
 * on a single element. Plays only the active clip; pauses everything when the
 * tab is hidden. Under 640px, with prefers-reduced-motion, or with saveData,
 * renders the poster image only (dark fallback while posters are missing).
 */
export default function HeroVideoStack({ clips, activeIndex }: HeroVideoStackProps) {
  const reduceMotion = useReducedMotion();
  const [compact, setCompact] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  /* Poster-only conditions: small viewport, reduced motion, or saveData. */
  useEffect(() => {
    const saveData = Boolean(
      (navigator as { connection?: { saveData?: boolean } }).connection?.saveData,
    );
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setCompact(query.matches || saveData);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const posterOnly = Boolean(reduceMotion || compact);
  const active = clips.length > 0 ? activeIndex % clips.length : 0;

  /* Play the active clip; pause the rest. */
  useEffect(() => {
    if (posterOnly) return;
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === active) {
        video.play().catch(() => {
          /* Autoplay can be rejected; the first frame stays visible. */
        });
      } else {
        video.pause();
      }
    });
  }, [active, posterOnly]);

  /* Pause everything while the tab is hidden. */
  useEffect(() => {
    const onVisibility = () => {
      videoRefs.current.forEach((video) => {
        if (!video) return;
        if (document.hidden) {
          video.pause();
        } else if (videoRefs.current.indexOf(video) === active) {
          video.play().catch(() => {});
        }
      });
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [active]);

  if (clips.length === 0) return null;

  if (posterOnly) {
    const poster = clips[0].poster;
    if (poster) {
      return (
        <Image
          src={poster}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      );
    }
    /* No poster yet: dark fallback so the section still reads correctly. */
    return <div className="absolute inset-0 bg-dark" aria-hidden="true" />;
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {clips.map((clip, index) => (
        <motion.video
          key={clip.src}
          ref={(node) => {
            videoRefs.current[index] = node;
          }}
          src={clip.src}
          poster={clip.poster ?? undefined}
          muted
          autoPlay={index === 0}
          loop
          playsInline
          preload={index === 0 ? "metadata" : "none"}
          initial={false}
          animate={{ opacity: index === active ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ))}
    </div>
  );
}
