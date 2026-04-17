import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const isProd = process.env.NODE_ENV === "production";
const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: "auto" },
});

const nextConfig: NextConfig = {
  /* config options here */

  typescript: {
    tsconfigPath: isProd ? "tsconfig.build.json" : "tsconfig.json",
  },
};

export default withVanillaExtract(nextConfig);
