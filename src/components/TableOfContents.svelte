<script lang="ts">
  interface Section {
    id: string;
    label: string;
  }

  interface Props {
    sections: Section[];
  }

  let { sections }: Props = $props();
  let activeId = $state('');

  $effect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeId = entry.target.id;
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  });
</script>

<nav class="hidden xl:block w-56 shrink-0">
  <div class="sticky top-20 overflow-y-auto max-h-[calc(100vh-6rem)]">
    <h4 class="text-sm font-semibold text-foreground mb-3">On this page</h4>
    <ul class="space-y-1 border-l border-border">
      {#each sections as section}
        <li>
          <a
            href="#{section.id}"
            class="block pl-4 py-1 text-sm transition-colors {activeId === section.id
              ? 'text-primary font-medium border-l-2 border-primary -ml-px'
              : 'text-muted-foreground hover:text-foreground'}"
          >
            {section.label}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
