/**
 * The inline, pre-paint theme resolution.
 *
 * Runs in <head> so the ground and the type are settled before the first
 * frame — there is no flash of dark before a light reader's choice lands.
 *
 * Dark is the studio's own ground, so it is the default: only an explicit
 * choice, stored from the switch in components/ThemeToggle.astro, moves the
 * page to light. The system's prefers-color-scheme is left to say how *deep*
 * the dark should go (styles/mesh.css), not which theme to use.
 */
export const themeScript = `(function () {
  var t;
  try { t = localStorage.getItem("theme"); } catch (e) {}
  t = t === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = t;
  var m = document.querySelector('meta[name="theme-color"]');
  if (m) m.setAttribute("content", t === "light" ? "#ffffff" : "#000000");
})();`;
