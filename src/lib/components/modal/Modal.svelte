<script lang="ts">
  import { setContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { Snippet } from 'svelte';

  interface Props {
    open?: boolean;
    backdrop?: boolean;
    backdropClosable?: boolean;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    open = $bindable(false),
    backdrop = true,
    backdropClosable = true,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const close = () => {
    open = false;
  };

  setContext('glassui-modal', {
    get open() { return open; },
    close
  });

  const handleBackdropClick = () => {
    if (backdropClosable) {
      close();
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      close();
    }
  };
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="fixed inset-0 z-[80] overflow-x-hidden overflow-y-auto flex items-center justify-center p-4 sm:p-6"
    role="dialog"
    aria-modal="true"
    {...rest}
  >
    {#if backdrop}
      <div
        class="fixed inset-0 bg-neutral-900/50 dark:bg-neutral-900/80 transition-opacity"
        transition:fade={{ duration: 200 }}
        onclick={handleBackdropClick}
      ></div>
    {/if}

    <div class="relative w-full flex justify-center pointer-events-none">
      <div class="pointer-events-auto w-full flex justify-center">
        {@render children()}
      </div>
    </div>
  </div>
{/if}