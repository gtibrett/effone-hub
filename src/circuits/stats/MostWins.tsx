import {StatCard} from '@ui-components';
import {CircuitDataProps} from '../useCircuitByRef';

export default function MostWins({data, loading}: CircuitDataProps) {
	const winsLeaders = new Map<number, number>();
	(data?.circuit.history || []).forEach(r => {
		r.results.forEach(r => {
			winsLeaders.set(r.driverId, (winsLeaders.get(r.driverId) || 0) + 1);
		});
	});
	
	return <StatCard data={winsLeaders} label="Most Wins" loading={loading} size="small"/>;
}