import { parseHTML } from 'linkedom';

/**
 * Astro's webapi already polyfills `CustomEvent`. When creating CustomEvent in linkedom,
 * it does a check to see if `typeof CustomEvent === 'function'` which it is, because 
 * Astro already polyfills it. It then uses Astro's version of `CustomEvent`, which conflicts
 * with Linkedom's `Event` and errors.
 * 
 * https://github.com/WebReflection/linkedom/issues/130
 */ 
 Object.assign(globalThis, {
  CustomEvent: null
});

const {
  window, 
  document, 
  customElements,
  HTMLElement,
  Event, 
  CustomEvent
} = parseHTML(`<!doctype html><html lang="en"><head><title>Hello SSR</title></head><body></body></html>`);

const originalDefine = customElements.define.bind(customElements);

customElements.define = (name, klass) => {
  try {
    originalDefine(name, klass);
  } catch(e) {
    customElements.registry.delete(name);
    originalDefine(name, class extends klass {})
  }
}

Object.assign(globalThis, {
  document, 
  window,
  customElements,
  HTMLElement, 
  Event, 
  CustomEvent
});
