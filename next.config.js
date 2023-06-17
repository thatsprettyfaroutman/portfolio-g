/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    })

    return config
  },
}

module.exports = nextConfig
