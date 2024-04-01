import {getTimeStringFromDate} from '@effonehub/helpers';
import {StatCard} from '@effonehub/ui-components';
import {CircuitDataProps} from '../useCircuitByRef';

export default function FastestLap({data, loading}: CircuitDataProps) {
	const fastestLaps: Map<number, number> = new Map<number, number>(
		(data?.circuit.history || [])
			.filter(r => r.fastestLaps.length)
			.map(r => r.fastestLaps[0] || {})
			.map(({milliseconds = Number.POSITIVE_INFINITY, driverId}) => [driverId, milliseconds])
	);
	
	return <StatCard data={fastestLaps} label="Fastest Lap" format={(data) => getTimeStringFromDate(new Date(data.value))} loading={loading} size="small"/>;
}