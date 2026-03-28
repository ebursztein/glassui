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
        <label class="text-sm font-medium text-white" for={`prop-${prop.name}`}>{prop.name}</label>
        <p class="text-xs text-white/40 truncate">{prop.description}</p>
      </div>

      <div class="shrink-0">
        {#if prop.options}
          <!-- Enum select -->
          <select
            id={`prop-${prop.name}`}
            class="h-8 px-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm backdrop-blur-xl focus:outline-none focus:border-white/40"
            value={values[prop.name]}
            onchange={(e) => onchange(prop.name, (e.target as HTMLSelectElement).value)}
          >
            {#each prop.options as option}
              <option value={option} class="bg-gray-900">{option}</option>
            {/each}
          </select>
        {:else if prop.type === 'boolean'}
          <!-- Boolean toggle -->
          <button
            id={`prop-${prop.name}`}
            class="relative h-6 w-11 rounded-full transition-colors duration-200 {values[prop.name] ? 'bg-gradient-to-r from-cyan-500/60 to-blue-500/60' : 'bg-white/10'} border border-white/20"
            onclick={() => onchange(prop.name, !values[prop.name])}
            role="switch"
            aria-checked={values[prop.name]}
          >
            <span
              class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 {values[prop.name] ? 'translate-x-5' : 'translate-x-0'}"
            ></span>
          </button>
        {:else}
          <!-- Text/number input -->
          <input
            id={`prop-${prop.name}`}
            type="text"
            class="h-8 w-24 px-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm backdrop-blur-xl focus:outline-none focus:border-white/40"
            value={values[prop.name]}
            oninput={(e) => onchange(prop.name, (e.target as HTMLInputElement).value)}
          />
        {/if}
      </div>
    </div>
  {/each}
</div>
