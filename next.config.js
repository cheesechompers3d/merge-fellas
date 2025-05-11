/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['imgs.crazygames.com'], // 如果还需要支持外部图片
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    })
    return config
  },
}

module.exports = nextConfig 