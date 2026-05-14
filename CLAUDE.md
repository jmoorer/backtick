# Backt Design System — Midnight v0.4

> Machine-readable reference for LLM-assisted component generation.
> Stack: SvelteKit + Tailwind v4. All tokens live in ` [src/routes/layout.css](src/routes/layout.css)` under `@theme`.
> Every token maps to a Tailwind utility: `--color-ink-700` → `bg-ink-700`, `text-ink-700`, `border-ink-700`, etc.

---

## 1. AESTHETIC PRINCIPLES

- **Dark-first, terminal-flavored.** This is a developer tool. Every decision should feel like it belongs in a well-crafted CLI or code editor.
- **One chromatic accent.** Cyan (`cyan-400`) is the only color that carries meaning. It means: action, link, live, focused. Use it sparingly or it loses signal.
- **Monospace is structural.** IDs, sizes, timestamps, labels, shortcut keys — everything data-like uses `font-mono`. Prose and UI copy uses `font-sans`.
- **Depth without noise.** Surfaces are layered (ink-950 → ink-700) but the steps are subtle. Shadows lift elements; they don't glow unless focused.
- **Status through color, not icons alone.** Success = green, warn = amber, danger = red. These are always paired with a label — never color-only.

---

## 2. FONTS

| Token         | Value           | Tailwind class | Use for                                     |
| ------------- | --------------- | -------------- | ------------------------------------------- |
| `--font-sans` | "IBM Plex Sans" | `font-sans`    | Body text, UI labels, headings              |
| `--font-mono` | "IBM Plex Mono" | `font-mono`    | Code, IDs, sizes, timestamps, kbd, eyebrows |

**Rules:**

- Never use system fonts (Arial, -apple-system, etc.) directly.
- Eyebrow labels are always `font-mono` + `uppercase` + `tracking-eyebrow`, never `font-sans`.
- All `<code>`, `<pre>`, `<kbd>`, `<samp>` elements inherit `font-mono` via base layer — no need to add the class manually.

**Tracking tokens:**

| Token                | Value   | Tailwind class     | Use for                      |
| -------------------- | ------- | ------------------ | ---------------------------- |
| `--tracking-display` | -0.02em | `tracking-display` | H1, hero text                |
| `--tracking-tight`   | -0.01em | `tracking-tight`   | H2, subheadings              |
| `--tracking-eyebrow` | 0.14em  | `tracking-eyebrow` | Mono all-caps section labels |

**Typographic scale (Tailwind defaults, used as-is):**

| Class                                                             | Size     | Weight | Use                                  |
| ----------------------------------------------------------------- | -------- | ------ | ------------------------------------ |
| `text-5xl font-semibold tracking-display`                         | 3rem     | 600    | Page title / hero                    |
| `text-3xl font-semibold tracking-tight`                           | 1.875rem | 600    | Section heading                      |
| `text-2xl font-semibold tracking-tight`                           | 1.5rem   | 600    | Card heading                         |
| `text-base`                                                       | 1rem     | 400    | Body prose                           |
| `text-sm text-slate-400`                                          | 0.875rem | 400    | Captions, metadata                   |
| `text-xs font-mono text-slate-500`                                | 0.75rem  | 400    | Gutter text, hints                   |
| `text-[11px] font-mono uppercase tracking-eyebrow text-slate-500` | 11px     | 400    | Eyebrow label (use `.eyebrow` class) |

---

## 3. COLOR

### 3a. Surface ramp — `ink-*`

Used for backgrounds and containers. Goes darkest (outside) to lightest (interactive chrome).

| Token             | Hex       | Tailwind                        | Role                                   |
| ----------------- | --------- | ------------------------------- | -------------------------------------- |
| `--color-ink-950` | `#070b11` | `bg-ink-950`                    | Page background, outside app shell     |
| `--color-ink-900` | `#0a1018` | `bg-ink-900`                    | Inset surfaces, code block backgrounds |
| `--color-ink-800` | `#0c121a` | `bg-ink-800`                    | App background                         |
| `--color-ink-700` | `#111a25` | `bg-ink-700`                    | Card (default `.ui-card` background)   |
| `--color-ink-600` | `#1a2434` | `bg-ink-600`                    | Hovered card, nav chrome               |
| `--color-ink-500` | `#1f2c3d` | `bg-ink-500` / `border-ink-500` | Default border color                   |
| `--color-ink-400` | `#2c3e57` | `border-ink-400`                | Strong border, dividers                |

**Rule:** `ink-*` is for containers, never for text.

### 3b. Text ramp — `slate-*`

Used for text only. Goes brightest (body) to faintest (hint).

| Token               | Hex       | Tailwind         | Role                         |
| ------------------- | --------- | ---------------- | ---------------------------- |
| `--color-slate-100` | `#d6e1ef` | `text-slate-100` | Primary body text, headings  |
| `--color-slate-200` | `#b6c3d7` | `text-slate-200` | Slightly dimmed body         |
| `--color-slate-400` | `#8194ab` | `text-slate-400` | Labels, captions, metadata   |
| `--color-slate-500` | `#5a6b81` | `text-slate-500` | Placeholder, gutter, eyebrow |
| `--color-slate-600` | `#3d4a5d` | `text-slate-600` | Barely-visible hints         |

**Rule:** `slate-*` is for text, never for backgrounds.

### 3c. Chromatic accent — `cyan-*`

The single chromatic color. Means: action, link, live data, focus state.

| Token              | Hex       | Tailwind                        | Role                                                     |
| ------------------ | --------- | ------------------------------- | -------------------------------------------------------- |
| `--color-cyan-100` | `#c7faff` | `text-cyan-100`                 | Rarely used — extreme highlight                          |
| `--color-cyan-300` | `#7dd3fc` | `text-cyan-300`                 | Dimmed inline code, info text                            |
| `--color-cyan-400` | `#67e8f9` | `text-cyan-400` / `bg-cyan-400` | ★ Primary accent — CTA buttons, links, IDs, active state |
| `--color-cyan-600` | `#34a5b8` | `border-cyan-600`               | Secondary — chip borders, dim links                      |
| `--color-cyan-950` | `#0b1820` | `text-cyan-950`                 | Readable text on `bg-cyan-400`                           |

**Rules:**

- Use `text-cyan-400` for paste IDs in the feed, active nav items, copy buttons, and focus indicators.
- Filled `bg-cyan-400` is only for the primary CTA button ("Publish paste →"). Text on it must be `text-cyan-950`.
- Never use cyan as a background for large surfaces.

### 3d. Status colors — flat, no ramps

| Token             | Hex       | Tailwind       | Use                                                |
| ----------------- | --------- | -------------- | -------------------------------------------------- |
| `--color-success` | `#5dd49a` | `text-success` | Public paste, ∞ TTL, live indicator                |
| `--color-warn`    | `#f5b455` | `text-warn`    | Locked paste, expiring soon (< 24h)                |
| `--color-danger`  | `#f87171` | `text-danger`  | Expired paste, destructive action, HTTP 410        |
| `--color-info`    | `#7dd3fc` | `text-info`    | Informational callout                              |
| `--color-violet`  | `#c084fc` | `text-violet`  | Syntax highlighting only — keywords in code blocks |

**Rules:**

- Status colors are always used with a label (text or icon + text). Never rely on color alone.
- `violet` is reserved for syntax highlighting. Do not use it in UI chrome.
- For status chips, pair the text color with a low-opacity background of the same hue (see `.ui-chip-*` component classes).

---

## 4. RADIUS

Pills (`border-radius: 999px`) are reserved for chips only.

| Token          | Value | Tailwind      | Use                             |
| -------------- | ----- | ------------- | ------------------------------- |
| `--radius-xs`  | 4px   | `rounded-xs`  | `kbd` badges, tiny tags         |
| `--radius-sm`  | 6px   | `rounded-sm`  | Buttons, text inputs            |
| `--radius-md`  | 8px   | `rounded-md`  | Dropdowns, tooltips, search bar |
| `--radius-lg`  | 10px  | `rounded-lg`  | ★ Cards (`.ui-card` default)    |
| `--radius-xl`  | 12px  | `rounded-xl`  | Modals, dialogs                 |
| `--radius-2xl` | 14px  | `rounded-2xl` | Large hero cards                |

---

## 5. SHADOWS

| Token              | Tailwind         | Use                                        |
| ------------------ | ---------------- | ------------------------------------------ |
| `--shadow-card`    | `shadow-card`    | Default card lift (very subtle inner ring) |
| `--shadow-raised`  | `shadow-raised`  | Dropdowns, popovers floating above content |
| `--shadow-overlay` | `shadow-overlay` | Modals, command palette                    |
| `--shadow-glow`    | `shadow-glow`    | Cyan focus ring on inputs and buttons      |

**Rule:** Only use `shadow-glow` on focused interactive elements. It's cyan-tinted — using it elsewhere cheapens the accent.

---

## 6. MOTION

| Token              | Value                         | Use                                        |
| ------------------ | ----------------------------- | ------------------------------------------ |
| `--ease-snappy`    | `cubic-bezier(.2, .8, .2, 1)` | All transitions (hover, focus, open/close) |
| `--animate-cursor` | `cursor 1s steps(1) infinite` | Blinking block cursor in terminal/mono UI  |

**Rule:** All transitions should use `ease-snappy`. Typical duration: `150ms` for hover, `200ms` for open/close.
Example: `transition-colors duration-150 ease-[var(--ease-snappy)]`

---

## 7. COMPONENT CLASSES

These are `@layer components` shortcuts — apply them as single class names.

### `.ui-card`

The base container. Use for feed rows (as a wrapper), the editor pane, settings panels, and code block wrappers.

```
background: ink-700
border: 1px solid ink-500
border-radius: radius-lg (10px)
box-shadow: shadow-card
```

Example: `<div class="ui-card p-6">`

### `.ui-chip`

Inline pill label. Use for file type (`.md`, `.ts`), file size, copy-link button, filter tags.

```
font-mono, text-xs, pill (999px radius)
background: ink-900
border: ink-500
color: slate-400
```

Variants (add alongside `.ui-chip`):

- `.ui-chip-accent` — cyan, for active actions (copy link, active filter pill)
- `.ui-chip-success` — green, for public / ∞ TTL status
- `.ui-chip-warn` — amber, for locked / expiring pastes
- `.ui-chip-danger` — red, for expired / HTTP 410

Example: `<span class="ui-chip ui-chip-success">● public</span>`

### `.ui-kbd`

Keyboard shortcut badge. Use inline with text: "Press ⌘K to search."

```
font-mono, 11px
border: ink-500 (bottom edge 2px for physical key illusion)
border-radius: radius-xs (4px)
background: ink-900
color: slate-400
```

Example: `<kbd class="ui-kbd">⌘</kbd><kbd class="ui-kbd">K</kbd>`

### `.eyebrow`

Section label. Always uppercase mono with wide tracking.

```
font-mono, 11px, uppercase
letter-spacing: tracking-eyebrow (0.14em)
color: slate-500
```

Example: `<div class="eyebrow">Feed · last 24h</div>`

---

## 8. BUTTON PATTERNS

Buttons are not a component class — compose them with utilities.

| Variant         | Classes                                                                                                                                    | Use                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| Primary         | `bg-cyan-400 text-cyan-950 font-semibold text-sm px-4 py-2 rounded-sm shadow-glow hover:opacity-90 transition-opacity`                     | Single primary CTA per view ("Publish paste →", "+ new") |
| Secondary       | `bg-ink-700 text-slate-100 text-sm border border-ink-500 px-4 py-2 rounded-sm hover:bg-ink-600 transition-colors`                          | Secondary actions                                        |
| Ghost           | `text-slate-400 text-sm border border-ink-500 px-4 py-2 rounded-sm hover:text-slate-100 hover:border-ink-400 transition-colors`            | Tertiary / destructive confirmation cancel               |
| Danger          | `text-danger text-sm px-4 py-2 rounded-sm` + inline `style="background: rgb(248 113 113 / .1); border: 1px solid rgb(248 113 113 / .4)"`   | Delete paste, irreversible action                        |
| Nav pill        | `font-mono text-xs border border-ink-500 text-slate-500 px-3 py-1 rounded-md hover:border-cyan-600 hover:text-slate-100 transition-colors` | Top nav items (recent, docs)                             |
| Nav pill active | `font-mono text-xs border border-cyan-600 text-cyan-400 px-3 py-1 rounded-md bg-[rgb(103_232_249_/_0.06)]`                                 | Currently active nav item                                |

---

## 9. INPUT PATTERNS

| Element                   | Classes                                                                                                                                                                                                                                |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Text input                | `w-full px-3 py-2 rounded-sm border border-ink-500 bg-transparent text-slate--100 font-sans text-sm placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:shadow-glow transition-[border-color,box-shadow] duration-150` |
| Search bar                | Wrap in `flex items-center gap-2 border border-ink-500 bg-ink-800 rounded-md px-3` — put a `text-slate-500` search icon left, the bare `<input>` center (no border, bg-transparent), and a `.ui-kbd` hint right                        |
| Select / dropdown trigger | `flex justify-between items-center px-3 py-2 rounded-sm border border-ink-500 bg-ink-700 text-slate-100 text-sm` with a `text-slate-500` chevron on the right                                                                          |

---

## 10. DATA TABLE (FEED) PATTERN

The recent pastes feed is a `<table>` styled as follows:

```
table wrapper:   ui-card overflow-hidden
thead row:       border-b border-ink-500 bg-ink-800
th cells:        eyebrow px-4 py-3 text-left (or text-right for numeric cols)
tbody rows:      border-b border-ink-500 hover:bg-ink-600 transition-colors cursor-pointer
td — ID:         font-mono text-sm text-cyan-400 px-4 py-3
td — Title:      font-sans text-sm text-slate-100 px-4 py-3
td — Extension:  ui-chip ml-2 (inline after title)
td — Numeric:    font-mono text-sm text-slate-400 px-4 py-3 text-right tabular-nums
td — TTL badge:  ui-chip + variant class (success/warn/danger) px-4 py-3
```

TTL badge logic:

- Never expires → `.ui-chip-success` with content `∞`
- Expires > 24h → `.ui-chip` (neutral) with content like `6d`
- Expires < 24h → `.ui-chip-warn` with content like `23h`
- Expired → `.ui-chip-danger` with content `expired`
- Locked → use `text-warn` + ♦ prefix on the title

---

## 11. CODE BLOCK PATTERN

```
outer wrapper:   ui-card overflow-hidden (background: ink-900 override)
header bar:      flex justify-between px-4 py-2 border-b border-ink-500 bg-ink-700
  left:          font-mono text-xs text-slate-400 (filename)
  right:         font-mono text-xs text-slate-500 (lang · line count)
<pre>:           font-mono text-[12.5px] leading-7 p-4 m-0 overflow-x-auto bg-ink-900
line numbers:    CSS counter via pre.code / span.ln pattern (see app.css)
syntax colors:   keywords=violet, strings=success, functions=cyan-300, types=warn
```

---

## 12. DO / DON'T QUICK REFERENCE

| ✅ Do                                        | ❌ Don't                                    |
| -------------------------------------------- | ------------------------------------------- |
| Use `text-cyan-400` for paste IDs            | Use cyan for decorative text                |
| Use `font-mono` for all data values          | Mix font families within a data row         |
| Add `shadow-glow` on focused inputs          | Use `shadow-glow` as a decorative hover     |
| Keep status chips short (∞, 6d, 23h)         | Write long text inside a chip               |
| Use `border-ink-500` as the default border   | Use a custom hex for borders                |
| Compose buttons from utilities               | Create new `.ui-btn-*` component classes    |
| Use `ease-snappy` for all transitions        | Use `ease-in-out` or browser default ease   |
| Use `text-cyan-950` as text on `bg-cyan-400` | Use white or slate text on cyan backgrounds |
| Use `violet` only in `<pre>` / code          | Use `violet` in UI chrome                   |
