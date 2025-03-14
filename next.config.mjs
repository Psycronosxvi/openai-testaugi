/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'openweathermap.org', 'images.unsplash.com'],
  },
};

export default nextConfig;