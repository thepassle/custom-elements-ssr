import { defineConfig } from 'astro/config';
import customElements from 'custom-elements-ssr';
import nodejs from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
   outDir: './dist-ssr',
   output: 'server',
   adapter: nodejs({
      mode: 'standalone'
   }),
   server: { 
      port: 4323
   },
   integrations: [customElements()]
});
