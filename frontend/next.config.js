/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Force .page prefix on page files (ex. index.page.tsx) so generated files can be included in /pages directory
  // without Next.js throwing build errors
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};

module.exports = nextConfig;
