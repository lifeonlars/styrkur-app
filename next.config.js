/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Improve HMR and development experience
  experimental: {
    // Better CSS handling in development
    optimizeCss: false,
  },
  // Disable aggressive caching in development
  ...(process.env.NODE_ENV === 'development' && {
    webpack: (config, { dev, isServer }) => {
      if (dev) {
        // Disable persistent caching in development
        config.cache = false;
        
        // Improve CSS hot reloading
        config.optimization = {
          ...config.optimization,
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              default: {
                minChunks: 1,
                priority: -20,
                reuseExistingChunk: true,
              },
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                priority: -10,
                chunks: 'all',
              },
            },
          },
        };
      }
      return config;
    },
  }),
}

module.exports = nextConfig