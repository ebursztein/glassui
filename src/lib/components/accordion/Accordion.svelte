<script lang="ts">
  import { setContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { ThemeColor, RenderStyle } from '$lib/types/enums';

  interface Props {
    type?: 'single' | 'multiple';
    value?: string | string[];
    color?: ThemeColor;
    style?: RenderStyle;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    raised?: boolean;
    colored?: boolean;
    glow?: GlowIntensity | boolean;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    type = 'single',
    value = $bindable([]),
    color,
    style = 'solid',
    glass,
    frosted,
    raised = false,
    colored = false,
    glow = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ui = useUI({
    props: () => ({ color, style, glass, frosted, raised, colored, glow }),
    role: 'container',
  });

  // State machine for Accordion context
  let activeValues = $state<string[]>(Array.isArray(value) ? value : (value ? [value] : []));

  const toggle = (id: string) => {
    if (type === 'single') {
      activeValues = activeValues.includes(id) ? [] : [id];
    } else {
      if (activeValues.includes(id)) {
        activeValues = activeValues.filter(v => v !== id);
      } else {
        activeValues = [...activeValues, id];
      }
    }
    value = type === 'single' ? (activeValues.length > 0 ? activeValues[0] : '') : activeValues;
  };

  setContext('glassui-accordion', {
    get values() { return activeValues; },
    toggle
  });

  const classes = $derived(cn(
    'hs-accordion-group w-full flex flex-col',
    ui.className,
    colored && 'overflow-hidden',
    'rounded-2xl',
    className
  ));
</script>

<div class={classes} style={ui.styles} {...rest}>
  {#if ui.showBackdrop}
    <GlassBackdrop />
  {/if}
  {#if ui.glowClass}
    <div class={ui.glowClass}></div>
  {/if}
  <div class="relative z-10 flex flex-col w-full divide-y divide-[var(--comp-border)]">
    {@render children()}
  </div>
</div>