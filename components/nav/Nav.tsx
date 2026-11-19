"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import BrandLockup from "@/components/ui/BrandLockup";
import Button from "@/components/ui/Button";
import { site } from "@/content/site";
import AnnouncementBar from "./AnnouncementBar";
import NavDropdown from "./NavDropdown";

const dropdownTrigger = site.nav.links.find((link) => link.label === "Topics");
const plainLinks = site.nav.links.filter((link) => link.label !== "Topics");

const linkBase =
  "text-[clamp(12px,0.9vw,14px)] py-2 transition-colors duration-200";

/**
 * Fixed header: announcement strip + nav row.
 * Over the hero: transparent, white text, light (white) logo mark.
 * After ~80% of the hero height: .nav-light (frosted cream), ink text, dark
 * logo mark. Both flip over 250ms. Chevron turns into a dash while the
 * dropdown is open (motion spec section 2).
 * Content container: clamp(880px, 69vw, 1300px), centered.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [announcementHidden, setAnnouncementHidden] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLLIElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setAnnouncementHidden(window.scrollY > 16);
      setScrolled(window.scrollY > window.innerHeight * 0.75);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the dropdown on Escape and on outside click/leave. */
  useEffect(() => {
    if (!topicsOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTopicsOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setTopicsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [topicsOpen]);

  /* Mobile menu: Escape closes and returns focus to the trigger; an outside
     tap closes it; crossing to the desktop breakpoint closes it. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (menuPanelRef.current?.contains(target) || menuButtonRef.current?.contains(target)) {
        return;
      }
      setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

  const linkColor = scrolled ? "text-ink/80 hover:text-ink" : "text-white/78 hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-[250ms] ${
        scrolled ? "nav-light" : ""
      }`}
    >
      <AnnouncementBar hidden={announcementHidden} />

      <nav
        aria-label="Main"
        className={`relative mx-auto flex h-14 w-full max-w-[clamp(880px,69vw,1300px)] items-center justify-between px-6 transition-colors duration-[250ms] lg:px-0 ${
          scrolled ? "text-ink" : "text-white"
        }`}
      >
        {/* Left group: brand lockup at the container edge, links immediately after */}
        <div className="flex items-center">
          <BrandLockup tone={scrolled ? "dark" : "light"} className="shrink-0" />

          <ul className="ml-5 hidden items-center gap-[24px] md:flex lg:ml-7 lg:gap-[28px]">
            {dropdownTrigger && (
              <li ref={triggerRef} className="relative -mx-3">
                <button
                  type="button"
                  aria-expanded={topicsOpen}
                  aria-controls="topics-menu"
                  aria-haspopup="true"
                  onClick={() => setTopicsOpen((open) => !open)}
                  className={`flex items-center gap-2 rounded-[4px] px-3 py-2 transition-colors duration-200 ${
                    scrolled ? "hover:bg-black/5" : "hover:bg-white/12"
                  }`}
                >
                  <span className={linkBase}>{dropdownTrigger.label}</span>
                  {/* Chevron -> dash while open */}
                  <span className="relative block h-3 w-3" aria-hidden="true">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`absolute inset-0 h-3 w-3 transition-all duration-[250ms] ${
                        topicsOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                      }`}
                    >
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`absolute inset-0 h-3 w-3 transition-opacity duration-[250ms] ${
                        topicsOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <path d="M3.5 8h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence>
                  {topicsOpen && <NavDropdown onClose={() => setTopicsOpen(false)} />}
                </AnimatePresence>
              </li>
            )}

            {plainLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={`${linkBase} ${linkColor}`}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side */}
        <div className={`flex items-center gap-5 ${linkColor}`}>
          <a href={site.nav.sponsor.href} className={`${linkBase} hidden md:inline-block`}>
            {site.nav.sponsor.label}
          </a>
          <Button href={site.nav.listenNow.href} variant="solid-light" size="nav">
            {site.nav.listenNow.label}
          </Button>

          {/* Mobile menu trigger (links live in the panel below) */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="-mr-2 flex h-10 w-10 cursor-pointer items-center justify-center md:hidden"
          >
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-4 bg-current transition-transform duration-200 ${
                  menuOpen ? "translate-y-[5.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[5.5px] h-[1.5px] w-4 bg-current transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[11px] h-[1.5px] w-4 bg-current transition-transform duration-200 ${
                  menuOpen ? "-translate-y-[5.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile menu panel: full nav, Sponsor, Listen now */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="absolute inset-x-0 top-full px-6 md:hidden"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                ref={menuPanelRef}
                id="mobile-menu"
                className="mt-1 rounded-[6px] border border-line bg-surface p-2 text-ink shadow-soft"
              >
                <ul>
                  {site.nav.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-[4px] px-3 py-2.5 text-[14px] text-ink/80 transition-colors duration-200 hover:bg-bg hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-1 border-t border-line pt-1">
                  <a
                    href={site.nav.sponsor.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-[4px] px-3 py-2.5 text-[14px] text-ink/80 transition-colors duration-200 hover:bg-bg hover:text-ink"
                  >
                    {site.nav.sponsor.label}
                  </a>
                  <div className="px-1 pb-1 pt-1.5">
                    <Button
                      href={site.nav.listenNow.href}
                      variant="solid-light"
                      className="w-full"
                      onClick={() => setMenuOpen(false)}
                    >
                      {site.nav.listenNow.label}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
