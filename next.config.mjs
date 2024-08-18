/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  // mention is lucia documentation to work
  serverExternalPackages: ["@node-rs/argon2"],
};

export default nextConfig;
