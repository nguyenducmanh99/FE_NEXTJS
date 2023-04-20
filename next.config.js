/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = nextConfig;
