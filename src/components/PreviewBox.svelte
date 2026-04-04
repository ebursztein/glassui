<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { Icon } from '$lib/components/icon';
  import { GlassBackdrop } from '$lib/components/glass';
  import { theme } from '$lib/state';

  interface PreviewBg {
    id: string;
    label: string;
    style: string;
    mode: 'light' | 'dark' | null;
  }

  interface Props {
    children: Snippet;
    /** Code string shown in the Code tab. If empty, no Code tab. */
    code?: string;
    /** Show GlassBackdrop inside the preview area. */
    glass?: boolean;
    class?: string;
  }

  let { children, code, glass = false, class: className }: Props = $props();

  // --- Preview backgrounds ---------------------------------------------------

  const backgrounds: PreviewBg[] = [
    { id: 'default', label: 'Default', style: '', mode: null },
    { id: 'white', label: 'White', style: 'background:#ffffff;', mode: 'light' },
    { id: 'light-gray', label: 'Light Gray', style: 'background:#f1f5f9;', mode: 'light' },
    { id: 'warm', label: 'Warm', style: 'background:linear-gradient(135deg,#faf5f0 0%,#fef3c7 50%,#faf5f0 100%);', mode: 'light' },
    { id: 'dark', label: 'Dark', style: 'background:#1e293b;', mode: 'dark' },
    { id: 'near-black', label: 'Near Black', style: 'background:#0a0a0f;', mode: 'dark' },
    { id: 'blue', label: 'Blue Gradient', style: 'background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f172a 100%);', mode: 'dark' },
    { id: 'gradient', label: 'Violet-Cyan', style: 'background:linear-gradient(135deg,#7c3aed 0%,#3b82f6 50%,#06b6d4 100%);', mode: 'dark' },
    { id: 'sunset', label: 'Sunset', style: 'background:linear-gradient(135deg,#f97316 0%,#ec4899 50%,#8b5cf6 100%);', mode: 'dark' },
    { id: 'mesh', label: 'Mesh',
      style: 'background:#0f172a;background-image:radial-gradient(at 20% 30%, rgba(6,182,212,0.35) 0%, transparent 55%),radial-gradient(at 70% 25%, rgba(139,92,246,0.35) 0%, transparent 55%),radial-gradient(at 50% 70%, rgba(59,130,246,0.3) 0%, transparent 55%),radial-gradient(at 80% 80%, rgba(236,72,153,0.2) 0%, transparent 55%);',
      mode: 'dark',
    },
    { id: 'photo', label: 'Nature',
      style: 'background:#2d3748;background-image:radial-gradient(ellipse at 25% 40%, rgba(34,197,94,0.3) 0%, transparent 60%),radial-gradient(ellipse at 70% 30%, rgba(56,189,248,0.35) 0%, transparent 50%),radial-gradient(ellipse at 50% 80%, rgba(168,85,247,0.25) 0%, transparent 55%),radial-gradient(ellipse at 15% 75%, rgba(251,191,36,0.2) 0%, transparent 50%),linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1a202c 100%);',
      mode: 'dark',
    },
    { id: 'checker', label: 'Checkerboard',
      style: 'background-color:#f8fafc;background-image:linear-gradient(45deg, #e2e8f0 25%, transparent 25%),linear-gradient(-45deg, #e2e8f0 25%, transparent 25%),linear-gradient(45deg, transparent 75%, #e2e8f0 75%),linear-gradient(-45deg, transparent 75%, #e2e8f0 75%);background-size:20px 20px;background-position:0 0, 0 10px, 10px -10px, -10px 0;',
      mode: 'light',
    },
  ];

  // --- Local state -----------------------------------------------------------

  let selectedBg = $state<PreviewBg>(backgrounds[0]);
  let modeOverride = $state<'light' | 'dark' | null>(null);
  let activeTab = $state<'preview' | 'code'>('preview');
  let copied = $state(false);

  const effectiveMode = $derived(
    modeOverride ?? selectedBg.mode ?? (theme.isDark ? 'dark' : 'light')
  );

  const modeClass = $derived(
    effectiveMode === 'dark' ? 'preview-dark' : 'preview-light'
  );

  function onBgChange(e: Event) {
    const id = (e.target as HTMLSelectElement).value;
    const bg = backgrounds.find(b => b.id === id);
    if (bg) {
      selectedBg = bg;
      modeOverride = null;
    }
  }

  async function copyCode() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    copied = true;
    setTimeout(() => copied = false, 2000);
  }
</script>

<!-- Toolbar -->
<div class="rounded-t-xl border border-b-0 border-border bg-layer px-3 py-2 flex items-center gap-2">
  <!-- Mode toggle -->
  <button
    class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors shrink-0"
    onclick={() => modeOverride = effectiveMode === 'dark' ? 'light' : 'dark'}
    aria-label={effectiveMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    title={effectiveMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
  >
    {#if effectiveMode === 'dark'}
      <Icon name="sun" size={16} />
    {:else}
      <Icon name="moon" size={16} />
    {/if}
  </button>

  <!-- Background select -->
  <select
    class="h-7 px-2 pr-7 rounded-lg bg-layer border border-line-2 text-foreground text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:14px] bg-[right_4px_center] bg-no-repeat"
    value={selectedBg.id}
    onchange={onBgChange}
    aria-label="Preview background"
  >
    <optgroup label="Light">
      {#each backgrounds.filter(b => b.mode === 'light' || b.mode === null) as bg}
        <option value={bg.id}>{bg.label}</option>
      {/each}
    </optgroup>
    <optgroup label="Dark">
      {#each backgrounds.filter(b => b.mode === 'dark') as bg}
        <option value={bg.id}>{bg.label}</option>
      {/each}
    </optgroup>
  </select>

  <!-- Spacer -->
  <div class="flex-1"></div>

  <!-- Preview / Code tabs -->
  {#if code}
    <div class="flex items-center rounded-lg border border-line-2 overflow-hidden shrink-0">
      <button
        class={cn(
          'px-3 py-1.5 text-xs font-medium transition-colors',
          activeTab === 'preview'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-layer-hover',
        )}
        onclick={() => activeTab = 'preview'}
      >Preview</button>
      <button
        class={cn(
          'px-3 py-1.5 text-xs font-medium transition-colors',
          activeTab === 'code'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-layer-hover',
        )}
        onclick={() => activeTab = 'code'}
      >Code</button>
    </div>
  {/if}
</div>

<!-- Content area -->
<div class={cn(modeClass, 'rounded-b-xl border border-border overflow-hidden')}>
  {#if activeTab === 'preview'}
    <!-- Preview -->
    <div
      class={cn(
        'p-8 flex items-center justify-center min-h-[120px] relative transition-[background] duration-300',
        selectedBg.id === 'default' ? 'bg-background' : '',
        className,
      )}
      style={selectedBg.style}
    >
      {#if glass}
        <GlassBackdrop />
        <div class="relative z-10 flex flex-wrap items-center justify-center gap-4 w-full">
          {@render children()}
        </div>
      {:else}
        {@render children()}
      {/if}
    </div>
  {:else}
    <!-- Code view -->
    <div class="relative bg-[#0f172a] text-sm">
      <button
        class={cn(
          'absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors z-10',
          copied
            ? 'text-emerald-400 bg-emerald-500/15'
            : 'text-slate-400 hover:text-slate-200 bg-white/5 hover:bg-white/10',
        )}
        onclick={copyCode}
        aria-label="Copy code"
      >
        {#if copied}
          <Icon name="check" size={13} />
          Copied
        {:else}
          <Icon name="copy" size={13} />
          Copy
        {/if}
      </button>
      <pre class="p-5 pr-24 overflow-x-auto"><code class="text-slate-300">{code}</code></pre>
    </div>
  {/if}
</div>
