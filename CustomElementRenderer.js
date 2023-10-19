import { ElementRenderer } from '@lit-labs/ssr/lib/element-renderer.js';
import { escapeHtml } from '@lit-labs/ssr/lib/util/escape-html.js';
import * as parse5 from 'parse5';

export class CustomElementRender extends ElementRenderer {
  constructor(tagName) {
    super(tagName);
    this.element = new (customElements.get(tagName))();
    this._attributes = {};
  }
  setAttribute(name, value) {
    this._attributes[name] = value;
    this.element.setAttribute(name, value);
  }
  *renderAttributes() {
    for (const [name, value] of Object.entries(this._attributes)) {
      if (value === '' || value === undefined || value === null) {
        yield ` ${name}`;
      }
      else {
        yield ` ${name}="${escapeHtml(value)}"`;
      }
    }
  }
  async connectedCallback() {
    this.element?.connectedCallback?.();
    await this.element?.updateComplete || Promise.resolve();
  }
  attributeChangedCallback() { }
  *renderLight() {
    yield this.element.innerHTML;
  }
  *renderShadow() {
    yield this.element.shadowRoot?.innerHTML;
  }

  *renderSlots(slots) {
		for (let [slot, value = ''] of Object.entries(slots)) {
			if (slot !== 'default' && value) {
				// Parse the value as a concatenated string
				const fragment = parse5.parseFragment(`${value}`);

				// Add the missing slot attribute to child Element nodes
				for (const node of fragment.childNodes) {
					if (node.tagName && !node.attrs.some(({ name }) => name === 'slot')) {
						node.attrs.push({ name: 'slot', value: slot });
					}
				}

				value = parse5.serialize(fragment);
			}

			yield value;
		}
	}
}