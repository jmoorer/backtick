export const EXAMPLE_MARKDOWN = `# Markdown Showcase

## Introduction

Welcome to **backtick** — a minimal, fast markdown editor. This document demonstrates the full range of supported Markdown syntax.

---

## Text Formatting

You can write _italic_, **bold**, ~~strikethrough~~, and \`inline code\`. You can also combine them: **_bold italic_**.

> "Simplicity is the soul of efficiency."
> — Austin Freeman

---

## Lists

### Unordered

- Apples
- Bananas
  - Cavendish
  - Plantain
- Cherries

### Ordered

1. Install dependencies
2. Start the dev server
3. Open your browser
4. Start writing

### Task List

- [x] Set up project
- [x] Add editor component
- [ ] Publish to production

---

## Code

### Inline

Use \`pnpm dev\` to start the development server.

### Block

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("world"));
\`\`\`

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

---

## Tables

| Language   | Typing  | Compiled |
|------------|---------|----------|
| TypeScript | Static  | Yes      |
| Python     | Dynamic | No       |
| Rust       | Static  | Yes      |
| JavaScript | Dynamic | No       |

---

## Links & Images

[Visit Svelte](https://svelte.dev) — the framework powering this editor.

![Placeholder image](https://placehold.co/600x200)

---

## Headings

# H1 — Page Title
## H2 — Section
### H3 — Subsection
#### H4 — Detail
##### H5 — Fine Print
###### H6 — Footnote Level

---

## Horizontal Rules

Above

---

Below

---

## Blockquotes

> Markdown is intended to be as easy-to-read and easy-to-write as is feasible.
>
> — John Gruber

Nested:

> Outer quote
>> Inner quote

---

_End of showcase._
`;
