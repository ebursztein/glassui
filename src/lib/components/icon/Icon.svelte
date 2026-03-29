<script lang="ts">
  import IconifyIcon from '@iconify/svelte';

  interface Props {
    /** Icon name: "house", "arrow-right", or full iconify name "mdi:home" */
    name: string;
    /** Size in pixels */
    size?: number | string;
    /** Phosphor weight (only for ph: icons) */
    weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
    /** Icon color (CSS color value) */
    color?: string;
    /** Additional CSS class */
    class?: string;
    [key: string]: unknown;
  }

  let {
    name,
    size = 24,
    weight = 'regular',
    color,
    class: className,
    ...rest
  }: Props = $props();

  // Resolve full iconify icon name
  // "house" -> "ph:house"
  // "house" + weight="bold" -> "ph:house-bold"
  // "mdi:home" -> "mdi:home" (pass through, weight ignored)
  const icon = $derived(
    name.includes(':')
      ? name
      : `ph:${name}${weight !== 'regular' ? `-${weight}` : ''}`
  );
</script>

<IconifyIcon
  {icon}
  width={size}
  height={size}
  style={color ? `color: ${color}` : undefined}
  class={className}
  {...rest}
/>
