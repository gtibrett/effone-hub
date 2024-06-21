import {Response} from 'express';
import Statuses, {Status} from '../db/models/Statuses';
import handleEndpoint from '../app/EndpointHandler';
import {loadData} from '../app/DataLoader';
import Casters from '../app/TypeCasters';
import {PrimaryKeys} from '../types';

const primaryKey: PrimaryKeys<Status> = 'statusId';

const load = () => (
	loadData<Status>('status.csv', row => ({
			...row,
			statusId: Casters.toNumber(row.statusId)
		})
	)
);

export default function StatusesLoader(res: Response | false = false) {
	return handleEndpoint<Status>(res, load, Statuses, primaryKey);
}