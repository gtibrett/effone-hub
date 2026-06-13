import { StatCard } from '@/components/app';
import type { CircuitDataProps } from '@/hooks/data';

export default function LapLeader({ data, loading }: CircuitDataProps) {
	const lapLeaders = new Map<string, number>();
	(data?.circuit.history || []).forEach((r: { lapTimes: { driverId?: string }[] }) => {
		r.lapTimes.forEach((lt: { driverId?: string }) => {
			if (lt.driverId) {
				lapLeaders.set(lt.driverId, (lapLeaders.get(lt.driverId) || 0) + 1);
			}
		});
	});

	return <StatCard data={lapLeaders} label="Most Laps Led" loading={loading} size="small" />;
}
