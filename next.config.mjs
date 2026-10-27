/** @type {import('next').NextConfig} */
const nextConfig = {
  // "last updated" on /contact: when this build ran.
  env: { BUILD_TIME: new Date().toISOString() },
  // "work" became "projects" (update 2).
  async redirects() {
    return [
      { source: "/work", destination: "/projects", permanent: true },
      { source: "/work/:slug", destination: "/projects/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
