/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf|hdr|exr)$/,
      type: 'asset/resource',
    })
    return config
  },
  // Suppress known three.js punycode deprecation warning
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

module.exports = nextConfig
