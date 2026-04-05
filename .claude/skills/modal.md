# Modal

A dialog box/popup window that is displayed on top of the current page, interrupting the current workflow to prompt the user or display critical information.

## Import

```ts
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | `boolean` | `false` | Whether the modal is visible. |

## Examples

### Basic

```svelte
<Modal bind:open={isOpen}><ModalContent><ModalHeader><ModalTitle>Title</ModalTitle><ModalClose /></ModalHeader><ModalBody>Content</ModalBody></ModalContent></Modal>
```

## Full Source

```svelte
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
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div class={cn('p-4 overflow-y-auto text-[var(--comp-text)]', className)} {...rest}>
  {@render children()}
</div>
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
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import { fly } from 'svelte/transition';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { ThemeColor, RenderStyle } from '$lib/types/enums';

  interface Props {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    color?: ThemeColor;
    style?: RenderStyle;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    raised?: boolean;
    colored?: boolean;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    size = 'md',
    color = 'neutral',
    style = 'solid',
    glass,
    frosted,
    raised = true,
    colored = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ui = useUI({
    props: () => ({ color, style, glass, frosted, raised, colored }),
    role: 'container',
  });

  const sizeMap: Record<string, string> = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full m-4',
  };

  const classes = $derived(cn(
    'relative w-full rounded-2xl flex flex-col',
    sizeMap[size],
    ui.className,
    colored && 'overflow-hidden',
    className
  ));
</script>

<div
  class={classes}
  style={ui.styles}
  transition:fly={{ y: 20, duration: 200 }}
  {...rest}
>
  {#if ui.showBackdrop}
    <GlassBackdrop />
  {/if}
  {#if ui.glowClass}
    <div class={ui.glowClass}></div>
  {/if}
  <div class="relative z-10 w-full flex flex-col">
    {@render children()}
  </div>
</div>
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div class={cn('flex justify-end items-center gap-x-2 py-3 px-4 border-t border-[var(--comp-border)]', className)} {...rest}>
  {@render children()}
</div>
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div class={cn('flex justify-between items-center py-3 px-4 border-b border-[var(--comp-border)]', className)} {...rest}>
  {@render children()}
</div>
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<h3 class={cn('font-bold text-[var(--comp-text)]', className)} {...rest}>
  {@render children()}
</h3>
```