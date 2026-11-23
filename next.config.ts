import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    agentUpgrade: "security",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      // Send browsers whose *first* language preference is Indonesian to the
      // Indonesian copy, everyone else to English. Header matching keeps this
      // in the config — no proxy needed.
      //
      // Next wraps this value in ^...$ and compiles it with JavaScript RegExp,
      // which has no inline (?i) flag — hence the explicit character classes.
      {
        source: "/",
        has: [
          {
            type: "header",
            key: "accept-language",
            value: "[iI][dD](-[A-Za-z]{2})?([,;].*)?",
          },
        ],
        destination: "/id",
        permanent: false,
      },
      { source: "/", destination: "/en", permanent: false },
      // Old un-prefixed project links keep working.
      { source: "/projects/:slug", destination: "/en/projects/:slug", permanent: false },
    ];
  },
};

export default nextConfig;
