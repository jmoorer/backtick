<script lang="ts">
  import { EXPIRY_OPTIONS, ExpiryOption, type Visibility } from "$lib/schemas";
  import Button from "./ui/button.svelte";
  import Chip from "./ui/chip.svelte";
  import Dropdown from "./ui/dropdown.svelte";
  import IconButton from "./ui/icon-button.svelte";
  import Icons from "./ui/icons.svelte";
  import Input from "./ui/input.svelte";
  import Popover from "./ui/popover.svelte";
  import VisibilityChip from "./visibility-chip.svelte";

  function getExpiresInLabel(value: string) {
    const option = EXPIRY_OPTIONS.find((o) => o.value === value);
    return option ? option.label : value;
  }
  type Props = {
    visibility?: Visibility;
    password?: string;
    expiry?: ExpiryOption;
    oncopy?: (e: MouseEvent) => void;
    onpublish: (e: MouseEvent) => Promise<void>;
  };
  let {
    visibility = $bindable<Visibility>("public"),
    password = $bindable<string>(),
    expiry = $bindable<ExpiryOption>("1d"),
    oncopy,
    onpublish,
  }: Props = $props();

  let pending = $state(false);

  async function handlePublish(e: MouseEvent) {
    pending = true;
    try {
      await onpublish(e);
    } finally {
      pending = false;
    }
  }
</script>

<div class="flex items-center gap-2 p-2 border-b border-ink-500 h-16">
  <div class="flex-1 flex items-center gap-2">
    <span class="text-sm font-medium text-slate-400">Expires </span>
    <Dropdown items={EXPIRY_OPTIONS} bind:value={expiry}>
      {#snippet trigger()}
        <Button variant="ghost" size="sm">
          {getExpiresInLabel(expiry)}
          <span class="chevron">▾</span>
        </Button>
      {/snippet}
    </Dropdown>

    <VisibilityChip
      {visibility}
      onclick={() => {
        visibility = visibility === "public" ? "private" : "public";
      }}
    />

    <Popover>
      {#snippet trigger()}
        <Chip role="button" variant={password ? "warn" : "default"}>
          <Icons name="lock" size={14} />
          {password ? "password set" : "no password"}
        </Chip>
      {/snippet}
      {#snippet content()}
        <div class="pw-panel">
          <Input
            type="password"
            bind:value={password}
            placeholder="Set a password"
          />
          {#if password}
            <button class="clear-btn" onclick={() => (password = "")}
              >Remove password</button
            >
          {/if}
          <span class="hint">Stored as bcrypt hash, never plaintext</span>
        </div>
      {/snippet}
    </Popover>
    <div class="flex items-center gap-1 justify-end flex-1">
      <span class="bytes">0 bytes</span>
    </div>
  </div>

  <div class="border-l border-ink-500 pl-3 flex items-center gap-2">
    <IconButton label="Copy" onclick={oncopy}>
      <Icons name="copy" />
    </IconButton>
    <Button variant="primary" onclick={handlePublish} disabled={pending}>
      {pending ? "Publishing…" : "Publish →"}
    </Button>
  </div>
</div>

<style>
  .chevron {
    font-size: 0.625rem;
    opacity: 0.6;
    margin-left: -0.125rem;
  }

  .pw-panel {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
    width: 13rem;
  }

  .clear-btn {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    color: var(--color-danger);
    background: rgb(248 113 113 / 0.08);
    border: 1px solid rgb(248 113 113 / 0.3);
    border-radius: var(--radius-sm);
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    text-align: left;
    transition: background-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .clear-btn:hover {
    background: rgb(248 113 113 / 0.15);
  }

  .hint {
    font-size: 0.6875rem;
    color: var(--color-slate-500);
    line-height: 1.4;
  }

  .bytes {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-slate-500);
  }
</style>
