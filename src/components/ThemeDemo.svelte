<script lang="ts">
  import { ThemeSwitcher } from '$lib/components/theme-switcher';
  import { Button } from '$lib/components/button';
  import { Badge } from '$lib/components/badge';
  import { Alert } from '$lib/components/alert';
  import { Input } from '$lib/components/input';
  import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/card';
  import DemoSection from './DemoSection.svelte';
  import TableOfContents from './TableOfContents.svelte';

  const sections = [
    { id: 'switcher', label: 'Theme Switcher' },
    { id: 'theme-palette', label: 'Theme Palette' },
    { id: 'derived-tokens', label: 'Derived Tokens' },
    { id: 'component-preview', label: 'Component Preview' },
  ];

  const paletteSwatches = [
    { label: 'Primary', class: 'bg-[var(--theme-primary)]' },
    { label: 'Secondary', class: 'bg-[var(--theme-secondary)]' },
    { label: 'Accent', class: 'bg-[var(--theme-accent)]' },
  ];

  const derivedSwatches = [
    { label: 'Accent 1', class: 'bg-[var(--glass-accent-1)]', source: 'primary @ 0.8' },
    { label: 'Accent 2', class: 'bg-[var(--glass-accent-2)]', source: 'secondary @ 0.8' },
    { label: 'Accent 3', class: 'bg-[var(--glass-accent-3)]', source: 'accent @ 0.8' },
    { label: 'Glow 1', class: 'bg-[var(--glass-glow-1)]', source: 'primary @ 0.3' },
    { label: 'Glow 2', class: 'bg-[var(--glass-glow-2)]', source: 'secondary @ 0.3' },
    { label: 'Glow 3', class: 'bg-[var(--glass-glow-3)]', source: 'accent @ 0.3' },
  ];
</script>

<div class="flex gap-10">
  <div class="flex-1 min-w-0 space-y-12">

    <!-- Theme Switcher -->
    <DemoSection id="switcher" title="Theme Switcher" description="Click a preset dot to change accent colors. Click the sun/moon to toggle dark/light mode.">
      <ThemeSwitcher />
    </DemoSection>

    <!-- Theme Palette -->
    <DemoSection id="theme-palette" title="Theme Palette" description="3 source colors per theme. Everything else derives from these.">
      <div class="flex gap-6 w-full">
        {#each paletteSwatches as swatch}
          <div class="flex flex-col items-center gap-2">
            <div class="w-16 h-16 rounded-xl border border-border {swatch.class}"></div>
            <span class="text-xs font-medium text-foreground">{swatch.label}</span>
            <code class="text-[10px] text-muted-foreground">--theme-{swatch.label.toLowerCase()}</code>
          </div>
        {/each}
      </div>
    </DemoSection>

    <!-- Derived Tokens -->
    <DemoSection id="derived-tokens" title="Derived Tokens" description="Glass accents and glows auto-derive from the palette via oklch() opacity.">
      <div class="grid grid-cols-3 md:grid-cols-6 gap-4 w-full">
        {#each derivedSwatches as swatch}
          <div class="flex flex-col items-center gap-2">
            <div class="w-12 h-12 rounded-lg border border-border {swatch.class}"></div>
            <span class="text-xs text-foreground">{swatch.label}</span>
            <span class="text-[10px] text-muted-foreground">{swatch.source}</span>
          </div>
        {/each}
      </div>
    </DemoSection>

    <!-- Component Preview -->
    <DemoSection id="component-preview" title="Component Preview" description="Components respond to the active theme preset.">
      <div class="space-y-4 w-full">
        <div class="flex flex-wrap gap-2">
          <Button color="primary">{#snippet children()}Primary{/snippet}</Button>
          <Button color="secondary">{#snippet children()}Secondary{/snippet}</Button>
          <Button color="accent">{#snippet children()}Accent{/snippet}</Button>
          <Button color="primary" glass glow>{#snippet children()}Glass{/snippet}</Button>
          <Button color="neutral" style="outline">{#snippet children()}Outline{/snippet}</Button>
        </div>

        <div class="flex flex-wrap gap-2">
          <Badge color="primary">{#snippet children()}Primary{/snippet}</Badge>
          <Badge color="secondary">{#snippet children()}Secondary{/snippet}</Badge>
          <Badge status="success">{#snippet children()}Success{/snippet}</Badge>
          <Badge status="warning" glass>{#snippet children()}Warning Glass{/snippet}</Badge>
        </div>

        <Card>
          {#snippet children()}
            <CardHeader>
              {#snippet children()}
                <CardTitle>{#snippet children()}Card Preview{/snippet}</CardTitle>
              {/snippet}
            </CardHeader>
            <CardContent>
              {#snippet children()}
                <Input placeholder="Type here..." />
              {/snippet}
            </CardContent>
          {/snippet}
        </Card>

        <Alert status="info" title="Theme Preview">{#snippet children()}This alert responds to theme changes.{/snippet}</Alert>
      </div>
    </DemoSection>

  </div>

  <TableOfContents {sections} />
</div>
