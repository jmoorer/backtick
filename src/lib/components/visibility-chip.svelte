<script lang="ts">
  import Icons from './icons.svelte';

  interface Props {
    visibility: 'public' | 'locked';
    onclick?: (e: MouseEvent) => void;
  }

  let { visibility, onclick }: Props = $props();
</script>

<button
  class="ui-chip"
  class:ui-chip-success={visibility === 'public'}
  class:ui-chip-warn={visibility === 'locked'}
  {onclick}
>
  {#if visibility === 'public'}
    <span class="dot"></span>
    public
  {:else}
    <Icons name="lock" size={11} />
    locked
  {/if}
</button>

<style>
  button {
    cursor: pointer;
    transition:
      background-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
      border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  button:focus-visible {
    outline: none;
    box-shadow: var(--shadow-glow);
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  }
</style>
