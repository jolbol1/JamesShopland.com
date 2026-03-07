import createMDX from "@next/mdx"
import bundleAnalyzer from "@next/bundle-analyzer"

import { mdxOptions } from "./lib/mdx-options.mjs"

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: mdxOptions,
})

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

const ContentSecurityPolicy = `
  default-src 'self' *.jamesshopland.com;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app;
  style-src 'self' 'unsafe-inline' giscus.app;
  img-src * blob: data: i.ytimg.com;
  media-src 'none';
  connect-src *;
  font-src 'self';
  frame-src giscus.app 'self' https://www.strava.com/ youtube.com www.youtube.com youtu.be youtube-nocookie.com www.youtube-nocookie.com;
`

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
]

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
}

const plugins = [withMDX, withBundleAnalyzer]

export default plugins.reduce((config, plugin) => plugin(config), nextConfig)
