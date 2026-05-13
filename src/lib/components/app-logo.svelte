<script lang="ts">
  //   export let size = 110;
  //   export let ariaHidden = true;

  let { size = 110, ariaHidden = true, name = undefined } = $props();
</script>

<div class="container">
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    aria-hidden={ariaHidden}
    style="display: block;"
  >
    <!-- Left bracket -->
    <path
      d="M 22 16 L 10 16 L 10 84 L 22 84"
      fill="none"
      stroke="currentColor"
      stroke-width="9.35"
      stroke-linecap="square"
      class="bracket"
    />
    <!-- Right bracket -->
    <path
      d="M 78 16 L 90 16 L 90 84 L 78 84"
      fill="none"
      stroke="currentColor"
      stroke-width="9.35"
      stroke-linecap="square"
      class="bracket"
    />
    <!-- Center mark -->
    <path
      d="M 42 32 L 58 32 L 53 64 L 42 64 Z"
      fill="currentColor"
      class="mark"
    />
  </svg>
  {#if name}
    <span class="name">{name}</span>
  {/if}
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  svg {
    display: block;
    color: var(--color-slate-100);
    flex-shrink: 0;
  }

  .mark {
    color: var(--color-cyan-400);
  }

  .name {
    font-weight: 600;
    font-size: 1.125rem;
    color: var(--color-slate-100);
  }
</style>
