const POSTGRAPHILE_EXTERNALS = [
	'postgraphile',
	'grafast',
	'graphile-build',
	'graphile-build-pg',
	'graphile-config',
	'@dataplan/pg',
	'@dataplan/json',
	'pg-sql2',
	'tamedevil',
	'@graphile/simplify-inflection',
	'pg'
];

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Cache Components (Next 16): explicit `use cache` opt-in for RSC data
	// fetches. Pages without `use cache` become dynamic by default. See
	// src/app/lib/cached-data.ts for the cached helpers and
	// src/pages/api/cron/ingest.ts for the corresponding `updateTag` calls.
	cacheComponents: true,
	serverExternalPackages: POSTGRAPHILE_EXTERNALS,
	webpack(config, {isServer}) {
		config.module.rules.push({
			test  : /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use   : ['@svgr/webpack']
		});

		config.module.rules.push({
			test   : /\.(graphql|gql)/,
			exclude: /node_modules/,
			loader : "graphql-tag/loader"
		});

		if (isServer) {
			config.externals = [...(config.externals || []), ({request}, cb) => {
				if (request && POSTGRAPHILE_EXTERNALS.some(p => request === p || request.startsWith(p + '/'))) {
					return cb(null, 'commonjs ' + request);
				}
				cb();
			}];
		}

		return config;
	}
};

export default nextConfig;
