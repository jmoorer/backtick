<script lang="ts">
  import { page } from "$app/state";

  const id = page.params.shortId;
</script>

<!-- {#if result.loading}
  <div class="flex items-center justify-center h-full text-slate-500 font-mono text-sm">
    loading…
  </div>
{:else if result.error || !result.current}
  <div class="flex items-center justify-center h-full text-danger font-mono text-sm">
    paste not found
  </div>
{:else}
  {@const p = result.current}
  <div class="flex flex-col h-full bg-ink-800">
    <div class="bg-ink-800 px-4 py-2 flex items-center justify-between border-b border-ink-500">
      <span class="text-slate-100 font-sans text-sm">{p.title ?? 'Untitled'}</span>
      <span class="font-mono text-xs text-cyan-400">{p.id}</span>
    </div>
    <pre class="flex-1 p-4 font-mono text-[12.5px] leading-7 text-slate-100 overflow-auto bg-ink-900 m-0">{p.content}</pre>
  </div>
{/if} -->

<span
  class="flex items-center justify-center h-full text-slate-500 font-mono text-sm"
>
  Paste ID: {id}
</span>
