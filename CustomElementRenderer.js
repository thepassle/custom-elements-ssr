import { ElementRenderer } from '@lit-labs/ssr/lib/element-renderer.js';
import { escapeHtml } from '@lit-labs/ssr/lib/util/escape-html.js';

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
		yield this.element.shadowRoot.innerHTML;
	}
}