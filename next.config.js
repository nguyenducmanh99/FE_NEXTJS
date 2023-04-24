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
  // pageExtensions: ["tsx"],
  // async rewrites() {
  //  return [

  //    {
  //      source: "/api/:path*",
  //      destination: "http://localhost:6060/api/v1/",
  //    },
  //  ];
  // },
};

module.exports = nextConfig;
