<script lang="ts">
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { Icon } from '$lib/components/icon';

  interface Props {
    class?: string;
    [key: string]: unknown;
  }

  let { class: className, ...rest }: Props = $props();

  const ctx = getContext<{ open: boolean; close: () => void }>('glassui-modal');
</script>

<button
  type="button"
  class={cn(
    'flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent',
    'text-[var(--comp-text)] hover:bg-[var(--comp-hover)] disabled:opacity-50 disabled:pointer-events-none',
    className
  )}
  onclick={ctx?.close}
  aria-label="Close"
  {...rest}
>
  <span class="sr-only">Close</span>
  <Icon name="x" size={16} weight="bold" />
</button>