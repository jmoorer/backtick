<script lang="ts">
  import { browser } from "$app/environment";
  import Button from "../ui/button.svelte";
  import CopyButton from "../ui/copy-button.svelte";
  import Icons from "../ui/icons.svelte";

  interface Props {
    shortId: string;
    content: string;
  }
  let { shortId, content }: Props = $props();

  const url = $derived(
    browser ? `${window.location.origin}/${shortId}` : `/${shortId}`,
  );
</script>

<div class="flex gap-3">
  <CopyButton value={url} icon="link">Copy link</CopyButton>
  <CopyButton value={content} icon="copy">Copy markdown</CopyButton>
  <Button href={`/${shortId}/raw`}>
    <Icons name="code" />
    Raw
  </Button>
  <div class="flex-1 flex justify-end">
    <Button variant="danger">
      <Icons name="trash" />
      Delete
    </Button>
  </div>
</div>
