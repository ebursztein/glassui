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
          ? 'ring-2 ring-white/60 ring-offset-1 ring-offset-transparent scale-110 border-white/40'
          : 'border-white/20 opacity-60 hover:opacity-100 hover:scale-105',
      )}
      title={preset.label}
      onclick={() => theme.setBackground(name)}
      aria-label={`Switch to ${preset.label} background`}
    ></button>
  {/each}
</div>
