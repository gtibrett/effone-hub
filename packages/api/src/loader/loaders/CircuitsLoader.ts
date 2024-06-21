import {Response} from 'express';
import Circuits, {Circuit} from '../db/models/Circuits';
import handleEndpoint from '../app/EndpointHandler';
import {loadData} from '../app/DataLoader';
import Casters from '../app/TypeCasters';
import {PrimaryKeys} from '../types';

const primaryKey: PrimaryKeys<Circuit> = 'circuitId';

const load = () => (
	loadData<Circuit>('circuits.csv', row => ({
		...row,
		circuitId: Casters.toNumber(row.circuitId),
		lat:       Casters.toNumber(row.lat),
		lng:       Casters.toNumber(row.lng),
		alt:       Casters.toNumber(row.alt, true)
	}))
);

export default function CircuitsLoader(res: Response | false = false) {
	return handleEndpoint<Circuit>(res, load, Circuits, primaryKey);
}