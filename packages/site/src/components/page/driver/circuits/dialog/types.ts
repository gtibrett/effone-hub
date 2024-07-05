import {Circuit, Driver} from '@/gql/graphql';

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