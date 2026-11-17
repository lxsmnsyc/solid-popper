import type { Instance, Options } from '@popperjs/core';
import { createPopper } from '@popperjs/core';
import { createEffect, createSignal } from 'solid-js';

function readOptions(options: Partial<Options>): Partial<Options> {
  return {
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement ?? 'bottom',
    modifiers: options.modifiers ?? [],
    strategy: options.strategy ?? 'absolute',
  };
}

export default function usePopper(
  targetElement: () => HTMLElement | undefined | null,
  popperElement: () => HTMLElement | undefined | null,
  options: Partial<Options> = {},
): () => Instance | undefined {
  const [current, setCurrent] = createSignal<Instance>();

  // The instance lives as long as both elements. Changing either one destroys
  // it, and so does disposing the owner.
  createEffect(
    () => [targetElement(), popperElement()] as const,
    ([target, popper]) => {
      if (!target || !popper) {
        setCurrent(undefined);
        return undefined;
      }
      // Popper reads `onFirstUpdate` only from the options it is created with.
      // The effect step is untracked, so reading the options here adds no dependency.
      const instance = createPopper(target, popper, readOptions(options));
      setCurrent(instance);

      return () => {
        instance.destroy();
      };
    },
  );

  // Each option is read in the compute step, so a getter on `options` is tracked.
  createEffect(
    () => ({ instance: current(), ...readOptions(options) }),
    ({ instance, ...next }) => {
      if (instance) {
        // Rethrown outside the promise so a failed update is not swallowed.
        instance.setOptions(next).catch((error: unknown) => {
          queueMicrotask(() => {
            throw error;
          });
        });
      }
    },
  );

  return () => {
    const instance = current();
    if (instance) {
      return { ...instance };
    }
    return undefined;
  };
}
