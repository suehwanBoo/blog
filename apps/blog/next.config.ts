import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import path from "node:path";

const isProd = process.env.NODE_ENV === "production";
const withVanillaExtract = createVanillaExtractPlugin();

const transpilePackages = isProd
  ? ["@boo/font", "@boo/firebase"]
  : ["@boo/font", "@boo/ui", "@boo/firebase"];

const oneDayCacheControl =
  "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/icon0.svg",
        headers: [
          {
            key: "Cache-Control",
            value: oneDayCacheControl,
          },
        ],
      },
      {
        source: "/icon1.png",
        headers: [
          {
            key: "Cache-Control",
            value: oneDayCacheControl,
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/web-app-manifest-192x192.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/web-app-manifest-512x512.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  typescript: {
    tsconfigPath: isProd ? "tsconfig.build.json" : "tsconfig.json",
  },
  images: {
    unoptimized: true,
  },
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: transpilePackages,
  experimental: {
    validateRSCRequestHeaders: true,
  },
};

export default withVanillaExtract(nextConfig);
