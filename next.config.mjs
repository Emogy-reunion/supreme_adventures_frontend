/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		// add your real production domains for images
		domains: ['www.supremeadventures.co.ke'],
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://www.supremeadventures.co.ke/api/:path*', // backend on same domain
			},
		];
	},
};

export default nextConfig;
