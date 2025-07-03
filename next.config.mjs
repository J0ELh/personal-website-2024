/**
 * next.config.mjs
 * Serving from the root of your custom domain:
 */
const nextConfig = {
  output: "export",

  // NO basePath or assetPrefix on your custom-domain build:
  basePath: "",
  assetPrefix: "",
  trailingSlash: true,
};

export default nextConfig;
