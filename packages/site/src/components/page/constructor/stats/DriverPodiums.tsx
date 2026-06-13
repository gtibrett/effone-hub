import type { ConstructorDriverPodiumsData } from '@/app/lib/cached-data';
import { StatCard } from '@/components/app';

export { ConstructorDriverPodiumsQuery } from './queries';

type DriverPodiumsProps = {
	data: ConstructorDriverPodiumsData;
	place: 1 | 2;
};

export default function DriverPodiums({ data, place }: DriverPodiumsProps) {
	const leaders = new Map<string, number>();

	(data?.season?.racesByYear ?? []).forEach(race => {
		race.raceResults.forEach(result => {
			if (result.driverId && result.positionNumber != null && result.positionNumber <= 3) {
				leaders.set(result.driverId, (leaders.get(result.driverId) ?? 0) + 1);
			}
		});
	});

	return (
		<StatCard
			loading={false}
			data={
				new Map([...leaders.entries()].sort((a, b) => b[1] - a[1]).slice(place - 1, place))
			}
			label="Podiums"
		/>
	);
}
