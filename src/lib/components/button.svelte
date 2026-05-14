<script lang="ts">
  import type { Snippet } from "svelte";

  type Variant =
    | "primary"
    | "secondary"
    | "ghost"
    | "danger"
    | "nav"
    | "nav-active";

  interface Props {
    variant?: Variant;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    href?: string;
    onclick?: (e: MouseEvent) => void;
    children: Snippet;
  }

  let {
    variant = "secondary",
    type = "button",
    disabled = false,
    href = undefined,
    onclick,
    children,
  }: Props = $props();
</script>

{#if href}
  <a
    {href}
    class="btn btn--{variant}"
    class:btn--disabled={disabled}
    aria-disabled={disabled}
    role="button"
  >
    {@render children()}
  </a>
{:else}
  <button
    {type}
    {disabled}
    class="btn btn--{variant}"
    class:btn--disabled={disabled}
    {onclick}
  >
    {@render children()}
  </button>
{/if}

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    border: none;
    background: none;
    text-decoration: none;
    font-family: var(--font-sans);
    white-space: nowrap;
  }

  .btn:focus-visible {
    outline: none;
    box-shadow: var(--shadow-glow);
  }

  /* ── Primary — single CTA per view ─────────────────────────── */
  .btn--primary {
    background: var(--color-cyan-400);
    color: var(--color-cyan-950);
    font-weight: 600;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-glow);
    transition: opacity 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .btn--primary:hover {
    opacity: 0.9;
  }

  /* ── Secondary ──────────────────────────────────────────────── */
  .btn--secondary {
    background: var(--color-ink-700);
    color: var(--color-slate-100);
    font-size: 0.875rem;
    border: 1px solid var(--color-ink-500);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-sm);
    transition: background-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .btn--secondary:hover {
    background: var(--color-ink-600);
  }

  /* ── Ghost ──────────────────────────────────────────────────── */
  .btn--ghost {
    color: var(--color-slate-400);
    font-size: 0.875rem;
    border: 1px solid var(--color-ink-500);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-sm);
    transition:
      color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
      border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .btn--ghost:hover {
    color: var(--color-slate-100);
    border-color: var(--color-ink-400);
  }

  /* ── Danger ─────────────────────────────────────────────────── */
  .btn--danger {
    color: var(--color-danger);
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-sm);
    background: rgb(248 113 113 / 0.1);
    border: 1px solid rgb(248 113 113 / 0.4);
    transition: background-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .btn--danger:hover {
    background: rgb(248 113 113 / 0.18);
  }

  /* ── Nav pill ───────────────────────────────────────────────── */
  .btn--nav {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    border: 1px solid var(--color-ink-500);
    color: var(--color-slate-500);
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-md);
    transition:
      color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
      border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .btn--nav:hover {
    border-color: var(--color-cyan-600);
    color: var(--color-slate-100);
  }

  /* ── Nav pill active ────────────────────────────────────────── */
  .btn--nav-active {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    border: 1px solid var(--color-cyan-600);
    color: var(--color-cyan-400);
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-md);
    background: rgb(103 232 249 / 0.06);
  }

  /* ── Disabled state ─────────────────────────────────────────── */
  .btn--disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
</style>
