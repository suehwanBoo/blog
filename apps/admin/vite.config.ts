/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import path from "node:path";

const publicAlias = {
  "@": path.resolve(__dirname, "./src"),
};

const isDev = process.env.NODE_ENV !== "production";
const alias = {
  ...publicAlias,
  ...(isDev
    ? {
        "@boo/ui": path.resolve(__dirname, "../../packages/ui/src/index.ts"),
        "@boo/ui/client": path.resolve(
          __dirname,
          "../../packages/ui/src/client.ts",
        ),
      }
    : {}),
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    passWithNoTests: true,
  },
  resolve: {
    alias,
  },
});
