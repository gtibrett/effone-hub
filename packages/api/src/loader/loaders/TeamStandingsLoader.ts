import {Response} from 'express';
import TeamStandings, {TeamStanding} from '../db/models/TeamStandings';
import handleEndpoint from '../app/EndpointHandler';
import {loadData} from '../app/DataLoader';
import Casters from '../app/TypeCasters';
import {PrimaryKeys} from '../types';

const primaryKey: PrimaryKeys<TeamStanding> = 'constructorStandingsId';

const load = () => (
	loadData<TeamStanding>('constructor_standings.csv', ({constructorId, ...row}) => {
		const mappedRow = {...row};
		['constructorStandingsId', 'raceId', 'points', 'wins'].forEach(k => {
			mappedRow[k] = Casters.toNumber(row[k]);
		});
		
		mappedRow.teamId       = Casters.toNumber(constructorId);
		mappedRow.position     = Casters.toNumber(row.position, true);
		mappedRow.positionText = Casters.toString(row.positionText, true);
		
		return mappedRow;
	})
);

export default function TeamStandingsLoader(res: Response | false = false) {
	return handleEndpoint<TeamStanding>(res, load, TeamStandings, primaryKey);
}