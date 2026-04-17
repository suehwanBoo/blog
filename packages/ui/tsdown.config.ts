import { defineConfig } from "tsdown";
import { vanillaExtractPlugin } from "@vanilla-extract/rollup-plugin";

export default defineConfig({
  entry: ["./src/index.ts"],
  platform: "neutral",
  format: "esm",
  dts: true,
  plugins: [
    vanillaExtractPlugin({
      identifiers: "debug",
    }),
  ],
});
