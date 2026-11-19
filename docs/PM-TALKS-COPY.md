# PM Talks: Site Copy, Tokens & Build Notes

Brand: **PM Talks**. A podcast for product managers.
Tone: calm, confident, editorial. Short sentences. No hype words. Minimal, modern, luxury.
Anything in [BRACKETS] is a placeholder you must replace with real information. Do not ship placeholders.

---

## 0. Design tokens (estimated from the reference screenshot)

These are visual estimates. Confirm by eyedropper or dev tools on the reference and adjust.

| Token | Value | Use |
|---|---|---|
| --bg | #F7F6F2 | Page background (warm off-white) |
| --surface | #FFFFFF | Cards, product panel |
| --ink | #111111 | Primary text |
| --muted | #8B8B86 | Second line of headings, captions |
| --line | #E6E4DE | 1px borders, grid lines |
| --dark | #0A0A0A | Testimonial/dark section |
| --dark-ink | #F4F3EF | Text on dark |
| --ghost | #ECEAE4 | Giant footer wordmark |
| --accent | #1D4ED8 | Tiny accents only: NEW tags, send button, focus rings |

Type: light grotesk (Geist or Inter Tight). Headlines weight 300, tracking -0.02em, line-height 1.05. Body weight 400, 16/26. Small labels 12px, tracking +0.04em.
Radius: 12px cards, 999px buttons. Shadows: very soft, e.g. 0 20px 60px rgba(0,0,0,0.06).
Glass: rgba(255,255,255,0.12) + blur(16px) + 1px rgba(255,255,255,0.25) border.

---

## 1. Top announcement bar
**New episode every Tuesday. Listen now →**

## 2. Navigation
Logo (PM Talks) | Episodes · Topics · Guests · Newsletter · Community · About
Right side: **Sponsor** (text link) · **Listen now** (solid white pill)

## 3. Hero (video background)
Small quote line (muted, above headline):
> "The best product thinking happens out loud."

Headline (two tones):
**Conversations for PMs**
**who build products.** *(second line in muted tone)*

Supporting line:
Candid, unscripted talks with the product leaders shaping how software gets made.

Buttons:
- Glass: **Sponsor the show**
- Solid white: **Listen now**

Video: hero loop with dark gradient overlay (top 0%, bottom 45%).

## 4. Where to listen (replaces customer-logo grid)
Label: **Available everywhere you listen**
(Set as a single-line section H2 at the standard display scale, centered above the grid.)

Logo grid, 12 cells: Spotify, Apple Podcasts, YouTube, Overcast, Pocket Casts, Amazon Music, Castbox, iHeart, Deezer, Podcast Addict, RSS, Newsletter.
Last row, centered: **Heard by product teams in [NUMBER] countries.** Use a real figure only.

## 5. Latest episodes (replaces "Applied AI research")
Heading: **Fresh from the studio,**
*latest episodes.*
Right link: **All episodes →**

List (three rows, date + NEW tag on the newest): **not used** — this block is heading + panel only; the divided list was removed. Titles kept here for reference:
1. **How to say no to a roadmap request without losing the room** · [DATE] · NEW
2. **Discovery is not a phase: building a weekly customer habit** · [DATE]
3. **From PM to Head of Product: what changes, what doesn't** · [DATE]

Featured player card (large rounded panel, replaces the product screenshot):
- Label: **Now playing**
- Title: [EPISODE TITLE]
- Guest line: with [GUEST NAME], [ROLE] at [COMPANY]
- Controls: play, 15s back, 30s forward, speed, share
- Chapter list (3 visible): 00:00 Intro · 04:12 The decision · 21:40 What I'd do differently

Floating chip over the card: **not used** — no floating cards in this block.

## 6. Topic explorer (3-column editorial feature grid; replaces "Automate the entire revenue cycle")
Heading: **Everything a PM needs,**
*one conversation at a time.*
Right link: **Browse topics →** (static annotation until topic pages exist)

Three equal cards, bare on the page background (3:2 cover, headline, summary, bottom link):

**Card 1** — NEW pill
**The 2026 Product Leadership Playbook**
How top Heads of Product structure roadmaps, align with executives, and protect team focus when priorities shift mid-quarter.
**Read guide →**

**Card 2** — cover shows a centred white badge: **PM TALKS · TOP EPISODE · 2025**
**Saying No Without Losing the Room**
Our most-shared conversation on pushing back against stakeholder feature requests while keeping executive trust intact.
**Listen now →**

**Card 3** — cover shows a dark editorial report cover
**Discovery Is a Habit, Not a Phase**
Practical frameworks from 40+ product leaders on running continuous weekly customer interviews alongside active delivery.
**Explore series →**

Cover art is built from type + tokens (no stock imagery). Topic labels used by the
episode panel sidebar and the nav dropdown: Strategy · Discovery · Execution · Leadership · Career.

## 7. Beyond the mic (program index, three rows)
Heading: **Beyond the mic,**
*where the conversation continues.*

Laid out as a hairline directory: the heading holds the left column on wide screens and
the three programs run down the right, one row each. No second card grid.

Row 1: tag **NEWSLETTER**
**The Sunday Brief**
One idea, one framework and one question to think about, every Sunday. **Subscribe →**

Row 2: tag **FREE DOWNLOAD**
**The PM Playbook**
Templates and checklists pulled from our best episodes. **Get the playbook →**

Row 3: tag **COMMUNITY**
**The Room**
A private space for PMs to trade notes, share wins and ask the hard questions. **Request access →**

Row ids double as in-page anchors (`#newsletter`, `#playbook`, `#community`) until real
destinations exist. Each row carries a stamped stroke glyph (mail, download, conversation);
no cover art.

## 8. Listener stories (dark section with three video cards)
Heading: **PMs who press play**
*and keep growing.*
Controls: pause / previous / next.

Built state: three square host clips stay visible together; arrows and auto-advance move
emphasis from one card to the next. Captions under each card:
- **Behind the mic** · [STAT]
- **How we pick guests** · [STAT]
- **What a recording day looks like** · [STAT]
`[STAT]` stays a placeholder until real numbers exist.

When real listener stories arrive, replace the host clips. Each card then carries a name,
role and short line. These must be real people who gave permission. Template:
- Card 1: "[REAL QUOTE]" ... [NAME], [ROLE]
- Card 2: "[REAL QUOTE]" ... [NAME], [ROLE]
- Card 3: "[REAL QUOTE]" ... [NAME], [ROLE]
Bottom of each card: [small stat, e.g. "Listening since 2025" or "Promoted to Senior PM"].

## 9. Closing CTA
Heading: **Press play on your**
*next career move.*
(The copy is one sentence; it is split across two lines for the two-tone serif
treatment. Keep the words exactly as written.)

Body: New episodes every Tuesday. Never miss one.
Buttons: **Subscribe** (gray fill) · **Sponsor the show** (white). They sit side by side
with a small gap, equal width. Subscribe resolves to the newsletter row (`#newsletter`)
until a real signup exists; Sponsor the show targets `#sponsor`, which still has no
destination on the page.

## 10. Footer
Logo.
Columns:
- **Explore**: Episodes · Topics · Guests · Playbook
- **Listen**: Spotify · Apple Podcasts · YouTube · RSS
- **Company**: About · Host · Press kit · Contact
- **Get involved**: Newsletter · Community · Sponsor · Be a guest
- **Legal**: Privacy · Terms · Cookies

Small print:
© 2026 PM Talks. All rights reserved. PM Talks is an independent podcast. Views expressed by guests are their own and do not represent their employers.

Giant faded wordmark across the bottom: **PM TALKS** (color --ghost).

---

## 11. Microcopy
- Subscribe form placeholder: **you@company.com** · button **Join the Sunday Brief**
- Success: **You're in. See you Sunday.**
- Error: **That email doesn't look right. Try again?**
- Empty search: **Nothing yet on that. Suggest a topic →**
- 404: **This page took a day off.** **Back to episodes**
- Cookie banner: **We use a few cookies to keep the site fast. Accept / Decline**

## 12. SEO
- Title: PM Talks | The Podcast for Product Managers
- Meta description: Candid conversations with product leaders on strategy, discovery, execution and career. New episodes every Tuesday.
- OG image: logo on --dark, headline in light weight.

---

## 13. Video-to-section map (fill in your file names)
| Section | File | Notes |
|---|---|---|
| Hero | /public/videos/[hero].mp4 | Loop, muted, poster required |
| Listener stories, slide 1 | /public/videos/[s1].mp4 | |
| Listener stories, slide 2 | /public/videos/[s2].mp4 | |
| Listener stories, slide 3 | /public/videos/[s3].mp4 | |
| Optional: Beyond the mic cards | stills only | Keep the page light |

Keep each file under about 6 MB, no audio, with a poster image per video.

---

## 14. Still needed from you before building
1. Host name(s), a short bio and a headshot.
2. Real episode list (titles, dates, guest names, audio or RSS feed URL).
3. Platform links (Spotify, Apple, YouTube, etc.).
4. Logo as SVG, with a light version and a dark version.
5. Sponsorship contact email and any media kit.
6. Newsletter tool (Beehiiv, Substack, ConvertKit, etc.) and its embed or API.
7. Domain name and hosting choice (Vercel is simplest).
8. Whether episodes pull automatically from RSS or are managed in a CMS.
9. Real listener quotes, with permission.
10. Analytics preference (Plausible, GA4).

## 15. Notes for opencode
- Build sections in the order above; test each against its cropped reference.
- Motion last: scroll reveals, nav that turns solid on scroll, tab auto-advance (6s), carousel, logo-grid fade.
- Respect prefers-reduced-motion and show posters on mobile.
