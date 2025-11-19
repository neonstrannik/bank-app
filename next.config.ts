/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ⚠️ Warning: This disables ESLint completely during builds
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
