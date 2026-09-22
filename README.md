# backtick

A self-hostable Markdown pastebin with a split-pane editor and live preview. Built with SvelteKit, TypeScript, Drizzle ORM, and PostgreSQL.

## Features

- **Split-pane editor** — write Markdown on the left, rendered preview on the right with scroll sync
- **Syntax highlighting** — code blocks with language-aware highlighting
- **Visibility control** — public, private, or password-protected pastes
- **Expiry** — configurable TTL per paste (or never expires)
- **Short IDs** — every paste gets a short URL (e.g. `/abc123`)
- **Raw view** — plain text at `/:id/raw`
- **Delete tokens** — client-side token stored in `localStorage`; only the creator can remove a paste
- **View count** — tracks how many times a paste has been viewed

## Stack

| Layer    | Tech                         |
|----------|------------------------------|
| Frontend | SvelteKit 5 + Svelte 5 runes |
| Styling  | Tailwind CSS v4              |
| Database | PostgreSQL via Drizzle ORM   |
| Runtime  | Node.js (adapter-node)       |
| Deploy   | Docker + Docker Compose      |

## Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL (or use the included Docker Compose setup)

## Setup

```bash
pnpm install

# Copy env template and fill in your DATABASE_URL
cp .env.example .env

# Push schema to the database
pnpm db:push

pnpm dev
```

With Docker:

```bash
docker compose up
```

## Environment variables

| Variable       | Description                  |
|----------------|------------------------------|
| `DATABASE_URL` | PostgreSQL connection string |

## Building

```bash
pnpm build
pnpm preview
```