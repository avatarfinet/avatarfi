/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ENV: process.env.ENV,
  },
}

module.exports = nextConfig
