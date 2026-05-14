<script lang="ts">
  let { text = $bindable<string>() } = $props();

  import { EditorView } from "@codemirror/view";
  import { markdown } from "@codemirror/lang-markdown";

  import { basicSetup } from "codemirror";
  import { onMount } from "svelte";
  let editorElement: HTMLElement;
  let containerElement: HTMLElement;

  onMount(() => {
    console.log({
      size: editorElement.clientHeight,
    });
    if (!editorElement) {
      throw new Error("Element not found");
    }
    new ResizeObserver(() => {
      const height = containerElement.clientHeight;
      console.log({ height });
      view.dispatch({
        effects: [],
      });
    }).observe(containerElement);
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
  });
</script>

<div bind:this={containerElement} class="flex-1">
  <div bind:this={editorElement}></div>
</div>
