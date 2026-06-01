/** @type {import('next').NextConfig} */
const nextConfig = {
	// Cache Components (Next 16): explicit `use cache` opt-in for RSC data
	// fetches. Pages without `use cache` become dynamic by default. See
	// src/app/lib/cached-data.ts for the cached helpers and
	// src/pages/api/cron/revalidate.ts for the corresponding `updateTag` calls.
	cacheComponents: true,
	experimental: {
		// Use both build-container vCPUs on Vercel Hobby (default may pick 1).
		// Capped by container hardware — Pro Enhanced Build Machines raise this.
		cpus: 2,
		// Trade some compile speed for lower peak webpack heap in dev/build.
		webpackMemoryOptimizations: true
	},
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
