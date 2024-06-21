import {Response} from 'express';
import Drivers, {Driver} from '../db/models/Drivers';
import handleEndpoint from '../app/EndpointHandler';
import {loadData} from '../app/DataLoader';
import Casters from '../app/TypeCasters';
import {PrimaryKeys} from '../types';

const primaryKey: PrimaryKeys<Driver> = 'driverId';

const load = () => (
	loadData<Driver>('drivers.csv', row => ({
		...row,
		driverId: Casters.toNumber(row.driverId),
		number:   Casters.toNumber(row.number, true),
		code:     Casters.toString(row.code, true)
	}))
);

export default function DriversLoader(res: Response | false = false) {
	return handleEndpoint<Driver>(res, load, Drivers, primaryKey);
}