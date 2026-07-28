import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
  const posts = await getCollection("broadcasts", ({ data }) => data.draft !== true);
  const sorted = posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: "Exosphere — Broadcasts",
    description:
      "Postcards, notes, and field reports from a small studio building joyful software.",
    site: context.site,
    items: sorted.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      link: `/broadcasts/${entry.id}/`,
      author: entry.data.author,
      categories: entry.data.tags,
    })),
    customData: "<language>en-gb</language>",
  });
}
