<script lang="ts">
  import { GlassBackdrop } from '$lib/components/glass';
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    id: string;
    title: string;
    description?: string;
    glass?: boolean;
    children: Snippet;
    class?: string;
  }

  let {
    id,
    title,
    description,
    glass = false,
    children,
    class: className,
  }: Props = $props();

  let containerRef: HTMLElement | undefined = $state();
  let glassErrors = $state<string[]>([]);

  /**
   * Validate the rendered glass section. Runs on mount when glass={true}.
   * Catches common authoring mistakes:
   * - Description says "frosted"/"blur" but no element has backdrop-filter
   * - glass-pane elements missing --glass-density
   * - Nested glass elements not increasing in density
   */
  function validateGlassSection(el: HTMLElement, desc: string): string[] {
    const errors: string[] = [];
    const panes = el.querySelectorAll('.glass-pane');

    // Check 1: description mentions frost/blur but no backdrop-filter applied
    if (/frost|blur|backdrop/i.test(desc)) {
      const hasBlur = [...panes].some(p =>
        getComputedStyle(p).backdropFilter !== 'none'
      );
      if (!hasBlur && panes.length > 0) {
        errors.push('Description mentions frost/blur but no element has backdrop-filter. Add frosted prop to components.');
      }
    }

    // Check 2: glass-pane elements must have --glass-density set and > 0
    for (const pane of panes) {
      const raw = getComputedStyle(pane).getPropertyValue('--glass-density').trim();
      if (!raw || parseFloat(raw) <= 0) {
        errors.push('glass-pane element has missing or zero --glass-density.');
        break;
      }
    }

    // Check 3: nested container glass-pane elements should have increasing density.
    // Skip field-role elements (input, textarea, role="switch", role="checkbox")
    // which are intentionally recessed (thinner than parent).
    function isFieldElement(el: Element): boolean {
      const tag = el.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return true;
      const role = el.getAttribute('role');
      if (role === 'switch' || role === 'checkbox' || role === 'slider') return true;
      return false;
    }

    for (const pane of panes) {
      if (isFieldElement(pane)) continue;
      const nested = pane.querySelectorAll('.glass-pane');
      if (nested.length === 0) continue;
      const parentDensity = parseFloat(getComputedStyle(pane).getPropertyValue('--glass-density'));
      if (isNaN(parentDensity)) continue;
      for (const child of nested) {
        if (isFieldElement(child)) continue;
        // Only check direct glass descendants that are containers/actions
        if (!pane.contains(child)) continue;
        const childDensity = parseFloat(getComputedStyle(child).getPropertyValue('--glass-density'));
        if (!isNaN(childDensity) && childDensity > 0 && childDensity <= parentDensity) {
          errors.push(`Nested glass element (density ${childDensity.toFixed(3)}) should be denser than parent (density ${parentDensity.toFixed(3)}).`);
          break;
        }
      }
    }

    return errors;
  }

  onMount(() => {
    if (!glass || !containerRef) return;
    glassErrors = validateGlassSection(containerRef, description ?? '');
    for (const err of glassErrors) {
      console.error(`[GlassUI DemoSection "${title}"] ${err}`);
    }
  });
</script>

<section {id} class="scroll-mt-24">
  <h2 class="text-lg font-semibold text-foreground">{title}</h2>
  {#if description}
    <p class="mt-1 text-sm text-muted-foreground">{description}</p>
  {/if}

  {#if glassErrors.length > 0}
    <div class="mt-2 rounded-lg border-2 border-red-500 bg-red-500/10 p-3">
      <p class="text-xs font-bold text-red-600 mb-1">Glass validation failed:</p>
      {#each glassErrors as err}
        <p class="text-xs text-red-600">{err}</p>
      {/each}
    </div>
  {/if}

  {#if glass}
    <div bind:this={containerRef} class="mt-4 rounded-lg border border-border p-6 flex flex-wrap items-center justify-center gap-4 relative overflow-hidden {className ?? ''}">
      <GlassBackdrop />
      <div class="relative z-10 flex flex-wrap items-center justify-center gap-4 w-full">
        {@render children()}
      </div>
    </div>
  {:else}
    <div class="mt-4 rounded-lg border border-border p-6 flex flex-wrap items-center justify-center gap-4 bg-background {className ?? ''}">
      {@render children()}
    </div>
  {/if}
</section>
