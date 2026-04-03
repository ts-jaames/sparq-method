import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://evidence-driven-delivery.dev',
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), tailwind()],
});
