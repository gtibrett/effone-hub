import {Response} from 'express';
import {Model, ModelStatic} from 'sequelize';
import {ModelLikeRow, PrimaryKeys} from '../types';
import {insertData, Stats} from './DataInserter';
import {DataLoader, filterData} from './DataLoader';
import findLatest from './findLatest';

export default function handleEndpoint<T extends Model>(
	res: Response | false,
	loader: DataLoader<T>,
	modelFactory: ModelStatic<T>,
	primaryKeys: PrimaryKeys<T>,
	filterFactory?: (latest: T) => ((row: ModelLikeRow<T>) => boolean)
) {
	const stats: Stats = {
		inserted: 0,
		read:     0,
		failed:   0
	};
	
	try {
		return loader()
			.then(async rows => {
				stats.read   = rows.length;
				const latest = await findLatest(modelFactory, primaryKeys);
				
				if (!latest) {
					return rows;
				} else if (filterFactory) {
					const filter = filterFactory(latest);
					return rows.filter(filter);
				} else {
					return filterData(rows, latest, primaryKeys);
				}
			})
			.then(async rowsToInsert => {
				const rowCount = rowsToInsert.length;
				stats.inserted = await insertData<T>(rowsToInsert, modelFactory);
				stats.failed   = rowCount - stats.inserted;
				
				res && res.json({status: 'success', ...stats});
				
				return stats;
			})
			.catch(error => {
				console.error(error);
				res && res.json({status: 'error', error, ...stats});
				
				return error;
			});
	} catch (error) {
		res && res.json({status: 'error', error, ...stats});
	}
}

