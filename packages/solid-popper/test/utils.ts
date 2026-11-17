import type { JSX } from '@solidjs/web';
import { render } from '@solidjs/web';
import { flush } from 'solid-js';
import { afterEach } from 'vitest';

const disposers: (() => void)[] = [];

afterEach(() => {
  while (disposers.length) {
    disposers.pop()?.();
  }
  document.body.innerHTML = '';
});

/** Renders into a host attached to the document. Disposed after each test. */
export function renderInHost(code: () => JSX.Element): HTMLElement {
  const host = document.createElement('div');
  document.body.append(host);
  disposers.push(render(code, host));
  flush();
  return host;
}

/** Creates an element attached to the document. */
export function createElementInBody(tag = 'div'): HTMLElement {
  const element = document.createElement(tag);
  document.body.append(element);
  return element;
}
