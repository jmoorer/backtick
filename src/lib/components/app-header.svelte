<script lang="ts">
  import AppLogo from "./app-logo.svelte";
  import ThemeToggle from "./theme-toggle.svelte";
</script>

<header
  class="flex items-center justify-between border-b border-ink-500 py-4 px-8 bg-ink-800"
>
  <div class="flex items-center">
    <AppLogo size={20} ariaHidden={true} name="Backtick" />
  </div>
  <div class="flex items-center gap-4">
    <ThemeToggle />
  </div>
</header>
