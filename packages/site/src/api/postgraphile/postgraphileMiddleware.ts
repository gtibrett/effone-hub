import {AppConfig} from '@/api/types';
import options from '@/api/postgraphile/Options';
import {postgraphile, PostGraphileOptions} from 'postgraphile';

const {
	      POSTGRES_URL,
	      POSTGRES_SCHEMA,
      } = process.env as AppConfig;

if (!POSTGRES_URL || !POSTGRES_SCHEMA) {
	throw new Error('Database info missing');
}

// POSTGRES_SCHEMA accepts a single name or comma-separated list.
// Multi-schema lets PostGraphile expose f1db (vendored) + app (our supplementary
// tables: lap_times, circuit_descriptions, team_colors, team_history) under
// one GraphQL endpoint with cross-schema relations.
const schemas = POSTGRES_SCHEMA.split(',').map(s => s.trim()).filter(Boolean);

const postgraphileMiddleware = postgraphile(POSTGRES_URL, schemas, {...(options as PostGraphileOptions)});

export default postgraphileMiddleware;