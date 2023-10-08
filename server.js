import './server-shim.js';
import { DOMParser } from 'linkedom';
import { CustomElementRender } from './CustomElementRenderer.js';
import dsd_polyfill_url from './dsd-polyfill.min.js?url';

console.log("dsd_polyfill_url: ", dsd_polyfill_url);

async function check(tag) {
  return !!customElements?.get?.(tag);
}

async function* render(tag, attrs, children) {
  const instance = new CustomElementRender(tag);

  Object.entries(attrs).forEach(([k, v]) => {
    instance.setAttribute(k, v);
  });

  if (children) {
    const nodes = new DOMParser().parseFromString(children, 'text/html').childNodes;
    instance.element.append(...nodes);
  }

  instance?.connectedCallback?.();

  yield `<${tag}`;
  yield* instance.renderAttributes();
  yield `>`;
  const shadowContents = instance.renderShadow();
  if (shadowContents !== undefined) {
    yield '<template shadowrootmode="open">';
    yield* shadowContents;
    yield '</template>';
    yield `<script type="module" src="${dsd_polyfill_url}"></script>`;
  }
  yield* instance.renderLight();
  yield `</${tag}>`;
}

async function renderToStaticMarkup(tag, attrs, children) {

  let html = '';
  for await (let chunk of render(tag, attrs, children)) {
    html += chunk;
  }

  return { html };
}

export default { check, renderToStaticMarkup };
