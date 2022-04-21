# custom-elements-ssr

This package contains an Astro SSR integration to render vanilla custom elements on the server, as well as a [@lit-labs/ssr](https://www.npmjs.com/package/@lit-labs/ssr) compatible `ElementRenderer` for usage with [@lit-labs/ssr](https://www.npmjs.com/package/@lit-labs/ssr).

enables server-side rendering and client-side hydration for your [Lit](https://lit.dev/) custom elements.

## Differences with lit SSR

It could be the case that you were hoping the Lit SSR package would also support vanilla Custom Elements, and were surprised to find that it didnt. The reason for this is that to render custom elements on the server side, we need some browser APIs to be available in a Node.js environment. Lit however, makes surprisingly little use of browser APIs to be able to do efficient rendering. This means that the DOM shim that Lit SSR requires is really, really minimal, and doesn't include a bunch of things, like for example querySelectors. This package instead makes use of [linkedom]() to shim browser functionality on the server, which does include the required browser APIs to render custom elements on the server.

Additionally the `ElementRenderer` for vanilla custom elements is a little bit different from Lit elements.

## @lit-labs/ssr usage

Import the ElementRenderer:

```
import { CustomElementRenderer } from 'custom-elements-ssr/CustomElementRenderer.js';
```

## Astro Usage

### Configuration

In your Astro SSR-enabled project, you'll need to install the integration and the required polyfill:

```
npm i custom-elements-ssr @webcomponents/template-shadowroot
```

Add the integration to your `astro.config.mjs`:
```diff
import { defineConfig } from 'astro/config';
+ import customElements from 'custom-elements-ssr/astro.js';

// https://astro.build/config
export default defineConfig({
+  integrations: [customElements()]
});
```

### Usage

Create a custom element in your project.

`src/components/my-element.js`:
```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowroot.innerHTML = '<h1>Hello World</h1>';
  }
}

// Make sure to export the `tagName`, without it, Astro will error
export const tagName = 'my-element';
customElements.define(tagName, MyElement);
```

And then use it in your Astro pages:
`index.astro`:
```astro
---
import '../components/my-element.js';
---
<my-element client:idle></my-element>
```

### Using third party components

If you use third party components, like for example:

`src/components/my-tabs.js`:
```js
import { GenericTabs } from '@generic-components/components/generic-tabs/GenericTabs.js';

export const tagName = 'my-tabs';
customElements.define(tagName, GenericTabs);
```

You have to exclude the package name in your astro config from being externalized:

`astro.config.mjs`:
```diff
import { defineConfig } from 'astro/config';
import customElements from 'custom-elements-ssr/astro.js';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [customElements()],
  adapter: netlify(),
  vite: {
+    ssr: {
+      noExternal: [
+        "@generic-components/components"
+      ],
+    }
  }
});
```

You can find an example of this here:
- [github source](https://github.com/thepassle/astro-custom-element-example)
- [netlify demo](vanilla-ssr-deploy-test.netlify.app/)