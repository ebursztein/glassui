<script lang="ts">
  import { glassBgOrbs } from '$lib/interactions/glass';
</script>

<!--
  Themed gradient orb backdrop.
  Uses --glass-accent-1/2/3 CSS vars so colors follow the active theme preset.
  Place inside a relative container. Glass components on top become visible.
-->
<div class="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none">
  {#each glassBgOrbs as orb}
    <div
      class="absolute rounded-full blur-3xl"
      style="left: {orb.x}; top: {orb.y}; width: {orb.size}; height: {orb.size}; background: {orb.color}; opacity: 0.5;"
    ></div>
  {/each}
</div>
