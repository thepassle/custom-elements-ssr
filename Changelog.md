# Recent Changes

* Fix: Astro Integrations support  
  (add missing `package.json` keywords and exports)

* Declarative Shadow DOM polyfill improvements
  
  - More efficient DSD feature detection and polyfill
    (based on: <https://developer.chrome.com/articles/declarative-shadow-dom>)

  - Polyfill injection now happens only if pages actually use DSD
  
  - Fix: Check if Page isn't already loaded before installing the polyfill handler.

* Fix: Support Custom Elements without shadow DOM

* Feature: e2e Tests

## TODO

* Slots

* Render and hydration hook

* Lit and Rust Test examples
  
* MDX support