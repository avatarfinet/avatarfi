/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = withPWA({
  reactStrictMode: false,
  env: {
    ENV: process.env.ENV,
  },
})
