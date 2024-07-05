export type AppConfig = {
	EFFONE_MODE?: 'dev' | 'production';
	ENABLE_GRAPHIQL?: boolean;
	
	POSTGRES_URL?: string;
	POSTGRES_USER?: string;
	POSTGRES_PASSWORD?: string;
	POSTGRES_HOST?: string;
	POSTGRES_PORT?: string;
	POSTGRES_DATABASE?: string;
	POSTGRES_SCHEMA?: string;
	POSTGRES_SSL_MODE?: string;
}