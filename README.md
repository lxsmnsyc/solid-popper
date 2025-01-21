# solid-popper

> SolidJS bindings for Popper.js

[![NPM](https://img.shields.io/npm/v/solid-popper.svg)](https://www.npmjs.com/package/solid-popper) [![JavaScript Style Guide](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://codesandbox.io/s/github/LXSMNSYC/solid-popper/tree/main/examples/solid-popper-demo)
[![Open in Codeanywhere](https://img.shields.io/badge/Open%20in-Codeanywhere-blue?style=flat-square&logo=codeanywhere)](https://app.codeanywhere.com/#https://github.com/LXSMNSYC/solid-popper/tree/main/examples/solid-popper-demo)

## Install

```bash
yarn add @popperjs/core solid-popper
```

## Usage

```jsx
import { createSignal } from 'solid-js';
import usePopper from 'solid-popper';

function Component() {
  const [anchor, setAnchor] = createSignal();
  const [popper, setPopper] = createSignal();

  usePopper(anchor, popper, {
    placement: 'auto',
  });

  return (
    <>
      <button ref={setAnchor} type="button">Example</button>
      <div ref={setPopper}>This is a tooltip.</div>
    </>
  );
}
```

## Sponsors

![Sponsors](https://github.com/lxsmnsyc/sponsors/blob/main/sponsors.svg?raw=true)

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)
