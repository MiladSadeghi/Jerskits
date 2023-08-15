/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from 'vite'

export default defineConfig(() => ({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-macros", "babel-plugin-styled-components"],
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 500,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts"
  },
}));