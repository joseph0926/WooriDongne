/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // TODO: 임시 이미지 - 이후 삭제
      {
        hostname: 'assets.aceternity.com',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
