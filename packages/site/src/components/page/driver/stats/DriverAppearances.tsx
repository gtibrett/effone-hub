import { faFlag } from '@fortawesome/free-solid-svg-icons';

import { StatCard } from '@/components/app';

import type { DriverStatProps } from './index';

export default function DriverAppearances({ driverId, statsData }: DriverStatProps) {
	if (!driverId) {
		return null;
	}

	const leaders = new Map<string, number>([[driverId, (statsData?.raceResults || []).length]]);

	return (
		<StatCard
			variant="icon"
			icon={faFlag}
			loading={!statsData}
			data={leaders}
			label="Appearances"
			cardProps={{ variant: 'outlined' }}
		/>
	);
}
