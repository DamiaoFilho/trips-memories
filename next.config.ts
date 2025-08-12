import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      new URL('https://ytvrwllrzqeggfguskzs.supabase.co/storage/v1/object/public/**')
    ]
  },
};

export default nextConfig;
