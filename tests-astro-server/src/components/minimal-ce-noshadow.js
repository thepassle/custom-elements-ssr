class MinimalCustomElementNoShadow extends HTMLElement {
    static observedAttributes = ["color"];
  
    constructor() {
      super();
    }
  
    connectedCallback() {
      const p = document.createElement("p");
      const text = document.createTextNode("TestText noshadow");
      p.appendChild(text);
      this.appendChild(p);

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
  
  customElements.define("minimal-ce-noshadow", MinimalCustomElementNoShadow);
  