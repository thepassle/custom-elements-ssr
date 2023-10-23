function getViteConfiguration() {
  return {
    optimizeDeps: {
      include: [
        "custom-elements-ssr",
      ],
    },
    build: {
      assetsInlineLimit: 0,
    },
    ssr: {
      external: [
        "linkedom",
      ],
    }
  };
}

/**
 * Astro's webapi already polyfills `CustomEvent`. When creating CustomEvent in linkedom,
 * it does a check to see if `typeof CustomEvent === 'function'` which it is, because 
 * Astro already polyfills it. It then uses Astro's version of `CustomEvent`, which conflicts
 * with Linkedom's `Event` and errors.
 * 
 * https://github.com/WebReflection/linkedom/issues/130
 */
Object.assign(globalThis, {
  CustomEvent: null
});

export default function customElements() {
  return {
    name: "custom-elements-ssr",
    hooks: {
      "astro:config:setup": ({ updateConfig, addRenderer, injectScript }) => {

        addRenderer({
          name: "custom-elements-ssr",
          serverEntrypoint: "custom-elements-ssr/server.js"
        });

        updateConfig({
          vite: getViteConfiguration()
        });
      }
    }
  };
}