<script lang="ts">
  import { Popover } from "bits-ui";
  import Button from "./button.svelte";
  import type { Snippet } from "svelte";

  type PopoverProps = {
    trigger: Snippet;
    content: Snippet;
  };
  let { trigger, content }: PopoverProps = $props();
</script>

<Popover.Root>
  <Popover.Trigger>
    {#if trigger}
      {@render trigger()}
    {/if}
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Content class="bg-ink-800 border border-ink-500 rounded ">
      {#if content}
        {@render content()}
      {/if}
      <Popover.Arrow class="fill-ink-800" />
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
