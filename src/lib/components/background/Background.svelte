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
