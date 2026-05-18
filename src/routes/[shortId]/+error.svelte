<script lang="ts">
  import { page } from "$app/state";
  import NotFound from "$lib/components/paste/not-found.svelte";
  import Expired from "$lib/components/paste/expired.svelte";
</script>

{#if page.status === 404}
  <NotFound shortId={page.params.shortId} />
{:else if page.status === 410}
  <Expired
    shortId={page.params.shortId!}
    title={page.error?.pasteTitle}
    createdAt={page.error?.pasteCreatedAt
      ? new Date(page.error.pasteCreatedAt)
      : undefined}
    expiresAt={page.error?.pasteExpiresAt
      ? new Date(page.error.pasteExpiresAt)
      : undefined}
  />
{/if}
