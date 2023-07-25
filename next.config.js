/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/auth/:page*',
        destination: 'http://auth.default.svc.cluster.local:5000/:page*'
      }
    ]
  },
}
