import { defineConfig } from 'astro/config';
import customElements from 'custom-elements-ssr';

// https://astro.build/config
export default defineConfig({
   integrations: [customElements()]
});
