import {Circuit} from '@gtibrett/effone-hub-api';

const data = require(`./circuits.json`);

export default function getCircuitDescription(circuitId: Circuit['circuitId']): string | undefined {
	return data[circuitId];
}