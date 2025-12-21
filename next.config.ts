import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/adapty',
  assetPrefix: '/adapty/',
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
