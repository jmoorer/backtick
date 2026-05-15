<script lang="ts">
  import type { Snippet } from 'svelte';

  type Variant = 'default' | 'accent';
  type Size = 'sm' | 'md' | 'lg';

  interface Props {
    label: string;
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    onclick?: (e: MouseEvent) => void;
    children: Snippet;
  }

  let {
    label,
    variant = 'default',
    size = 'md',
    disabled = false,
    onclick,
    children,
  }: Props = $props();
</script>

<button
  aria-label={label}
  {disabled}
  class="icon-btn icon-btn--{size} icon-btn--{variant}"
  class:icon-btn--disabled={disabled}
  {onclick}
>
  {@render children()}
</button>

<style>
  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid var(--color-ink-500);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-slate-400);
    cursor: pointer;
    transition: all 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .icon-btn:focus-visible {
    outline: none;
    box-shadow: var(--shadow-glow);
  }

  /* ── Sizes ──────────────────────────────────────────────────── */
  .icon-btn--sm {
    width: 1.75rem;
    height: 1.75rem;
  }

  .icon-btn--md {
    width: 2.25rem;
    height: 2.25rem;
  }

  .icon-btn--lg {
    width: 2.5rem;
    height: 2.5rem;
  }

  /* Scale slotted SVGs to fit the button size */
  .icon-btn--sm :global(svg) {
    width: 0.875rem;
    height: 0.875rem;
  }

  .icon-btn--md :global(svg) {
    width: 1.125rem;
    height: 1.125rem;
  }

  .icon-btn--lg :global(svg) {
    width: 1.25rem;
    height: 1.25rem;
  }

  /* ── Default variant ────────────────────────────────────────── */
  .icon-btn--default:hover {
    border-color: var(--color-cyan-400);
    color: var(--color-cyan-400);
    background: rgb(103 232 249 / 0.06);
  }

  /* ── Accent variant (active / highlighted) ──────────────────── */
  .icon-btn--accent {
    border-color: var(--color-cyan-600);
    color: var(--color-cyan-400);
    background: rgb(103 232 249 / 0.06);
  }

  .icon-btn--accent:hover {
    border-color: var(--color-cyan-400);
    background: rgb(103 232 249 / 0.1);
  }

  /* ── Disabled state ─────────────────────────────────────────── */
  .icon-btn--disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
</style>
