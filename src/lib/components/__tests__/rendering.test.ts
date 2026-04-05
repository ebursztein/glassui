// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/svelte';
import ButtonTest from './ButtonTest.svelte';
import AccordionTest from './AccordionTest.svelte';
import TooltipTest from './TooltipTest.svelte';
import DropdownTest from './DropdownTest.svelte';

// Polyfill Element.animate for jsdom (used by Svelte transitions)
if (typeof Element.prototype.animate === 'undefined') {
  Element.prototype.animate = vi.fn().mockReturnValue({
    finished: Promise.resolve(),
    cancel: vi.fn(),
    onfinish: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
}

afterEach(() => cleanup());

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

describe('Button rendering', () => {
  it('renders with text content', () => {
    const { getByRole } = render(ButtonTest, { props: { text: 'Save' } });
    const btn = getByRole('button');
    expect(btn).toBeTruthy();
    expect(btn.textContent).toContain('Save');
  });

  it('applies disabled state', () => {
    const { getByRole } = render(ButtonTest, { props: { text: 'Save', disabled: true } });
    const btn = getByRole('button');
    expect(btn.hasAttribute('disabled')).toBe(true);
  });

  it('handles click events', async () => {
    let clicked = false;
    const { getByRole } = render(ButtonTest, {
      props: { text: 'Click', onclick: () => { clicked = true; } },
    });
    await fireEvent.click(getByRole('button'));
    expect(clicked).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Accordion
// ---------------------------------------------------------------------------

describe('Accordion rendering', () => {
  it('renders all items with toggle buttons', () => {
    const { container } = render(AccordionTest);
    const toggles = container.querySelectorAll('.hs-accordion-toggle');
    expect(toggles.length).toBe(3);
  });

  it('all items start collapsed (aria-expanded=false)', () => {
    const { container } = render(AccordionTest);
    const toggles = container.querySelectorAll('.hs-accordion-toggle');
    for (const btn of toggles) {
      expect(btn.getAttribute('aria-expanded')).toBe('false');
    }
  });

  it('clicking a toggle expands the item', async () => {
    const { container } = render(AccordionTest);
    const toggles = container.querySelectorAll('.hs-accordion-toggle');
    await fireEvent.click(toggles[0]);
    expect(toggles[0].getAttribute('aria-expanded')).toBe('true');
  });

  it('single mode: opening one closes the other', async () => {
    const { container } = render(AccordionTest, { props: { type: 'single' } });
    const toggles = container.querySelectorAll('.hs-accordion-toggle');
    await fireEvent.click(toggles[0]);
    expect(toggles[0].getAttribute('aria-expanded')).toBe('true');
    await fireEvent.click(toggles[1]);
    expect(toggles[0].getAttribute('aria-expanded')).toBe('false');
    expect(toggles[1].getAttribute('aria-expanded')).toBe('true');
  });
});

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------

describe('Tooltip rendering', () => {
  it('renders trigger content', () => {
    const { getByText } = render(TooltipTest);
    expect(getByText('Hover me')).toBeTruthy();
  });

  it('trigger has aria-describedby linking to tooltip', () => {
    const { container } = render(TooltipTest);
    const trigger = container.querySelector('.hs-tooltip-toggle');
    const describedBy = trigger?.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(describedBy).toMatch(/^glass-tooltip-/);
  });
});

// ---------------------------------------------------------------------------
// Dropdown
// ---------------------------------------------------------------------------

describe('Dropdown rendering', () => {
  it('renders trigger content', () => {
    const { getByText } = render(DropdownTest);
    expect(getByText('Open menu')).toBeTruthy();
  });

  it('trigger has aria-haspopup and aria-expanded', () => {
    const { container } = render(DropdownTest);
    const trigger = container.querySelector('.hs-dropdown-toggle');
    expect(trigger?.getAttribute('aria-haspopup')).toBe('menu');
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
  });

  it('menu is not visible when closed', () => {
    const { container } = render(DropdownTest);
    const menu = container.querySelector('[role="menu"]');
    expect(menu).toBeNull();
  });

  it('clicking trigger opens the menu', async () => {
    const { container } = render(DropdownTest);
    const trigger = container.querySelector('.hs-dropdown-toggle') as HTMLElement;
    await fireEvent.click(trigger);
    const menu = container.querySelector('[role="menu"]');
    expect(menu).toBeTruthy();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });
});
