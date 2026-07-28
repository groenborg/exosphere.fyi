/**
 * The site's two date forms. Long in a masthead, where the date is one of a
 * handful of facts about the piece; short in a list, where it's a column.
 */

/** "July 28, 2026" */
export const longDate = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" });

/** "28 Jul 2026" */
export const shortDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
