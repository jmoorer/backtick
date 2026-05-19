<script lang="ts">
  import AppLogo from "./app-logo.svelte";
  import Button from "./ui/button.svelte";
  import Icons from "./ui/icons.svelte";
</script>

<header class="flex items-center border-b border-ink-500 py-4 px-8 bg-ink-800">
  <a href="/">
    <AppLogo size={20} ariaHidden={true} name="Backtick" />
  </a>

  <div class="flex-1 flex items-center justify-end">
    <Button href="/" variant="primary" size="sm">
      <Icons name="plus" />
      New paste
    </Button>
  </div>
</header>
