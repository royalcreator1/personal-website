/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow isolated previews/build checks alongside an existing development server.
  distDir: process.env.PORTFOLIO_DIST_DIR || '.next',
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig

