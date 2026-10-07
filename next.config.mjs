/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The redesign was previewed at /v2 before replacing the main page. Keep
  // links already shared with the client working (query string is kept).
  async redirects() {
    return [{ source: "/v2", destination: "/", permanent: false }];
  },
};

export default nextConfig;
