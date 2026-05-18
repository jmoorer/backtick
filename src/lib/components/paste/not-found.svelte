<script lang="ts">
  import ErrorPage from "./error-page.svelte";
  let { shortId } = $props();
</script>

<ErrorPage status={404} title="Paste not found">
  <p class="text-slate-400">
    There's no paste at <code
      class="bg-ink-900 text-cyan-300 rounded-xs px-0.5 py-1.5 border border-ink-500"
      >/{shortId}</code
    >. It may have been deleted, or the link might be wrong.
  </p>
  <div class="bg-ink-700 border border-ink-500 rounded-lg px-7 py-8 text-left">
    <span class="text-slate-500">What could have happened</span>
    <ul class="text-slate-400 mt-4">
      <li>The URL was copied incorrectly — IDs are case-sensitive</li>
      <li>The author deleted the paste</li>
      <li>The paste expired and was automatically removed</li>
    </ul>
  </div>
</ErrorPage>
