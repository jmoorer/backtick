<script lang="ts">
  import { onMount } from "svelte";

  let theme = $state<"light" | "dark" | "system">("system");
  let mounted = $state(false);

  onMount(() => {
    mounted = true;
    // Get saved theme or system preference
    const saved = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    theme = saved || "system";
    applyTheme(theme);
  });

  function applyTheme(newTheme: "light" | "dark" | "system") {
    theme = newTheme;
    localStorage.setItem("theme", newTheme);

    if (newTheme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  }

  function toggleTheme() {
    const current =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  }
</script>

<button
  onclick={toggleTheme}
  title={theme === "system"
    ? "Using system preference. Click to toggle."
    : `Current theme: ${theme}. Click to toggle.`}
  class="theme-toggle"
  aria-label="Toggle theme"
>
  {#if !mounted}
    <div class="icon"></div>
  {:else if theme === "system"}
    {#if window.matchMedia("(prefers-color-scheme: dark)").matches}
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    {:else}
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    {/if}
  {:else if theme === "dark"}
    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  {:else}
    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  {/if}
</button>

<style>
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid var(--color-ink-500);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--color-slate-400);
    cursor: pointer;
    transition: all 0.2s;
  }

  .theme-toggle:hover {
    border-color: var(--color-cyan-400);
    color: var(--color-cyan-400);
    background: rgb(103 232 249 / 0.06);
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>
