# Exosphere

Welcome to the Exosphere project! This is an [Astro](https://astro.build) project.

## 🚀 Project Structure

Inside of this project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   ├── components/
│   ├── content/     # the broadcasts, craft and made collections
│   ├── data/        # small static tables (nav links, mesh palette)
│   ├── layouts/
│   ├── lib/         # shared helpers (collections, dates, mesh script)
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
- **MDX**: For long-form posts in `src/content/broadcasts/`.
- **Vanilla CSS**: Used for styling with tokens, base, layout, and page styles.
- **TypeScript**: Typed JavaScript for better development experience.

## 📡 The design

Every page shares one treatment: a single flat, saturated colour, type in the
one ink, and a header and footer that fade out of the ground rather than
sitting on bars. No surfaces, no borders, no cards, one typeface.

- The ground is a five-blob radial mesh. Its hue is picked per page load from
  `src/data/mesh-palette.ts` by `src/lib/mesh-script.ts`, inlined into `<head>`
  and run before first paint, never repeating the previous load in the session.
  With JS off the fallback mesh in `mesh.css` stands in.
- **Two colours, two themes.** `--rgb-ground` and `--rgb-ink` carry the whole
  page: everything drawn on the ground is ink at some alpha, so swapping the
  pair inverts the site. Dark is the default; the switch in the bottom-right
  corner (`ThemeToggle.astro`) writes `data-theme` to `<html>` and remembers
  the choice, and `src/lib/theme-script.ts` re-applies it before first paint.
  Each mesh blob carries a colour per theme — `--c-N` dark, `--d-N` dark on a
  system that asks for dark, `--l-N` light — over one shared geometry.
- **One type scale** drives everything. `--font-size` sets the body size and
  every other size is a percentage of it (`--font-size-small`,
  `--font-size-xxx-large`, …), while spacing is expressed in `em` and
  `--line-height`. Both shift at the one breakpoint (`64em`, hover-capable
  pointers), so the whole site rescales from a handful of values in
  `tokens.css`.

### Stylesheets

| File             | Holds                                                     |
| :--------------- | :-------------------------------------------------------- |
| `tokens.css`     | The scale, the colours, the fonts                         |
| `base.css`       | Reset and element defaults                                |
| `mesh.css`       | The ground: blob geometry, grain, and the no-JS fallback   |
| `layout.css`     | `.page` chrome, header, footer, switch, shared primitives  |
| `prose.css`      | `.prose` — the body of an essay or broadcast (MDX output)  |
| `objectives.css` | The Mission list                                          |
| `made.css`       | The optional image column on `/made`                      |
| `broadcast.css`  | The centred single-article treatment                       |

Three primitives in `layout.css` cover nearly every page, so a new one rarely
needs new CSS:

- **`.page`** — a `.page__headline` (optional `h6` label, `h1`, lede) followed
  by either a `.page__body` of prose or a `.list`.
- **`.list`** — stacked entries behind `/made` and `/broadcasts`:
  a meta line, a big linked title, a paragraph.
- **`.meta`** and **`.links`** — a dimmed line of facts (dates, tags, counts)
  and a row of onward links. Both size themselves relative to whatever
  container they sit in.

### The landing page — Mission

A numbered catalogue of the studio's values — one **Objective** per value — and
nothing else. "Mission" is the page; an "Objective" is a row on it.

- It is generated from the **Craft** collection: `src/components/objectives/ObjectiveList.astro`
  reads `src/content/craft/`, sorts by the `order` frontmatter, and numbers the
  entries `01`, `02`, … Add or reorder a Craft entry and the page renumbers
  itself. `00. Start here` is the one hard-coded objective (→ `/about`).
- Each row is a disclosure: click (or tab to and press Enter on) an objective
  and its description unfolds in place, with a `Read in full →` link on to the
  essay at `/craft/<slug>`. Only one objective is open at a time — the
  `<details>` elements share a `name`, so the browser closes the last one for
  us. No JS.
- Hovering (or tabbing to) one objective dims all the others; an open one stays
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
- Those previews live in `public/images/made/` and are each project's own
  `og:image` where it has one, or a headless-Chrome screenshot of the site
  where it doesn't (Marginalia). Keep them ~800px wide, JPEG unless the art is
  flat, and roughly 1.9:1 — `made.css` crops whatever arrives to that ratio so
  the column stays even. The thumbnail link is `aria-hidden` with an empty
  `alt`: it repeats the title link, and a screenshot says nothing out loud.
- `repo:` adds a "Read the source" link when it differs from `url:`.

### Craft

The Craft collection has no index of its own — the Mission page *is* the index,
so `/craft/<slug>` just renders one essay, headed `Objective 07`. Numbering is
derived from the collection's `order` frontmatter in both places, so the
objective numbers always agree, and each essay links back to `/`
("All objectives") plus its neighbours.

## ✉️ Writing a Broadcast

Posts live in `src/content/broadcasts/` as `.md` or `.mdx` files. The
collection schema is defined in `src/content.config.ts`.

```mdx
---
title: "Title of the post"
description: "Short summary — used on the listing and in RSS."
pubDate: 2026-05-22
author: "Exosphere"             # optional, defaults to "Exosphere"
tags: ["studio", "field-notes"] # optional, used by /broadcasts/tags
draft: false                    # set true to hide from production builds
---

Post body in Markdown. In `.mdx` files you can also import and use Astro
components inline.
```

- The listing is at `/broadcasts`, single posts at `/broadcasts/<slug>`.
- Reading time is computed at build via a remark plugin.
- The RSS feed is exposed at `/rss.xml`.
- `draft: true` posts show up locally (`npm run dev`) and are excluded from
  production builds, the RSS feed, and the sitemap.
