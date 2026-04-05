<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import type { ThemeColor } from '$lib/types/enums';

  interface Props {
    value?: string;
    maxLength?: number;
    color?: ThemeColor;
    class?: string;
  }

  let {
    value = '',
    maxLength,
    color,
    class: className,
  }: Props = $props();

  const count = $derived(value?.length || 0);
  const isOverLimit = $derived(maxLength !== undefined && count > maxLength);
  const effectiveColor = $derived(isOverLimit ? 'error' : color);

  const ui = useUI({
    props: () => ({ color: effectiveColor }),
    role: 'inline',
  });
</script>

<div class={cn('text-xs transition-colors', ui.className, className)} style={ui.styles}>
  {#if maxLength !== undefined}
    {count} / {maxLength}
  {:else}
    {count}
  {/if}
</div>