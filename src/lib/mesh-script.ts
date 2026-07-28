import { meshPalette } from "../data/mesh-palette";

/**
 * The inline, pre-paint half of the background mesh.
 *
 * Runs in <head> so the ground is settled before the first frame — there is no
 * flash of the no-JS fallback mesh. It only writes custom properties; the mesh
 * itself (layer order, the fixed noise tile, the light/dark split) lives in
 * styles/mesh.css.
 *
 * Five radial blobs, painted last-to-first: 0 and 1 are opaque and carry the
 * ground's own colour, so they sit on top and carve the shape out of the 2–4
 * tint blooms underneath. Each blob gets three colours — --c-N for dark, --d-N
 * for dark on a system that asks for dark, --l-N for light — so switching
 * theme needs no JS beyond the attribute, and all three share one geometry.
 */
export const meshScript = `(function () {
  var P = ${JSON.stringify(meshPalette)};
  var rand = function (a, b) { return a + Math.random() * (b - a); };
  var pct = function (v) { return Math.round(v * 100) / 100 + "%"; };
  var hue = function (h) { return Math.round((h + 360) % 360); };

  try {
    /* Rotate: never the hue this session already showed. */
    var last = sessionStorage.getItem("mesh-hue");
    var pool = P.filter(function (c) { return c.name !== last; });
    if (!pool.length) pool = P;
    var primary = pool[Math.floor(Math.random() * pool.length)];
    sessionStorage.setItem("mesh-hue", primary.name);

    /* Often a second hue, kept far enough round the wheel to read as a
       gradient between two colours rather than as one smeared one. */
    var tints = [primary];
    if (Math.random() < 0.65) {
      var near = P.filter(function (c) {
        var d = Math.abs(c.h - primary.h);
        if (d > 180) d = 360 - d;
        return d > 40 && d < 150;
      });
      if (near.length) tints.push(near[Math.floor(Math.random() * near.length)]);
    }

    /* Spread the blobs across the width instead of trusting random not to
       clump them: one per fifth, jittered, in a random order. */
    var lanes = [0, 1, 2, 3, 4];
    for (var i = lanes.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = lanes[i]; lanes[i] = lanes[j]; lanes[j] = t;
    }

    var s = document.documentElement.style;
    for (var n = 0; n < 5; n++) {
      var black = n < 2;
      var start = rand(4, 14);
      s.setProperty("--x-" + n, pct(10 + lanes[n] * 17 + rand(0, 14)));
      s.setProperty("--y-" + n, pct(rand(8, 92)));
      s.setProperty("--s-start-" + n, pct(start));
      s.setProperty("--s-end-" + n, pct(start + (black ? rand(30, 50) : rand(22, 40))));

      if (black) {
        s.setProperty("--c-" + n, "rgba(0, 0, 0, 1)");
        s.setProperty("--d-" + n, "rgba(0, 0, 0, 1)");
        s.setProperty("--l-" + n, "rgba(255, 255, 255, 1)");
        continue;
      }
      var c = tints[(n - 2) % tints.length];
      var h = hue(c.h + rand(-10, 10));
      s.setProperty(
        "--c-" + n,
        "hsla(" + h + ", " + c.s + "%, " + pct(rand(44, 58)) + ", " + rand(0.45, 0.7).toFixed(2) + ")"
      );
      /* Dark: the same hue pulled down to near-black. Barely there on purpose. */
      s.setProperty(
        "--d-" + n,
        "hsla(" + h + ", " + Math.round(c.s * 0.8) + "%, " + pct(rand(13, 20)) + ", " + rand(0.1, 0.22).toFixed(2) + ")"
      );
      /* Light: the same hue, lifted but not bleached. A tint that reads as
         pale on its own disappears once it's over white, so this sits well
         below the base's lightness and leans on saturation to stay a colour
         — the fade is still soft, because blobs 0 and 1 cut white back
         through it. */
      s.setProperty(
        "--l-" + n,
        "hsla(" + h + ", " + Math.min(100, Math.round(c.s * 1.15)) + "%, " + pct(rand(64, 76)) + ", " + rand(0.5, 0.72).toFixed(2) + ")"
      );
    }

    /* The ground under the blobs. Never quite black — or, in light, never
       quite white — so the grain has something to bite on; the flat extremes
       come from blobs 0 and 1. */
    s.setProperty("--mesh-base", "hsl(" + primary.h + ", " + primary.s + "%, 7%)");
    s.setProperty("--mesh-base-dark", "hsl(" + primary.h + ", 45%, 3.5%)");
    s.setProperty("--mesh-base-light", "hsl(" + primary.h + ", 100%, 99.5%)");
  } catch (e) {}
})();`;
