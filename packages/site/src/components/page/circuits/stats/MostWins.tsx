import { StatCard } from '@/components/app';
import { CircuitDataProps } from '@/hooks/data';

export default function MostWins({ data, loading }: CircuitDataProps) {
	const winsLeaders = new Map<string, number>();
	(data?.circuit.history?.nodes || []).forEach(
		(r: { raceResults: { nodes: { driverId?: string }[] } }) => {
			r.raceResults.nodes.forEach((result: { driverId?: string }) => {
				if (result.driverId) {
					winsLeaders.set(result.driverId, (winsLeaders.get(result.driverId) || 0) + 1);
				}
			});
		}
	);

	return <StatCard data={winsLeaders} label="Most Wins" loading={loading} size="small" />;
}
