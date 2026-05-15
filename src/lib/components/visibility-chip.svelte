<script lang="ts">
  import type { Visibility } from "$lib/schemas";
  import Chip from "./ui/chip.svelte";
  import Icons from "./ui/icons.svelte";

  interface Props {
    visibility: Visibility;
    onclick?: (e: MouseEvent) => void;
  }

  let { visibility, onclick }: Props = $props();

  const variant = $derived(visibility === "public" ? "success" : "default");
</script>

<Chip {variant} {onclick}>
  {#if visibility === "public"}
    <span class="dot"></span>
    public
  {:else if visibility === "private"}
    <Icons name="eye-off" size={11} />
    private
  {/if}
</Chip>

<style>
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  }
</style>
