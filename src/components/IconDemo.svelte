<script lang="ts">
  import { Icon } from '$lib/components/icon';
  import { meta } from '$lib/components/icon/schema';
  import PropEditor from './PropEditor.svelte';
  import {
    House, Gear, Heart, MagnifyingGlass, Bell, User,
    Star, Lightning, Check, X,
    ArrowRight, ArrowLeft, Plus, Minus,
    Eye, EyeSlash, Lock, LockOpen,
  } from 'phosphor-svelte';

  let weight = $state<string>('regular');
  let size = $state<number>(32);

  // For the prop editor we expose weight and size
  const editorProps = meta.props.filter((p) => p.name === 'weight' || p.name === 'size');
  const values = $derived({ weight, size: String(size) });

  function handleChange(key: string, value: any) {
    if (key === 'weight') weight = value;
    if (key === 'size') size = Number(value) || 24;
  }

  const icons = [
    { comp: House, name: 'House' },
    { comp: Gear, name: 'Gear' },
    { comp: Heart, name: 'Heart' },
    { comp: MagnifyingGlass, name: 'MagnifyingGlass' },
    { comp: Bell, name: 'Bell' },
    { comp: User, name: 'User' },
    { comp: Star, name: 'Star' },
    { comp: Lightning, name: 'Lightning' },
    { comp: Check, name: 'Check' },
    { comp: X, name: 'X' },
    { comp: ArrowRight, name: 'ArrowRight' },
    { comp: ArrowLeft, name: 'ArrowLeft' },
    { comp: Plus, name: 'Plus' },
    { comp: Minus, name: 'Minus' },
    { comp: Eye, name: 'Eye' },
    { comp: EyeSlash, name: 'EyeSlash' },
    { comp: Lock, name: 'Lock' },
    { comp: LockOpen, name: 'LockOpen' },
  ];
</script>

<div class="space-y-8">
  <!-- Prop editor -->
  <div class="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-6">
    <h3 class="text-sm font-semibold text-white mb-4">Props</h3>
    <PropEditor props={editorProps} {values} onchange={handleChange} />
  </div>

  <!-- Icon gallery -->
  <div class="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-6 space-y-4">
    <h3 class="text-sm font-semibold text-white">Gallery</h3>
    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-4">
      {#each icons as { comp, name }}
        <div class="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-colors">
          <Icon icon={comp} {size} weight={weight as any} />
          <span class="text-[10px] text-white/40 text-center">{name}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Weight comparison -->
  <div class="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-6 space-y-4">
    <h3 class="text-sm font-semibold text-white">All Weights</h3>
    <div class="grid grid-cols-6 gap-4">
      {#each ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'] as w}
        <div class="flex flex-col items-center gap-2">
          <Icon icon={Heart} size={32} weight={w as any} />
          <span class="text-xs text-white/40">{w}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Code -->
  <div class="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-6">
    <h3 class="text-sm font-semibold text-white mb-3">Code</h3>
    <pre class="text-sm text-cyan-300 bg-black/30 rounded-xl p-4 overflow-x-auto"><code>{`import { Icon } from 'glassui';
import { Heart } from 'phosphor-svelte';

<Icon icon={Heart} size={${size}} weight="${weight}" />`}</code></pre>
  </div>
</div>
