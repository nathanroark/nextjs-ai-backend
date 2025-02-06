import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone", // Ensure it's treated as a server
  experimental: {
    // appDir: false, // If using App Router, disable for API routes to work
  },
};

export default nextConfig;
