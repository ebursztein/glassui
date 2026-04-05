<script lang="ts">
  import { setContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import type { Snippet } from 'svelte';
  import type { ThemeColor, RenderStyle } from '$lib/types/enums';

  interface Props {
    value?: string;
    variant?: 'underline' | 'pills' | 'segmented';
    orientation?: 'horizontal' | 'vertical';
    color?: ThemeColor;
    style?: RenderStyle;
    glass?: boolean | 'ultra-thin' | 'thin' | 'normal' | 'thick' | 'ultra-thick';
    frosted?: boolean | 'light' | 'medium' | 'heavy';
    raised?: boolean;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    value = $bindable(),
    variant = 'underline',
    orientation = 'horizontal',
    color = 'primary',
    style = 'solid',
    glass,
    frosted,
    raised = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ui = useUI({
    props: () => ({ color, style, glass, frosted, raised }),
    role: 'container',
  });

  setContext('glassui-tabs', {
    get value() { return value; },
    set value(v: string) { value = v; },
    get variant() { return variant; },
    get orientation() { return orientation; },
    get isGlass() { return ui.glass !== false; },
  });

  const classes = $derived(cn(
    'flex w-full',
    orientation === 'vertical' ? 'flex-row gap-6' : 'flex-col',
    className
  ));
</script>

<div class={classes} {...rest}>
  {@render children()}
</div>