/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'cdn.builder.io',
				protocol: 'https',
			},
		],
	},
	rewrites: async () => {
		return [
			{
				source: '/api/v1/:path*',
				destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
			},
		];
	},
};

export default nextConfig;
