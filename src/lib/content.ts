import { type CollectionEntry, render } from "astro:content";

/**
 * Shared helpers for reading the content collections.
 */

/**
 * The draft rule, in one place: a `draft: true` entry is visible while you're
 * writing (`npm run dev`) and dropped from production builds. Pass it straight
 * to `getCollection` — `getCollection("objectives", isPublished)`.
 *
 * The RSS feed deliberately doesn't use this: a draft never belongs in a feed,
 * dev or not.
 */
export const isPublished = ({ data }: { data: { draft?: boolean } }) =>
  import.meta.env.PROD ? data.draft !== true : true;

/** A broadcast flattened for listing: its frontmatter, slug, and reading time. */
export type BroadcastItem = CollectionEntry<"broadcasts">["data"] & {
  id: string;
  minutesRead?: string;
};

/**
 * Flatten broadcasts for `<BroadcastList>`. Reading time is computed at build
 * by the remark plugin, so it only exists once the entry has been rendered.
 */
export const toBroadcastItems = (entries: CollectionEntry<"broadcasts">[]) =>
  Promise.all(
    entries.map(async (entry): Promise<BroadcastItem> => {
      const { remarkPluginFrontmatter } = await render(entry);
      return {
        id: entry.id,
        ...entry.data,
        minutesRead: remarkPluginFrontmatter?.minutesRead as string | undefined,
      };
    })
  );

/** Newest first — the order every broadcast listing uses. */
export const byNewest = (a: CollectionEntry<"broadcasts">, b: CollectionEntry<"broadcasts">) =>
  b.data.pubDate.getTime() - a.data.pubDate.getTime();

/**
 * The authored order of the Objective entries. The Mission page and each essay's
 * prev/next both number from this, so they can't disagree.
 */
export const byOrder = (a: CollectionEntry<"objectives">, b: CollectionEntry<"objectives">) =>
  a.data.order - b.data.order;
