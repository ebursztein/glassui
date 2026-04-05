<script lang="ts">
  import { setContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import type { Snippet } from 'svelte';
  import type { ThemeColor } from '$lib/types/enums';

  interface Props {
    activeStep?: number;
    orientation?: 'horizontal' | 'vertical';
    color?: ThemeColor;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    activeStep = $bindable(1),
    orientation = 'horizontal',
    color = 'primary',
    class: className,
    children,
    ...rest
  }: Props = $props();

  let totalSteps = $state(0);

  setContext('glassui-stepper', {
    get activeStep() { return activeStep; },
    get orientation() { return orientation; },
    get color() { return color; },
    registerStep: () => {
      totalSteps += 1;
      return totalSteps;
    }
  });

  const ui = useUI({
    props: () => ({ color }),
    role: 'container',
  });

  const classes = $derived(cn(
    'flex w-full',
    orientation === 'horizontal' ? 'flex-row items-center [&>li:last-child>div:last-child]:hidden' : 'flex-col [&>li:last-child>div:last-child]:hidden',
    className
  ));
</script>

<ol class={classes} style={ui.styles} {...rest}>
  {@render children()}
</ol>