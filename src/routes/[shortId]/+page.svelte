<script lang="ts">
  import Chip from "$lib/components/ui/chip.svelte";
  import Icons from "$lib/components/ui/icons.svelte";
  import VisibilityChip from "$lib/components/visibility-chip.svelte";
  import { formatDate, formatTtl, getContentLength } from "$lib/utils";
  import MarkdownIt from "markdown-it";
  import type { PageProps } from "./$types";
  import Toolbar from "$lib/components/paste/toolbar.svelte";

  let { data }: PageProps = $props();
  const paste = $derived(data.paste);
  let html = $state("");

  $effect(() => {
    const md = new MarkdownIt();
    html = md.render(paste.content);
  });
</script>

<main class="flex-1 overflow-auto p-8 space-y-4">
  <div class="flex gap-2">
    <span class="text-cyan-400">{data.paste.short_id}</span>
    <VisibilityChip visibility={paste.is_public ? "public" : "private"} />
    <Chip variant="warn">
      <Icons name="clock" />
      {formatTtl(paste.expires_at)}
    </Chip>
  </div>
  <h1 class="text-2xl font-semibold">{paste.title}</h1>
  <div class="flex gap-2 text-slate-400">
    <span>
      Created {formatDate(paste.created_at, true)}
    </span>
    <span> &#8226; </span>
    <span> {getContentLength(paste.content)} </span>
    <span> &#8226; </span>
    <span>
      {paste.view_count} views
    </span>
  </div>
  <Toolbar shortId={paste.short_id} content={paste.content} />
  <div
    class="py-9 px-10 bg-ink-700 border border-ink-500 rounded-lg overflow-auto"
  >
    <article class="prose lg:prose-lg dark:prose-invert max-w-none">
      {@html html}
    </article>
  </div>
</main>
