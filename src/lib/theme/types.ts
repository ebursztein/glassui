/** Metadata for a single component prop — used by MCP, skills, prop editor */
export interface PropMeta {
  name: string;
  type: string;
  default?: string;
  description: string;
  options?: string[];
}

/** Example code snippet for a component */
export interface ComponentExample {
  title: string;
  code: string;
}

/** Full component metadata — the single source of truth */
export interface ComponentMeta {
  name: string;
  category: string;
  description: string;
  since: string;
  props: PropMeta[];
  examples: ComponentExample[];
  import: string;
}
