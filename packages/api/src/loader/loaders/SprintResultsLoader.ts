import {Response} from 'express';
import SprintResults, {SprintResult} from '../db/models/SprintResults';
import handleEndpoint from '../app/EndpointHandler';
import {loadData} from '../app/DataLoader';
import Casters from '../app/TypeCasters';
import {PrimaryKeys} from '../types';

const primaryKey: PrimaryKeys<SprintResult> = 'sprintResultId';

const requiredNumberFields = ['sprintResultId', 'raceId', 'driverId', 'teamId', 'grid', 'positionOrder', 'points', 'laps', 'statusId'];
const nullableNumberFields = ['number', 'position', 'milliseconds', 'fastestLap', 'teamId'];
const nullableStringFields = ['time', 'fastestLapTime'];

const load = () => (
	loadData<SprintResult>('sprint_results.csv', (data) => {
		const {resultId, constructorId, ...row} = data;
		const mappedRow                         = {...row, sprintResultId: resultId, teamId: constructorId};
		
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

export default function SprintResultsLoader(res: Response | false = false) {
	return handleEndpoint<SprintResult>(res, load, SprintResults, primaryKey);
}