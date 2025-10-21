const CopyPlugin = require("copy-webpack-plugin")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

module.exports = withBundleAnalyzer(
  withMDX({
    reactStrictMode: true,
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    images: {
      domains: ["github.blog", "florstroy.ru"],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      formats: ["image/webp"],
      minimumCacheTTL: 60,
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    swcMinify: true,
    compiler: {
      styledComponents: true,
    },
    compress: true,
    i18n: {
      locales: ["ru"],
      defaultLocale: "ru",
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: "X-DNS-Prefetch-Control",
              value: "on",
            },
            {
              key: "X-Frame-Options",
              value: "SAMEORIGIN",
            },
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "Referrer-Policy",
              value: "origin-when-cross-origin",
            },
          ],
        },
      ]
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: {
          and: [/\.(js|ts)x?$/],
        },
        use: [{ loader: "@svgr/webpack" }, { loader: "url-loader" }],
      })

      return config
    },
  }),
)
