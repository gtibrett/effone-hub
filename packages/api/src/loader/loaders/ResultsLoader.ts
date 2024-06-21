import {Response} from 'express';
import Results, {Result} from '../db/models/Results';
import handleEndpoint from '../app/EndpointHandler';
import {loadData} from '../app/DataLoader';
import Casters from '../app/TypeCasters';
import {PrimaryKeys} from '../types';

const primaryKey: PrimaryKeys<Result> = 'resultId';

const requiredNumberFields = ['resultId', 'raceId', 'driverId', 'grid', 'positionOrder', 'points', 'laps', 'statusId'];
const nullableNumberFields = ['number', 'position', 'milliseconds', 'fastestLap', 'rank', 'teamId'];
const nullableStringFields = ['time', 'fastestLapTime', 'fastestLapSpeed'];

const load = () => (
	loadData<Result>('results.csv', ({constructorId, ...row}) => {
		const mappedRow = {...row, teamId: constructorId};
		
		requiredNumberFields.forEach(k => {
			mappedRow[k] = Casters.toNumber(mappedRow[k]);
		});
		
		nullableNumberFields.forEach(k => {
			mappedRow[k] = Casters.toNumber(mappedRow[k], true);
		});
		
		nullableStringFields.forEach(k => {
			mappedRow[k] = Casters.toString(mappedRow[k], true);
		});
		
		return mappedRow;
	})
);

export default function ResultsLoader(res: Response | false = false) {
	return handleEndpoint<Result>(res, load, Results, primaryKey);
}