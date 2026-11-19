"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

/**
 * Lenis smooth scrolling, per PM-TALKS-MOTION-SPEC.md section 10 (lerp: 0.1).
 * Disabled entirely for prefers-reduced-motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let lenis: Lenis | null = null;
    let cancelled = false;

    (async () => {
      const { default: LenisCtor } = await import("lenis");
      if (cancelled) return;
      lenis = new LenisCtor({ lerp: 0.1 });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
