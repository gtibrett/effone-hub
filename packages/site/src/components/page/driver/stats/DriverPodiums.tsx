import { faRankingStar } from '@fortawesome/free-solid-svg-icons';

import { StatCard } from '@/components/app';

import type { DriverStatProps } from './index';

export default function DriverPodiums({ driverId, statsData }: DriverStatProps) {
	const leaders = new Map<string, number>();

	statsData?.raceResults.forEach(rs => {
		if (driverId && rs.positionDisplayOrder) {
			leaders.set(
				driverId,
				(leaders.get(driverId) || 0) + (rs.positionDisplayOrder <= 3 ? 1 : 0)
			);
		}
	});

	return (
		<StatCard
			variant="icon"
			icon={faRankingStar}
			loading={!statsData}
			data={leaders}
			label="Podiums"
			cardProps={{ variant: 'outlined' }}
		/>
	);
}
