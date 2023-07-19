/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdnetphoto.appphotocard.com'],
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: `http://old.fanplus.co.kr/:path*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
