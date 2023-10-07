import { readFileSync } from "node:fs";

function getViteConfiguration() {
  return {
    // assetsInclude: ["**/dsd-polyfill.js"],
    optimizeDeps: {
      include: [
        "custom-elements-ssr",
      ],
      exclude: [
        "custom-elements-ssr/server.js",
      ],
      force: true,
    },
    ssr: {
      external: [
        "linkedom",
        "custom-elements-ssr/server.js",
      ],
      noExternal: [
        "custom-elements-ssr/dsd-polyfill.js"
      ]
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
        injectScript("page", readFileSync(new URL("./dsd-polyfill.js", import.meta.url), { encoding: "utf-8" }));

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