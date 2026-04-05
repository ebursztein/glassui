interface BackgroundOrb {
  x: string;
  y: string;
  size: string;
  color: string;
}

export interface BackgroundPresetConfig {
  label: string;
  base: string;
  gradient?: string;
  orbs?: BackgroundOrb[];
  swatch: string;
}

export type BackgroundPreset =
  | 'dark'
  | 'black'
  | 'white'
  | 'blue'
  | 'gradient-blue'
  | 'iridescent'
  | 'forest'
  | 'sunset'
  | 'mesh'
  | 'light-blue'
  | 'light-warm';

export const backgroundPresets: Record<BackgroundPreset, BackgroundPresetConfig> = {
  dark: {
    label: 'Dark',
    base: 'background:#0a0a0f;',
    swatch: 'bg-[#0a0a0f]',
  },
  black: {
    label: 'Black',
    base: 'background:#000;',
    swatch: 'bg-black',
  },
  white: {
    label: 'White',
    base: 'background:#f0f0f5;',
    swatch: 'bg-[#f0f0f5]',
  },
  blue: {
    label: 'Blue',
    base: 'background:#0f172a;',
    gradient: 'background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f172a 100%);',
    orbs: [
      { x: '25%', y: '25%', size: '24rem', color: 'rgba(59,130,246,0.25)' },
      { x: '65%', y: '55%', size: '20rem', color: 'rgba(99,102,241,0.2)' },
    ],
    swatch: 'bg-gradient-to-br from-[#0f172a] to-[#1e3a5f]',
  },
  'gradient-blue': {
    label: 'Gradient Blue',
    base: 'background:#0f172a;',
    gradient: 'background:linear-gradient(135deg,#0f172a 0%,#172554 50%,#0f172a 100%);',
    orbs: [
      { x: '20%', y: '20%', size: '24rem', color: 'rgba(14,165,233,0.3)' },
      { x: '70%', y: '30%', size: '20rem', color: 'rgba(139,92,246,0.3)' },
      { x: '45%', y: '65%', size: '18rem', color: 'rgba(59,130,246,0.25)' },
    ],
    swatch: 'bg-gradient-to-br from-cyan-600 to-purple-600',
  },
  iridescent: {
    label: 'Iridescent',
    base: 'background:#0a0a1a;',
    orbs: [
      { x: '15%', y: '20%', size: '22rem', color: 'rgba(236,72,153,0.3)' },
      { x: '55%', y: '15%', size: '20rem', color: 'rgba(139,92,246,0.3)' },
      { x: '75%', y: '50%', size: '24rem', color: 'rgba(59,130,246,0.3)' },
      { x: '30%', y: '65%', size: '18rem', color: 'rgba(16,185,129,0.25)' },
      { x: '80%', y: '80%', size: '16rem', color: 'rgba(245,158,11,0.2)' },
    ],
    swatch: 'bg-gradient-to-br from-pink-500 via-blue-500 to-emerald-500',
  },
  forest: {
    label: 'Forest',
    base: 'background:#022c22;',
    gradient: 'background:linear-gradient(135deg,#022c22 0%,#064e3b 50%,#022c22 100%);',
    orbs: [
      { x: '25%', y: '30%', size: '22rem', color: 'rgba(16,185,129,0.25)' },
      { x: '65%', y: '20%', size: '20rem', color: 'rgba(13,148,136,0.3)' },
      { x: '45%', y: '70%', size: '18rem', color: 'rgba(34,197,94,0.2)' },
    ],
    swatch: 'bg-gradient-to-br from-[#022c22] to-teal-700',
  },
  sunset: {
    label: 'Sunset',
    base: 'background:#1a0a0a;',
    orbs: [
      { x: '20%', y: '25%', size: '24rem', color: 'rgba(234,88,12,0.3)' },
      { x: '60%', y: '20%', size: '20rem', color: 'rgba(225,29,72,0.3)' },
      { x: '75%', y: '60%', size: '22rem', color: 'rgba(124,58,237,0.25)' },
    ],
    swatch: 'bg-gradient-to-br from-orange-600 via-rose-600 to-purple-600',
  },
  mesh: {
    label: 'Mesh',
    base: 'background:#0f172a;',
    gradient: 'background:linear-gradient(135deg,#0f172a 0%,#172554 50%,#0f172a 100%);',
    orbs: [
      { x: '25%', y: '25%', size: '24rem', color: 'rgba(6,182,212,0.3)' },
      { x: '70%', y: '30%', size: '20rem', color: 'rgba(139,92,246,0.3)' },
      { x: '50%', y: '65%', size: '18rem', color: 'rgba(59,130,246,0.25)' },
    ],
    swatch: 'bg-gradient-to-br from-cyan-800 via-blue-900 to-purple-900',
  },
  'light-blue': {
    label: 'Light Blue',
    base: 'background:#eef4fb;',
    gradient: 'background:linear-gradient(135deg,#eef4fb 0%,#dbeafe 50%,#eef4fb 100%);',
    orbs: [
      { x: '20%', y: '25%', size: '24rem', color: 'rgba(59,130,246,0.12)' },
      { x: '65%', y: '50%', size: '20rem', color: 'rgba(99,102,241,0.1)' },
      { x: '45%', y: '75%', size: '18rem', color: 'rgba(6,182,212,0.08)' },
    ],
    swatch: 'bg-gradient-to-br from-blue-100 to-indigo-100',
  },
  'light-warm': {
    label: 'Light Warm',
    base: 'background:#faf5f0;',
    gradient: 'background:linear-gradient(135deg,#faf5f0 0%,#fef3c7 50%,#faf5f0 100%);',
    orbs: [
      { x: '25%', y: '30%', size: '22rem', color: 'rgba(251,191,36,0.1)' },
      { x: '60%', y: '20%', size: '20rem', color: 'rgba(249,115,22,0.08)' },
      { x: '45%', y: '70%', size: '18rem', color: 'rgba(236,72,153,0.06)' },
    ],
    swatch: 'bg-gradient-to-br from-amber-100 to-orange-100',
  },
};

class ThemeState {
  mode = $state<'light' | 'dark'>('light');
  preset = $state<string>('default');
  background = $state<BackgroundPreset>('mesh');

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

  setBackground(name: BackgroundPreset) {
    this.background = name;
  }
}

export const theme = new ThemeState();
