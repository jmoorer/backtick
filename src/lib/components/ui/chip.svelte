<script lang="ts">
  import type { Snippet } from "svelte";

  type Variant = "default" | "accent" | "success" | "warn" | "danger";

  interface Props {
    variant?: Variant;
    role?: string;
    onclick?: (e: MouseEvent) => void;
    children: Snippet;
  }

  let { variant = "default", role, onclick, children }: Props = $props();

  const interactive = $derived(!!onclick);
  const resolvedRole = $derived(interactive ? undefined : (role ?? "status"));
</script>

<svelte:element
  this={interactive ? "button" : "span"}
  class="ui-chip"
  class:ui-chip-accent={variant === "accent"}
  class:ui-chip-success={variant === "success"}
  class:ui-chip-warn={variant === "warn"}
  class:ui-chip-danger={variant === "danger"}
  class:interactive
  role={resolvedRole}
  onclick={interactive ? onclick : undefined}
>
  {@render children()}
</svelte:element>

<style>
  .interactive {
    cursor: pointer;
    transition:
      background-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
      border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .interactive:focus-visible {
    outline: none;
    box-shadow: var(--shadow-glow);
  }
</style>
