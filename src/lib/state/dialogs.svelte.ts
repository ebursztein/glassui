export interface DialogEntry {
  id: string;
  component?: unknown;
  props?: Record<string, unknown>;
}

let counter = 0;

class DialogState {
  stack = $state<DialogEntry[]>([]);

  get current() {
    return this.stack.at(-1);
  }

  get hasOpen() {
    return this.stack.length > 0;
  }

  open(entry?: Partial<DialogEntry>) {
    const id = entry?.id ?? `dialog-${++counter}`;
    this.stack = [...this.stack, { id, ...entry }];
    return id;
  }

  close(id?: string) {
    if (id) {
      this.stack = this.stack.filter((d) => d.id !== id);
    } else {
      this.stack = this.stack.slice(0, -1);
    }
  }

  closeAll() {
    this.stack = [];
  }
}

export const dialogs = new DialogState();
