<script lang="ts">
  import Editor from "$lib/components/editor.svelte";
  import Preview from "$lib/components/preview.svelte";
  import { Pane, Splitpanes } from "svelte-splitpanes";

  import { EXAMPLE_MARKDOWN } from "$lib/constants";
  import Toolbar from "$lib/components/toolbar.svelte";
  import type { PasteFormData } from "$lib/schemas";

  import toast, { Toaster } from "svelte-french-toast";
  import { delay } from "$lib/utils";

  let pasteForm = $state<PasteFormData>({
    content: EXAMPLE_MARKDOWN,
    extension: "md",
    visibility: "public",
    password: "",
    expiry: "1d",
  });

  function copyToClipboard() {
    navigator.clipboard.writeText(pasteForm.content).then(
      () => {
        toast.success("Text copied to clipboard");
      },
      (err) => {
        toast.error("Could not copy text: ", err);
      },
    );
  }
  async function publish() {
    await delay(1000); // Simulate API delay
    toast.success("Paste published successfully");
  }
</script>

{#snippet header(name: string)}
  <div
    class="bg-ink-800 px-4 py-2 flex items-center gap-2 border-b border-ink-500"
  >
    <h1 class="text-xl font-display text-slate-400">{name}</h1>
  </div>
{/snippet}

<Splitpanes class="flex-1 pane">
  <Pane minSize={20}>
    <div class="flex flex-col h-full bg-ink-800">
      {@render header("Markdown")}
      <Editor bind:text={pasteForm.content} />
    </div>
  </Pane>
  <Pane minSize={20}>
    <div class="flex flex-col h-full bg-ink-800">
      {@render header("Preview")}
      <Preview markdown={pasteForm.content} />
    </div>
  </Pane>
</Splitpanes>
<Toolbar
  bind:visibility={pasteForm.visibility}
  bind:password={pasteForm.password}
  bind:expiry={pasteForm.expiry}
  oncopy={copyToClipboard}
  onpublish={publish}
/>

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
