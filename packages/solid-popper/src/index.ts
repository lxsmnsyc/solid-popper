import {
  createPopper,
  Instance,
  Options,
} from '@popperjs/core';
import {
  createEffect,
  createSignal,
  onCleanup,
} from 'solid-js';

export default function usePopper<Target extends HTMLElement, Popper extends HTMLElement>(
  targetElement: () => Target | undefined | null,
  popperElement: () => Popper | undefined | null,
  options: Partial<Options> = {},
): () => Instance | undefined {
  const [current, setCurrent] = createSignal<Instance>();

  createEffect(() => {
    setCurrent(undefined);

    const target = targetElement();
    const popper = popperElement();

    if (target && popper) {
      const instance = createPopper(target, popper, {});
  
      setCurrent(instance);
  
      onCleanup(() => {
        instance.destroy();
      });
    }
  });

  createEffect(() => {
    const instance = current();

    if (instance) {
      instance.setOptions({
        onFirstUpdate: options.onFirstUpdate,
        placement: options.placement ?? 'bottom',
        modifiers: options.modifiers ?? [],
        strategy: options.strategy ?? 'absolute',
      });
    }
  });

  return () => {
    const instance = current();
    if (instance) {
      return {
        ...instance,
      };
    }
    return undefined;
  };
}
