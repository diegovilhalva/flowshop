/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  }
};

export default nextConfig;
