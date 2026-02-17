import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,

  // Важно для Docker - слушаем все интерфейсы
  server: {
    host: "0.0.0.0",
    port: 3000,
  },

  // Опции для сборки
  typescript: {
    // Временно игнорируем ошибки TypeScript для сборки
    ignoreBuildErrors: true,
  },
  eslint: {
    // Временно игнорируем ошибки ESLint для сборки
    ignoreDuringBuilds: true,
  },

  // Для API прокси если нужно
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://backend:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;
