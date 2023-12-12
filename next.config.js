/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [],
      bodySizeLimit: "500kb",
    },
  },
};

module.exports = nextConfig;
