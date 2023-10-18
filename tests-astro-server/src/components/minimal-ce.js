class MinimalCustomElement extends HTMLElement {
    static observedAttributes = ["color"];
  
    constructor() {
      super();
    }
  
    connectedCallback() {
      const shadow = this.attachShadow({ mode: "open" });
      const p = document.createElement("p");
      const text = document.createTextNode("TestText");
      p.appendChild(text);
      shadow.appendChild(p);

      console.log("Custom element added to page.");
    }
  
    disconnectedCallback() {
      console.log("Custom element removed from page.");
    }
  
    adoptedCallback() {
      console.log("Custom element moved to new page.");
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      console.log(`Attribute ${name} has changed.`);
    }
  }
  
  customElements.define("minimal-ce", MinimalCustomElement);
  