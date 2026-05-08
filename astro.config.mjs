import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://watamu.exploreans.com',
  build: {
    format: 'directory'
  },
  integrations: [
    mdx()
  ]
});
