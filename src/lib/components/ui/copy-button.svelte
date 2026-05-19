<script lang="ts">
  import type { Snippet } from "svelte";
  import toast from "svelte-french-toast";
  import Button from "./button.svelte";
  import Icons from "./icons.svelte";

  type IconName = "copy" | "link" | "check" | "settings" | "eye" | "eye-off" | "trash" | "lock" | "unlock" | "clock" | "plus" | "code";

  interface Props {
    value: string;
    icon?: IconName;
    children: Snippet;
  }

  let { value, icon = "copy", children }: Props = $props();

  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout>;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const input = document.createElement("input");
      input.value = value;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }

    toast.success("Copied");
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), 1500);
  }
</script>

<Button onclick={handleCopy}>
  <Icons name={copied ? "check" : icon} />
  {#if copied}
    Copied
  {:else}
    {@render children()}
  {/if}
</Button>
