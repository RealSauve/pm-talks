/**
 * ALL copy lives here, typed. Components read from it — no hard-coded copy in JSX.
 * Source: /docs/PM-TALKS-COPY.md, overridden where noted by /docs/PM-TALKS-MOTION-SPEC.md
 * (motion spec wins: near-square 3px buttons, dark smoked glass, rotating hero clips).
 * Placeholders stay visibly [BRACKETED] until real information replaces them.
 * Never invent names, quotes, stats, awards or listener numbers.
 */

export interface VideoClip {
  src: string;
  /** Poster image (required per AGENTS.md video rules). Posters do not exist yet. */
  poster: string | null;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ButtonSpec {
  label: string;
  variant: "glass" | "solid-light" | "solid-white" | "solid-dark" | "outline-light";
  href: string;
}

/* ---- Phase 5 editorial feature cards ----
   Cover art is built from type + tokens (no stock imagery, no brand marks). */
export type FeatureCover = "minimal" | "badge" | "report";

export interface FeatureCard {
  id: string;
  /** Small pill in the cover's top-left corner (only card 1 uses it). */
  badge?: string;
  title: string;
  summary: string;
  link: { label: string; href: string };
  cover: FeatureCover;
}

/* ---- Phase 6 program rows ("Beyond the mic") ----
   A hairline directory, not a second card grid: rows carry a stamped glyph
   instead of cover art so the rhythm after Phase 5 changes shape. */
export type ProgramIcon = "mail" | "download" | "chat";

export interface ProgramCard {
  /** Anchor target: nav "Newsletter"/"Community" and the CTA link here. */
  id: string;
  tag: string;
  title: string;
  body: string;
  link: { label: string; href: string };
  icon: ProgramIcon;
}

/* ---- "Where to listen" grid cells ----
   Placeholder logos from simple-icons; before launch swap each for the
   platform's official badge and check its brand guidelines. */
export interface ListenCell {
  id: string;
  name: string;
  /** simple-icons slug; null = render the name as text only (no glyph). */
  iconSlug: string | null;
  href: string;
}

/* ---- 10. Footer ----
   `href: null` = real destination not supplied yet. The footer renders those as
   plain text rather than shipping a dead link; swap in URLs when they exist. */
export interface FooterLink {
  label: string;
  href: string | null;
}

export interface FooterSocial {
  label: string;
  /* LinkedIn is not in simple-icons (removed there); add it with an official
     asset if the show has one. */
  icon: "youtube" | "instagram" | "x";
  href: string | null;
}

export const site = {
  /* ---- 1. Top announcement bar ---- */
  announcement: {
    text: "New episode every Tuesday.",
    linkLabel: "Listen now",
    href: "#listen",
  },

  /* ---- 2. Navigation ----
     Button shape: near-square 3px radius (motion spec section 0, overrides the
     copy file's "solid white pill"). */
  nav: {
    links: [
      { label: "Topics", href: "#topics" },
      { label: "Episodes", href: "#episodes" },
      { label: "Guests", href: "#guests" },
      { label: "Newsletter", href: "#newsletter" },
      { label: "Community", href: "#community" },
      { label: "About", href: "#about" },
    ] as NavLink[],
    sponsor: { label: "Sponsor", href: "#sponsor" },
    listenNow: { label: "Listen now", href: "#listen" },
  },

  /* ---- 3. Hero (video background) ----
     Rotating clips: each clip pairs with one quote; headline and buttons stay put
     (motion spec section 3). The six quotes are unattributed brand lines from the
     motion spec — safe without guest permission; swap for real guest quotes later
     with name and permission. */
  hero: {
    quotes: [
      "The best product thinking happens out loud.",
      "Roadmaps are promises. Treat them that way.",
      "Talk to customers before you talk to slides.",
      "Great PMs ask the better question.",
      "Influence is a skill. Here's how it's built.",
      "Ship less. Learn more.",
    ] as string[],
    headline: {
      line1: "Conversations for PMs",
      line2: "who build products.",
    },
    support:
      "Candid, unscripted talks with the product leaders shaping how software gets made.",
    buttons: [
      { label: "Sponsor the show", variant: "glass", href: "#sponsor" },
      { label: "Listen now", variant: "solid-light", href: "#listen" },
    ] as ButtonSpec[],
    /** Video overlay per motion spec section 2: dark gradient + slight vignette. */
    overlay:
      "linear-gradient(to bottom, rgba(0,0,0,.25), rgba(0,0,0,.45))",
    clips: [
      { src: "/videos/Hero section video.mp4", poster: null },
    ] as VideoClip[],
  },

  /* ---- 4. Where to listen (replaces the customer-logo grid) ----
     21 cells: 6 columns x 3 rows, then the final row (label spans 3 cells +
     3 more cells). Placeholder logos from simple-icons; before launch swap
     each for the platform's official badge and check its brand guidelines. */
  listen: {
    label: "Available everywhere you listen",
    cells: [
      { id: "spotify", name: "Spotify", iconSlug: "spotify", href: "[PLATFORM LINK]" },
      { id: "apple-podcasts", name: "Apple Podcasts", iconSlug: "applepodcasts", href: "[PLATFORM LINK]" },
      { id: "youtube", name: "YouTube", iconSlug: "youtube", href: "[PLATFORM LINK]" },
      { id: "youtube-music", name: "YouTube Music", iconSlug: "youtubemusic", href: "[PLATFORM LINK]" },
      { id: "amazon-music", name: "Amazon Music", iconSlug: null, href: "[PLATFORM LINK]" },
      { id: "audible", name: "Audible", iconSlug: "audible", href: "[PLATFORM LINK]" },
      { id: "iheart", name: "iHeart", iconSlug: "iheartradio", href: "[PLATFORM LINK]" },
      { id: "deezer", name: "Deezer", iconSlug: "deezer", href: "[PLATFORM LINK]" },
      { id: "overcast", name: "Overcast", iconSlug: "overcast", href: "[PLATFORM LINK]" },
      { id: "pocket-casts", name: "Pocket Casts", iconSlug: "pocketcasts", href: "[PLATFORM LINK]" },
      { id: "castbox", name: "Castbox", iconSlug: "castbox", href: "[PLATFORM LINK]" },
      { id: "podcast-addict", name: "Podcast Addict", iconSlug: "podcastaddict", href: "[PLATFORM LINK]" },
      { id: "tunein", name: "TuneIn", iconSlug: null, href: "[PLATFORM LINK]" },
      { id: "pandora", name: "Pandora", iconSlug: "pandora", href: "[PLATFORM LINK]" },
      { id: "podbean", name: "Podbean", iconSlug: null, href: "[PLATFORM LINK]" },
      { id: "castro", name: "Castro", iconSlug: "castro", href: "[PLATFORM LINK]" },
      { id: "player-fm", name: "Player FM", iconSlug: "playerfm", href: "[PLATFORM LINK]" },
      { id: "podchaser", name: "Podchaser", iconSlug: null, href: "[PLATFORM LINK]" },
      /* Final row */
      { id: "rss", name: "RSS", iconSlug: "rss", href: "[PLATFORM LINK]" },
      /* Generic hand-drawn envelope glyph (not a brand) — see the component. */
      { id: "newsletter", name: "Newsletter", iconSlug: null, href: "[PLATFORM LINK]" },
      { id: "podcast-index", name: "Podcast Index", iconSlug: "podcastindex", href: "[PLATFORM LINK]" },
    ] as ListenCell[],
    countriesLine: "Heard by product teams in [NUMBER] countries.",
  },

  /* ---- 5. Latest episodes (replaces "Applied AI research") ----
     Episode titles are written for the build (approved by the site owner).
     Guests, roles and companies stay [BRACKETED] until real. The divided list
     of 3 rows was removed from this block (heading + panel only). */
  episodes: {
    heading: { line1: "Fresh from the studio,", line2: "latest episodes." },
    /** Static annotation until an episodes index page exists. */
    link: { label: "All episodes" },
    player: {
      label: "Now playing",
      title: "How to say no to a roadmap request without losing the room",
      guest: "with [GUEST NAME], [ROLE] at [COMPANY]",
      controls: ["Play", "15s back", "30s forward", "Speed", "Share"],
      chapters: [
        { time: "00:00", title: "Intro" },
        { time: "04:12", title: "The decision" },
        { time: "21:40", title: "What I'd do differently" },
      ],
    },
    /* Library preview inside the white panel: sidebar topics + a 3x3 card grid. */
    library: {
      allLabel: "All episodes",
      cards: [
        { title: "The roadmap review that actually changes the roadmap", topic: "Strategy" },
        { title: "Metrics that survive a skeptical CFO", topic: "Strategy" },
        { title: "What a good discovery interview sounds like", topic: "Discovery" },
        { title: "Why users say one thing and do another", topic: "Discovery" },
        { title: "Shipping on a two-week rhythm without the crunch", topic: "Execution" },
        { title: "When to kill a feature you fought for", topic: "Execution" },
        { title: "Influence without a title", topic: "Leadership" },
        { title: "Hiring your first PM: what to look for", topic: "Leadership" },
        { title: "Getting promoted without becoming a manager", topic: "Career" },
      ],
    },
  },

  /* ---- 6. Topic explorer (3-column editorial feature grid) ----
     Replaces the tabbed split-card block (owner request): three equal cards,
     bare on the page background, with token-built cover art. */
  topics: {
    heading: {
      line1: "Everything a PM needs,",
      line2: "one conversation at a time.",
    },
    /** Static annotation until a topic index page exists. */
    link: { label: "Browse topics" },
    features: [
      {
        id: "product-leadership-playbook",
        badge: "New",
        title: "The 2026 Product Leadership Playbook",
        summary:
          "How top Heads of Product structure roadmaps, align with executives, and protect team focus when priorities shift mid-quarter.",
        link: { label: "Read guide", href: "#playbook" },
        cover: "minimal",
      },
      {
        id: "saying-no",
        title: "Saying No Without Losing the Room",
        summary:
          "Our most-shared conversation on pushing back against stakeholder feature requests while keeping executive trust intact.",
        link: { label: "Listen now", href: "#listen" },
        cover: "badge",
      },
      {
        id: "discovery-habit",
        title: "Discovery Is a Habit, Not a Phase",
        summary:
          "Practical frameworks from 40+ product leaders on running continuous weekly customer interviews alongside active delivery.",
        link: { label: "Explore series", href: "#episodes" },
        cover: "report",
      },
    ] as FeatureCard[],
    /* Topic labels still used by the episode panel sidebar + nav dropdown. */
    tabs: [
      { label: "Strategy" },
      { label: "Discovery" },
      { label: "Execution" },
      { label: "Leadership" },
      { label: "Career" },
    ],
  },

  /* ---- 7. Beyond the mic (three program rows) ----
     Hairline directory under the Phase 5 cards. The Playbook and Community
     rows are real in-page anchors; the newsletter row hands its Subscribe link
     to the footer form (`#newsletter`), which is the single signup target. */
  beyondTheMic: {
    heading: {
      line1: "Beyond the mic,",
      line2: "where the conversation continues.",
    },
    cards: [
      {
        id: "sunday-brief",
        tag: "NEWSLETTER",
        title: "The Sunday Brief",
        body: "One idea, one framework and one question to think about, every Sunday.",
        link: { label: "Subscribe", href: "#newsletter" },
        icon: "mail",
      },
      {
        id: "playbook",
        tag: "FREE DOWNLOAD",
        title: "The PM Playbook",
        body: "Templates and checklists pulled from our best episodes.",
        link: { label: "Get the playbook", href: "#playbook" },
        icon: "download",
      },
      {
        id: "community",
        tag: "COMMUNITY",
        title: "The Room",
        body: "A private space for PMs to trade notes, share wins and ask the hard questions.",
        link: { label: "Request access", href: "#community" },
        icon: "chat",
      },
    ] as ProgramCard[],
  },

  /* ---- 8. Listener stories (dark carousel of host clips) ----
     No real testimonials yet, so host-clip slides are used (copy file section 8
     fallback; motion spec section 8). Posters were generated from the first
     frames of each clip, so poster-only fallbacks still show real footage. */
  listenerStories: {
    heading: { line1: "PMs who press play", line2: "and keep growing." },
    slides: [
      {
        video: {
          src: "/videos/Video 1.mp4",
          poster: "/videos/Video 1.jpg",
        } as VideoClip,
        label: "Behind the mic",
        platform: "[PLATFORM]",
        stat: "[STAT]",
      },
      {
        video: {
          src: "/videos/Video 2.mp4",
          poster: "/videos/Video 2.jpg",
        } as VideoClip,
        label: "How we pick guests",
        platform: "[PLATFORM]",
        stat: "[STAT]",
      },
      {
        video: {
          src: "/videos/Video 3.mp4",
          poster: "/videos/Video 3.jpg",
        } as VideoClip,
        label: "What a recording day looks like",
        platform: "[PLATFORM]",
        stat: "[STAT]",
      },
    ],
  },

  /* ---- 9. Closing CTA ----
     Centered close under the dark stories section. Two buttons with a small
     gap: the gray fill first, the white one second (motion spec section 9 — on
     a light panel the reference's "glass" reads as white). Heading is split
     across two lines for the two-tone serif treatment; the words are unchanged. */
  closingCta: {
    heading: {
      line1: "Press play on your",
      line2: "next career move.",
    },
    body: "New episodes every Tuesday. Never miss one.",
    buttons: [
      { label: "Subscribe", variant: "solid-light", href: "#newsletter" },
      { label: "Sponsor the show", variant: "solid-white", href: "#sponsor" },
    ] as ButtonSpec[],
  },

  /* ---- 10. Footer ----
     Destination columns, legal links, small print and wordmark from copy file
     section 10. The newsletter card is the `#newsletter` target the nav, CTA
     and the Sunday Brief card all point at. Social destinations are still open.
     The tagline in the footer reuses `hero.support` above rather than inventing
     a second line. */
  footer: {
    newsletter: {
      label: "Newsletter",
      title: "The Sunday Brief",
    },
    columns: [
      {
        title: "Explore",
        links: [
          { label: "Episodes", href: "#episodes" },
          { label: "Topics", href: "#topics" },
          { label: "Guests", href: null },
          { label: "Playbook", href: "#playbook" },
        ],
      },
      {
        title: "Listen",
        links: [
          { label: "Spotify", href: "#listen" },
          { label: "Apple Podcasts", href: "#listen" },
          { label: "YouTube", href: "#listen" },
          { label: "RSS", href: "#listen" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: null },
          { label: "Host", href: null },
          { label: "Press kit", href: null },
          { label: "Contact", href: null },
        ],
      },
      {
        title: "Get involved",
        links: [
          { label: "Newsletter", href: "#newsletter" },
          { label: "Community", href: "#community" },
          { label: "Sponsor", href: null },
          { label: "Be a guest", href: null },
        ],
      },
    ] as { title: string; links: FooterLink[] }[],
    socials: [
      { label: "YouTube", icon: "youtube", href: null },
      { label: "Instagram", icon: "instagram", href: null },
      { label: "X", icon: "x", href: null },
    ] as FooterSocial[],
    legal: [
      { label: "Privacy", href: null },
      { label: "Terms", href: null },
      { label: "Cookies", href: null },
    ] as FooterLink[],
    copyright: "© 2026 PM Talks. All rights reserved.",
    disclaimer:
      "PM Talks is an independent podcast. Views expressed by guests are their own and do not represent their employers.",
    wordmark: "PM TALKS",
  },

  /* ---- 11. Microcopy ---- */
  microcopy: {
    subscribePlaceholder: "you@company.com",
    subscribeButton: "Join the Sunday Brief",
    subscribeSuccess: "You're in. See you Sunday.",
    subscribeError: "That email doesn't look right. Try again?",
    emptySearch: "Nothing yet on that. Suggest a topic",
    notFound: "This page took a day off.",
    notFoundLink: "Back to episodes",
    cookieBanner: "We use a few cookies to keep the site fast.",
    cookieAccept: "Accept",
    cookieDecline: "Decline",
  },

  /* ---- 12. SEO ---- */
  seo: {
    title: "PM Talks | The Podcast for Product Managers",
    description:
      "Candid conversations with product leaders on strategy, discovery, execution and career. New episodes every Tuesday.",
  },
} as const;
