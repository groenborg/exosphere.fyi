// @ts-check

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://exosphere.studio",
  integrations: [mdx(), sitemap()],
  /* Old URLs kept alive after the renames: Transmissions → Broadcasts,
     Craft → Objectives, and the retired /craft index (the Mission page is the
     index now). */
  redirects: {
    "/craft": "/",
    "/craft/[...slug]": "/objectives/[...slug]",
    "/objectives": "/",
    "/transmissions": "/broadcasts",
    "/transmissions/tags": "/broadcasts/tags",
    "/transmissions/tags/[tag]": "/broadcasts/tags/[tag]",
    "/transmissions/[...slug]": "/broadcasts/[...slug]",
    // The one post whose own slug carried the old word.
    "/transmissions/hello-transmissions": "/broadcasts/hello-broadcasts",
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
