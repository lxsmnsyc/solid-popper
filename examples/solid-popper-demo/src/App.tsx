import { Show, createSignal } from 'solid-js';
import type { JSX } from '@solidjs/web';
import usePopper from 'solid-popper';

export default function App(): JSX.Element {
  const [anchor, setAnchor] = createSignal<HTMLElement>();
  const [popper, setPopper] = createSignal<HTMLElement>();
  const [isOpen, setOpen] = createSignal(false);

  usePopper(anchor, popper, {
    placement: 'auto',
    modifiers: [{ name: 'offset', options: { offset: [10, 20] } }],
  });

  return (
    <div class="page">
      <button
        class="anchor"
        type="button"
        ref={(element) => {
          setAnchor(() => element);
        }}
        onClick={() => {
          setOpen((open) => !open);
        }}
      >
        Solutions
      </button>
      <Show when={isOpen()}>
        <div
          class="panel"
          ref={(element) => {
            setPopper(() => element);
          }}
        >
          This is a popper.
        </div>
      </Show>
    </div>
  );
}
