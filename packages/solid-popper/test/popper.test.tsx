import { createRoot, createSignal, flush } from 'solid-js';
import { describe, expect, it } from 'vitest';
import usePopper from '../src/index';
import { createElementInBody, renderInHost } from './utils';

describe('usePopper', () => {
  it('creates no instance until both elements are set', () => {
    const [anchor, setAnchor] = createSignal<HTMLElement>();
    const [popper, setPopper] = createSignal<HTMLElement>();
    const instance = createRoot(() => usePopper(anchor, popper));
    flush();
    expect(instance()).toBeUndefined();

    setAnchor(createElementInBody('button'));
    flush();
    expect(instance()).toBeUndefined();

    setPopper(createElementInBody());
    flush();
    expect(instance()).toBeDefined();
  });

  it('applies the default options', () => {
    const instance = createRoot(() =>
      usePopper(
        () => createElementInBody('button'),
        () => createElementInBody(),
      ),
    );
    flush();

    expect(instance()?.state.options.placement).toBe('bottom');
    expect(instance()?.state.options.strategy).toBe('absolute');
  });

  it('applies the given options', () => {
    const instance = createRoot(() =>
      usePopper(
        () => createElementInBody('button'),
        () => createElementInBody(),
        { placement: 'top-start', strategy: 'fixed' },
      ),
    );
    flush();

    expect(instance()?.state.options.placement).toBe('top-start');
    expect(instance()?.state.options.strategy).toBe('fixed');
  });

  it('tracks options that are getters', () => {
    const [placement, setPlacement] = createSignal<'top' | 'left'>('top');
    const instance = createRoot(() =>
      usePopper(
        () => createElementInBody('button'),
        () => createElementInBody(),
        {
          get placement() {
            return placement();
          },
        },
      ),
    );
    flush();
    expect(instance()?.state.options.placement).toBe('top');

    setPlacement('left');
    flush();

    expect(instance()?.state.options.placement).toBe('left');
  });

  it('positions the popper next to the anchor', async () => {
    const [anchor, setAnchor] = createSignal<HTMLElement>();
    const [popper, setPopper] = createSignal<HTMLElement>();
    renderInHost(() => {
      usePopper(anchor, popper, { placement: 'bottom-start' });
      return (
        <>
          <button
            type="button"
            ref={(element) => {
              setAnchor(() => element);
            }}
          >
            Anchor
          </button>
          <div
            ref={(element) => {
              setPopper(() => element);
            }}
          >
            Popper
          </div>
        </>
      );
    });
    flush();

    // Popper writes `data-popper-placement` after its first layout pass.
    await expect.poll(() => popper()?.getAttribute('data-popper-placement')).toBe('bottom-start');
    const anchorBox = anchor()?.getBoundingClientRect();
    const popperBox = popper()?.getBoundingClientRect();
    expect(popperBox?.top).toBeGreaterThanOrEqual(anchorBox?.bottom ?? Infinity);
  });

  it('replaces the instance when the popper element changes', () => {
    const anchorElement = createElementInBody('button');
    const [popper, setPopper] = createSignal<HTMLElement>(createElementInBody());
    const instance = createRoot(() => usePopper(() => anchorElement, popper));
    flush();
    const first = instance()?.state.elements.popper;

    const next = createElementInBody();
    setPopper(next);
    flush();

    expect(first).toBeDefined();
    expect(instance()?.state.elements.popper).toBe(next);
  });

  it('removes the instance when an element is cleared', () => {
    const [anchor, setAnchor] = createSignal<HTMLElement | undefined>(
      createElementInBody('button'),
    );
    const instance = createRoot(() => usePopper(anchor, () => createElementInBody()));
    flush();
    expect(instance()).toBeDefined();

    setAnchor(undefined);
    flush();

    expect(instance()).toBeUndefined();
  });

  it('destroys the instance when the owner is disposed', () => {
    let cleanups = 0;
    let dispose = (): void => {};
    createRoot((done) => {
      dispose = done;
      usePopper(
        () => createElementInBody('button'),
        () => createElementInBody(),
        {
          modifiers: [
            {
              name: 'probe',
              enabled: true,
              phase: 'main',
              fn(): void {},
              effect() {
                // Popper runs this when the instance is destroyed.
                return () => {
                  cleanups += 1;
                };
              },
            },
          ],
        },
      );
    });
    flush();
    const before = cleanups;

    dispose();
    flush();

    expect(cleanups).toBeGreaterThan(before);
  });
});
