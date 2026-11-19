"use client";

import { motion } from "motion/react";
import { site } from "@/content/site";

/* Small outline icons, 14px, stroke-based. Hand-drawn — no icon dependency. */
const icons: Record<string, React.ReactNode> = {
  Strategy: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10.5 5.5L8.75 8.75L5.5 10.5L7.25 7.25L10.5 5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  ),
  Discovery: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  Execution: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 4H13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M2.5 8H13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M2.5 12H8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  Leadership: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="5.5" cy="5.5" r="2.25" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="11" cy="6.5" r="1.75" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.75 13C2.25 10.75 3.75 9.75 5.5 9.75C7.25 9.75 8.75 10.75 9.25 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M10.5 10.25C12 10.25 13.25 11 13.75 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  Career: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 13.5H13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M3 10.5H6.5V13.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M6.5 7H10V10.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M10 3.5H13.5V7" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  ),
};

interface NavDropdownProps {
  onClose: () => void;
}

/**
 * "Topics" dropdown over the hero: .glass-menu panel (tint/border softened to
 * rgba(255,255,255,0.06)/0.08 so the video shows through), one row per topic
 * with a small outline icon and a label, left-aligned under the trigger.
 * UI-state motion: 250ms, transform + opacity only.
 */
export default function NavDropdown({ onClose }: NavDropdownProps) {
  return (
    <motion.div
      id="topics-menu"
      aria-label="Topics"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="glass-menu bg-white/[0.06]! border-white/[0.08]! shadow-soft absolute top-[calc(100%+8px)] left-0 w-[clamp(200px,15vw,260px)] p-2"
    >
      {site.topics.tabs.map((tab) => (
        <a
          key={tab.label}
          href="#topics"
          onClick={onClose}
          className="flex h-[clamp(30px,2.2vw,40px)] items-center gap-2.5 rounded-[4px] px-3 text-[13px] text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white"
        >
          {icons[tab.label]}
          <span>{tab.label}</span>
        </a>
      ))}
    </motion.div>
  );
}
