import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://blockeddrainslowernorthshore.com.au',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
});
