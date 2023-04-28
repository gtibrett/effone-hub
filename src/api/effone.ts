import {Circuit} from '@gtibrett/effone-hub-api';

const data = require(`./circuits.json`);

export const getCircuitDescription = (circuitId: Circuit['circuitId']): string | undefined => {
	if (!circuitId) {
		return undefined;
	}
	
	return data[circuitId];
};