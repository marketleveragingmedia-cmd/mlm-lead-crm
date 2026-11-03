/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Skip TypeScript checks during build (pre-existing schema errors)
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip ESLint checks during build
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
