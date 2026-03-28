import type { Status } from '$lib/types/enums';

export interface Notification {
  id: string;
  status: Status;
  title: string;
  message?: string;
  duration?: number;
}

let counter = 0;

class NotificationState {
  queue = $state<Notification[]>([]);

  push(n: Omit<Notification, 'id'>) {
    const id = `notif-${++counter}`;
    const notification: Notification = { id, ...n };
    this.queue = [...this.queue, notification];

    if (n.duration !== 0) {
      setTimeout(() => this.dismiss(id), n.duration ?? 5000);
    }
    return id;
  }

  dismiss(id: string) {
    this.queue = this.queue.filter((n) => n.id !== id);
  }

  clear() {
    this.queue = [];
  }
}

export const notifications = new NotificationState();
