# PM Talks: Motion, Glass & Layout Spec (v2)

Source: frames pulled from your screen recording (56.7s, desktop view, sampled at 1 frame/second) plus full-size stills.
Read this together with `PM-TALKS-COPY.md`. **Where the two disagree, this file wins.**

Confidence key: **[SEEN]** visible in the frames. **[EST]** my estimate of a value. **[CHECK]** confirm on the live site with dev tools.
Limits: at 1 fps I can't see anything shorter than about a second (button hovers, micro-easing). All durations below are estimates. The recording shows desktop only, so mobile behavior is my recommendation, not something I observed.

---

## 0. Corrections to the first copy file

1. **Buttons are near-square, not pills.** [SEEN] Radius is about 2-4px on every button, in the hero, nav and CTA. Use `border-radius: 3px`. Keep 999px only for tiny tags and badges.
2. **The hero glass is dark smoked glass, not white frost.** [SEEN] On the video, the glass elements are dark-tinted and translucent with a hairline light border. See section 2.
3. **The hero has rotating clips with a rotating quote line.** The quote above the headline changes with each clip, while the headline stays put. Details in section 3.
4. **The page background is a little cooler and the footer is warmer.** Updated tokens in section 1.

---

## 1. Tokens (updated)

| Token | Value [EST] | Where |
|---|---|---|
| --bg | #F5F4F1 | Page background |
| --surface | #FFFFFF | Cards, panels, popovers |
| --ink | #141414 | Primary text, solid dark buttons |
| --muted | #8E8D89 | Second line of headings, captions, inactive tabs |
| --line | #E7E5E0 | 1px hairlines, logo-grid borders |
| --btn-light | #F6F1EC | Solid light hero button (slightly warm, not pure white) |
| --dark | #0B0B0B | Dark carousel section |
| --dark-muted | #6F6E6A | Stats and captions on dark |
| --footer | #ECE7E1 | Footer (warmer taupe than the page) |
| --ghost | #E3DDD5 | Giant clipped wordmark |
| --blush-top | #EFDDD7 | Top of the tab-panel gradient |
| --blush-bottom | #FFFDFB | Bottom of the tab-panel gradient |
| --accent | #1D5BFF | Send button, NEW tag, tiny highlights only |

Type: light grotesk (Geist or Inter Tight).
- Hero H1: 300 weight, about 44-56px desktop, tracking -0.02em, line-height 1.05.
- Section H2: about 28-32px, weight 300. Line 1 is --ink, line 2 is --muted.
- Tab labels: about 22-26px, weight 300.
- Body: 14-16px, 400.
- Nav and small labels: 12-13px.

Spacing: content column is about 560-720px of the 892px recording, centered. Equivalent on a 1440px screen: max-width about 1080-1200px, with large vertical gaps (96-140px) between sections.

---

## 2. Glass morphism: exactly where it appears

All glass here is **dark-tinted**, sitting on moving video. [SEEN]

```css
/* Smoked glass: Contact Sales button, announcement bar, hovered nav item */
.glass-dark {
  background: rgba(10, 10, 10, 0.28);
  backdrop-filter: blur(14px) saturate(120%);
  -webkit-backdrop-filter: blur(14px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.92);
}

/* Nav dropdown panel over the hero */
.glass-menu {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(22px) saturate(130%);
  -webkit-backdrop-filter: blur(22px) saturate(130%);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 6px;
}

/* Nav after it leaves the hero (light, frosted cream) */
.nav-light {
  background: rgba(245, 244, 241, 0.82);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--line);
}
```

| Element | Treatment |
|---|---|
| Announcement strip (top, tiny, centered text + small play-arrow) | Full-width dark translucent strip, `.glass-dark` without border, 28-32px tall |
| Nav over hero | Fully transparent, white text, 12-13px |
| Nav item hover (Platform) | Faint `rgba(255,255,255,0.12)` rounded rectangle behind the label. Chevron turns into a dash while open [SEEN] |
| Dropdown | `.glass-menu`. Seven rows, each with a small outline icon and a label, left-aligned under the trigger. No solid panel; the video stays visible through it |
| "Contact Sales" (hero) | `.glass-dark`, near-square, ~130x26px in the recording (scale up about 1.6x for desktop) |
| "Start now" (hero) | Solid `--btn-light`, dark text, no blur |
| Overlay on the video | Black at about 35-45%, darker at the bottom. Use `linear-gradient(to bottom, rgba(0,0,0,.25), rgba(0,0,0,.45))` plus a slight vignette |

Glass needs something moving behind it to show. That's why it looks good here: the clips change underneath it.

---

## 3. Hero: arrangement and behavior

**Layout [SEEN]** (top to bottom):
1. Announcement strip.
2. Nav row: logo left. Center-left links (Platform with chevron, Research, Pricing, Customers, Resources with chevron, Company with chevron). Far right: "Log in" (text), "Contact Sales" (light outline/gray button), "Start now" (solid white button over the hero).
3. Video fills the hero, full-bleed, and is shorter than the viewport. The **first row of the logo grid peeks in at the bottom of the first screen**, which signals there is more below.
4. Text block sits in the lower third, centered: small quote line, then the two-line headline, then the two buttons side by side with no gap between them (the glass button and the solid button touch).

**Rotating clips [SEEN]:** the video changes between different people about every 3-5 seconds in the recording. The quote above the headline changes with each clip. The headline and buttons do not move.

Build recommendation:
- Stack one `<video>` per clip, absolutely positioned, `muted autoplay loop playsinline preload="metadata"`.
- Crossfade by animating `opacity` over about 600-800ms. Never swap `src` on one element, which flashes.
- Keep a timer advancing the active index every 4-5s, and keep the quote in the same state so they move together. Crossfade the quote too (about 400ms, with a 4px upward drift).
- Only the active clip and the next one should play. Pause the others to save CPU.
- Always set a poster on every clip.

**Load-in sequence [SEEN at the loop restart]:**
1. The video fades up from dark.
2. Headline line 1 appears.
3. Headline line 2 appears about 300-500ms later (I caught it mid-reveal, with only the first word visible, so it looks word-by-word or masked).
4. The quote line fades in.
5. The buttons fade in last.
Use a 12px upward rise, `opacity 0 to 1`, easing `cubic-bezier(0.22, 1, 0.36, 1)`, stagger 120ms.

**PM Talks hero quotes (unattributed brand lines, so they're safe without guest permission):**
1. "The best product thinking happens out loud."
2. "Roadmaps are promises. Treat them that way."
3. "Talk to customers before you talk to slides."
4. "Great PMs ask the better question."
5. "Influence is a skill. Here's how it's built."
6. "Ship less. Learn more."
Swap these for real guest quotes later, with the guest's name and permission.

---

## 4. Logo grid (becomes "Where to listen") [SEEN]

- 6 columns, 3 rows, then one wider "Backed by..." row (label spans 3 cells, then 3 logo cells).
- Section label above the grid: a real H2 set at the standard section scale (Instrument
  Serif 400, `clamp(24px, 2.1vw, 34px)`, line-height 1.15, centered, `--ink`). It stays on
  one line because the phrase has no second clause; the tighter bottom margin
  (`clamp(20px, 2.4vw, 36px)`) keeps the first grid row peeking under the hero.
- Every cell is separated by 1px `--line` hairlines. Logos are monochrome gray (use a single gray filter on all platform logos).
- The grid scrolls up over the hero as the page scrolls (normal scroll, not a pin).
- **No hover popovers or modals on the platform grid.**

For PM Talks: every cell is a real listening platform — a simple-icons placeholder mark plus the platform name, all in one muted gray, each cell linked out (new tab). Before launch, swap each mark for the platform's official badge and check its brand guidelines.

---

## 5. Latest episodes block (the "research list + product card") [SEEN]

- Heading block: two-tone H2 left, small link right (`Label >`).
- A divided list of 3 rows (title, then date and a tiny blue NEW tag), with hairlines between rows: **not used** (removed by request; heading + panel only).
- **Floating toast chips:** not used for PM Talks. The heading row stays heading + link only.
- Below: one large white rounded panel (radius about 20px) with a soft shadow, holding the player or app preview. Inside it is a sidebar plus a grid of small cards. For PM Talks: a sidebar of topics plus a grid of 9 episode cards, with a "now playing" bar on the right.

---

## 6. Topic explorer (3-column editorial feature grid) [SEEN]

Layout:
- Heading row: two-tone H2 left, quiet "Browse topics" annotation right.
- Three equal-width cards in a row from `md` up; stacked below.
- Cards are bare on the page background — no white container, no borders, no tinted panel.
- Each card: 3:2 cover box (radius 4px) → bold headline → 3-line summary → bottom
  text link with a chevron. Links sit on the card baseline.
- Cover art is built from type + tokens, never stock or another company's imagery:
  - Card 1: warm sand/blush abstract, small NEW pill top-left.
  - Card 2: dark still with a centred white badge reading **PM TALKS / TOP EPISODE / 2025**.
  - Card 3: light still with a dark editorial report cover.

Behavior:
- Cards reveal on scroll: fade + 24px rise, once, 100ms stagger.
- Link hover: color to `--accent`, 200ms. No image zoom, no card lift.
- No tabs, no auto-advance, no interactive demo.

(Replaces the earlier tabbed split-card block, per owner revision.)

---

## 7. Program index ("Beyond the mic") [SEEN]

Design principle: **change the rhythm, not the language.** Phase 5 already spends the
three-up editorial card pattern on content, so the utility layer (newsletter, playbook,
community) becomes a quiet directory instead of a second grid of cards. Cards for
reading, a list for doing.

- Heading holds a narrow left column on `xl+`; the program list runs down the right
  (5/7 split at 1440: title column ~400px, list ~590px). Below `xl` the heading sits
  full-width above the list.
- The list is three rows divided by hairlines, with a hairline closing the top and
  bottom. The rules only span the list column, so the section reads as an editorial
  index rather than another panel.
- Each row: a 44px stamped glyph tile (envelope / download / conversation) → tag
  (10px, tracked, `--quiet`) → title (17-20px semibold) → one or two lines of quiet
  body. The action link is right-aligned in its own column on `sm+`, under the copy
  on mobile, with the same chevron as Phase 5.
- Rows are generous (about 130-155px tall at 1440) and free of shadows, borders and
  fills, so the eye reads the section as a single object.
- Glyphs are hand-drawn 20px strokes; no cover art, no second set of images.
- Row ids (`#newsletter`, `#playbook`, `#community`) are real in-page anchors for the
  nav, the Phase 5 playbook link and the closing CTA.

Behavior:
- The heading and each row reveal on scroll: fade + 20px rise, once, 100ms stagger.
- Link hover: color to `--accent`, 200ms. No row lift, no background change.

(Replaced the earlier white-card version after the owner flagged that two three-up
card rows in a row read as a repeat. Wire rows to real destinations when they exist.)

---

## 8. Dark video emphasis triptych ("Listener stories") [SEEN]

Layout:
- Full-bleed `--dark` section. The nav turns light/frosted once you're over a light background but stays above this dark section.
- Heading top-left: two-tone H2 (line 1 near-white, line 2 `--dark-muted`).
- Prev/next as plain chevrons, top right, plus a small pause toggle to the left of them.
  No circles, no borders. The pause toggle only exists when auto-advance is possible.
- **Three square (`aspect-square`) video cards** in a row from `sm` up: about 330px at
  1440, 256px at 1024, 232px at 768. Gap `clamp(12px, 1.4vw, 20px)`.
- **Beneath each card:** a label aligned left (white/70) and a small stat aligned right
  (white/55 — AA on `--dark`; `--dark-muted` fails contrast here). The caption wraps in
  the same column as its card.

Adaptation (deliberate): the reference slides a wider strip of portrait cards. We only
have three host clips and no testimonials, so sliding three-of-three would just show the
same three cards again. The triptych therefore keeps all three visible and **advances
emphasis instead of position** at `sm` and up. Below `sm` the row becomes a snap-swipe
strip with one card and a peek, which is where sliding is genuinely useful.

Behavior:
- **Auto-advance** every 4.5s (`sm` and up only). Each step brightens the next card.
  Pauses on hover, on focus inside the row, on the user's pause toggle, when the section
  is off screen, and when the tab is hidden. Auto-advance is off entirely under
  `prefers-reduced-motion` or at/under 640px.
- **Active card:** full brightness. Other cards carry a `--dark` overlay at 50% opacity.
  The change crossfades over 400ms with the standard easing.
- **Hover:** the hovered card clears its overlay (so a second card can be inspected), and
  a tiny "Watch" chip fades in top-right over 200ms. No lift, no scale, no border.
- **Swipe (below `sm`):** cards are `snap-start` with `scroll-pl-6`, so the first card
  starts at the container inset; scrolling recomputes which card is emphasized.

Videos:
- Muted, looping, `playsinline`, `preload="metadata"`, one `<video>` per card with a
  matching poster. Only play while the section is on screen; pause everything when the
  tab is hidden.
- Under 640px, with `prefers-reduced-motion`, or with `saveData`, render the poster image
  instead of a `<video>`. Posters are 960x540 JPEGs generated from a frame of each clip,
  so the fallback shows real footage.

For PM Talks: no real listener testimonials yet, so the three slides are host clips —
"Behind the mic", "How we pick guests", "What a recording day looks like". Swap in
listener stories and real stats when they exist.

---

## 9. CTA + footer [CTA SEEN, footer pending]

CTA:
- Full-bleed `--bg` section closing the page after the dark stories band.
- **Hairline frame:** vertical rules at the content edges (`lg` and up) run the full
  section height, and a band closes with a hairline top and bottom. The rules extend past
  the copy, so the CTA reads as a printed panel rather than another card. Below `lg` the
  vertical rules are dropped; the horizontal band stays.
- **Glow:** a barely visible blue glow rises from the bottom edge, centered, with a soft
  white focal wash behind the copy (`.cta-glow` in globals.css). No animation.
- Centered copy: the standard section-H2 two-tone treatment (`SectionHeading`:
  Instrument Serif 400, `clamp(24px, 2.1vw, 34px)`, line-height 1.15; line 1 `--ink`,
  line 2 italic `--muted`), then one sentence of 15px `--quiet` body, then the buttons.
  The CTA deliberately uses the same H2 scale as every other section.
- **Two buttons side by side, equal width** (`clamp(148px, 16vw, 230px)`),
  42-48px tall, 3px radius, separated by a small gap (`clamp(12px, 1vw, 16px)`).
  Left button is `--btn-light` fill, right is `--surface` white; on hover each steps one
  token darker (`--line` / `--bg`). Labels: Subscribe · Sponsor the show.
- Generous but not endless space above and below: outer padding `clamp(40px, 4.6vw, 64px)`,
  inner band padding `clamp(44px, 5.2vw, 78px)`. The copy block is one `Reveal`
  (fade + 20px rise), not a staggered sequence.
- Until real signup and sponsor destinations exist, Subscribe points at the newsletter
  row (`#newsletter`) and Sponsor the show at `#sponsor` (still unresolved on the page).

Footer:
- `--footer` background, noticeably warmer than the page, with a soft shadow line where it meets the CTA.
- Logo far left. Six small columns (Explore, Resources, Company, Get started, Security, Legal) in tiny gray type. Social icons bottom-left. Long, tiny legal paragraph beneath.
- **Giant wordmark:** only the top half is visible, cut off by the bottom edge of the page, in `--ghost`. For PM Talks: "PM TALKS" at about 22vw, `overflow: hidden` on the footer, text pushed down so about 45% is clipped.

---

## 10. Page-wide behavior

- **Smooth, inertial scrolling** [SEEN, feels like Lenis]. Use Lenis with `lerp: 0.1`. Disable it for `prefers-reduced-motion`.
- **Nav state:** transparent with white text over the hero, switching to `.nav-light` once you pass about 80% of the hero height. The right-most "Start now" button flips from white-on-dark to dark-on-light at the same time. Animate over 250ms.
- **Section reveals:** headings and cards fade and rise 16-24px, once, at about 15% in view.
- **No parallax, no heavy effects.** The luxury feel comes from restraint: few moving parts, lots of space, slow easing.

Default easing: `cubic-bezier(0.22, 1, 0.36, 1)`. Default durations: 250ms for UI state, 500-700ms for reveals, 700ms for clip crossfades.

---

## 11. Build order for opencode (with video-specific prompts)

1. **Tokens + fonts + Lenis** in a base layout. Add the tokens above to `AGENTS.md`.
2. **Hero:** "N stacked looping videos from /public/videos, crossfade every 4.5s, synced rotating quote, dark overlay, `.glass-dark` Contact Sales button touching a solid `--btn-light` Start now, announcement strip, transparent nav with a glass dropdown on 'Topics'."
3. **Nav scroll state** + dropdown.
4. **Platform logo grid** with hairlines and episode-preview popovers.
5. **Latest episodes** list + toast chips + large rounded player panel.
6. **Tabbed topic explorer** with auto-advance, expanding rows, and blush panel.
7. **Beyond the mic** cards.
8. **Dark emphasis triptych** (three visible clips, auto-advance emphasis, hover "Watch" chip, swipe strip below `sm`).
9. **CTA + footer + clipped wordmark.**
10. **Polish:** reduced-motion, mobile (stack the tab panel under the tabs, make the carousel swipeable, show posters instead of video under 640px), Lighthouse pass.

---

## 12. Open questions for you

1. Which video file goes with which hero clip, and which are for the dark carousel? Give me the file names.
2. How many hero clips do you have? (The reference rotates through six.)
3. Do any of your clips have audio or people speaking? Hero clips should be muted.
4. Do you want the episode-preview popovers on the platform grid, or a simpler version?
5. Are the carousel clips real listeners or host clips?

---

## 13. Check on the live site (so opencode can match exactly)

Open dev tools on the reference and read: the hero clip interval, the tab auto-advance interval, the carousel speed and easing, the exact blur and tint values on the glass button, the dropdown's backdrop-filter, and the font names. Paste any of these back and I'll update this file with the exact numbers.
