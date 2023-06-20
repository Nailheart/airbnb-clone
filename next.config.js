/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      }, {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      }, {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      }
    ]
  }
}

module.exports = nextConfig;
