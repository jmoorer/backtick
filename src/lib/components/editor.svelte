<script lang="ts">
  import { EditorView } from "@codemirror/view";
  import { markdown } from "@codemirror/lang-markdown";

  import { basicSetup } from "codemirror";
  import { onMount } from "svelte";
  import type { ScrollContext } from "$lib/state/scroll.svelte";

  type Props = {
    text?: string;
    scrollContext: ScrollContext;
  };
  let { text = $bindable<string>(), scrollContext }: Props = $props();
  let editorElement: HTMLElement;
  let containerElement: HTMLElement;

  onMount(() => {
    console.log({
      size: editorElement.clientHeight,
    });
    if (!editorElement) {
      throw new Error("Element not found");
    }

    const height = containerElement.clientHeight;

    const view = new EditorView({
      parent: editorElement,
      doc: text,

      extensions: [
        basicSetup,
        markdown(),
        EditorView.theme({
          "&": { "max-height": `${height}px` },
          ".cm-scroller": { overflow: "auto" },
          ".cm-gutters": {
            backgroundColor: "var(--color-ink-900)",
            color: "var(--color-slate-500)",
            border: "none",
          },
        }),
      ],
      dispatch: (tr) => {
        console.log({ tr });
        view.update([tr]);
        text = view.state.doc.toString();
      },
    });
    scrollContext.syncScroll(view.scrollDOM);
    scrollContext.followScroll(view.scrollDOM);
  });
</script>

<div bind:this={containerElement} class="flex-1 relative">
  <div bind:this={editorElement}></div>
  <!-- <span class="absolute bottom-1 right-2 text-xs text-slate-500">
    {scrollContext.scrollPosition.x}, {scrollContext.scrollPosition.y}
  </span> -->
</div>
