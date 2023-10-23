import {CircuitDataProps} from '../useCircuitByRef';
import StatCard from './StatCard';

export default function MostWins({data, loading}: CircuitDataProps) {
	if (!data || loading) {
		return null;
	}
	
	const winsLeaders = new Map<number, number>();
	data.circuit.history.forEach(r => {
		r.results.forEach(r => {
			winsLeaders.set(r.driverId, (winsLeaders.get(r.driverId) || 0) + 1);
		});
	});
	
	const [winsLeaderDriverId, wins] = Array.from(winsLeaders.entries()).reduce((a, e) => e[1] > a[1] ? e : a);
	
	return <StatCard driverId={winsLeaderDriverId} label={`Most Wins: ${wins}`}/>;
}