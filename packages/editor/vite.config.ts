/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import path from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    passWithNoTests: true,
  },
  build: {
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: {
        index: path.resolve(__dirname, "./src/index.ts"),
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        format === "es" ? `${entryName}.js` : `${entryName}.cjs`,
      cssFileName: "style",
    },
    rollupOptions: {
      external: [
        "@boo/ui",
        "@boo/ui/client",
        "@boo/ui/styles.css",
        "react",
        "react/jsx-runtime",
        "react-dom",
        "@tiptap/core",
        "@tiptap/react",
      ],
      output: {
        exports: "named",
      },
    },
  },
});
