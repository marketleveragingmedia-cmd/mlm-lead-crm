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
  async headers() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'foundation-for-success.cashflowvisionaries.com',
          },
        ],
        headers: [
          {
            key: 'x-custom-domain',
            value: 'foundation-for-success',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
