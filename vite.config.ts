import { defineConfig } from 'vite';
import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import tsconfigPaths from 'vite-tsconfig-paths';
import { partytownVite } from '@builder.io/partytown/utils';
import { join } from 'path';

export default defineConfig(() => {
  return {
    build: {
      sourcemap: false,
      rollupOptions: {
        external: ['node:async_hooks']
      },
    },
    plugins: [
      qwikCity({ trailingSlash: false, serverPluginsDir: 'src/server' }),
      qwikVite({
        debug: false,
        experimental: ['valibot']
      }),
      tsconfigPaths(),
      partytownVite({ dest: join(__dirname, "dist", "~partytown"), debug: false }),
    ],
    server: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
