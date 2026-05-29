import type {} from 'postgraphile';
import {PostGraphileAmberPreset} from 'postgraphile/presets/amber';
import {makePgService} from 'postgraphile/adaptors/pg';
import {PgSimplifyInflectionPreset} from '@graphile/simplify-inflection';
import F1dbSmartTags from './src/api/postgraphile/F1dbSmartTags';
import WikipediaBioPlugin from './src/api/postgraphile/wikipedia/WikipediaBioPlugin';

const POSTGRES_URL    = process.env.POSTGRES_URL;
const POSTGRES_SCHEMA = process.env.POSTGRES_SCHEMA ?? 'f1db,app';

if (!POSTGRES_URL) {
	throw new Error('POSTGRES_URL is required');
}

const schemas = POSTGRES_SCHEMA.split(',').map(s => s.trim()).filter(Boolean);

// Surface single-column `id` PKs as GraphQL `id` (undo core's id→rowId rename,
// which only existed to avoid the now-removed Node `id` collision). Must live
// in a plugin — preset-level `inflection` is not merged.
//
// `race` is EXCLUDED: its PK is a synthetic int; Race is identified by the
// (year, round) compound — it keeps `rowId: Int!` and is cache-keyed on
// year+round (Apollo typePolicies). Every other single-id-PK table remaps.
const ID_REMAP_EXCLUDE = new Set(['race']);

const IdRemapPlugin: GraphileConfig.Plugin = {
	name: 'IdRemapPlugin',
	version: '1.0.0',
	inflection: {
		replace: {
			_attributeName(previous, _options, details) {
				const name = previous!(details as any);
				const {codec, attributeName} = details as any;
				if (!details.skipRowId && name === 'row_id' && !ID_REMAP_EXCLUDE.has(codec?.name)) {
					const attribute = codec.attributes[attributeName];
					const baseName = attribute?.extensions?.tags?.name || attributeName;
					if (String(baseName).toLowerCase() === 'id' && !codec.isAnonymous) {
						return 'id';
					}
				}
				return name;
			}
		}
	}
};

const preset: GraphileConfig.Preset = {
	extends: [PostGraphileAmberPreset, PgSimplifyInflectionPreset],
	plugins: [F1dbSmartTags, WikipediaBioPlugin, IdRemapPlugin],
	// Drop the Relay Node interface entirely (app never uses nodeId/node(id:)).
	disablePlugins: ['NodePlugin', 'NodeAccessorPlugin', 'AddNodeInterfaceToSuitableTypesPlugin'],
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
		graphiql:           process.env.ENABLE_GRAPHIQL === 'true',
		graphiqlPath:       '/api/graphiql',
		graphiqlStaticPath: '/api/ruru-static/',
		watch:              process.env.NODE_ENV !== 'production'
	},
	schema: {
		exportSchemaSDLPath: process.env.NODE_ENV === 'production' ? undefined : './src/schema.graphql',
		defaultBehavior: '-connection +list',
		pgOmitListSuffix: true
	}
};

export default preset;
