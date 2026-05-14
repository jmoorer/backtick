<script lang="ts">
  import Editor from "$lib/components/editor.svelte";
  import Preview from "$lib/components/preview.svelte";
  import { Pane, Splitpanes } from "svelte-splitpanes";

  import { EXAMPLE_MARKDOWN } from "$lib/constants";
  import Toolbar from "$lib/components/toolbar.svelte";
  let markdown = $state(EXAMPLE_MARKDOWN);
</script>

<!-- <h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
  documentation
</p> -->
{#snippet header(name: string)}
  <div
    class="bg-ink-800 px-4 py-2 flex items-center gap-2 border-b border-ink-500"
  >
    <h1 class="text-xl font-display text-slate-400">{name}</h1>
  </div>
{/snippet}

<!-- <div class="grid grid-cols-2 flex-1">

  <div class="border-r border-ink-500 flex flex-col">
    {@render header("Markdown")}
    <Editor bind:text />
  </div>
  <div class="flex flex-col">
    {@render header("Preview")}
    <Preview markdown={text} />
  </div>
</div> -->

<Splitpanes class="flex-1 pane">
  <Pane minSize={20}>
    <div class="flex flex-col h-full bg-ink-800">
      {@render header("Markdown")}
      <Editor bind:text={markdown} />
    </div>
  </Pane>
  <Pane minSize={20}>
    <div class="flex flex-col h-full bg-ink-800">
      {@render header("Preview")}
      <Preview {markdown} />
    </div>
  </Pane>
</Splitpanes>
<Toolbar />

<style lang="css">
  :global(.splitpanes.default-theme .splitpanes__splitter) {
    background: var(--color-ink-500) !important;
    width: 6px !important;
    border-left: none !important;
  }

  :global(.splitpanes.default-theme .splitpanes__splitter::before) {
    background: var(--color-cyan-400) !important;
    width: 3px !important;
    margin-left: -1px !important;
  }
</style>
