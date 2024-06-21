import {parse} from 'csv';
import fs from 'fs';
import path from 'path';
import {Model} from 'sequelize';
import {ModelLikeRow, PrimaryKey, PrimaryKeys} from '../types';

export type DataLoader<T extends Model> = () => Promise<ModelLikeRow<T>[]>;

if (!process.env.DATA_PATH) {
	throw new Error('Missing DATA_PATH env var');
}

const dataPath = path.resolve(process.env.DATA_PATH);

export function loadData<T extends Model>(file: string, mapper: (row: any) => ModelLikeRow<T> = row => row) {
	return new Promise<ModelLikeRow<T>[]>(async (resolve, reject) => {
		const rows: ModelLikeRow<T>[] = [];
		
		const filePath = path.resolve(dataPath, file);
		
		fs.stat(filePath, (err) => {
			if (err) {
				reject(`'${file}' does not exist`);
				return;
			}
			
			fs.createReadStream(filePath)
			  .pipe(parse({delimiter: ',', columns: true}))
			  .on('data', (row: ModelLikeRow<T>) => rows.push(mapper(row)))
			  .on('end', function () {
				  resolve(rows);
			  })
			  .on('error', function (error) {
				  reject(error);
			  });
		});
	});
}

export async function filterData<T extends Model>(rows: ModelLikeRow<T>[], latest: T, primaryKey: PrimaryKeys<T>): Promise<ModelLikeRow<T>[]> {
	const pkArray: PrimaryKey<T>[] = (Array.isArray(primaryKey) ? primaryKey : [primaryKey]);
	
	return rows.filter(r => {
		let matches = 0;
		pkArray.forEach((k: PrimaryKey<T>)=> {
			if ((r[k] as T) <= latest[k]) {
				matches++;
			}
		})
		
		return (matches !== pkArray.length);
	});
}