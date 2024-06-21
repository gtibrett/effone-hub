import {Response} from 'express';
import Seasons, {Season} from '../db/models/Seasons';
import handleEndpoint from '../app/EndpointHandler';
import {loadData} from '../app/DataLoader';
import Casters from '../app/TypeCasters';
import {PrimaryKeys} from '../types';

const primaryKey: PrimaryKeys<Season> = 'year';

const load = () => (
	loadData<Season>('seasons.csv', row => ({
		...row,
		year: Casters.toNumber(row.year)
	}))
);

export default function SeasonsLoader(res: Response | false = false) {
	return handleEndpoint<Season>(res, load, Seasons, primaryKey);
}