import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/adapty',
  assetPrefix: '/adapty/',
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: '/adapty',
  },
};

export default nextConfig;
