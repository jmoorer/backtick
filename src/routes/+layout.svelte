<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import AppHeader from "$lib/components/app-header.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="flex flex-col h-screen">
  <AppHeader />
  <div class="flex-1 overflow-hidden flex flex-col">
    {@render children()}
  </div>
</div>
