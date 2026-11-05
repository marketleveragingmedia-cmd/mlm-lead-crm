/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/v19',
        destination: '/v19/index.html',
      },
    ];
  },
};

module.exports = nextConfig;
