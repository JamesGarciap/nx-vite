/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import styleXPlugin from '@stylexjs/babel-plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: './node_modules/.vite/.',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react({
    babel: {
      plugins: [
        [
          styleXPlugin,
          {
            dev: true,
            // Set this to true for snapshot testing
            // default: false
            test: false,
            // Required for CSS variable support
            unstable_moduleResolution: {
              // type: 'commonJS' | 'haste'
              // default: 'commonJS'
              type: 'commonJS',
              // The absolute path to the root directory of your project
              rootDir: __dirname,
            },
          },
        ],
      ]
    }
  }), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: './dist/nx-vite',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    globals: true,
    cache: {
      dir: './node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: './coverage/nx-vite',
      provider: 'v8',
    },
  },
});
