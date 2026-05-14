# Handoff: Exosphere Studio website (Astro implementation)

## Overview

This handoff is for building the **Exosphere Studio** website in **Astro**, with the
landing page, an About / history page, and a blog (the blog is new — not in the
prototype, but should reuse the visual system documented below).

Exosphere is a small software studio. The product page is space-themed: a
canvas-driven star field sits behind every page, parallaxing on scroll, with
drifting nebula clouds, occasional shooting stars, and a cursor stardust trail.
The visual language is **engineer-y / editorial**: a single sans-serif display
face (Space Grotesk), mono accents for metadata and section codes (JetBrains
Mono), generous whitespace, hairline borders, and an oklch-driven theming
system with three swappable moods.

## About the design files

The files under `designs/` are **design references created in HTML/CSS/JS** —
prototypes that show intended look and behavior. They are **not production code
to copy directly**.

The task is to **recreate these designs in Astro** using its established
patterns (`.astro` components, file-based routing, content collections for the
blog, scoped styles or a single global stylesheet, partial hydration via
`client:*` only where the design actually needs interactivity). Treat the HTML
as a spec; rewrite the structure as `.astro` components and lift the CSS
unchanged where it makes sense.

## Fidelity

**High-fidelity.** All colors, type, spacing, radii and interactions are final.
Recreate pixel-for-pixel where the implementation environment allows. The one
piece that should be **re-imagined**, not copied, is the blog — there is no
blog mock in this bundle. Use the design system below to build it.

## Target architecture (suggested)

A clean Astro tree might look like:

```
src/
  layouts/
    BaseLayout.astro         ← <html>, <head>, fonts, Sky + Nav + Footer slot
  components/
    Nav.astro
    Footer.astro
    Sky.astro                ← wraps the canvas + grid overlay, loads sky.js
    Tweaks.astro             ← optional; loads React island for the panel
    Eyebrow.astro
    SectionTitle.astro
    Button.astro
    cards/
      CapabilityCard.astro
      ProjectCard.astro
      TeamMember.astro
      TimelineItem.astro
    hero/
      HeroMinimal.astro
      HeroOrbit.astro
      HeroPlanet.astro
  content/
    config.ts                ← defineCollection for "blog"
    blog/
      *.md / *.mdx
  pages/
    index.astro              ← landing
    about.astro              ← about / history
    blog/index.astro         ← blog index (NEW — see "Blog (new)")
    blog/[...slug].astro     ← blog post page (NEW)
  styles/
    tokens.css               ← :root + body[data-mood="…"] from styles.css
    base.css                 ← element resets, body, ::selection
    components.css           ← .nav, .hero, .cap, .proj, .svc, etc.
public/
  sky.js                     ← lift from designs/sky.js verbatim
```

Keep `sky.js` as a vanilla script in `public/`. It writes to a `<canvas
id="sky">` injected once by `BaseLayout.astro`. **Do not** rewrite it as a
React component — it's intentionally framework-free and runs on every page.

Hydrate the Tweaks panel as a single React island (`client:idle` is fine).
Everything else can stay zero-JS Astro.

---

## Pages

### 1. Landing (`/`)

Reference: `designs/index.html`.

Sections, in order:

1. **Sticky nav** — brand mark (orbit SVG) + wordmark left, link group center,
   "Get in touch ↗" pill right. Backdrop-filter blur on the bar.
2. **Hero** — three variants gated by `body[data-hero]`:
   - `minimal` (default): meta line, huge title `We build [accent]fun[/accent]
     software for real people.`, sub-paragraph, two CTAs.
   - `orbit`: same left column, plus an animated SVG orbit diagram on the
     right with rotating bodies and compass labels.
   - `planet`: same left column, plus a CSS-drawn ringed planet with an
     orbiting moon.
   For Astro: render whichever variant is selected at build time (env flag or
   page prop). The runtime swap belongs in the Tweaks island only.
3. **What we do** — eyebrow `01 · What we do`, section title, 4-column grid of
   capability cards (Automation, Design, Software, Experiences). Each card has
   an inline SVG icon (`color: var(--accent)`), `— 0N` mono index, title, body.
   On hover: translateY(-4px), border tints toward accent, and a radial-gradient
   "spotlight" follows the cursor via `--mx`/`--my` custom properties set in JS.
4. **Mantra** — eyebrow `02 · Mantra`, no title, single oversized blockquote
   with two accent-colored phrases. Mono attribution line below.
5. **Services** — eyebrow `03 · Services`, title, lede, then a 5-row table
   (`/ 001 … / 005`) with `num · name · description · duration` columns. Row
   inset slides on hover.
6. **Selected work** — eyebrow `04 · Selected work`, title, asymmetric
   12-column grid: one large card (`span 7`), one medium (`span 5`), three
   small (`span 4`). Each card has a striped-gradient visual placeholder with
   a mono label, title + meta, body, and pill tags.
7. **Newsletter** — eyebrow `05 · Dispatch`, two-column glass panel: copy
   left, email field + submit pill right. Validates on submit, swaps the fine
   print to a success line in accent color.
8. **Footer** — 4-column: brand + tag, Studio, Channels, Signal. Hairline
   bottom row with copyright + version string.

### 2. About (`/about`)

Reference: `designs/about.html`.

1. Same sticky nav, with `About` link as `aria-current="page"`.
2. **About hero** — eyebrow `About · 2014 → now`, two-line title with `fun`
   in accent, lede paragraph. No graphic.
3. **Mission** — eyebrow + 2-column block: left = two large-type paragraphs
   (mantra restated), right = 2×2 stats panel (`12+ Years orbiting`,
   `140 Shipped projects`, `8 Humans on board`, `1 Mantra`). The stats panel
   reuses the `.surface` glass treatment.
4. **Team** — eyebrow + title + lede + 4×2 grid of member cards. Each card:
   square portrait slot (striped gradient + initials), name, mono role line,
   short quote.
5. **Timeline** — eyebrow + title + vertical timeline with a fixed-width
   `year` column (110px), a 1px rail, a glowing dot per entry, and the body
   on the right (title + paragraph). Last entry is marked
   `tl-item--current` and the title has an accent-colored em.
6. Same footer.

### 3. Blog index (`/blog`) — **new, not in the prototype**

Build this from the design system. Suggested structure:

- Sticky nav (add a `Blog` link in the nav group on every page).
- Eyebrow `Field notes · log`, section title `Postcards from the studio.`,
  lede explaining cadence (monthly, short, no funnels — same voice as the
  newsletter copy on the landing).
- A featured post: reuse the `.proj--lg` card pattern (striped-gradient
  visual placeholder for the post hero image, meta = date + reading time,
  title, dek, tag pills). Card spans full width on the top row.
- Below: a list of remaining posts. Two acceptable layouts:
  - **Editorial list** (preferred): one row per post, grid
    `auto 1fr auto` → `date · title+dek · tag`. Hairline divider between
    rows, hover inset slide like `.svc__row`.
  - **Card grid**: 3-column grid of `.proj--sm`-style cards.
- Filter chips by tag at the top of the list (mono pills, accent border when
  active).
- Optional RSS link in mono in the footer of the section.

Read posts from an Astro **content collection** at `src/content/blog/`. Each
post frontmatter should declare:

```yaml
title: "…"
description: "…"
pubDate: 2026-04-12
tags: ["design", "automation", …]
heroLabel: "[ Post title · screenshot slot ]"   # optional, for the visual placeholder
```

### 4. Blog post (`/blog/[slug]`) — **new**

- Sticky nav, full-bleed sky behind.
- Article header centered in a narrow column (max ~720px):
  - Eyebrow with date + tag pills.
  - Large title (clamp(36px, 4.4vw, 64px), same as `.section-title`).
  - Optional lede paragraph in `--fg-2`.
- Body in a 65-character measure, `--font-sans`, 18px / 1.6 line-height,
  `--fg`. Render markdown/MDX with prose styles for:
  - `h2` / `h3` (`--font-sans`, 500 weight, slight negative tracking).
  - inline `code` and code blocks in `--font-mono`, surface background.
  - blockquote in mantra style: 28px, `--fg`, accent em runs.
  - figures: full-bleed within the column, mono caption in `--fg-3`.
- Footer of the article: divider, "Filed under" mono row with tag pills,
  prev/next post links (mono uppercase, arrow glyphs).
- Same site footer.

---

## Design tokens

All tokens live in `:root` and three `body[data-mood="…"]` blocks in
`designs/styles.css`. Lift them verbatim into `src/styles/tokens.css`.

### Modes

| Token        | Deep (default)             | Retro                         | Glassy                          |
| ------------ | -------------------------- | ----------------------------- | ------------------------------- |
| `--bg`       | oklch(0.13 0.025 265)      | oklch(0.93 0.025 80)          | oklch(0.16 0.045 245)           |
| `--bg-2`     | oklch(0.17 0.030 265)      | oklch(0.89 0.035 75)          | oklch(0.20 0.055 245)           |
| `--surface`  | oklch(0.20 0.035 265/0.55) | oklch(0.88 0.04 75/0.70)      | oklch(0.30 0.06 245/0.42)       |
| `--hairline` | oklch(0.85 0.03 265/0.16)  | oklch(0.30 0.06 50/0.22)      | oklch(0.85 0.04 245/0.20)       |
| `--fg`       | oklch(0.96 0.01 265)       | oklch(0.24 0.05 50)           | oklch(0.98 0.005 245)           |
| `--fg-2`     | oklch(0.78 0.02 265)       | oklch(0.38 0.06 50)           | oklch(0.82 0.03 245)            |
| `--fg-3`     | oklch(0.58 0.02 265)       | oklch(0.55 0.05 50)           | oklch(0.62 0.04 245)            |
| `--accent`   | oklch(0.78 0.16 215)       | oklch(0.62 0.18 40)           | oklch(0.82 0.14 175)            |
| `--accent-2` | oklch(0.72 0.18 305)       | oklch(0.55 0.16 25)           | oklch(0.74 0.16 285)            |
| star RGB     | 255, 255, 255              | 80, 50, 30                    | 220, 235, 255                   |

The "Deep" mood is the production default. The Retro and Glassy moods are
exposed via the Tweaks panel for review only — they're not a runtime concern
for end users, but should still render correctly when toggled.

### Type

- Sans (display + body): **Space Grotesk**, weights 300/400/500/600/700.
- Mono (metadata, eyebrows, codes, buttons): **JetBrains Mono**, weights
  400/500/600.
- Load both via Google Fonts (already wired in the prototype `<head>`).

Scale (matches `designs/styles.css`):

| Role               | Family | Size                              | Weight | Tracking | Notes                            |
| ------------------ | ------ | --------------------------------- | ------ | -------- | -------------------------------- |
| Hero title         | sans   | clamp(64px, 10vw, 168px)          | 500    | -0.045em | line-height 0.92                 |
| Section title      | sans   | clamp(36px, 4.4vw, 64px)          | 500    | -0.02em  | text-wrap: balance               |
| About hero title   | sans   | clamp(48px, 7vw, 112px)           | 500    | -0.04em  |                                  |
| Mantra quote       | sans   | clamp(32px, 4.8vw, 64px)          | 400    | -0.025em | max-width 22ch, balance          |
| Card / project H3  | sans   | 22–24px                           | 500    | -0.015em |                                  |
| Body (lede)        | sans   | clamp(17px, 1.4vw, 20px)          | 400    | —        | `--fg-2`                          |
| Body               | sans   | 14.5–16px / 1.5                   | 400    | —        | `--fg-2`                          |
| Stat number        | sans   | 48px                              | 500    | -0.025em | `--accent`                        |
| Eyebrow            | mono   | 11px                              | 500    | 0.18em   | uppercase, `--fg-3`, ::before bar |
| Nav links          | mono   | 12px                              | 500    | 0.06em   | uppercase                         |
| Buttons            | mono   | 12.5px                            | 500    | 0.08em   | uppercase                         |
| Mono metadata      | mono   | 10.5–13px                         | 400    | 0.1–0.16em | uppercase for short labels      |

### Spacing & radii

- Section vertical padding: `140px` desktop (Mantra: `180px`).
- Container: `max-width: 1280px`, padding `0 32px`.
- Card padding: `26–28px`.
- Radii: pill (`999px`) for buttons, fields, tags. `12px` for inner card
  visuals, `16px` for capability cards, `18px` for project cards, `22px` for
  the newsletter glass panel.
- Hairline border: `1px solid var(--hairline)`.
- Glass surfaces: `background: var(--surface);` + `backdrop-filter: blur(20px)
  saturate(140%)` (24px blur on the newsletter panel).

### Iconography

All icons in the prototype are inline 24/32 viewBox SVGs with
`stroke="currentColor"` and `stroke-width: 1.4`. Keep this — never replace
with a heavyweight icon library. The brand mark is a small Saturn-style mark
(circle + tilted ellipse) in the nav.

### Imagery / placeholders

The work cards and team portraits use **striped-gradient placeholders** built
purely in CSS — see `.proj__visual` and `.member__portrait` in `styles.css`.
Keep these as the placeholder treatment in the blog as well; if real
imagery is dropped in later, it should sit on top of the same radius and
border.

---

## Effects layer (`sky.js`)

This is the most novel part of the design and should be lifted verbatim.

- A single full-viewport `<canvas id="sky">` (fixed, z-index 0,
  `pointer-events: none`) and a static `<div id="sky-grid">` CSS grid overlay
  masked by a radial gradient.
- Four star layers with parallax depth multipliers `0.05 / 0.18 / 0.38 / 0.62`,
  multiplied by a user-controlled `cfg.parallax` factor.
- Star density scales with viewport area; `cfg.density` multiplies the count.
- Twinkle: deeper layers twinkle more (sine of time × per-star phase).
- Drifting nebula: 5 additive-blended radial gradients, slow drift, hue mix
  driven by mood (`cfg.star` color is mood-keyed RGB).
- Shooting stars: spawn ~0.24%/frame, traverse with a fading tail.
- Cursor stardust: per `pointermove`, throttled to 18ms, emits 1–2 particles
  with mild gravity and life-decay.
- Resizes on viewport change. Honors `prefers-reduced-motion` (CSS rule in
  `styles.css` disables the planet/orbit spin keyframes; keep parity by
  reducing or pausing canvas animation in JS too if you want belt-and-braces).

API the Tweaks panel calls:

```js
window.__skyAPI = {
  setDensity(v)      // rebuilds layer particles
  setParallax(v)     // multiplier on layer speeds
  setNebula(bool)    // skips nebula draw
  setStarColor(rgb)  // [r,g,b] for stars + cursor dust
}
```

In Astro, ship `sky.js` from `public/` with `<script src="/sky.js" is:inline></script>`
in `BaseLayout.astro`. The canvas + grid divs go in the layout too.

---

## Interactions & behavior

- **Nav** — sticky, blurred background. Current page indicated by a 1px
  accent underline under the link (`aria-current="page"`).
- **Hero CTAs** — `.btn--primary` lifts 1px and shifts to accent fill on
  hover; arrow glyph translates 3px right.
- **Capability cards** — hover lifts 4px, borders tint to accent, and a
  radial gradient follows the pointer (set `--mx` / `--my` from
  `pointermove`).
- **Services rows** — hover paints the row with `--surface` and adds 12px
  side padding (the row visibly slides inward).
- **Project cards** — hover lifts 4px, border tints to accent.
- **Newsletter form** — client-side validates with `^\S+@\S+\.\S+$`; on
  invalid, the fine print line turns to `--accent-2` and reads "Please enter
  a valid email."; on success, it turns to `--accent` and reads "✓
  Transmission received. Welcome to the dispatch." Clear the input on
  success.
- **Tweaks panel** — already host-protocol-wired; only mount on
  `client:idle`. Persists via the framework — for production, you can drop
  the panel entirely or feature-flag it.
- **Planet hero** — pure CSS animation, 80s rotation on the planet,
  reverse 120s on the cloud overlay, 28s on the moon orbit.
- **Orbit hero** — three nested `<g>` groups with CSS `animation: spin Ns
  linear infinite` (40s / 60s reverse / 22s).
- **`prefers-reduced-motion: reduce`** disables the orbit and planet spin
  via the existing CSS media block. Extend to the canvas if you reduce
  motion globally.

---

## State management

The prototype is essentially stateless except for:

- **Newsletter form** — local form state (email + validation message).
- **Tweaks panel** — `useTweaks(defaults)` keeps `{ mood, hero, density,
  parallax, nebula }`. Persists to the host via `__edit_mode_set_keys`. In
  Astro production this is optional; if you keep it, store in `localStorage`
  instead and apply on mount.

The blog is fed entirely by an Astro content collection (no runtime state).

---

## Responsive behavior

Breakpoints already in `styles.css`:

- `1000px`: capability cards drop to 2 columns.
- `900px`: project grid collapses to single column; team grid drops to 2;
  mission grid stacks.
- `800px`: newsletter stacks; services row reflows to label-on-top, full-
  width description; footer drops to 2 columns.
- `700px`: timeline rail moves to the left edge; year sits above body.
- `600px`: capability cards single column.
- `500px`: team grid single column.

The hero scales via clamp; no special hero breakpoint needed.

---

## Copy

Use exactly what's in the prototype for the landing and about pages — the
voice is intentional (small, joyful, dry-funny, mono-flavored details like
the coordinates in the footer and the "v 3.14 — released into orbit" line).
For the blog, match this voice. The mantra (canonical):

> We focus on building **fun, personal and exciting** software and have many
> years of experience with automation, design and have a drive for fun
> experiences. **Software exists to put smiles on peoples faces.**

A slightly tightened version is used in the landing's Mantra section and the
About page's Mission section — both are intentional.

---

## Accessibility notes

- All canvas effects have `pointer-events: none` and `aria-hidden="true"`
  is implied by being in a `<canvas>`. The grid overlay div has
  `aria-hidden="true"`.
- Hero variants — when shipping a single hero, the unused decorative columns
  shouldn't render at all (rather than `display: none`) to keep the DOM
  clean for screen readers.
- Mono uppercase is decorative — keep heading semantics on real `h1/h2/h3`s.
- Accent color contrast against `--bg` clears WCAG AA at body sizes in all
  three moods; verify if you change accents.
- Form: keep the `<label>` wrap so the email input is properly labeled by
  the placeholder + the fine-print line (or add an `aria-describedby`).

---

## Files in this bundle

```
design_handoff_exosphere/
├── README.md                      (this file)
└── designs/
    ├── index.html                 ← landing page prototype
    ├── about.html                 ← about / history prototype
    ├── styles.css                 ← full design system, lift wholesale
    ├── sky.js                     ← canvas effects (drop into public/)
    ├── tweaks.jsx                 ← Tweaks app (mood / hero / sky controls)
    └── tweaks-panel.jsx           ← Tweaks panel shell + form controls
```

Open `designs/index.html` in a browser to interact with the live prototype.
Toggle Tweaks (top-right of the preview) to see Mood and Hero variants.

---

## What's NOT in the prototype

These are intentionally left for the build:

1. **Blog index** and **blog post** templates (spec'd above; no mock).
2. **CMS / content collection schema** for blog posts.
3. **RSS feed** (`/rss.xml`) — Astro has `@astrojs/rss`; brand the channel as
   "Exosphere · Field notes" and match the newsletter copy voice.
4. **Sitemap & robots** — use `@astrojs/sitemap`.
5. **Real OG images** — the design uses CSS-striped placeholders; production
   should generate per-page OG images (one template, dynamic title, in the
   Deep mood).
6. **404 page** — reuse the BaseLayout, large mono "404 · LOST IN ORBIT"
   eyebrow, short body, link home. Keep the sky behind it.
