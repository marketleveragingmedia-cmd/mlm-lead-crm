/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/cash-flow-injection-masterclass',
        destination: '/cash-flow-injection-masterclass.html',
      },
    ];
  },
}

module.exports = nextConfig
