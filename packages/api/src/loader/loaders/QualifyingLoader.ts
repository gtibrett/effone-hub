import {Response} from 'express';
import Qualifying, {Qualify} from '../db/models/Qualifying';
import handleEndpoint from '../app/EndpointHandler';
import {loadData} from '../app/DataLoader';
import Casters from '../app/TypeCasters';
import {PrimaryKeys} from '../types';

const primaryKey: PrimaryKeys<Qualify> = 'qualifyId';

const load = () => (
	loadData<Qualify>('qualifying.csv', row => ({
		...row,
		qualifyId: Casters.toNumber(row.qualifyId),
		raceId:    Casters.toNumber(row.raceId),
		driverId:  Casters.toNumber(row.driverId),
		teamId:    Casters.toNumber(row.teamId, true),
		number:    Casters.toNumber(row.number, true),
		position:  Casters.toNumber(row.position, true),
		q1:        Casters.toString(row.q1, true),
		q2:        Casters.toString(row.q2, true),
		q3:        Casters.toString(row.q3, true)
	}))
);

export default function QualifysLoader(res: Response | false = false) {
	return handleEndpoint<Qualify>(res, load, Qualifying, primaryKey);
}