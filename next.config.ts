import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/landing_page",
  assetPrefix: "/landing_page/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
