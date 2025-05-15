import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  // Add transpilePackages to ensure Sanity packages are properly transpiled
  transpilePackages: ["@sanity"],
};

export default nextConfig;
