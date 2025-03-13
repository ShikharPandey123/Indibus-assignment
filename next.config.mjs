/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["openweathermap.org", "newsapi.org"],
  },
  env: {
    NEXT_PUBLIC_OPENWEATHERMAP_API_KEY: process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY,
    NEXT_PUBLIC_NEWS_API_KEY: process.env.NEXT_PUBLIC_NEWS_API_KEY,
  },
};

export default nextConfig;
