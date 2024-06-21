import {Response} from 'express';
import {loadData} from '../app/DataLoader';
import handleEndpoint from '../app/EndpointHandler';
import Casters from '../app/TypeCasters';
import LapTimes, {LapTime} from '../db/models/LapTimes';
import {ModelLikeRow, PrimaryKeys} from '../types';

const primaryKey: PrimaryKeys<LapTime> = ['raceId', 'driverId', 'lap'];

const filterFactory = (latest: LapTime) => {
	return (row: ModelLikeRow<LapTime>) => row.raceId > latest.raceId;
};

const load = () => (
	loadData<LapTime>('lap_times.csv', row => ({
		...row,
		raceId:       Casters.toNumber(row.raceId),
		driverId:     Casters.toNumber(row.driverId),
		lap:          Casters.toNumber(row.lap),
		position:     Casters.toNumber(row.position, true),
		time:         Casters.toNumber(row.time, true),
		milliseconds: Casters.toNumber(row.milliseconds, true)
	}))
);

export default function LapTimesLoader(res: Response | false = false) {
	return handleEndpoint<LapTime>(res, load, LapTimes, primaryKey, filterFactory);
}