import { meshPalette } from "../data/mesh-palette";

/**
 * The inline, pre-paint half of the background mesh.
 *
 * Runs in <head> so the ground is settled before the first frame — there is no
 * flash of the no-JS fallback mesh. It only writes custom properties; the mesh
 * itself (layer order, the noise tile, the light/dark split) lives in
 * styles/mesh.css.
 *
 * Five radial blobs, painted last-to-first: 0 and 1 are opaque and carry the
 * ground's own colour, so they sit on top and carve the shape out of the 2–4
 * tint blooms underneath. Each blob gets three colours — --c-N for dark, --d-N
 * for dark on a system that asks for dark, --l-N for light — so switching
 * theme needs no JS beyond the attribute, and all three share one geometry.
 *
 * The mesh is as tall as the page, so --y spreads the five blobs down the whole
 * page while --r keeps each one the size of a screen: a radius measured against
 * the layer would grow with the page.
 */
export const meshScript = `(function () {
  var P = ${JSON.stringify(meshPalette)};
  var rand = function (a, b) { return a + Math.random() * (b - a); };
  var pct = function (v) { return Math.round(v * 100) / 100 + "%"; };
  var vmax = function (v) { return Math.round(v * 100) / 100 + "vmax"; };
  var hue = function (h) { return Math.round((h + 360) % 360); };
  var shuffle = function (a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };

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

    /* Spread the blobs across the width — and down the page — instead of
       trusting random not to clump them: one per fifth of each, jittered, in a
       random order. */
    var lanes = shuffle([0, 1, 2, 3, 4]);
    var bands = shuffle([0, 1, 2, 3, 4]);

    var s = document.documentElement.style;
    for (var n = 0; n < 5; n++) {
      var black = n < 2;
      /* Where the blob turns solid, and where it has faded out, as fractions
         of the distance to the far corner of one screen — which is what the
         radius used to be measured against. */
      var start = rand(4, 14);
      var end = start + (black ? rand(30, 50) : rand(22, 40));
      s.setProperty("--x-" + n, pct(10 + lanes[n] * 17 + rand(0, 14)));
      s.setProperty("--y-" + n, pct(5 + bands[n] * 18 + rand(0, 14)));
      /* That corner sits at roughly 0.9vmax on a landscape screen, so pinning
         the radius there keeps the old scale while the page's own height —
         which the mesh now spans — is kept out of it. --s-start is then a
         fraction of the radius rather than of the corner. */
      s.setProperty("--r-" + n, vmax(end * 0.9));
      s.setProperty("--s-start-" + n, pct((start / end) * 100));

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
