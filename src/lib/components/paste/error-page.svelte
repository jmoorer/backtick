<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    status,
    title,
    children,
  }: { status: number; title: string; children: Snippet } = $props();
</script>

<main
  class="w-full max-w-xl mx-auto text-center grid place-content-center flex-1 space-y-3"
>
  <span class="text-6xl font-semibold text-slate-600">{status}</span>
  <h1 class="text-3xl font-semibold">{title}</h1>
  {@render children()}
</main>
