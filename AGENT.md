# AGENT.md — Exosphere

Static content site for the Exosphere studio (https://exosphere.studio), built
with Astro 7 + MDX, vanilla CSS, TypeScript, and Biome. No framework
components, no CSS framework, no test suite.

`README.md` is the long-form design and authoring guide — read it before making
design or content decisions. This file is the operating manual.

## Commands

```bash
npm install          # Node >= 24.15.0
npm run dev          # dev server on localhost:4321
npm run build        # production build to ./dist/
npm run preview      # serve the built site
npm run lint         # Biome, report only
npm run check        # Biome lint + format, writes fixes
npm run astro check  # Astro + TypeScript diagnostics
```

`npm run format` and `npm run check` rewrite files across the repo — prefer
`npm run lint` when you only want a report. There are no tests; verify work
with `npm run build` and `npm run astro check`.

## Layout

```
src/
  content/        broadcasts/ (posts), objectives/ (values essays), made/ (projects)
  content.config.ts   Zod schemas for all three collections
  pages/          routes; [...slug].astro for collection entries, rss.xml.js for the feed
  layouts/        BaseLayout (head, mesh, nav, footer) + Broadcast/Objective layouts
  components/     .astro only
  lib/            content helpers, dates, inlined mesh/theme scripts, reading-time remark plugin
  data/           static tables: nav-links.ts, mesh-palette.ts
  styles/         tokens, base, mesh, layout, prose, objectives, made, broadcast
public/           favicons, og.jpg, images/broadcasts/, images/made/
```

Do not edit `dist/`, `.astro/`, or `node_modules/` — all generated.

## Conventions

- **Astro components only.** No React/Vue/Svelte; interactivity is either CSS
  (`<details>` disclosures on the Mission page) or a small inlined script from
  `src/lib/` that runs before first paint.
- **Formatting** is Biome: 2 spaces, 100 col, double quotes, semicolons, ES5
  trailing commas, imports organised automatically.
- **TypeScript** extends `astro/tsconfigs/strict`. Keep new `src/lib` helpers
  typed and documented with the existing short doc-comment style.
- **Styling** goes through the tokens in `src/styles/tokens.css`: two colours
  (`--rgb-ground`, `--rgb-ink`), one type scale where every size is a
  percentage of `--font-size`, spacing in `em`, one breakpoint at `64em`. Never
  hard-code hex colours or px sizes. Prefer reusing the `.page`, `.list`,
  `.meta`, `.links` primitives in `layout.css` over adding a stylesheet.
- **New stylesheet?** It must be imported in `BaseLayout.astro`, which loads all
  of them.
- **Both themes.** Dark is the default; anything new must survive
  `data-theme="light"`. Mesh blobs need `--c-N`, `--d-N` and `--l-N` colours.
- **Drafts** use the shared `isPublished` filter from `src/lib/content.ts`
  (visible in dev, dropped from production builds and the sitemap). The RSS feed
  intentionally excludes drafts always.
- **Ordering** comes from `byOrder` / `byNewest` in `src/lib/content.ts`.
  Objective `order` values are authored in tens so new entries can slot between.
- **URLs are permanent.** Renaming a route means adding to the `redirects` block
  in `astro.config.mjs`; the existing entries keep the Transmissions → Broadcasts
  and Craft → Objectives renames alive.
- **Commits** are Conventional Commits: `feat:`, `fix:`, `chore:`, `build:`.

## Adding content

New broadcast → `src/content/broadcasts/<slug>.mdx` with frontmatter matching
the `broadcasts` schema in `src/content.config.ts` (`title`, `description`,
`pubDate` required). New objective → `src/content/objectives/<slug>.mdx` with an
`order`; the Mission page renumbers itself. New project → `src/content/made/`
with `name`, `description`, `url`; an optional `image` in `public/images/made/`
at ~800px wide and roughly 1.9:1.

Adding a top-level page means adding it to `src/data/nav-links.ts`, which drives
both the header and the footer.
