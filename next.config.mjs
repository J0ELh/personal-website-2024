// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    // For GH Pages, you often want no built-in Next image optimization
    unoptimized: true,
  },
  // Ensure these match your GitHub repo name
  basePath: isProd ? '/personal-website-2024' : '',
  assetPrefix: isProd ? '/personal-website-2024/' : '',
  
  // This can help with serving index.html in subfolders
  trailingSlash: true,
};

export default nextConfig;
