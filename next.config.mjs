
const nextConfig = {
  reactStrictMode: true,
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
      {
        test: /\.svg$/i,
        resourceQuery: /url/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
              svgo: false,
            },
          },
        ],
      }
    );

    // Add rule for fonts
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
      generator: {
        filename: "fonts/[name].[hash][ext]",
      },
    });

    return config;
  },
};

export default nextConfig;
