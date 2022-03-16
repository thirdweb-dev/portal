/** @type {import('next').NextConfig} */
// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
// content security headers things
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  // {
  //   key: "Content-Security-Policy",
  //   value: `default-src * 'self' 'unsafe-eval' localhost:* thirdweb.com *.thirdweb.com *.vercel.app *.ingest.sentry.io vitals.vercel-insights.com *.g.alchemy.com rpc.ftm.tools api.avax.network https:; style-src 'self' 'unsafe-eval' 'unsafe-inline' rsms.me fonts.googleapis.com; object-src 'none'; font-src rsms.me *.gstatic.com; base-uri 'none'; connect-src *; img-src * blob: data:;`,
  // },
];

const moduleExports = {
  reactStrictMode: true,
  outputFileTracing: false,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/learn/modules/:match*",
        destination: "/contracts/:match*",
        permanent: true,
      },
      {
        source: "/learn/recipes/:match*",
        destination: "/guides",
        permanent: true,
      },
      {
        source: "/guides/tag/bundle-collection",
        destination: "/guides/tag/edition",
        permanent: true,
      },
      {
        source: "/guides/tag/bundle-drop",
        destination: "/guides/tag/edition-drop",
        permanent: true,
      },
      {
        source: "/guides/bundle-collection",
        destination: "/guides/edition",
        permanent: true,
      },
      {
        source: "/guides/bundle-drop",
        destination: "/guides/edition-drop",
        permanent: true,
      },
      {
        source: "/guides/splits",
        destination: "/guides/split",
        permanent: true,
      },
      {
        source: "/guides/connect-wallet",
        destination: "/guides/add-connectwallet-to-your-website",
        permanent: true,
      },
      {
        source: "/guides/create-a-drop-with-thirdweb-dashboard",
        destination: "/guides/release-an-nft-drop-with-no-code",
        permanent: true,
      },
      {
        source: "/learn/connect-to-blockchain",
        destination: "/learn-thirdweb/connect-to-blockchain",
        permanent: true,
      },
      {
        source: "/learn/projects",
        destination: "/learn-thirdweb/projects",
        permanent: true,
      },
      {
        source: "/learn",
        destination: "/learn-thirdweb",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/learn-thirdweb",
        destination: "/learn-thirdweb/index",
      },
      {
        source: "/contracts",
        destination: "/contracts/index",
      },
      {
        source: "/dashboard",
        destination: "/dashboard/index",
      },
    ];
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      child_process: false,
      crypto: false,
      os: false,
      tty: false,
      worker_threads: false,
      process: false,
    };
    return config;
  },
  images: {
    domains: ["thirdweb.com", "portal.thirdweb.com", "github.com"],
  },
};

module.exports = moduleExports;
