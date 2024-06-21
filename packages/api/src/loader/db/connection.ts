import fs from 'fs';
import path from 'path';
import {Sequelize} from 'sequelize';

if (!process.env.DB_DATABASE || !process.env.DB_USER || !process.env.DB_PASSWORD) {
	throw new Error('Database info missing');
}

const extraOptions = {
	ssl:            true,
	dialectOptions: {
		ssl: {
			rejectUnauthorized: false,
			ca:                 process.env.DB_SSL_ROOT_CERT_PATH ? fs.readFileSync(path.resolve(process.env.DB_SSL_ROOT_CERT_PATH)).toString() : undefined
		}
	}
};

const connection = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
	dialect: 'postgres',
	host:    process.env.DB_HOST,
	port:    Number(process.env.DB_PORT),
	schema:  process.env.DB_SCHEMA,
	define:  {
		timestamps:      false,
		freezeTableName: true
	},
	logging: false,
	...(process.env.DB_USE_SSL === 'true' ? extraOptions : {})
});


export default connection;