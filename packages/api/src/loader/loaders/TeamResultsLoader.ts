import {Response} from 'express';
import TeamResults, {TeamResult} from '../db/models/TeamResults';
import handleEndpoint from '../app/EndpointHandler';
import {loadData} from '../app/DataLoader';
import Casters from '../app/TypeCasters';
import {PrimaryKeys} from '../types';

const primaryKey: PrimaryKeys<TeamResult> = 'constructorResultsId';

const requiredNumberFields = ['constructorResultsId', 'raceId', 'teamId', 'points'];

const load = () => (
	loadData<TeamResult>('constructor_results.csv', ({constructorId, ...row}) => {
		const mappedRow = {
			...row,
			teamId: constructorId,
			status: Casters.toString(row.status, true)
		};
		
		requiredNumberFields.forEach(k => {
			mappedRow[k] = Casters.toNumber(mappedRow[k]);
		});
		
		return mappedRow;
	})
);

export default function TeamResultsLoader(res: Response | false = false) {
	return handleEndpoint<TeamResult>(res, load, TeamResults, primaryKey);
}