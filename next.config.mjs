const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  // unoptimized images necessary for static build
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/personal-website-2024' : '',
  assetPrefix: isProd ? '/personal-website-2024' : '',  
  trailingSlash: true,
};

export default nextConfig;
