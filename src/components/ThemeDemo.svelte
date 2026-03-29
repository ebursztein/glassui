<script lang="ts">
  import { ThemeSwitcher } from '$lib/components/theme-switcher';
  import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/card';
  import { Button } from '$lib/components/button';
  import { Badge } from '$lib/components/badge';
  import { Alert } from '$lib/components/alert';
  import { Input } from '$lib/components/input';
</script>

<div class="space-y-8">
  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">Theme Switcher</h3>
          <p class="text-sm text-white/60 mb-4">Click a preset dot to change the accent colors. Click the sun/moon to toggle dark/light mode.</p>
          <ThemeSwitcher />
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <Card bg="gradient">
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">Preview</h3>
          <p class="text-sm text-white/60 mb-4">Components respond to the active theme preset.</p>

          <div class="space-y-4">
            <div class="flex flex-wrap gap-2">
              <Button variant="primary">{#snippet children()}Primary{/snippet}</Button>
              <Button variant="primary" glass glow>{#snippet children()}Glass Primary{/snippet}</Button>
              <Button variant="outline">{#snippet children()}Outline{/snippet}</Button>
            </div>

            <div class="flex flex-wrap gap-2">
              <Badge variant="primary">{#snippet children()}Primary{/snippet}</Badge>
              <Badge status="success">{#snippet children()}Success{/snippet}</Badge>
              <Badge status="warning" glass>{#snippet children()}Warning Glass{/snippet}</Badge>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                {#snippet children()}
                  <CardHeader>
                    {#snippet children()}
                      <CardTitle>{#snippet children()}Solid Card{/snippet}</CardTitle>
                    {/snippet}
                  </CardHeader>
                  <CardContent>
                    {#snippet children()}
                      <Input placeholder="Solid input" />
                    {/snippet}
                  </CardContent>
                {/snippet}
              </Card>
              <Card glass glow>
                {#snippet children()}
                  <CardHeader>
                    {#snippet children()}
                      <CardTitle>{#snippet children()}Glass Card{/snippet}</CardTitle>
                    {/snippet}
                  </CardHeader>
                  <CardContent>
                    {#snippet children()}
                      <Input placeholder="Glass input" glass glow />
                    {/snippet}
                  </CardContent>
                {/snippet}
              </Card>
            </div>

            <Alert status="info" title="Theme Preview">{#snippet children()}This alert responds to theme changes.{/snippet}</Alert>
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>
</div>
