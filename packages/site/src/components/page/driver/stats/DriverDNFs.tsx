import { faCarBurst } from '@fortawesome/free-solid-svg-icons';

import { StatCard } from '@/components/app';

import type { DriverStatProps } from './index';

export default function DriverDNFs({ driverId, statsData }: DriverStatProps) {
	const leaders = new Map<string, number>();

	statsData?.raceResults.forEach(rs => {
		if (driverId) {
			leaders.set(
				driverId,
				(leaders.get(driverId) || 0) + (rs.positionNumber === null ? 1 : 0)
			);
		}
	});

	return (
		<StatCard
			variant="icon"
			icon={faCarBurst}
			loading={!statsData}
			data={leaders}
			label="DNFs"
			cardProps={{ variant: 'outlined' }}
		/>
	);
}
