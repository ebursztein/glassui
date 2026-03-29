<script lang="ts">
  import { Icon } from '$lib/components/icon';
  import { Card, CardContent } from '$lib/components/card';
  import { meta } from '$lib/components/icon/schema';
  import PropEditor from './PropEditor.svelte';

  let weight = $state<string>('regular');
  let size = $state<number>(32);

  const editorProps = meta.props.filter((p) => p.name === 'weight' || p.name === 'size');
  const values = $derived({ weight, size: String(size) });

  function handleChange(key: string, value: any) {
    if (key === 'weight') weight = value;
    if (key === 'size') size = Number(value) || 24;
  }

  const icons = [
    'house', 'gear', 'heart', 'magnifying-glass', 'bell', 'user',
    'star', 'lightning', 'check', 'x',
    'arrow-right', 'arrow-left', 'plus', 'minus',
    'eye', 'eye-slash', 'lock', 'lock-open',
  ];
</script>

<div class="space-y-8">
  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">Props</h3>
          <PropEditor props={editorProps} {values} onchange={handleChange} />
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">Gallery</h3>
          <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-4">
            {#each icons as name}
              <div class="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-colors">
                <Icon {name} {size} weight={weight as any} />
                <span class="text-[10px] text-white/40 text-center">{name}</span>
              </div>
            {/each}
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">All Weights</h3>
          <div class="grid grid-cols-6 gap-4">
            {#each ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'] as w}
              <div class="flex flex-col items-center gap-2">
                <Icon name="heart" size={32} weight={w as any} />
                <span class="text-xs text-white/40">{w}</span>
              </div>
            {/each}
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-3">Code</h3>
          <pre class="text-sm text-cyan-300 bg-black/30 rounded-xl p-4 overflow-x-auto"><code>{`import { Icon } from 'glassui';

<Icon name="heart" size={${size}} weight="${weight}" />`}</code></pre>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>
</div>
