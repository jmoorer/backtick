<script lang="ts">
  interface Props {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    variant?: "default" | "warn";
    label: string;
  }

  let {
    checked = $bindable(false),
    onCheckedChange,
    variant = "default",
    label,
  }: Props = $props();

  function toggle() {
    checked = !checked;
    onCheckedChange?.(checked);
  }
</script>

<button
  role="switch"
  aria-checked={checked}
  aria-label={label}
  onclick={toggle}
  class="switch"
  class:switch--warn={variant === "warn"}
  class:switch--checked={checked}
>
  <span class="thumb"></span>
</button>

<style>
  .switch {
    display: inline-flex;
    align-items: center;
    width: 2.25rem;
    height: 1.25rem;
    border-radius: 999px;
    background: var(--color-ink-500);
    border: 1px solid var(--color-ink-400);
    padding: 0;
    cursor: pointer;
    flex-shrink: 0;
    transition:
      background-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
      border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .switch:focus-visible {
    outline: none;
    box-shadow: var(--shadow-glow);
  }

  .switch--checked {
    background: var(--color-cyan-400);
    border-color: var(--color-cyan-400);
  }

  .switch--warn.switch--checked {
    background: var(--color-warn);
    border-color: var(--color-warn);
  }

  .thumb {
    display: block;
    width: 0.875rem;
    height: 0.875rem;
    border-radius: 50%;
    background: var(--color-slate-400);
    margin-left: 2px;
    flex-shrink: 0;
    transition: transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1), background-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .switch--checked .thumb {
    transform: translateX(1rem);
    background: var(--color-ink-950);
  }
</style>
