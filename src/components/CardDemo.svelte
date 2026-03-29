<script lang="ts">
  import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '$lib/components/card';
  import { Button } from '$lib/components/button';
  import { meta } from '$lib/components/card/schema';
  import PropEditor from './PropEditor.svelte';

  let glass = $state(false);
  let glow = $state(false);
  let hover = $state<string>('none');
  let bg = $state<string>('');

  const values = $derived({ glass, glow, hover, bg: bg || undefined });

  function handleChange(key: string, value: any) {
    if (key === 'glass') glass = value;
    if (key === 'glow') glow = value;
    if (key === 'hover') hover = value;
    if (key === 'bg') bg = value;
  }

  const codeSnippet = $derived(() => {
    const props: string[] = [];
    if (glass) props.push('glass');
    if (glow) props.push('glow');
    if (hover !== 'none') props.push(`hover="${hover}"`);
    if (bg) props.push(`bg="${bg}"`);
    const propsStr = props.length > 0 ? ' ' + props.join(' ') : '';
    return `<Card${propsStr}>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>`;
  });
</script>

<div class="space-y-8">
  <!-- Live preview -->
  <Card bg="gradient">
    {#snippet children()}
      <CardContent class="flex items-center justify-center min-h-[200px]">
        {#snippet children()}
          <div class="w-full max-w-md">
            <Card {glass} {glow} hover={hover as any} bg={bg as any || undefined}>
              {#snippet children()}
                <CardHeader>
                  {#snippet children()}
                    <CardTitle>{#snippet children()}Card Title{/snippet}</CardTitle>
                    <CardDescription>{#snippet children()}A short description of this card's content.{/snippet}</CardDescription>
                  {/snippet}
                </CardHeader>
                <CardContent>
                  {#snippet children()}
                    <p class="text-sm text-white/80">This is the card body. It can contain any content you need.</p>
                  {/snippet}
                </CardContent>
                <CardFooter>
                  {#snippet children()}
                    <Button size="sm">{#snippet children()}Action{/snippet}</Button>
                  {/snippet}
                </CardFooter>
              {/snippet}
            </Card>
          </div>
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

  <!-- Code -->
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

  <!-- Solid vs Glass -->
  <Card bg="gradient">
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">Solid vs Glass</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              {#snippet children()}
                <CardHeader>
                  {#snippet children()}
                    <CardTitle>{#snippet children()}Solid Card{/snippet}</CardTitle>
                    <CardDescription>{#snippet children()}Default solid background{/snippet}</CardDescription>
                  {/snippet}
                </CardHeader>
                <CardContent>
                  {#snippet children()}
                    <p class="text-sm text-white/80">Clean and professional.</p>
                  {/snippet}
                </CardContent>
              {/snippet}
            </Card>
            <Card glass>
              {#snippet children()}
                <CardHeader>
                  {#snippet children()}
                    <CardTitle>{#snippet children()}Glass Card{/snippet}</CardTitle>
                    <CardDescription>{#snippet children()}Frosted glass surface{/snippet}</CardDescription>
                  {/snippet}
                </CardHeader>
                <CardContent>
                  {#snippet children()}
                    <p class="text-sm text-white/80">Translucent with backdrop blur.</p>
                  {/snippet}
                </CardContent>
              {/snippet}
            </Card>
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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card glow>
              {#snippet children()}
                <CardContent class="p-6">
                  {#snippet children()}
                    <p class="text-sm text-white/80">Solid with glow</p>
                  {/snippet}
                </CardContent>
              {/snippet}
            </Card>
            <Card glass glow>
              {#snippet children()}
                <CardContent class="p-6">
                  {#snippet children()}
                    <p class="text-sm text-white/80">Glass with glow</p>
                  {/snippet}
                </CardContent>
              {/snippet}
            </Card>
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <!-- Hover effects -->
  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">Hover Effects</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card hover="lift">
              {#snippet children()}
                <CardContent class="p-6">
                  {#snippet children()}
                    <p class="text-sm text-white/80">hover="lift"</p>
                  {/snippet}
                </CardContent>
              {/snippet}
            </Card>
            <Card hover="brighten" glass>
              {#snippet children()}
                <CardContent class="p-6">
                  {#snippet children()}
                    <p class="text-sm text-white/80">hover="brighten" (glass)</p>
                  {/snippet}
                </CardContent>
              {/snippet}
            </Card>
            <Card hover="glow" glass>
              {#snippet children()}
                <CardContent class="p-6">
                  {#snippet children()}
                    <p class="text-sm text-white/80">hover="glow" (glass)</p>
                  {/snippet}
                </CardContent>
              {/snippet}
            </Card>
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>
</div>
