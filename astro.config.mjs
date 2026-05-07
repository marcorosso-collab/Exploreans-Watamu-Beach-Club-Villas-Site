import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://watamu.exploreans.com',
  build: {
    format: 'directory'
  }
});
