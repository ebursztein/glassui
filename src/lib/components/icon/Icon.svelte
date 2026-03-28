<script lang="ts">
  import type { Component } from 'svelte';
  import type { IconWeight } from './schema';

  interface Props {
    /** Phosphor icon component */
    icon: Component<any>;
    /** Size in pixels or CSS value */
    size?: number | string;
    /** Icon weight/thickness */
    weight?: IconWeight;
    /** Icon color */
    color?: string;
    /** Mirror horizontally */
    mirrored?: boolean;
    /** Additional CSS class */
    class?: string;
    [key: string]: unknown;
  }

  let {
    icon,
    size = 24,
    weight = 'regular',
    color = 'currentColor',
    mirrored = false,
    class: className,
    ...rest
  }: Props = $props();
</script>

<svelte:component
  this={icon}
  {size}
  {weight}
  {color}
  {mirrored}
  class={className}
  {...rest}
/>
