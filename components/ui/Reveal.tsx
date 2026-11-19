"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in seconds (AGENTS.md: 100ms stagger between siblings). */
  delay?: number;
  /** Rise distance in px (spec: 16-24px; default 20px per Phase 0 brief). */
  rise?: number;
  className?: string;
}

/**
 * Scroll reveal: fade + 20px rise, once, at 15% in view.
 * Easing cubic-bezier(0.22, 1, 0.36, 1), 500-700ms. Respects reduced motion.
 */
export default function Reveal({ children, delay = 0, rise = 20, className = "" }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: rise }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
