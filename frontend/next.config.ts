import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  // Опции для сборки
  typescript: {
    // Игнорируем ошибки TypeScript для сборки (на время разработки)
    ignoreBuildErrors: true,
  },
  eslint: {
    // Игнорируем ошибки ESLint для сборки (на время разработки)
    ignoreDuringBuilds: true,
  },

  // Для API прокси (если нужно)
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;
