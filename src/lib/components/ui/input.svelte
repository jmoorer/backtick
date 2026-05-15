<script lang="ts">
  interface Props {
    type?: "text" | "password" | "email";
    placeholder?: string;
    value?: string;
    disabled?: boolean;
  }

  let {
    type = "text",
    placeholder = "",
    value = $bindable(""),
    disabled = false,
  }: Props = $props();
</script>

<input
  {type}
  {placeholder}
  {disabled}
  bind:value
  class="input"
/>

<style>
  .input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-ink-500);
    background: transparent;
    color: var(--color-slate-100);
    font-family: var(--font-sans);
    font-size: 0.875rem;
    outline: none;
    transition:
      border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
      box-shadow 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .input::placeholder {
    color: var(--color-slate-500);
  }

  .input:focus {
    border-color: var(--color-cyan-400);
    box-shadow: var(--shadow-glow);
  }

  .input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>