# FileUpload

A drag and drop file upload zone with visual feedback.

## Import

```ts
import { FileUpload } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | `primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error` | — | Theme color for focus/active states. |
| label | `string` | — | Label text above input |
| error | `string` | — | Error message |
| helperText | `string` | — | Helper text |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| disabled | `boolean` | `false` | Disabled state |

## Examples

### Basic

```svelte
<FileUpload />
```

## Full Source

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import { Icon } from '$lib/components/icon';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { ThemeColor } from '$lib/types/enums';

  let uploadCounter = 0;

  interface Props extends Omit<HTMLInputAttributes, 'type'> {
    color?: ThemeColor;
    label?: string | Snippet;
    error?: string | Snippet;
    helperText?: string | Snippet;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    raised?: boolean;
    colored?: boolean;
    glow?: GlowIntensity | boolean;
    class?: string;
    onfiles?: (files: FileList | null) => void;
  }

  let {
    id,
    color,
    label,
    error,
    helperText,
    glass,
    frosted,
    raised = false,
    colored = false,
    glow = false,
    disabled = false,
    class: className,
    onfiles,
    ...rest
  }: Props = $props();

  const effectiveColor = $derived(error ? 'error' as const : color);
  const uploadId = id || `glass-upload-${uploadCounter++}`;

  const ui = useUI({
    props: () => ({ color: effectiveColor, glass, frosted, raised, colored, glow, disabled }),
    role: 'container',
  });

  let isDragging = $state(false);
  let fileList = $state<FileList | null>(null);

  const handleDragEnter = (e: DragEvent) => {
    if (!disabled) {
      e.preventDefault();
      isDragging = true;
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    if (!disabled) {
      e.preventDefault();
      isDragging = false;
    }
  };

  const handleDrop = (e: DragEvent) => {
    if (!disabled) {
      e.preventDefault();
      isDragging = false;
      if (e.dataTransfer?.files) {
        fileList = e.dataTransfer.files;
        if (onfiles) onfiles(fileList);
      }
    }
  };

  const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      fileList = target.files;
      if (onfiles) onfiles(fileList);
    }
  };

  const clearFiles = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    fileList = null;
    if (onfiles) onfiles(null);
  }
</script>

<div class="w-full" style={ui.styles}>
  {#if label}
    <label for={uploadId} class="block text-sm font-medium mb-2 text-[var(--comp-text)]">
      {#if typeof label === 'string'}
        {label}
      {:else}
        {@render label()}
      {/if}
    </label>
  {/if}
  
  <div class="relative group {colored ? 'overflow-hidden rounded-2xl' : ''}">
    {#if ui.showBackdrop}
      <GlassBackdrop />
    {/if}
    {#if ui.glowClass}
      <div class={ui.glowClass}></div>
    {/if}
    
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class={cn(
        'relative flex flex-col items-center justify-center w-full min-h-32 p-6 border-2 border-dashed rounded-2xl transition-all duration-300',
        ui.className,
        isDragging ? 'border-[var(--comp-bg)] bg-[var(--comp-hover)]/10 scale-[0.99]' : 'border-[var(--comp-border)]',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[var(--comp-hover)]/5',
        className
      )}
      ondragenter={handleDragEnter}
      ondragover={handleDragEnter}
      ondragleave={handleDragLeave}
      ondrop={handleDrop}
    >
      <input
        id={uploadId}
        type="file"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        {disabled}
        onchange={handleChange}
        {...rest}
      />
      
      <div class="relative z-10 flex flex-col items-center text-center space-y-2 pointer-events-none">
        {#if fileList && fileList.length > 0}
          <div class="p-3 bg-status-success/20 text-status-success rounded-full mb-2">
            <Icon name="file-arrow-up" size={24} weight="bold" />
          </div>
          <p class="text-sm font-medium text-[var(--comp-text)]">
            {fileList.length} file{fileList.length === 1 ? '' : 's'} selected
          </p>
          <div class="text-xs text-muted-foreground flex flex-col items-center">
            <span class="truncate max-w-[200px]">{fileList[0].name}</span>
            <button type="button" class="mt-2 px-3 py-1 bg-layer hover:bg-layer-hover rounded-full text-xs font-medium pointer-events-auto transition-colors" onclick={clearFiles}>
              Clear
            </button>
          </div>
        {:else}
          <div class="p-3 bg-layer text-muted-foreground rounded-full mb-2 group-hover:scale-110 transition-transform duration-300">
            <Icon name="upload-simple" size={24} />
          </div>
          <p class="text-sm font-medium text-[var(--comp-text)]">
            <span class="text-[var(--comp-bg)]">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-muted-foreground">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
        {/if}
      </div>
    </div>
  </div>

  {#if error}
    <p id="{uploadId}-hint" class="mt-1.5 text-xs text-error-foreground">
      {#if typeof error === 'string'}
        {error}
      {:else}
        {@render error()}
      {/if}
    </p>
  {:else if helperText}
    <p id="{uploadId}-hint" class="mt-1.5 text-xs text-[var(--comp-text)]/60">
      {#if typeof helperText === 'string'}
        {helperText}
      {:else}
        {@render helperText()}
      {/if}
    </p>
  {/if}
</div>
```