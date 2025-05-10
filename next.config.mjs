/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  devIndicators: {
    buildActivity: false, // <-- THIS disables the "N" DevTools
  },
  experimental: {
    enableNextDevTools: false, // <-- THIS disables the new Next.js DevTools
  },
  devIndicators: false, // 🔧 Disable Dev Tools UI
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

export default nextConfig;
