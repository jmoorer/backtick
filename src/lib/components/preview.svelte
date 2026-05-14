<script lang="ts">
  let { markdown }: { markdown: string } = $props();

  import MarkdownIt from "markdown-it";

  $effect(() => {
    console.log({ markdown });
  });

  const md = new MarkdownIt();

  //let html = $derived(processor.processSync(markdown).toString());
  let html = $state("");

  let height = $state(0);

  let containerElement: HTMLElement;
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
