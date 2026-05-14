<script lang="ts">
  let { markdown }: { markdown: string } = $props();
  import rehypeStringify from "rehype-stringify";
  import remarkParse from "remark-parse";
  import remarkRehype from "remark-rehype";
  import { unified } from "unified";
  // import { marked } from "marked";
  import MarkdownIt from "markdown-it";

  const md = new MarkdownIt();

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify);
  //let html = $derived(processor.processSync(markdown).toString());
  let html = $derived(md.render(markdown));

  let height = $state(0);

  let containerElement: HTMLElement;
  $effect(() => {
    if (!containerElement) {
      return;
    }
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
