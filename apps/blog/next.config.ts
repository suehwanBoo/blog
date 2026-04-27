import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import path from "node:path";

const isProd = process.env.NODE_ENV === "production";
const withVanillaExtract = createVanillaExtractPlugin();

const transpilePackages = isProd
  ? ["@boo/font", "@boo/firebase"]
  : ["@boo/font", "@boo/ui", "@boo/firebase"];

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    tsconfigPath: isProd ? "tsconfig.build.json" : "tsconfig.json",
  },
  images: {
    unoptimized: true,
  },
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: transpilePackages,
};

export default withVanillaExtract(nextConfig);
