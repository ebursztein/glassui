# Background

Full-page background layer with switchable presets (dark, gradient, iridescent, etc.). Use BackgroundSwitcher to let users pick a background.

## Import

```ts
import { Background, BackgroundSwitcher } from 'glassui';
```

## Examples

### Background layer

```svelte
<Background />
```

### Switcher

```svelte
<BackgroundSwitcher />
```

## Full Source

```svelte
<script lang="ts">
  import { theme, backgroundPresets } from '$lib/state';

  const preset = $derived(backgroundPresets[theme.background]);
</script>

<div class="fixed inset-0 -z-10 overflow-hidden transition-colors duration-700" style={preset?.base ?? ''}>
  {#if preset?.gradient}
    <div class="absolute inset-0 transition-opacity duration-700" style={preset.gradient}></div>
  {/if}
  {#if preset?.orbs}
    {#each preset.orbs as orb}
      <div
        class="absolute rounded-full blur-3xl"
        style="top:{orb.y};left:{orb.x};width:{orb.size};height:{orb.size};background:{orb.color};"
      ></div>
    {/each}
  {/if}
</div>

<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { theme, backgroundPresets, type BackgroundPreset } from '$lib/state';

  interface Props {
    class?: string;
    [key: string]: unknown;
  }

  let { class: className, ...rest }: Props = $props();

  const presetNames = Object.keys(backgroundPresets) as BackgroundPreset[];
</script>

<div class={cn('flex items-center gap-1.5 flex-wrap', className)} {...rest}>
  {#each presetNames as name}
    {@const preset = backgroundPresets[name]}
    <button
      class={cn(
        'w-6 h-6 rounded-md border transition-all duration-200',
        preset.swatch,
        theme.background === name
          ? 'ring-2 ring-foreground/60 ring-offset-1 ring-offset-transparent scale-110 border-foreground/40'
          : 'border-line-2 opacity-60 hover:opacity-100 hover:scale-105',
      )}
      title={preset.label}
      onclick={() => theme.setBackground(name)}
      aria-label={`Switch to ${preset.label} background`}
    ></button>
  {/each}
</div>
```