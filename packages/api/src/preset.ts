import type {} from 'postgraphile';
import { PostGraphileAmberPreset } from 'postgraphile/presets/amber';
import { makePgService } from 'postgraphile/adaptors/pg';
import { PgSimplifyInflectionPreset } from '@graphile/simplify-inflection';
import F1dbSmartTags from './postgraphile/F1dbSmartTags.js';
import WikipediaBioPlugin from './postgraphile/wikipedia/WikipediaBioPlugin.js';

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
				const { codec, attributeName } = details as any;
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

export type PresetOptions = {
	connectionString: string;
	/** Comma-separated or pre-split schema list; defaults to f1db,app. */
	schemas?: string | string[];
	/** Expose GraphiQL (server only; ignored for in-process execution). */
	graphiql?: boolean;
	/** Emit schema SDL at build (server/dev only — disk is ephemeral in prod). */
	exportSchemaSDLPath?: string;
};

/**
 * Shared PostGraphile preset. Consumed two ways:
 * - `graphile.config.ts` (env-driven) for the standalone dev/devex server,
 *   which also emits schema.graphql for the site's codegen.
 * - the site's in-process executor (`packages/site/src/app/lib/graphql-executor.ts`),
 *   which executes the same schema via grafast without an HTTP server.
 * Pure function of its options — no env reads here.
 */
export function makePreset(options: PresetOptions): GraphileConfig.Preset {
	const { connectionString, schemas = 'f1db,app', graphiql = false, exportSchemaSDLPath } = options;
	const schemaList = (Array.isArray(schemas) ? schemas : schemas.split(','))
		.map(s => s.trim())
		.filter(Boolean);

	return {
		extends: [PostGraphileAmberPreset, PgSimplifyInflectionPreset],
		plugins: [F1dbSmartTags, WikipediaBioPlugin, IdRemapPlugin],
		disablePlugins: [
			// Relay Node interface — app never uses nodeId/node(id:).
			'NodePlugin',
			'NodeAccessorPlugin',
			'AddNodeInterfaceToSuitableTypesPlugin',
			// Read-only public data API. Without these the Amber preset auto-exposes
			// 165 create + update/delete mutations on an UNAUTHENTICATED endpoint
			// against the full-privilege pg role. The app only reads; ingest writes
			// go through raw pg in CI, never GraphQL. (Plugin names verified against
			// graphile-build-pg@5.0.2.)
			'PgMutationCreatePlugin',
			'PgMutationUpdateDeletePlugin',
			'PgMutationPayloadEdgePlugin'
		],
		pgServices: [
			makePgService({
				connectionString,
				schemas: schemaList
			})
		],
		grafast: {
			explain: false
		},
		grafserv: {
			graphqlPath: '/graphql',
			eventStreamPath: '/graphql/stream',
			graphiql,
			graphiqlPath: '/graphiql',
			graphiqlStaticPath: '/ruru-static/',
			// DB schema is static during a dev session; the watcher holds a LISTEN
			// connection + rebuild machinery we don't need. Run codegen manually.
			watch: false
		},
		schema: {
			exportSchemaSDLPath,
			defaultBehavior: '-connection +list',
			pgOmitListSuffix: true
		}
	};
}
