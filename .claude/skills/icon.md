# Icon

Renders icons by name. Uses Phosphor icons by default -- pass any icon name like "house", "gear", "heart". Supports all Iconify icon sets via prefix (e.g. "mdi:home").

## Import

```ts
import { Icon } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | `string` | — | Icon name: "house", "arrow-right", or full iconify name "mdi:home" |
| size | `number | string` | `24` | Icon size in pixels |
| weight | `'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'` | — | Phosphor weight variant (ph: icons only) |
| color | `string` | — | Icon color (CSS value). Defaults to currentColor. |

## Examples

### Default

```svelte
<Icon name="house" />
```

### Bold 32px

```svelte
<Icon name="heart" size={32} weight="bold" />
```

### Colored

```svelte
<Icon name="heart" weight="fill" color="red" />
```

### Other icon set

```svelte
<Icon name="mdi:home" size={24} />
```

## Full Source

```svelte
<script lang="ts">
  import IconifyIcon from '@iconify/svelte';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import type { ThemeColor, Size } from '$lib/types/enums';

  interface Props {
    /** Icon name: "house", "arrow-right", or full iconify name "mdi:home" */
    name: string;
    /** Size (inherited if omitted, or overridden via Size enum/raw number) */
    size?: Size | number | string;
    /** Phosphor weight (only for ph: icons) */
    weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
    /** ThemeColor or raw CSS color value */
    color?: ThemeColor | string;
    /** Additional CSS class */
    class?: string;
    [key: string]: unknown;
  }

  let {
    name,
    size,
    weight = 'regular',
    color,
    class: className,
    ...rest
  }: Props = $props();

  // If color is a known ThemeColor, pass it to useUI. Otherwise undefined (raw pass-through).
  const isThemeColor = $derived(color && ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'theme'].includes(color));
  const themeColor = $derived(isThemeColor ? (color as ThemeColor) : undefined);
  
  // If size is a known Size enum, pass to useUI. Otherwise undefined.
  const isEnumSize = $derived(size && ['xs', 'sm', 'md', 'lg', 'xl'].includes(size as string));
  const enumSize = $derived(isEnumSize ? (size as Size) : undefined);

  const ui = useUI({
    props: () => ({ color: themeColor, size: enumSize }),
    role: 'inline',
  });

  // Resolve pixel size
  const sizeMap: Record<Size, number> = { xs: 16, sm: 20, md: 24, lg: 28, xl: 32 };
  const resolvedSize = $derived(size && !isEnumSize ? size : sizeMap[ui.size]);

  // Resolve CSS color: prioritize raw color prop, then fallback to UI context text color
  const resolvedColor = $derived(color && !isThemeColor ? color : 'var(--comp-text)');

  // Resolve full iconify icon name
  const icon = $derived(
    name.includes(':')
      ? name
      : `ph:${name}${weight !== 'regular' ? `-${weight}` : ''}`
  );
</script>

<div class="inline-flex" style={ui.styles}>
  <IconifyIcon
    {icon}
    width={resolvedSize}
    height={resolvedSize}
    style="color: {resolvedColor};"
    class={className}
    {...rest}
  />
</div>
```