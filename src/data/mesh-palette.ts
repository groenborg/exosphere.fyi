/**
 * Tint hues for the background mesh gradient.
 *
 * One hue is picked at random per page load (never the same as the previous
 * load in the session), sometimes joined by a second hue a little way around
 * the wheel — see the inline script in BaseLayout.astro. The mesh itself is
 * always anchored in true black; these are only the colours that bloom out of
 * it, so they carry the "which one did I get this time" of the old flat ground.
 *
 * Palette theme: upper atmosphere — aurora, twilight, sunrise at altitude.
 *
 * h/s drive the mesh blobs (lightness and alpha are generated per blob, and
 * differ between light and dark). `rgb` is the same hue as an "r, g, b" triple
 * for --rgb-theme, which CSS composes at partial alpha for accents.
 */
export const meshPalette = [
  { name: "aurora magenta", h: 328, s: 65, rgb: "214, 64, 145" },
  { name: "violet", h: 267, s: 84, rgb: "150, 78, 240" },
  { name: "periwinkle", h: 239, s: 82, rgb: "104, 106, 240" },
  { name: "deep blue", h: 219, s: 78, rgb: "28, 96, 224" },
  { name: "cyan", h: 191, s: 100, rgb: "0, 143, 176" },
  { name: "aurora green", h: 161, s: 73, rgb: "23, 145, 106" },
  { name: "lichen", h: 73, s: 63, rgb: "124, 148, 34" },
  { name: "amber", h: 41, s: 89, rgb: "212, 148, 12" },
  { name: "sunrise orange", h: 24, s: 80, rgb: "230, 106, 26" },
  { name: "mars red", h: 2, s: 60, rgb: "206, 62, 58" },
  { name: "plum", h: 320, s: 37, rgb: "160, 74, 132" },
  { name: "nautical twilight", h: 225, s: 44, rgb: "66, 92, 170" },
] as const;
