const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'images.unsplash.com'],
  },
};

module.exports = withNextIntl(nextConfig);