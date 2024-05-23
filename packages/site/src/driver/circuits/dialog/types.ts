import {Circuit, Driver} from '@gtibrett/effone-hub-graph-api';

export type CircuitData = Pick<Circuit,
	'circuitId' |
	'circuitRef' |
	'name' |
	'races' |
	'lat' |
	'lng'
>;


export type CircuitDialogData = {
	circuit: CircuitData
	driver: Driver;
}