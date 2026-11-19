# PM Talks website: project rules

## What this is
A marketing site for **PM Talks**, a podcast for product managers. Single landing page.
Feel: minimal, modern, luxury. Restraint over decoration. Slow easing, lots of whitespace.
Layout and interaction are modeled on a reference landing page whose structure is documented in /docs.
We copy the STRUCTURE and MOTION only. All copy, imagery, logos and video are our own. Never use any other company's name, logo, wording or footage.

## Source of truth (read before building any section)
- /docs/PM-TALKS-COPY.md: all copy and section order
- /docs/PM-TALKS-MOTION-SPEC.md: tokens, glass CSS, motion, layout. This file overrides the copy file where they differ (buttons are near-square; glass is dark smoked glass; hero rotates clips).
- /docs/ref/*.png: visual reference crops per section. Match spacing and proportion to these.
- /docs/MOODBOARD-NOTES.md and /docs/moodboard/*: mood, palette, type and imagery feel. Wins over the reference crops on color, type and imagery; the crops win on layout.

## Stack (do not add others without asking)
Next.js (App Router), TypeScript, Tailwind CSS, `motion` (Framer Motion), `lenis`, Geist via `next/font`, `simple-icons` (platform grid placeholder logos only — import individual icons, never the barrel).

## Structure
app/layout.tsx, app/page.tsx, app/globals.css
components/nav/ (Nav.tsx, AnnouncementBar.tsx, NavDropdown.tsx)
components/hero/ (Hero.tsx, HeroVideoStack.tsx)
components/sections/ (PlatformGrid.tsx, LatestEpisodes.tsx, TopicExplorer.tsx, BeyondTheMic.tsx, ListenerCarousel.tsx, ClosingCta.tsx)
components/layout/ (Footer.tsx, SmoothScroll.tsx)
components/ui/ (Button.tsx, SectionHeading.tsx, Reveal.tsx, Toast.tsx)
content/site.ts  <- ALL copy lives here, typed. Components read from it. No hard-coded copy in JSX.
public/videos/, public/brand/

## Design tokens (define as CSS variables in globals.css and map into the Tailwind theme)
--bg #F5F4F1 | --surface #FFFFFF | --ink #141414 | --muted #8E8D89 | --line #E7E5E0
--btn-light #F6F1EC | --dark #0B0B0B | --dark-muted #6F6E6A
--footer #ECE7E1 | --ghost #E3DDD5 | --blush-top #EFDDD7 | --blush-bottom #FFFDFB | --accent #1D5BFF | --quiet #6F6E6B (small informational text and platform marks; AA on --bg — --muted stays for decorative labels)
(These are estimates; they live only in globals.css so they are easy to tune.)

## Typography
Geist for all UI and body type: nav, buttons, body text, captions, labels, small print.
Instrument Serif (400, normal + italic, via next/font, variable --font-serif) for display type only:
- Hero H1: Instrument Serif 400, tracking -0.01em, line-height 1.12, clamp(34px, 3.8vw, 72px). Line 1 white; line 2 italic at rgba(255,255,255,0.62). Very soft text-shadow 0 1px 24px rgba(0,0,0,0.25) for legibility over video; never increase the weight.
- Section H2: Instrument Serif 400, ~clamp(24px, 2.1vw, 34px), line-height 1.15. Line 1 --ink, line 2 italic --muted (dark sections: line 1 near-white, line 2 italic --dark-muted).
Body: Geist 15-16px / 1.6. Nav and labels 12-13px.
Restraint rule: the nav, quote and secondary text lines stay low-contrast so they never compete with the headline.

## Shape
Buttons: border-radius 3px (near-square). Cards: 4-6px. Large panels: 20px. Pills only for tiny tags.
Hairlines: 1px solid var(--line). Shadows are very soft (0 20px 60px rgba(0,0,0,.06)).

## Glass (dark smoked glass; see motion spec section 2 for exact CSS)
.glass-dark, .glass-menu and .nav-light must be defined once in globals.css and reused. Never invent new blur values.

## Motion rules
- Easing: cubic-bezier(0.22, 1, 0.36, 1). UI state 250ms, reveals 500-700ms, video crossfade 700ms.
- Reveals: opacity + 16-24px rise, once, 15% in view, 100ms stagger.
- Animate only transform and opacity (plus grid-template-rows for height reveal). Never animate width/height/top/left.
- Respect prefers-reduced-motion everywhere: no auto-advance, no Lenis, no crossfade timers; show the first state.
- No parallax. No cursor effects. No extra decorative animation.
- No hover popovers or modals on the platform grid.

## Video rules
- `<video muted autoplay loop playsinline preload="metadata" poster=...>`; never autoplay with sound.
- Hero: one stacked `<video>` per clip, crossfade by opacity. Never swap `src` on a single element.
- Play only the active and next clip; pause the rest. Pause everything when the tab is hidden.
- Under 640px or with `prefers-reduced-motion` or `saveData`, show the poster image only.
- Files in /public/videos are hero-N.mp4 and story-N.mp4 with matching .jpg posters.

## Code rules
- Server components by default; add "use client" only where state or motion is needed.
- Semantic HTML (header, nav, main, section, footer), real headings in order, alt text on every image, visible focus rings (--accent), keyboard-operable tabs and carousel (arrow keys, aria-selected).
- No `any`. No unused dependencies. No inline styles except for dynamic values.
- Placeholders in the copy file stay visibly marked [LIKE THIS] in content/site.ts. Never invent names, quotes, stats, awards or listener numbers.

## Workflow
Build ONE phase per request. After each phase: run `npm run build` and `npm run lint`, fix errors, then tell me what to check in the browser.
Do not refactor finished sections unless asked.
- Never run npm run dev or any long-running process in the shell. I run the dev server myself. Verify with npm run build and npm run lint only.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
