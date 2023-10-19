class Slots extends HTMLElement {
  static observedAttributes = ["color"];

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
    <h2>Component:</h2>
    <p>one:</p>
    <slot name="one">one not found</slot>
    <p>two:</p>
    <slot name="two">two not found</slot>
    <p>default:</p>
    <slot>default not found</slot>
    `
  }
}

customElements.define("slots-test", Slots);
