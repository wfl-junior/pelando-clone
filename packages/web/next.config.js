/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.pelando.com.br", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
