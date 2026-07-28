/**
 * Flat, saturated background hues for the Signals landing page.
 *
 * One is picked at random per page load (never the same as the previous load
 * in the session — see the inline script in BaseLayout.astro). Stored as
 * "r, g, b" triples so CSS can compose them at partial alpha, the way the
 * dimmed rows and the header/footer gradient fades need.
 *
 * Palette theme: upper atmosphere — aurora, twilight, sunrise at altitude.
 * All hues are held at a mid luminance so that both white text and the
 * 43.75%-white dimmed text stay legible on top.
 */
export const signalThemes = [
  "214, 64, 145", // aurora magenta
  "150, 78, 240", // violet
  "104, 106, 240", // periwinkle
  "28, 96, 224", // deep blue
  "0, 143, 176", // cyan
  "23, 145, 106", // aurora green
  "124, 148, 34", // lichen
  "212, 148, 12", // amber
  "230, 106, 26", // sunrise orange
  "206, 62, 58", // mars red
  "160, 74, 132", // plum
  "66, 92, 170", // nautical twilight
] as const;
