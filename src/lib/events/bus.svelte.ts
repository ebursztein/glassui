import type { Status } from '$lib/types/enums';

/** All events the design system can emit */
export type EventMap = {
  'glass:theme-changed': { mode: 'light' | 'dark'; preset: string };
  'glass:notification': { id: string; status: Status; message: string };
  'glass:dialog-open': { id: string };
  'glass:dialog-close': { id: string };
  'glass:command-open': undefined;
  'glass:command-close': undefined;
  'glass:navigate': { path: string };
};

type Handler<T> = (payload: T) => void;

class EventBus {
  #listeners = new Map<string, Set<Handler<any>>>();

  on<K extends keyof EventMap>(event: K, handler: Handler<EventMap[K]>): () => void {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event)!.add(handler);
    return () => this.off(event, handler);
  }

  off<K extends keyof EventMap>(event: K, handler: Handler<EventMap[K]>) {
    this.#listeners.get(event)?.delete(handler);
  }

  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]) {
    this.#listeners.get(event)?.forEach((handler) => handler(payload));
  }
}

export const events = new EventBus();
