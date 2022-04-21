import { parseHTML } from 'linkedom';

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

    customElements.registry = new Map;
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
