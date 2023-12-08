/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdnetphoto.appphotocard.com'],
  },
  trailingSlash: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: 'https://old.fanplus.co.kr/:path*',
        },
      ],
    };
  },
};

module.exports = nextConfig;
