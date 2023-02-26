/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    ENV: process.env.ENV,
  },
}

module.exports = nextConfig
