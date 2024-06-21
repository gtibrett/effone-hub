import {Response} from 'express';
import Teams, {Team} from '../db/models/Teams';
import handleEndpoint from '../app/EndpointHandler';
import {loadData} from '../app/DataLoader';
import Casters from '../app/TypeCasters';
import {PrimaryKeys} from '../types';

const primaryKey: PrimaryKeys<Team> = 'teamId';

const load = () => (
	loadData<Team>('constructors.csv', ({constructorId, ...row}) => ({
			...row,
			teamId: Casters.toNumber(constructorId)
		})
	)
);

export default function TeamsLoader(res: Response | false = false) {
	return handleEndpoint<Team>(res, load, Teams, primaryKey);
}