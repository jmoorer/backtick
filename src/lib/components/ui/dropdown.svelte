<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import type { Snippet } from "svelte";

  type Item = {
    label: string;
    value?: string;
    onclick?: (e: MouseEvent) => void;
  };

  type DropdownProps = {
    trigger: Snippet;
    items?: readonly Item[];
    value?: string;
    onchange?: (value: string) => void;
    children?: Snippet;
  };

  let {
    trigger,
    items,
    value = $bindable(),
    onchange,
    children,
  }: DropdownProps = $props();

  function select(item: Item) {
    const v = item.value ?? item.label;
    value = v;
    onchange?.(v);
  }

  const selectMode = $derived(value !== undefined || !!onchange);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#if trigger}
      {@render trigger()}
    {/if}
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      class="bg-ink-700 border border-ink-500 rounded-md shadow-raised p-1 outline-none min-w-40"
    >
      {#if items}
        {#each items as item}
          {@const itemValue = item.value ?? item.label}
          {@const active = selectMode && value === itemValue}
          <DropdownMenu.Item
            class="flex items-center gap-2 w-full font-sans text-sm px-3 py-1.5 rounded-sm cursor-pointer outline-none transition-colors duration-150 ease-snappy {active
              ? 'text-cyan-400 bg-ink-600'
              : 'text-slate-200 hover:bg-ink-600 hover:text-slate-100'}"
            onclick={(e) => {
              if (selectMode) select(item);
              item.onclick?.(e);
            }}
          >
            {#if selectMode}
              <span class="w-3 text-cyan-400 text-xs leading-none"
                >{active ? "✓" : ""}</span
              >
            {/if}
            {item.label}
          </DropdownMenu.Item>
        {/each}
      {/if}
      {#if children}
        {@render children()}
      {/if}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
