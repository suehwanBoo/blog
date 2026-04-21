import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import path from "node:path";

const isProd = process.env.NODE_ENV === "production";
const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: "auto" },
});

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    tsconfigPath: isProd ? "tsconfig.build.json" : "tsconfig.json",
  },
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
};

export default withVanillaExtract(nextConfig);
