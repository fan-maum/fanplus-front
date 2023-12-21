/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdnetphoto.appphotocard.com'],
  },
  trailingSlash: true,

  publicRuntimeConfig: {
    // ! Deprecated feature. 추후 NEXT에서 미지원할 수 있으므로 version-up시 고려해야 함.
    // * Available both on server and client
    KAKAO_JS_KEY: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
    CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
  },

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
