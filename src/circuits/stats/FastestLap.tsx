import {LapTime} from '@gtibrett/effone-hub-graph-api';
import {getTimeStringFromDate} from '../../helpers';
import {CircuitDataProps} from '../useCircuitByRef';
import StatCard from './StatCard';

type FastLap = {
	driverId: LapTime['driverId'];
	milliseconds: number;
}

export default function FastestLap({data, loading}: CircuitDataProps) {
	if (!data || loading) {
		return null;
	}
	
	const fastestLaps: FastLap[] = data.circuit.history
	                                   .filter(r => r.fastestLaps.length)
	                                   .map(r => r.fastestLaps[0] || {})
	                                   .map(({milliseconds = Number.POSITIVE_INFINITY, driverId}) => ({driverId, milliseconds}));
	const {driverId, milliseconds} = fastestLaps.reduce((a, b) => b.milliseconds < a.milliseconds ? b : a);
	
	return <StatCard driverId={driverId} label={`Fastest Lap: ${getTimeStringFromDate(new Date(milliseconds))}`}/>;
}