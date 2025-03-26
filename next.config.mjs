const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/personal-website-2024' : '',
  assetPrefix: isProd ? '/personal-website-2024/' : '',
  trailingSlash: true,
};

export default nextConfig;
