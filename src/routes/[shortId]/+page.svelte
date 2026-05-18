<script lang="ts">
  import { page } from "$app/state";
  import { getPaste } from "$lib/pastes.remote";

  const id = page.params.shortId!;
  const paste = getPaste(id);
</script>

<span
  class="flex items-center justify-center h-full text-slate-500 font-mono text-sm"
>
  Paste ID: {id}
</span>
