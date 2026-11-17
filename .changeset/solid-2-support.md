---
'solid-popper': major
---

- Supports Solid 2.0. The peer dependency is now `solid-js@^2.0.0`, and `@popperjs/core` is `^2.11.8`.
- Requires Node.js 22 or later.
- The package is ESM only. The CommonJS build and the `development` export condition are removed.
- `usePopper` loses its generic type parameters. Its element accessors return `HTMLElement | undefined | null`.
