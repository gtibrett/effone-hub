import { faBolt } from '@fortawesome/free-solid-svg-icons';

import { StatCard } from '@/components/app';

import { DriverStatProps } from './index';
import useDriverStatsData from './useDriverStatsData';

export default function DriverInPoints({ driverId }: DriverStatProps) {
	const { data, loading } = useDriverStatsData(driverId);
	const leaders = new Map<string, number>();

	data?.driver?.raceResults.forEach(rs => {
		if (driverId && rs.positionDisplayOrder) {
			leaders.set(
				driverId,
				(leaders.get(driverId) || 0) + (rs.positionDisplayOrder < 11 ? 1 : 0)
			);
		}
	});

	return (
		<StatCard
			variant="icon"
			icon={faBolt}
			loading={loading}
			data={leaders}
			label="In Points"
			cardProps={{ variant: 'outlined' }}
		/>
	);
}
