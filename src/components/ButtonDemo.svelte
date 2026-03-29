<script lang="ts">
  import { Button } from '$lib/components/button';
  import { Icon } from '$lib/components/icon';
  import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/card';
  import { meta } from '$lib/components/button/schema';
  import PropEditor from './PropEditor.svelte';

  let variant = $state<string>('default');
  let size = $state<string>('md');
  let glass = $state(false);
  let glow = $state(false);
  let disabled = $state(false);

  const values = $derived({
    variant,
    size,
    glass,
    glow,
    disabled,
  });

  function handleChange(key: string, value: any) {
    if (key === 'variant') variant = value;
    if (key === 'size') size = value;
    if (key === 'glass') glass = value;
    if (key === 'glow') glow = value;
    if (key === 'disabled') disabled = value;
  }

  const codeSnippet = $derived(() => {
    const props: string[] = [];
    if (variant !== 'default') props.push(`variant="${variant}"`);
    if (size !== 'md') props.push(`size="${size}"`);
    if (glass) props.push('glass');
    if (glow) props.push('glow');
    if (disabled) props.push('disabled');
    const propsStr = props.length > 0 ? ' ' + props.join(' ') : '';
    return `<Button${propsStr}>Click me</Button>`;
  });
</script>

<div class="space-y-8">
  <!-- Live preview -->
  <Card bg="gradient">
    {#snippet children()}
      <CardContent class="flex items-center justify-center min-h-[120px]">
        {#snippet children()}
          <Button
            variant={variant as any}
            size={size as any}
            {glass}
            {glow}
            {disabled}
          >
            {#snippet children()}Click me{/snippet}
          </Button>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <!-- Prop editor -->
  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">Props</h3>
          <PropEditor props={meta.props} {values} onchange={handleChange} />
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <!-- Code snippet -->
  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-3">Code</h3>
          <pre class="text-sm text-cyan-300 bg-black/30 rounded-xl p-4 overflow-x-auto"><code>{codeSnippet()}</code></pre>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <!-- Solid variants -->
  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">Solid Variants</h3>
          <div class="flex flex-wrap gap-3">
            <Button variant="default">{#snippet children()}Default{/snippet}</Button>
            <Button variant="primary">{#snippet children()}Primary{/snippet}</Button>
            <Button variant="outline">{#snippet children()}Outline{/snippet}</Button>
            <Button variant="ghost">{#snippet children()}Ghost{/snippet}</Button>
            <Button variant="destructive">{#snippet children()}Destructive{/snippet}</Button>
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <!-- Glass variants -->
  <Card bg="gradient">
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">Glass Variants</h3>
          <div class="flex flex-wrap gap-3">
            <Button variant="default" glass>{#snippet children()}Default{/snippet}</Button>
            <Button variant="primary" glass>{#snippet children()}Primary{/snippet}</Button>
            <Button variant="outline" glass>{#snippet children()}Outline{/snippet}</Button>
            <Button variant="ghost" glass>{#snippet children()}Ghost{/snippet}</Button>
            <Button variant="destructive" glass>{#snippet children()}Destructive{/snippet}</Button>
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <!-- Sizes -->
  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">All Sizes</h3>
          <div class="flex flex-wrap items-end gap-3">
            <Button size="xs">{#snippet children()}XS{/snippet}</Button>
            <Button size="sm">{#snippet children()}SM{/snippet}</Button>
            <Button size="md">{#snippet children()}MD{/snippet}</Button>
            <Button size="lg">{#snippet children()}LG{/snippet}</Button>
            <Button size="xl">{#snippet children()}XL{/snippet}</Button>
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <!-- With glow -->
  <Card bg="gradient">
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">With Glow</h3>
          <div class="flex flex-wrap gap-3">
            <Button variant="default" glow>{#snippet children()}Solid Glow{/snippet}</Button>
            <Button variant="primary" glow>{#snippet children()}Primary Glow{/snippet}</Button>
            <Button variant="primary" glass glow>{#snippet children()}Glass + Glow{/snippet}</Button>
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <!-- With icons -->
  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">With Icons</h3>
          <div class="flex flex-wrap gap-3">
            <Button variant="primary">
              {#snippet children()}
                <Icon name="floppy-disk" size={16} weight="bold" /> Save
              {/snippet}
            </Button>
            <Button variant="destructive">
              {#snippet children()}
                <Icon name="trash" size={16} /> Delete
              {/snippet}
            </Button>
            <Button variant="outline">
              {#snippet children()}
                Next <Icon name="arrow-right" size={16} />
              {/snippet}
            </Button>
            <Button variant="ghost">
              {#snippet children()}
                <Icon name="plus" size={16} weight="light" /> Add
              {/snippet}
            </Button>
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>
</div>
