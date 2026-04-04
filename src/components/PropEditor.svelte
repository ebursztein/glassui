<script lang="ts">
  import type { PropMeta } from '$lib/theme/types';

  interface Props {
    props: PropMeta[];
    values: Record<string, any>;
    onchange: (key: string, value: any) => void;
  }

  let { props, values, onchange }: Props = $props();
</script>

<div class="space-y-3">
  {#each props as prop}
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
            onchange={(e) => onchange(prop.name, (e.target as HTMLSelectElement).value)}
          >
            {#each prop.options as option}
              <option value={option}>{option === 'false' ? 'off' : option}</option>
            {/each}
          </select>
        {:else if prop.type === 'boolean'}
          <button
            id={`prop-${prop.name}`}
            class="relative h-6 w-11 rounded-full transition-colors duration-200 {values[prop.name] ? 'bg-primary' : 'bg-surface'} border border-line-2"
            onclick={() => onchange(prop.name, !values[prop.name])}
            role="switch"
            aria-checked={values[prop.name]}
            aria-label={prop.name}
          >
            <span
              class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 {values[prop.name] ? 'translate-x-5' : 'translate-x-0'}"
            ></span>
          </button>
        {:else}
          <input
            id={`prop-${prop.name}`}
            type="text"
            class="h-8 w-24 px-2 rounded-lg bg-layer border border-line-2 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
            value={values[prop.name]}
            oninput={(e) => onchange(prop.name, (e.target as HTMLInputElement).value)}
          />
        {/if}
      </div>
    </div>
  {/each}
</div>
