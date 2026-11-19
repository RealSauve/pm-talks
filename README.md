# PM Talks

A single-page marketing site for **PM Talks**, a podcast for product managers. Minimal, modern, and deliberately restrained: serif display type, generous whitespace, dark smoked-glass UI, and slow motion.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- `motion` (Framer Motion) for reveals and UI state
- `lenis` for smooth scrolling
- Geist and Instrument Serif via `next/font`
- `simple-icons` for platform marks

## Local development

Requires Node.js 22 (see `.nvmrc`).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run lint
npm run build
```

The site is configured as a **static export** (`output: "export"` in `next.config.ts`), so `npm run build` writes the deployable site to `out/`.

## Content and design

- All copy lives in `content/site.ts`. Components read from it; no copy is hard-coded in JSX.
- Placeholders are intentionally marked `[LIKE THIS]`.
- Design tokens, the shared frame/inset, glass styles, and motion rules live in `app/globals.css` and the section components.
- Project conventions are documented in `AGENTS.md` and `docs/`.

## Deploying

The project deploys to Netlify as a static site. `netlify.toml` sets the build command, Node version, publish directory, and caching headers.

```bash
npx netlify-cli deploy --build --prod
```

Or connect the repository in the Netlify dashboard and let every push to `main` deploy automatically.

## License

MIT — see [LICENSE](LICENSE).
