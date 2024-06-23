

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_URL: process.env.API_URL,
  },
  images: {
    remotePatterns: [
      {
        hostname: "imagedelivery.net",
      },
    ],
  },
};

export default nextConfig;
