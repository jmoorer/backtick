<script lang="ts">
  import ErrorPage from "./error-page.svelte";
  import Icon from "$lib/components/ui/icons.svelte";
  import { EXPIRY_MS, EXPIRY_OPTIONS } from "$lib/schemas/paste";

  let { shortId, title, createdAt, expiresAt }: {
    shortId: string;
    title?: string | null;
    createdAt?: Date;
    expiresAt?: Date;
  } = $props();

  function timeAgo(date: Date): string {
    const diff = Date.now() - date.getTime();
    const h = Math.floor(diff / 3_600_000);
    const d = Math.floor(diff / 86_400_000);
    if (h < 1) return `${Math.floor(diff / 60_000)} minutes ago`;
    if (h < 24) return `${h} hour${h !== 1 ? 's' : ''} ago`;
    return `${d} day${d !== 1 ? 's' : ''} ago`;
  }

  function deriveTtl(created: Date, expires: Date): string {
    const ms = expires.getTime() - created.getTime();
    const entries = (Object.entries(EXPIRY_MS) as [string, number | null][]).filter(([, v]) => v !== null) as [string, number][];
    const [key] = entries.reduce((a, b) => Math.abs(b[1] - ms) < Math.abs(a[1] - ms) ? b : a);
    return EXPIRY_OPTIONS.find(o => o.value === key)?.label ?? 'custom';
  }

  const expiredAgo = $derived(expiresAt ? timeAgo(expiresAt) : null);
  const ttlLabel = $derived(createdAt && expiresAt ? deriveTtl(createdAt, expiresAt) : null);
  const createdLabel = $derived(
    createdAt
      ? createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : null
  );
</script>

<ErrorPage status={410} title="This paste has expired">
  <p class="text-slate-400">
    The author set a time limit on this paste and it's no longer available.
    Expired pastes are automatically removed.
  </p>
  <div class="bg-ink-700 border border-ink-500 rounded-lg overflow-hidden text-left">
    <div class="flex items-center gap-2 px-4 py-3 border-b border-ink-500 text-danger text-sm font-mono">
      <Icon name="clock" size={14} />
      {expiredAgo ? `Expired ${expiredAgo}` : 'This paste has expired'}
    </div>
    <div class="grid grid-cols-2 gap-x-6 gap-y-5 px-4 py-4">
      <div>
        <div class="eyebrow mb-1">Paste ID</div>
        <span class="font-mono text-sm text-cyan-400">{shortId}</span>
      </div>
      <div>
        <div class="eyebrow mb-1">Created</div>
        <span class="text-sm text-slate-200">{createdLabel ?? '—'}</span>
      </div>
      <div>
        <div class="eyebrow mb-1">TTL</div>
        <span class="font-mono text-sm text-warn">{ttlLabel ?? '—'}</span>
      </div>
      {#if title}
        <div>
          <div class="eyebrow mb-1">Title</div>
          <span class="text-sm text-slate-500 line-through">{title}</span>
        </div>
      {/if}
    </div>
  </div>
</ErrorPage>
