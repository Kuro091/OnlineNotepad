/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://zuyiohcxpuyezfuhatvo.supabase.co/:path*'
      },
    ]
  },
}

module.exports = nextConfig
