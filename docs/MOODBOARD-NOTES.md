# PM Talks — Moodboard Notes

Source: Figma file `52VWe1F3Z6mpsGdM40JB73`, node `101:82` (section "Moodboard").
Captured via Figma MCP on 2026-11-18: full-frame screenshot (8184×1557 canvas),
`get_design_context` on all 8 child nodes, and `get_variable_defs`.

> Capture status:
> - Screenshot: ✅ full frame + high-res source render of the reference page.
> - Design context: ✅ all 8 children are image-filled rounded rectangles
>   ("Landing page reference 1–8"), each cropping a single shared source render
>   (asset `5ca77.png`) — i.e., one full landing-page reference sliced into 8 crops.
> - Variable definitions: ✅ retrieved — **empty**. No Figma variables are defined
>   on this node; all color/type values below are read visually from the render.
> - The fallback images in `/docs/moodboard` referenced in the brief do not exist
>   in this workspace; the Figma moodboard is the only mood source.
> - `/docs/ref` layout crops also don't exist; the 8 moodboard crops serve as the
>   layout reference instead.
>
> **IP note:** the reference page belongs to another company (its brand, logos,
> partner names and wording are visible in the crops). Only the mood — palette,
> type feel, spacing, imagery style, texture — is extracted below. No names,
> logos, wording or footage from it may appear in the PM Talks build.

## Mood summary (10 bullets)

1. **Palette — warm ivory base.** Page background is a warm off-white/ivory,
   ≈ `#F2F1EC`–`#F4F3EF`. No pure white page; the cream-warm cast is consistent
   across every light section.
2. **Palette — near-black contrast band.** One full-width dark section (the
   video-stories band) sits at ≈ `#0E0E0E`–`#141414`. Dark is used as a single
   dramatic contrast band, not as a recurring theme.
3. **Palette — white cards on ivory.** Cards and panels are true white
   (`#FFFFFF`) with hairline borders (≈ `#E3E1DA`) against the ivory base —
   subtle elevation, no drop shadows.
4. **Palette — warm two-tone text.** Primary text ≈ `#1C1B18` (warm near-black);
   muted/secondary heading lines ≈ `#A3A29B` (warm gray). Headings use a
   **two-tone pattern**: first line muted gray, second line dark — a signature
   typographic device across sections.
5. **Type — compact neutral grotesque.** One sans family throughout, light-to-
   regular weights, tight tracking on display sizes (≈40–56px headings),
   ≈13–14px body, ≈11–12px micro-labels. No serif, no display contrast.
6. **Imagery — warm candid conversation.** Photo and video stills show real
   people mid-conversation in warm lamp-lit interiors (host/guest interview
   setups); warm amber/honey tones in every frame. Never studio-white,
   never corporate-bright. This is where all the color lives.
7. **Imagery — dark video cards.** The dark band holds a 3-up row of video
   stills (16:9-ish), each with a small brand wordmark bottom-left and a stat
   line; carousel arrows top-right. Cards are flush, no rounding of media.
8. **Buttons — small pills, low emphasis.** CTAs are compact pills: solid white
   pill with hairline border on light (and on dark), ghost/text secondary.
   One dark micro-chip CTA in the top nav. Radius is fully rounded on buttons.
9. **Layout — airy editorial grid.** Generous vertical section padding (≈120px+
   feel), content in a wide centered container, hairline full-width dividers
   between light bands; logo/stat strips use small centered items in rows of 6.
10. **Texture — flat, matte, quiet.** No gradients, noise or shadows anywhere;
    depth comes only from photography and the dark band. Footer echoes the
    brand with an oversized ghost watermark wordmark at very low opacity, and
    5 columns of tiny links above a hairline.

## Proposed token direction (PROPOSAL ONLY — not applied)

No `AGENTS.md` exists in this workspace, so there is no authored token set to
diff against. Values below are proposed from the moodboard render; they must be
reconciled with AGENTS.md once it is supplied.

```css
/* Proposed (pending AGENTS.md reconciliation) */
--background:      #F2F1EC;  /* ivory page base */
--surface-light:   #F7F6F2;  /* raised light section surface */
--surface-card:    #FFFFFF;  /* white card on ivory */
--foreground-dark: #0E0E0E;  /* near-black contrast band / dark glass base */
--foreground:      #1C1B18;  /* primary text on light */
--muted:           #A3A29B;  /* secondary/muted heading line */
--hairline:        #E3E1DA;  /* card + divider borders on light */
--accent-media:    #B98A5A;  /* warm amber from photography (accent only) */
```

**Diff basis note:** none — awaiting AGENTS.md to produce a real
`old → new` diff for approval.
