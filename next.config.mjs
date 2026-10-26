/** @type {import('next').NextConfig} */
const nextConfig = {
  // "last updated" on /contact: when this build ran.
  env: { BUILD_TIME: new Date().toISOString() },
};

export default nextConfig;
