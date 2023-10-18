class MinimalCustomElementNoShadow extends HTMLElement {
    static observedAttributes = ["color"];
  
    constructor() {
      super();
    }
  
    connectedCallback() {
      const p = document.createElement("p");
      const text = document.createTextNode("Test-Text without Shadow DOM");
      p.appendChild(text);
      this.appendChild(p);

      const light = document.createTextNode("Light DOM data");
      this.appendChild(light);


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
  