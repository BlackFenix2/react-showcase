import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //ignore type errors
  typescript: {
    ignoreBuildErrors: true,
  },

  /* config options here */
};

export default nextConfig;
