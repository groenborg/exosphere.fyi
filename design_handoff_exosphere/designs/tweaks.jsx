// EXOSPHERE tweaks app — mounts a floating Tweaks panel.
// Loaded on both pages. Reads/writes body[data-mood] + body[data-hero] and drives sky.js.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
  mood: "deep",
  hero: "minimal",
  density: 1.0,
  parallax: 1.0,
  nebula: true,
} /*EDITMODE-END*/;

// star colors per mood
const STAR_BY_MOOD = {
  deep: [255, 255, 255],
  retro: [80, 50, 30],
  glassy: [220, 235, 255],
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.body.setAttribute("data-mood", t.mood);
    if (window.__skyAPI) window.__skyAPI.setStarColor(STAR_BY_MOOD[t.mood] || STAR_BY_MOOD.deep);
  }, [t.mood]);

  React.useEffect(() => {
    document.body.setAttribute("data-hero", t.hero);
  }, [t.hero]);

  React.useEffect(() => {
    if (window.__skyAPI) window.__skyAPI.setDensity(t.density);
  }, [t.density]);

  React.useEffect(() => {
    if (window.__skyAPI) window.__skyAPI.setParallax(t.parallax);
  }, [t.parallax]);

  React.useEffect(() => {
    if (window.__skyAPI) window.__skyAPI.setNebula(t.nebula);
  }, [t.nebula]);

  // only show hero tweak on landing
  const onLanding = !!document.querySelector(".hero");

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Appearance" />
      <TweakRadio
        label="Mood"
        value={t.mood}
        options={[
          { value: "deep", label: "Deep" },
          { value: "retro", label: "Retro" },
          { value: "glassy", label: "Glassy" },
        ]}
        onChange={(v) => setTweak("mood", v)}
      />
      {onLanding && (
        <TweakRadio
          label="Hero"
          value={t.hero}
          options={[
            { value: "minimal", label: "Minimal" },
            { value: "orbit", label: "Orbit" },
            { value: "planet", label: "Planet" },
          ]}
          onChange={(v) => setTweak("hero", v)}
        />
      )}

      <TweakSection label="Sky" />
      <TweakSlider
        label="Star density"
        value={t.density}
        min={0.2}
        max={2.2}
        step={0.1}
        onChange={(v) => setTweak("density", v)}
      />
      <TweakSlider
        label="Parallax speed"
        value={t.parallax}
        min={0}
        max={2.4}
        step={0.1}
        onChange={(v) => setTweak("parallax", v)}
      />
      <TweakToggle label="Nebula clouds" value={t.nebula} onChange={(v) => setTweak("nebula", v)} />
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById("tweaks-root"));
root.render(<App />);
