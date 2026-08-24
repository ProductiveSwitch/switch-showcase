import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Productive Restructure was renamed to Productive Search (juli 2026).
      // Keeps links that were shared under the old name working.
      {
        source: "/restructure",
        destination: "/productive-search",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
