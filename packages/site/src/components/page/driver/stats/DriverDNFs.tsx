import { faCarBurst } from '@fortawesome/free-solid-svg-icons';

import { StatCard } from '@/components/app';

import { DriverStatProps } from './index';
import useDriverStatsData from './useDriverStatsData';

export default function DriverDNFs({ driverId }: DriverStatProps) {
	const { data, loading } = useDriverStatsData(driverId);
	const leaders = new Map<string, number>();

	data?.driver?.raceResults?.nodes.forEach(rs => {
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
			loading={loading}
			data={leaders}
			label="DNFs"
			cardProps={{ variant: 'outlined' }}
		/>
	);
}
