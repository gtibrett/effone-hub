import {Model, ModelStatic} from 'sequelize';
import connection from '../db/connection';
import {ModelLikeRow} from '../types';

const chunkSize = 500;

export type Stats = {
	read: number;
	inserted: number;
	failed?: number;
}

/**
 * insert only new records from passed in `rows`. `mapper` will create a model
 *
 * runs in a transaction
 *
 * @param rows
 * @param modelFactory
 */
export async function insertData<T extends Model>(rows: ModelLikeRow<T>[], modelFactory: ModelStatic<T>): Promise<number> {
	
	return new Promise(async (resolve, reject) => {
			const transaction = await connection.transaction();
			let inserted      = 0;
			
			try {
				while (rows.length) {
					const chunk = rows.splice(0, chunkSize);
					
					const results = await modelFactory.bulkCreate(chunk, {ignoreDuplicates: true, transaction});
					inserted      += results.length;
				}
				
				await transaction.commit();
				resolve(inserted);
			} catch (error) {
				await transaction.rollback();
				reject(error);
			}
		}
	);
}