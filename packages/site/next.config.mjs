/** @type {import('next').NextConfig} */
const nextConfig = {
	cacheComponents: true,
	// The api workspace package ships TS source (no build step); Next compiles
	// its preset for the in-process GraphQL executor.
	transpilePackages: ['@mui/x-charts', '@gtibrett/effone-hub-api'],
	// Keep the graphile/pg stack as runtime node_modules requires: grafast
	// enforces a process-wide singleton (thereCanBeOnlyOne), so a webpack-bundled
	// copy alongside the runtime one is a hard boot error.
	serverExternalPackages: ['postgraphile', 'pg', '@graphile/simplify-inflection', 'graphql'],
	webpack(config, { isServer }) {
		// serverExternalPackages does NOT apply to imports made from inside a
		// transpilePackages package (the api preset), so those get bundled and
		// instantiate a SECOND grafast. Externalize the whole graphile family at
		// the webpack layer for the server bundle instead.
		if (isServer) {
			const graphileFamily =
				/^(?:postgraphile|grafast|grafserv|graphile-config|graphile-build|graphile-build-pg|graphile-utils|pg-sql2|tamedevil|pg)(?:\/.*)?$|^@(?:graphile|dataplan)\/.*$/;
			config.externals.push(({ request }, callback) => {
				if (request && graphileFamily.test(request)) {
					return callback(null, `commonjs ${request}`);
				}
				callback();
			});
		}
		// The api package's TS source uses ESM-style `./x.js` specifiers for
		// sibling .ts files (tsx convention); let webpack resolve them.
		config.resolve.extensionAlias = {
			...config.resolve.extensionAlias,
			'.js': ['.ts', '.js']
		};
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
