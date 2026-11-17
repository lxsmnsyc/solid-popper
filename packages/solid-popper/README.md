# solid-popper

> SolidJS bindings for [Popper.js](https://popper.js.org/)

[![NPM](https://img.shields.io/npm/v/solid-popper.svg)](https://www.npmjs.com/package/solid-popper) [![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://codesandbox.io/s/github/LXSMNSYC/solid-popper/tree/main/examples/solid-popper-demo)

## Install

This version supports Solid 2.0. Solid 1 users stay on `solid-popper@0.3`, which is kept on the [`solid-1` branch](https://github.com/lxsmnsyc/solid-popper/tree/solid-1).

```bash
npm i @popperjs/core solid-popper
```

```bash
yarn add @popperjs/core solid-popper
```

```bash
pnpm add @popperjs/core solid-popper
```

It requires Node.js 22 or later.

## Usage

```tsx
import { createSignal } from 'solid-js';
import usePopper from 'solid-popper';

function Component() {
  const [anchor, setAnchor] = createSignal<HTMLElement>();
  const [popper, setPopper] = createSignal<HTMLElement>();

  usePopper(anchor, popper, {
    placement: 'auto',
  });

  return (
    <>
      <button
        ref={(element) => {
          setAnchor(() => element);
        }}
        type="button"
      >
        Example
      </button>
      <div
        ref={(element) => {
          setPopper(() => element);
        }}
      >
        This is a tooltip.
      </div>
    </>
  );
}
```

`usePopper` returns an accessor for the Popper instance. It is `undefined` until both elements are set.

`options` is a plain object. To make an option reactive, define it as a getter or pass a store:

```tsx
usePopper(anchor, popper, {
  get placement() {
    return placement();
  },
});
```

## Sponsors

![Sponsors](https://github.com/lxsmnsyc/sponsors/blob/main/sponsors.svg?raw=true)

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)
