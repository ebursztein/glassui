import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

/**
 * Component prop consistency tests (useUI architecture).
 *
 * Every visual component uses useUI for glass/style resolution.
 * Every schema extends BaseUIPropsSchema.
 * No manual glass wiring or insideGlass checks.
 */

const COMPONENTS_DIR = path.resolve(__dirname);

const VISUAL_COMPONENTS = [
  'button/Button.svelte',
  'card/Card.svelte',
  'badge/Badge.svelte',
  'alert/Alert.svelte',
  'input/Input.svelte',
  'textarea/Textarea.svelte',
  'toggle/Toggle.svelte',
];

const REQUIRED_EFFECT_PROPS = ['glass', 'frosted', 'raised', 'glow', 'colored'];

const SCHEMAS = [
  'button/schema.ts',
  'card/schema.ts',
  'badge/schema.ts',
  'alert/schema.ts',
  'input/schema.ts',
  'textarea/schema.ts',
  'toggle/schema.ts',
];

function readComponent(relativePath: string): string {
  return fs.readFileSync(path.join(COMPONENTS_DIR, relativePath), 'utf-8');
}

// ---------------------------------------------------------------------------
// useUI architecture
// ---------------------------------------------------------------------------

describe('useUI architecture', () => {
  for (const comp of VISUAL_COMPONENTS) {
    const name = comp.split('/')[0];
    const source = readComponent(comp);

    it(`${name} imports useUI`, () => {
      expect(source, `${name} must use useUI`).toContain('useUI');
    });

    it(`${name} does not use old glass wiring`, () => {
      expect(source.includes('getParentGlass'), `${name} should not import getParentGlass`).toBe(false);
      expect(source.includes('GLASS_CONTEXT_KEY'), `${name} should not import GLASS_CONTEXT_KEY`).toBe(false);
      expect(source.includes('resolveGlass'), `${name} should not import resolveGlass`).toBe(false);
      expect(source.includes('resolveFrosted'), `${name} should not import resolveFrosted`).toBe(false);
      expect(source.includes('getAlertStyles'), `${name} should not import getAlertStyles`).toBe(false);
      expect(source.includes('getFieldStatusOverrides'), `${name} should not import getFieldStatusOverrides`).toBe(false);
    });
  }
});

// ---------------------------------------------------------------------------
// Prop consistency
// ---------------------------------------------------------------------------

describe('Component prop consistency', () => {
  for (const comp of VISUAL_COMPONENTS) {
    const name = comp.split('/')[0];

    describe(name, () => {
      const source = readComponent(comp);

      for (const prop of REQUIRED_EFFECT_PROPS) {
        it(`has ${prop} in interface Props`, () => {
          const pattern = new RegExp(`${prop}\\??\\s*[:?]`);
          expect(source, `${name} missing ${prop} in Props`).toMatch(pattern);
        });

        it(`has ${prop} in destructured props`, () => {
          const pattern = new RegExp(`${prop}\\s*=`);
          expect(source, `${name} missing ${prop} in $props()`).toMatch(pattern);
        });
      }

      it('passes raised to useUI props', () => {
        expect(source, `${name} must pass raised`).toMatch(/raised[,\s}]/);
      });

      it('has no hardcoded color classes (cyan/emerald/amber)', () => {
        const hardcoded = source.match(/(?:text|bg|border)-(?:cyan|emerald|amber|red)-\d{3}/g);
        expect(hardcoded, `${name} has hardcoded colors: ${hardcoded}`).toBeNull();
      });
    });
  }
});

// ---------------------------------------------------------------------------
// Schema consistency
// ---------------------------------------------------------------------------

describe('Component schema consistency', () => {
  for (const schema of SCHEMAS) {
    const name = schema.split('/')[0];

    describe(`${name} schema`, () => {
      const source = readComponent(schema);

      it('uses BaseUIPropsSchema', () => {
        expect(source, `${name} schema should use BaseUIPropsSchema`).toContain('BaseUIPropsSchema');
      });

      for (const prop of REQUIRED_EFFECT_PROPS) {
        it(`has ${prop} in meta props`, () => {
          expect(source, `${name} meta missing ${prop}`).toContain(`name: '${prop}'`);
        });
      }
    });
  }
});

// ---------------------------------------------------------------------------
// GlassBackdrop consistency
// ---------------------------------------------------------------------------

describe('GlassBackdrop consistency', () => {
  for (const comp of VISUAL_COMPONENTS) {
    const name = comp.split('/')[0];
    const source = readComponent(comp);

    if (source.includes('colored')) {
      it(`${name} imports GlassBackdrop for colored prop`, () => {
        expect(source, `${name} has colored but no GlassBackdrop import`).toContain('GlassBackdrop');
      });
    }
  }
});

// ---------------------------------------------------------------------------
// Color + style API (Button, Badge)
// ---------------------------------------------------------------------------

describe('Color + style API consistency', () => {
  for (const comp of ['button/Button.svelte', 'badge/Badge.svelte']) {
    const name = comp.split('/')[0];
    const source = readComponent(comp);

    it(`${name} has color prop`, () => {
      expect(source).toMatch(/color\??\s*[:?]/);
    });

    it(`${name} has style/renderStyle prop`, () => {
      expect(source).toMatch(/style\??\s*[:?]|renderStyle/);
    });
  }

  for (const schema of ['button/schema.ts', 'badge/schema.ts']) {
    const name = schema.split('/')[0];
    const source = readComponent(schema);

    it(`${name} schema has ThemeColor`, () => {
      expect(source).toContain('ThemeColor');
    });

    it(`${name} schema has RenderStyle`, () => {
      expect(source).toContain('RenderStyle');
    });
  }
});
