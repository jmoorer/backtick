<script lang="ts">
  import type { ScrollContext } from "$lib/state/scroll.svelte";

  let {
    markdown,
    scrollContext,
  }: { markdown: string; scrollContext: ScrollContext } = $props();

  import MarkdownIt from "markdown-it";
  import { onMount } from "svelte";

  const md = new MarkdownIt();

  let html = $state("");

  let height = $state(0);

  let containerElement: HTMLElement;
  onMount(() => {
    if (!containerElement) {
      throw new Error("Element not found");
    }
    scrollContext.syncScroll(containerElement);
    scrollContext.followScroll(containerElement);
  });
  $effect(() => {
    if (!containerElement) {
      return;
    }
    const md = new MarkdownIt();
    html = md.render(markdown);
    console.log({ h: containerElement.clientHeight });
    height = containerElement.clientHeight;
  });
</script>

<div class="flex-1 overflow-auto" bind:this={containerElement}>
  <!-- <div style="max-height: {height}px" class="overflow-auto">
    {@html html}
  </div> -->
  <article
    style="max-height: {height}px"
    class="prose lg:prose-lg dark:prose-invert max-w-none"
  >
    {@html html}
  </article>
</div>
