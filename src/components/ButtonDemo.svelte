<script lang="ts">
  import { Button } from '$lib/components/button';
  import { Icon } from '$lib/components/icon';
  import { meta } from '$lib/components/button/schema';
  import PropEditor from './PropEditor.svelte';
  import { FloppyDisk, Trash, ArrowRight, Plus } from 'phosphor-svelte';

  let variant = $state<string>('default');
  let size = $state<string>('md');
  let glowEffect = $state(false);
  let disabled = $state(false);

  const values = $derived({
    variant,
    size,
    glowEffect,
    disabled,
  });

  function handleChange(key: string, value: any) {
    if (key === 'variant') variant = value;
    if (key === 'size') size = value;
    if (key === 'glowEffect') glowEffect = value;
    if (key === 'disabled') disabled = value;
  }

  const codeSnippet = $derived(() => {
    const props: string[] = [];
    if (variant !== 'default') props.push(`variant="${variant}"`);
    if (size !== 'md') props.push(`size="${size}"`);
    if (glowEffect) props.push('glowEffect');
    if (disabled) props.push('disabled');
    const propsStr = props.length > 0 ? ' ' + props.join(' ') : '';
    return `<Button${propsStr}>Click me</Button>`;
  });
</script>

<div class="space-y-8">
  <!-- Live preview -->
  <div class="relative rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-8 flex items-center justify-center min-h-[120px]">
    <div class="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
    <div class="relative z-10">
      <Button
        variant={variant as any}
        size={size as any}
        {glowEffect}
        {disabled}
      >
        {#snippet children()}
          Click me
        {/snippet}
      </Button>
    </div>
  </div>

  <!-- Prop editor -->
  <div class="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-6">
    <h3 class="text-sm font-semibold text-white mb-4">Props</h3>
    <PropEditor props={meta.props} {values} onchange={handleChange} />
  </div>

  <!-- Code snippet -->
  <div class="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-6">
    <h3 class="text-sm font-semibold text-white mb-3">Code</h3>
    <pre class="text-sm text-cyan-300 bg-black/30 rounded-xl p-4 overflow-x-auto"><code>{codeSnippet()}</code></pre>
  </div>

  <!-- All variants gallery -->
  <div class="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-6 space-y-4">
    <h3 class="text-sm font-semibold text-white">All Variants</h3>
    <div class="flex flex-wrap gap-3">
      <Button variant="default">{#snippet children()}Default{/snippet}</Button>
      <Button variant="primary">{#snippet children()}Primary{/snippet}</Button>
      <Button variant="outline">{#snippet children()}Outline{/snippet}</Button>
      <Button variant="ghost">{#snippet children()}Ghost{/snippet}</Button>
      <Button variant="destructive">{#snippet children()}Destructive{/snippet}</Button>
    </div>
  </div>

  <!-- All sizes gallery -->
  <div class="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-6 space-y-4">
    <h3 class="text-sm font-semibold text-white">All Sizes</h3>
    <div class="flex flex-wrap items-end gap-3">
      <Button size="xs">{#snippet children()}XS{/snippet}</Button>
      <Button size="sm">{#snippet children()}SM{/snippet}</Button>
      <Button size="md">{#snippet children()}MD{/snippet}</Button>
      <Button size="lg">{#snippet children()}LG{/snippet}</Button>
      <Button size="xl">{#snippet children()}XL{/snippet}</Button>
    </div>
  </div>

  <!-- With glow -->
  <div class="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-6 space-y-4">
    <h3 class="text-sm font-semibold text-white">With Glow Effect</h3>
    <div class="flex flex-wrap gap-3">
      <Button variant="default" glowEffect>{#snippet children()}Default Glow{/snippet}</Button>
      <Button variant="primary" glowEffect>{#snippet children()}Primary Glow{/snippet}</Button>
      <Button variant="destructive" glowEffect>{#snippet children()}Destructive Glow{/snippet}</Button>
    </div>
  </div>

  <!-- With icons -->
  <div class="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-6 space-y-4">
    <h3 class="text-sm font-semibold text-white">With Icons</h3>
    <div class="flex flex-wrap gap-3">
      <Button variant="primary">
        {#snippet children()}
          <Icon icon={FloppyDisk} size={16} weight="bold" /> Save
        {/snippet}
      </Button>
      <Button variant="destructive">
        {#snippet children()}
          <Icon icon={Trash} size={16} /> Delete
        {/snippet}
      </Button>
      <Button variant="outline">
        {#snippet children()}
          Next <Icon icon={ArrowRight} size={16} />
        {/snippet}
      </Button>
      <Button variant="ghost">
        {#snippet children()}
          <Icon icon={Plus} size={16} weight="light" /> Add
        {/snippet}
      </Button>
    </div>
  </div>
</div>
