import type {} from 'postgraphile';
import {PostGraphileAmberPreset} from 'postgraphile/presets/amber';
import {makePgService} from 'postgraphile/adaptors/pg';
import {PgSimplifyInflectionPreset} from '@graphile/simplify-inflection';
import F1dbSmartTags from './src/api/postgraphile/F1dbSmartTags';

const POSTGRES_URL    = process.env.POSTGRES_URL;
const POSTGRES_SCHEMA = process.env.POSTGRES_SCHEMA ?? 'f1db,app';

if (!POSTGRES_URL) {
	throw new Error('POSTGRES_URL is required');
}

const schemas = POSTGRES_SCHEMA.split(',').map(s => s.trim()).filter(Boolean);

const preset: GraphileConfig.Preset = {
	extends: [PostGraphileAmberPreset, PgSimplifyInflectionPreset],
	plugins: [F1dbSmartTags],
	pgServices: [
		makePgService({
			connectionString: POSTGRES_URL,
			schemas
		})
	],
	grafast: {
		explain: process.env.NODE_ENV !== 'production'
	},
	grafserv: {
		graphqlPath: '/api/graphql',
		eventStreamPath: '/api/graphql/stream',
		graphiql:     process.env.ENABLE_GRAPHIQL === 'true',
		graphiqlPath: '/api/graphiql',
		watch:        process.env.NODE_ENV !== 'production'
	},
	schema: {
		exportSchemaSDLPath: process.env.NODE_ENV === 'production' ? undefined : './src/schema.graphql'
	}
};

export default preset;
