# Stepper

A component that displays progress through a sequence of logical and numbered steps.

## Import

```ts
import { Stepper, Step } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| activeStep | `number` | `1` | The current active step (1-indexed). |

## Examples

### Basic

```svelte
<Stepper activeStep={2}><Step title="Step 1" /><Step title="Step 2" /><Step title="Step 3" /></Stepper>
```

## Full Source

```svelte
<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { Icon } from '$lib/components/icon';
  import type { Snippet } from 'svelte';
  import type { ThemeColor } from '$lib/types/enums';

  interface Props {
    title?: string;
    description?: string;
    class?: string;
    [key: string]: unknown;
  }

  let {
    title,
    description,
    class: className,
    ...rest
  }: Props = $props();

  const ctx = getContext<{ activeStep: number; orientation: string; color: ThemeColor; registerStep: () => number }>('glassui-stepper');

  // Register step to get our dynamic index
  let stepIndex = $state(0);
  onMount(() => {
    if (ctx) stepIndex = ctx.registerStep();
  });

  const isCompleted = $derived(ctx && stepIndex > 0 && ctx.activeStep > stepIndex);
  const isActive = $derived(ctx && stepIndex > 0 && ctx.activeStep === stepIndex);
  const isPending = $derived(ctx && stepIndex > 0 && ctx.activeStep < stepIndex);
  const isHorizontal = $derived(ctx?.orientation === 'horizontal');

  // The active/completed states use the parent's color. Pending uses neutral.
  const ui = useUI({
    props: () => ({
      color: isPending ? 'neutral' : ctx?.color,
      style: isPending ? 'outline' : 'solid',
    }),
    role: 'action' // Treat the circle as a badge/action geometry
  });

  const circleClasses = $derived(cn(
    'flex justify-center items-center shrink-0 w-8 h-8 rounded-full font-semibold text-sm transition-colors duration-300',
    isPending ? 'border-2 border-[var(--comp-border)] text-muted-foreground' : ui.className,
  ));

  const wrapperClasses = $derived(cn(
    'flex group relative',
    isHorizontal ? 'flex-row items-center flex-1 last:flex-none' : 'flex-col items-start gap-4 pb-10 last:pb-0',
    className
  ));

  const lineClasses = $derived(cn(
    'transition-colors duration-500',
    isHorizontal ? 'w-full h-0.5 mx-4 flex-1' : 'absolute left-4 top-10 bottom-0 w-0.5 -ml-[1px]',
    isCompleted ? 'bg-[var(--comp-bg)]' : 'bg-border',
  ));
</script>

<li class={wrapperClasses} {...rest}>
  <div class="flex items-center gap-3">
    <div class={circleClasses} style={!isPending ? ui.styles : ''}>
      {#if isCompleted}
        <Icon name="check" size={16} weight="bold" />
      {:else}
        {stepIndex > 0 ? stepIndex : ''}
      {/if}
    </div>
    
    {#if title || description}
      <div class={isHorizontal ? 'hidden sm:block' : ''}>
        {#if title}
          <h3 class={cn('text-sm font-medium transition-colors', isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground')}>
            {title}
          </h3>
        {/if}
        {#if description}
          <p class="text-xs text-muted-foreground">{description}</p>
        {/if}
      </div>
    {/if}
  </div>

  <!-- Connector Line -->
  <!-- We hide the line on the last element using CSS flex rules or absolute positioning -->
  <div class={lineClasses} style={isCompleted ? ui.styles : ''} aria-hidden="true"></div>
</li>
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
```