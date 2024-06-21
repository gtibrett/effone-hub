import {Response} from 'express';
import {loadData} from '../app/DataLoader';
import handleEndpoint from '../app/EndpointHandler';
import Casters from '../app/TypeCasters';
import PitStops, {PitStop} from '../db/models/PitStops';
import {ModelLikeRow, PrimaryKeys} from '../types';

const primaryKey: PrimaryKeys<PitStop> = ['raceId', 'driverId', 'stop'];

const filterFactory = (latest: PitStop) => {
	return (row: ModelLikeRow<PitStop>) => row.raceId > latest.raceId;
};

const load = () => (
	loadData<PitStop>('pit_stops.csv', row => ({
		...row,
		raceId:       Casters.toNumber(row.raceId),
		driverId:     Casters.toNumber(row.driverId),
		stop:         Casters.toNumber(row.stop),
		lap:          Casters.toNumber(row.lap),
		duration:     Casters.toString(row.time, true),
		milliseconds: Casters.toNumber(row.milliseconds, true)
	}))
);

export default function PitStopsLoader(res: Response | false = false) {
	return handleEndpoint<PitStop>(res, load, PitStops, primaryKey, filterFactory);
}