<script lang="ts">
  import Editor from "$lib/components/editor.svelte";
  import Preview from "$lib/components/preview.svelte";
  import { Pane, Splitpanes } from "svelte-splitpanes";

  import { EXAMPLE_MARKDOWN } from "$lib/constants";
  import SettingsToolbar from "$lib/components/settings-toolbar.svelte";
  import type { PasteFormData } from "$lib/schemas";

  import toast, { Toaster } from "svelte-french-toast";
  import { delay } from "$lib/utils";
  import { createScrollSync } from "$lib/state/scroll.svelte";
  import { createPaste } from "$lib/pastes.remote";
  import { goto } from "$app/navigation";
  import { tokenService } from "$lib/tokens";

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
    const { short_id, delete_token } = await createPaste(pasteForm);
    tokenService.saveToken(short_id, delete_token);
    goto(`/${short_id}`);
    toast.success("Paste published successfully");
  }
  let scrollContext = createScrollSync();
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
      <Editor {scrollContext} bind:text={pasteForm.content} />
    </div>
  </Pane>
  <Pane minSize={20}>
    <div class="flex flex-col h-full bg-ink-800">
      {@render header("Preview")}
      <Preview markdown={pasteForm.content} {scrollContext} />
    </div>
  </Pane>
</Splitpanes>
<SettingsToolbar
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
