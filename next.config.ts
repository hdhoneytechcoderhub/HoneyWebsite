import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin file tracing to this project so a lockfile outside the folder cannot shift the build root.
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
