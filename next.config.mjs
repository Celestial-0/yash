import svgr from "@svgr/webpack";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // Remove the default SVG rule if it exists
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.test?.test?.(".svg")) {
        return { ...rule, exclude: /\.svg$/i };
      }
      return rule;
    });

    // Add new rules to properly handle SVG files
    config.module.rules.push(
      // Handle SVGs imported with ?url as normal image files
      {
        test: /\.svg$/i,
        resourceQuery: /url/, // Enables `import icon from './icon.svg?url'`
        type: "asset/resource",
      },
      // Convert other SVG imports into React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // Excludes `?url`
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true, // Treat as an icon component
              svgo: false, // Disable SVGO optimizations
            },
          },
        ],
      }
    );

    return config;
  },
};

export default nextConfig;
