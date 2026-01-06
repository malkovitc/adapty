import type { NextConfig } from "next";

// Only use basePath in production (for deployment to subdirectory)
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  // basePath only in production - for local dev, site is at root /
  ...(isProduction && {
    basePath: '/adapty',
    assetPrefix: '/adapty/',
  }),
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: isProduction ? '/adapty' : '',
  },
};

export default nextConfig;
