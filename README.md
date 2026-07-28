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
- **Vanilla CSS**: Used for styling with tokens, components, and base styles.
- **TypeScript**: Typed JavaScript for better development experience.

## 📡 The Signals landing page

The landing page (`/`) is a numbered catalogue of the studio's values — one
flat, saturated colour and nothing but a list of type.

- It is generated from the **Craft** collection: `src/components/signals/SignalList.astro`
  reads `src/content/craft/`, sorts by the `order` frontmatter, and numbers the
  entries `01`, `02`, … Add or reorder a Craft entry and the landing page
  renumbers itself. `00. Start here` is the one hard-coded signal (→ `/about`).
- Each row links to the full essay at `/craft/<slug>`.
- The background hue is picked per page load from `src/data/signal-themes.ts` by
  a small inline script in `BaseLayout.astro`, before first paint, never
  repeating the previous load in the session. With JS off it stays black.
- Styles live in `src/styles/signals.css`, scoped entirely under
  `.signals-page`. The starfield canvas and the standard footer are swapped out
  via `variant="signals"` on `BaseLayout`.

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
