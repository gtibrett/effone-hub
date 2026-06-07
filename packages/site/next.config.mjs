/** @type {import('next').NextConfig} */
const nextConfig = {
	cacheComponents: true,
	transpilePackages: ['@mui/x-charts'],
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack']
		});

		config.module.rules.push({
			test: /\.(graphql|gql)/,
			exclude: /node_modules/,
			loader: 'graphql-tag/loader'
		});

		return config;
	}
};

export default nextConfig;
