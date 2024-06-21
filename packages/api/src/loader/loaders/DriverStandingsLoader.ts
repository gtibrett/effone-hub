import {Response} from 'express';
import DriverStandings, {DriverStanding} from '../db/models/DriverStandings';
import handleEndpoint from '../app/EndpointHandler';
import {loadData} from '../app/DataLoader';
import Casters from '../app/TypeCasters';
import {PrimaryKeys} from '../types';

const primaryKey: PrimaryKeys<DriverStanding> = 'driverStandingsId';

const load = () => (
	loadData<DriverStanding>('driver_standings.csv', row => {
		const mappedRow = {...row};
		['driverStandingsId', 'raceId', 'driverId', 'points', 'wins'].forEach(k => {
			mappedRow[k] = Casters.toNumber(row[k]);
		});
		
		mappedRow.position     = Casters.toNumber(row.position, true);
		mappedRow.positionText = Casters.toString(row.positionText, true);
		
		return mappedRow;
	})
);

export default function DriverStandingsLoader(res: Response | false = false) {
	return handleEndpoint<DriverStanding>(res, load, DriverStandings, primaryKey);
}