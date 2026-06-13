import { StatCard } from '@/components/app';

import type { FastestLapQueryData } from './queries';
import type { SeasonStatProps } from './types';

type FastestLapsProps = SeasonStatProps & { data: FastestLapQueryData };

export default function FastestLaps({ size = 'small', data }: FastestLapsProps) {
	const leaders = new Map<string, number>();

	(data?.season?.racesByYear || []).forEach(r => {
		r.fastestLaps?.forEach(lt => {
			if (lt.driverId) {
				leaders.set(lt.driverId, (leaders.get(lt.driverId) || 0) + 1);
			}
		});
	});

	return <StatCard label="Fastest Laps" size={size} loading={false} data={leaders} />;
}
