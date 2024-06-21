import {Response} from 'express';
import Races, {Race} from '../db/models/Races';
import handleEndpoint from '../app/EndpointHandler';
import {loadData} from '../app/DataLoader';
import Casters from '../app/TypeCasters';
import {PrimaryKeys} from '../types';

const primaryKey: PrimaryKeys<Race> = 'raceId';

const load = () => (
	loadData<Race>('races.csv', row => {
		const nullableStringFields = ['time', 'url', 'fp1_date', 'fp1_time', 'fp2_date', 'fp2_time', 'fp3_date', 'fp3_time', 'quali_date', 'quali_time', 'sprint_date', 'sprint_time'];
		
		const mappedRow = {
			...row,
			raceId:    Casters.toNumber(row.raceId),
			year:      Casters.toNumber(row.year),
			round:     Casters.toNumber(row.round),
			circuitId: Casters.toNumber(row.circuitId)
			
		};
		
		nullableStringFields.forEach(k => {
			mappedRow[k] = Casters.toString(row[k], true);
		});
		
		return mappedRow;
	})
);

export default function RacesLoader(res: Response | false = false) {
	return handleEndpoint<Race>(res, load, Races, primaryKey);
}