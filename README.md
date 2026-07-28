# Exosphere

Welcome to the Exosphere project! This is an [Astro](https://astro.build) project.

## 🚀 Project Structure

Inside of this project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── package.json
└── astro.config.mjs
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 🌟 Tech Stack

- **Astro**: For building fast content sites.
- **MDX**: For long-form posts in `src/content/transmissions/`.
- **Vanilla CSS**: Used for styling with tokens, base, layout, and page styles.
- **TypeScript**: Typed JavaScript for better development experience.

## 📡 The design

Every page shares one treatment: a single flat, saturated colour, white type,
and a header and footer that fade out of the ground rather than sitting on
bars. No surfaces, no borders, no cards, one typeface.

- The hue is picked per page load from `src/data/signal-themes.ts` by a small
  inline script in `BaseLayout.astro`, before first paint, never repeating the
  previous load in the session. With JS off it stays black.
- **One type scale** drives everything. `--font-size` sets the body size and
  every other size is a percentage of it (`--font-size-small`,
  `--font-size-xxx-large`, …), while spacing is expressed in `em` and
  `--line-height`. Both shift at the one breakpoint (`64em`, hover-capable
  pointers), so the whole site rescales from a handful of values in
  `tokens.css`.

### Stylesheets

| File          | Holds                                                        |
| :------------ | :----------------------------------------------------------- |
| `tokens.css`  | The scale, the colours, the fonts                            |
| `base.css`    | Reset and element defaults                                   |
| `layout.css`  | `.page` chrome, header, footer, and the shared primitives     |
| `prose.css`   | `.prose` — the body of an essay or transmission (MDX output) |
| `signals.css` | The landing list                                             |
| `made.css`    | The optional image column on `/made`                         |

Three primitives in `layout.css` cover nearly every page, so a new one rarely
needs new CSS:

- **`.page`** — a `.page__headline` (optional `h6` label, `h1`, lede) followed
  by either a `.page__body` of prose or a `.list`.
- **`.list`** — stacked entries behind `/made` and `/transmissions`:
  a meta line, a big linked title, a paragraph.
- **`.meta`** and **`.links`** — a dimmed line of facts (dates, tags, counts)
  and a row of onward links. Both size themselves relative to whatever
  container they sit in.

### The landing page — Signals

A numbered catalogue of the studio's values, and nothing else.

- It is generated from the **Craft** collection: `src/components/signals/SignalList.astro`
  reads `src/content/craft/`, sorts by the `order` frontmatter, and numbers the
  entries `01`, `02`, … Add or reorder a Craft entry and the landing page
  renumbers itself. `00. Start here` is the one hard-coded signal (→ `/about`).
- Each row is a disclosure: click (or tab to and press Enter on) a signal and
  its description unfolds in place, with a `Read in full →` link on to the
  essay at `/craft/<slug>`. Only one signal is open at a time — the `<details>`
  elements share a `name`, so the browser closes the last one for us. No JS.
- Hovering (or tabbing to) one signal dims all the others; an open one stays
  lit.
- The open panel animates via `::details-content` + `interpolate-size`, and
  simply snaps open where that isn't supported.

### Made

`/made` is a stacked list rather than a grid: a dimmed meta line (type, year,
stack), the project name, a paragraph, and a row of links straight out to the
thing itself.

- Add `image: "/images/…"` to an entry in `src/content/made/` and it renders
  beside the text on wide screens, above it on narrow ones. Entries without an
  image are pure type — no placeholder art.
- `repo:` adds a "Read the source" link when it differs from `url:`.

### Craft

The Craft collection has no index of its own — the landing page *is* the index,
so `/craft/<slug>` just renders one essay. Numbering is derived from the
collection's `order` frontmatter in both places, so the signal numbers always
agree, and each essay links back to `/` ("All signals") plus its neighbours.

## ✉️ Writing a Transmission

Posts live in `src/content/transmissions/` as `.md` or `.mdx` files. The
collection schema is defined in `src/content.config.ts`.

```mdx
---
title: "Title of the post"
description: "Short summary — used on the listing and in RSS."
pubDate: 2026-05-22
author: "Exosphere"             # optional, defaults to "Exosphere"
tags: ["studio", "field-notes"] # optional, used by /transmissions/tags
draft: false                    # set true to hide from production builds
---

Post body in Markdown. In `.mdx` files you can also import and use Astro
components inline.
```

- The listing is at `/transmissions`, single posts at `/transmissions/<slug>`.
- Reading time is computed at build via a remark plugin.
- The RSS feed is exposed at `/rss.xml`.
- `draft: true` posts show up locally (`npm run dev`) and are excluded from
  production builds, the RSS feed, and the sitemap.
