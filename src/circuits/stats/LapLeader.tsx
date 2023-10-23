import {CircuitDataProps} from '../useCircuitByRef';
import StatCard from './StatCard';

export default function LapLeader({data, loading}: CircuitDataProps) {
	if (!data || loading) {
		return null;
	}
	
	const lapLeaders = new Map<number, number>();
	data.circuit.history.forEach(r => {
		r.lapTimes.forEach(lt => {
			lapLeaders.set(lt.driverId, (lapLeaders.get(lt.driverId) || 0) + 1);
		});
	});
	
	const [lapLeaderDriverId, lapsLed] = Array.from(lapLeaders.entries()).reduce((a, e) => e[1] > a[1] ? e : a);
	
	return <StatCard driverId={lapLeaderDriverId} label={`Most Laps Led: ${lapsLed}`}/>;
}