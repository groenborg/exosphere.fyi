// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://exosphere.studio",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
