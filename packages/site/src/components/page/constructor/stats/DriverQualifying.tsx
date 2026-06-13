import type { ConstructorDriverQualifyingData } from '@/app/lib/cached-data';
import { StatCard } from '@/components/app';

export { ConstructorDriverQualifyingQuery } from './queries';

type DriverQualifyingProps = {
	data: ConstructorDriverQualifyingData;
	place: 1 | 2;
};

export default function DriverQualifying({ data, place }: DriverQualifyingProps) {
	const leaders = new Map<string, number>();

	(data?.season?.racesByYear || []).forEach(r => {
		const nodes = r.qualifyingResults;
		if (nodes.length) {
			let isFirst = true;
			nodes.forEach(({ driverId }) => {
				if (driverId) {
					leaders.set(driverId, (leaders.get(driverId) || 0) + (isFirst ? 1 : 0));
					isFirst = false;
				}
			});
		}
	});

	return (
		<StatCard
			loading={false}
			data={
				new Map([...leaders.entries()].sort((a, b) => b[1] - a[1]).slice(place - 1, place))
			}
			label="Qualifying"
		/>
	);
}
