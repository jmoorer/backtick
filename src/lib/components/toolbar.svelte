<script>
  import Button from "./button.svelte";
  import IconButton from "./icon-button.svelte";
  import Icons from "./icons.svelte";
  import VisibilityChip from "./visibility-chip.svelte";
</script>

<div class="flex items-center gap-2 p-2 border-b border-ink-500 h-16">
  <div class="flex-1 flex items-center gap-2">
    <Button variant="ghost">Expires 1 Day</Button>
    <IconButton label="Settings" variant="accent">
      <Icons name="settings" />
    </IconButton>
    <VisibilityChip visibility="public" />
  </div>
  <div class="border-l border-ink-500 p-2 flex items-center gap-2">
    <IconButton label="Copy"><Icons name="copy" /></IconButton>
    <Button variant="primary">Publish</Button>
  </div>
</div>
