import { makePreset } from './preset.js';

const POSTGRES_URL = process.env.POSTGRES_URL;
const POSTGRES_SCHEMA = process.env.POSTGRES_SCHEMA ?? 'f1db,app';

if (!POSTGRES_URL) {
	throw new Error('POSTGRES_URL is required');
}

// Env-driven preset for the standalone server (dev/devex + schema emission).
// The preset itself lives in preset.ts so the site's in-process executor can
// build the identical schema without reading this package's env.
const preset = makePreset({
	connectionString: POSTGRES_URL,
	schemas: POSTGRES_SCHEMA,
	graphiql: process.env.ENABLE_GRAPHIQL === 'true',
	// Emit SDL for codegen consumption (committed in this package; site
	// codegen reads it). Skipped in production — disk is ephemeral there.
	exportSchemaSDLPath: process.env.NODE_ENV === 'production' ? undefined : './schema.graphql'
});

export default preset;
