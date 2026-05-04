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
