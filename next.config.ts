import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "infonexuz.uz",
      },
    ],
  },
};

export default nextConfig;
