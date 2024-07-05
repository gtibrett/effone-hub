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

const postgraphileMiddleware = postgraphile(POSTGRES_URL, POSTGRES_SCHEMA, {...(options as PostGraphileOptions)});

export default postgraphileMiddleware;