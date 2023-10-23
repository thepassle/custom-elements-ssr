import './server-shim.js';
import { DOMParser } from 'linkedom';
import { CustomElementRender } from './CustomElementRenderer.js';
import dsd_polyfill_url from './dsd-polyfill.min.js?url';

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
  const shadow_content_top = shadowContents.next().value;
  if (shadow_content_top !== undefined) {
    yield '<template shadowrootmode="open">';
    yield shadow_content_top;
    yield* shadowContents;
    yield '</template>';
    yield `<script type="module" src="${dsd_polyfill_url}"></script>`;
  }
  if (children)
    yield* instance.renderSlots(children);
  yield* instance.renderLight();
  yield `</${tag}>`;
}

async function renderToStaticMarkup(tag, attrs, children) {

  // console.log('CHILDREN:', children);

  let html = '';
  for await (let chunk of render(tag, attrs, children)) {
    html += chunk;
  }

  return { html };
}

export default { check, renderToStaticMarkup };
