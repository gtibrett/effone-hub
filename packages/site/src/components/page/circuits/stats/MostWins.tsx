import { StatCard } from '@/components/app';
import type { CircuitDataProps } from '@/hooks/data';

export default function MostWins({ data, loading }: CircuitDataProps) {
	const winsLeaders = new Map<string, number>();
	(data?.circuit.history || []).forEach((r: { raceResults: { driverId?: string }[] }) => {
		r.raceResults.forEach((result: { driverId?: string }) => {
			if (result.driverId) {
				winsLeaders.set(result.driverId, (winsLeaders.get(result.driverId) || 0) + 1);
			}
		});
	});

	return <StatCard data={winsLeaders} label="Most Wins" loading={loading} size="small" />;
}
