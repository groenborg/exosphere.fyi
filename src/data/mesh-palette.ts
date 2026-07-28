/**
 * Tint hues for the background mesh gradient.
 *
 * One hue is picked at random per page load (never the same as the previous
 * load in the session), sometimes joined by a second hue a little way around
 * the wheel — see the inline script in lib/mesh-script.ts. The mesh itself is
 * always anchored in true black; these are only the colours that bloom out of
 * it, so they carry the "which one did I get this time" of the old flat ground.
 *
 * Palette theme: upper atmosphere — aurora, twilight, sunrise at altitude.
 *
 * h/s drive the mesh blobs; lightness and alpha are generated per blob and
 * differ between light and dark. `name` only serves the don't-repeat check.
 */
export const meshPalette = [
  { name: "aurora magenta", h: 328, s: 65 },
  { name: "violet", h: 267, s: 84 },
  { name: "periwinkle", h: 239, s: 82 },
  { name: "deep blue", h: 219, s: 78 },
  { name: "cyan", h: 191, s: 100 },
  { name: "aurora green", h: 161, s: 73 },
  { name: "lichen", h: 73, s: 63 },
  { name: "amber", h: 41, s: 89 },
  { name: "sunrise orange", h: 24, s: 80 },
  { name: "mars red", h: 2, s: 60 },
  { name: "plum", h: 320, s: 37 },
  { name: "nautical twilight", h: 225, s: 44 },
] as const;
