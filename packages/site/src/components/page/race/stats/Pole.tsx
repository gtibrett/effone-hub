import type { RacePoleData } from '@/app/lib/cached-data';
import { StatCard } from '@/components/app';

import type { RaceStatProps } from './types';

export { racePolesLeaderQuery } from './queries';

type Props = RaceStatProps & { data: RacePoleData };

export default function Pole({ data, size }: Props) {
	const leaders = new Map<string, number>();

	(data?.races || []).forEach(r => {
		(r.qualifyingResults || []).forEach(rs => {
			if (rs.driverId) {
				leaders.set(rs.driverId as string, (leaders.get(rs.driverId as string) || 0) + 1);
			}
		});
	});

	return (
		<StatCard
			size={size}
			loading={false}
			data={leaders}
			label="Pole Position"
			format={() => null}
		/>
	);
}
