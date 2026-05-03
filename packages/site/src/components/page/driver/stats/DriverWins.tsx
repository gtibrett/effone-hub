import {StatCard} from '@/components/app';
import {faTrophy} from '@fortawesome/free-solid-svg-icons';
import {DriverStatProps} from './index';
import useDriverStatsData from './useDriverStatsData';

export default function DriverWins({driverId}: DriverStatProps) {
	const {data, loading} = useDriverStatsData(driverId);
	const leaders         = new Map<string, number>();

	data?.driver?.raceResults?.nodes.forEach(rs => {
		if (driverId && rs.positionDisplayOrder) {
			leaders.set(driverId, (leaders.get(driverId) || 0) + (rs.positionDisplayOrder === 1 ? 1 : 0));
		}
	});
	
	return <StatCard variant="icon" icon={faTrophy} loading={loading} data={leaders} label="Wins" cardProps={{variant: 'outlined'}}/>;
}