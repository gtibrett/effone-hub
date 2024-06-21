import compression from 'compression';
import cors, {CorsOptions} from 'cors';
import express, {Express} from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import {postgraphile, PostGraphileOptions} from 'postgraphile';
import options from './postgraphile/Options';

export type AppConfig = {
	EFFONE_MODE?: 'dev' | 'production';
	EFFONE_ORIGIN?: string;
	DB_USER?: string;
	DB_PASSWORD?: string;
	DB_HOST?: string;
	DB_PORT?: string;
	DB_DATABASE?: string;
	DB_SCHEMA?: string;
	DB_SSL_MODE?: string;
	DB_SSL_ROOT_CERT_PATH?: string;
}

const corsMiddleware = (origin?: string) => {
	const corsOptions: CorsOptions = {
		methods: ['GET', 'HEAD', 'OPTIONS']
	};
	if (origin) {
		corsOptions.origin = origin;
	}
	
	return cors(corsOptions);
};

const getBaseApp = (config: AppConfig): Express => {
	const {EFFONE_ORIGIN} = config;
	const app             = express();
	
	app.use(corsMiddleware(EFFONE_ORIGIN));
	app.use(morgan('combined'));
	app.use(compression());
	app.use(helmet());
	
	return app;
};

const appFactory = (config: AppConfig, extraOptions: PostGraphileOptions = {}) => {
	const app = getBaseApp(config);
	
	const {
		      DB_USER,
		      DB_PASSWORD,
		      DB_HOST,
		      DB_PORT,
		      DB_DATABASE,
		      DB_SCHEMA,
		      DB_SSL_MODE           = '',
		      DB_SSL_ROOT_CERT_PATH = ''
	      } = config;
	
	if (!DB_DATABASE || !DB_USER || !DB_PASSWORD) {
		throw new Error('Database info missing');
	}
	
	const dbParams: string[] = [];
	if (DB_SSL_MODE) {
		dbParams.push(`sslmode=${DB_SSL_MODE}`);
	}
	
	if (DB_SSL_ROOT_CERT_PATH) {
		dbParams.push(`sslrootcert=${DB_SSL_ROOT_CERT_PATH}`);
	}
	
	const dbUrl                  = `postgres://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?${dbParams.join('&')}`;
	const postgraphileMiddleware = postgraphile(dbUrl, DB_SCHEMA, {...(options as PostGraphileOptions), ...extraOptions});
	app.use(postgraphileMiddleware);
	
	return app;
};

export default appFactory;