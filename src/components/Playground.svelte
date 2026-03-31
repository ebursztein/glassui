<script lang="ts">
  import type { ComponentMeta, PropMeta } from '$lib/theme/types';
  import type { Snippet } from 'svelte';

  interface Props {
    meta: ComponentMeta;
    preview: Snippet<[Record<string, any>]>;
    class?: string;
  }

  let { meta, preview, class: className }: Props = $props();

  /** Parse a default string from PropMeta into a typed value. */
  function parseDefault(prop: PropMeta): any {
    const d = prop.default;
    if (d === undefined) return prop.options ? prop.options[0] : '';
    if (d === 'false') return false;
    if (d === 'true') return true;
    if (/^\d+$/.test(d)) return Number(d);
    return d;
  }

  /** Convert prop editor value to the right type for the component. */
  function coerceValue(prop: PropMeta, value: any): any {
    // Select with 'false' option: string 'false' -> boolean false
    if (prop.options?.includes('false') && (value === 'false' || value === false)) return false;
    if (prop.type === 'boolean') return Boolean(value);
    return value;
  }

  // Build reactive state from meta.props
  const initial: Record<string, any> = {};
  for (const prop of meta.props) {
    initial[prop.name] = parseDefault(prop);
  }
  let values = $state({ ...initial });

  function handleChange(key: string, value: any) {
    const prop = meta.props.find(p => p.name === key);
    if (prop) values[key] = coerceValue(prop, value);
  }

  // Auto-generate code snippet from current values
  const codeSnippet = $derived(() => {
    const parts: string[] = [];
    for (const prop of meta.props) {
      const val = values[prop.name];
      const def = parseDefault(prop);
      if (val === def) continue;
      if (val === false) continue;
      if (val === true) { parts.push(prop.name); continue; }
      if (val === '') continue;
      parts.push(`${prop.name}="${val}"`);
    }
    const propsStr = parts.length > 0 ? ' ' + parts.join(' ') : '';
    return `<${meta.name}${propsStr}>...</${meta.name}>`;
  });
</script>

<section id="playground" class="scroll-mt-24">
  <h2 class="text-lg font-semibold text-foreground">Playground</h2>
  <p class="mt-1 text-sm text-muted-foreground">Explore all {meta.name.toLowerCase()} props interactively.</p>

  <!-- Live preview -->
  <div class="mt-4 rounded-lg border border-border p-8 flex items-center justify-center min-h-[100px] bg-background {className ?? ''}">
    {@render preview(values)}
  </div>

  <!-- Code snippet -->
  <pre class="mt-3 text-sm text-primary bg-primary/5 border border-primary/10 rounded-lg p-4 overflow-x-auto"><code>{codeSnippet()}</code></pre>

  <!-- Props -->
  <div class="mt-3 rounded-lg border border-border p-5">
    <h3 class="text-sm font-semibold text-foreground mb-4">Props</h3>
    <div class="space-y-3">
      {#each meta.props as prop}
        <div class="flex items-center justify-between gap-4">
          <div class="min-w-0">
            <label class="text-sm font-medium text-foreground" for={`prop-${prop.name}`}>{prop.name}</label>
            <p class="text-xs text-muted-foreground truncate">{prop.description}</p>
          </div>
          <div class="shrink-0">
            {#if prop.options}
              <select
                id={`prop-${prop.name}`}
                class="h-8 px-2 rounded-lg bg-layer border border-line-2 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                value={String(values[prop.name] ?? prop.options[0])}
                onchange={(e) => handleChange(prop.name, (e.target as HTMLSelectElement).value)}
              >
                {#each prop.options as option}
                  <option value={option}>{option === 'false' ? 'off' : option}</option>
                {/each}
              </select>
            {:else if prop.type === 'boolean'}
              <button
                id={`prop-${prop.name}`}
                class="relative h-6 w-11 rounded-full transition-colors duration-200 {values[prop.name] ? 'bg-primary' : 'bg-surface'} border border-line-2"
                onclick={() => handleChange(prop.name, !values[prop.name])}
                role="switch"
                aria-checked={values[prop.name]}
                aria-label={prop.name}
              >
                <span class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 {values[prop.name] ? 'translate-x-5' : 'translate-x-0'}"></span>
              </button>
            {:else}
              <input
                id={`prop-${prop.name}`}
                type="text"
                class="h-8 w-24 px-2 rounded-lg bg-layer border border-line-2 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                value={values[prop.name]}
                oninput={(e) => handleChange(prop.name, (e.target as HTMLInputElement).value)}
              />
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
