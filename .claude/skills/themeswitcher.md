# ThemeSwitcher

Compact theme control with preset dots and dark/light mode toggle. Uses global theme state.

## Import

```ts
import { ThemeSwitcher } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| showPresets | `boolean` | `true` | Show theme preset dots |
| showMode | `boolean` | `true` | Show dark/light mode toggle |

## Examples

### Full

```svelte
<ThemeSwitcher />
```

### Presets only

```svelte
<ThemeSwitcher showMode={false} />
```

### Mode only

```svelte
<ThemeSwitcher showPresets={false} />
```

## Full Source

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { theme } from '$lib/state';
  import { presets } from '$lib/theme/presets';
  import { Icon } from '$lib/components/icon';

  interface Props {
    showPresets?: boolean;
    showMode?: boolean;
    class?: string;
    [key: string]: unknown;
  }

  let {
    showPresets = true,
    showMode = true,
    class: className,
    ...rest
  }: Props = $props();

  const presetGradients: Record<string, string> = {
    default: 'from-cyan-500 via-blue-500 to-purple-500',
    ocean: 'from-cyan-400 via-sky-400 to-blue-300',
    ember: 'from-red-500 via-orange-500 to-yellow-500',
    violet: 'from-purple-500 via-indigo-500 to-pink-500',
    mono: 'from-white via-gray-400 to-gray-600',
  };
</script>

<div class={cn('flex items-center gap-3', className)} {...rest}>
  {#if showPresets}
    <div class="flex items-center gap-1.5">
      {#each presets as preset}
        <button
          class={cn(
            'w-5 h-5 rounded-full bg-gradient-to-r transition-all duration-200',
            presetGradients[preset.name] || presetGradients.default,
            theme.preset === preset.name
              ? 'ring-2 ring-foreground/60 ring-offset-2 ring-offset-transparent scale-110'
              : 'opacity-60 hover:opacity-100 hover:scale-105',
          )}
          title={preset.label}
          onclick={() => theme.setPreset(preset.name)}
          aria-label={`Switch to ${preset.label} theme`}
        ></button>
      {/each}
    </div>
  {/if}
  {#if showMode}
    <button
      class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-layer-hover transition-colors"
      onclick={() => theme.toggle()}
      aria-label={theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {#if theme.isDark}
        <Icon name="sun" size={16} />
      {:else}
        <Icon name="moon" size={16} />
      {/if}
    </button>
  {/if}
</div>
```