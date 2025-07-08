/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://openfileapp.com/:path*',
        permanent: true,
        statusCode: 301,
      },
    ];
  },
}

module.exports = nextConfig