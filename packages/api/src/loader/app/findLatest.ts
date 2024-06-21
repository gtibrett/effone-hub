import {Model, ModelStatic, Transaction} from 'sequelize';
import {PrimaryKeys} from '../types';

export default async function findLatest<T extends Model>(connection: ModelStatic<T>, primaryKey: PrimaryKeys<T>, transaction?: Transaction): Promise<T | null> {
	if (!Array.isArray(primaryKey)) {
		primaryKey = [primaryKey];
	}
	
	const orderBy: [string, string][] = primaryKey.map(k => [k as string, 'DESC']);
	
	return connection.findOne({
		order: orderBy,
		transaction
	});
}