import type { Status } from '$lib/types/enums';

class ThemeState {
  mode = $state<'light' | 'dark'>('dark');
  preset = $state<string>('default');

  get isDark() {
    return this.mode === 'dark';
  }

  toggle() {
    this.mode = this.mode === 'dark' ? 'light' : 'dark';
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', this.isDark);
    }
  }

  setPreset(name: string) {
    this.preset = name;
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = name;
    }
  }
}

export const theme = new ThemeState();
