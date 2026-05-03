import {StatCard} from '@/components/app';
import {faRankingStar} from '@fortawesome/free-solid-svg-icons';
import {DriverStatProps} from './index';
import useDriverStatsData from './useDriverStatsData';

export default function DriverPodiums({driverId}: DriverStatProps) {
	const {data, loading} = useDriverStatsData(driverId);
	const leaders         = new Map<string, number>();

	data?.driver?.raceResults?.nodes.forEach(rs => {
		if (driverId && rs.positionDisplayOrder) {
			leaders.set(driverId, (leaders.get(driverId) || 0) + (rs.positionDisplayOrder <= 3 ? 1 : 0));
		}
	});
	
	return <StatCard variant="icon" icon={faRankingStar} loading={loading} data={leaders} label="Podiums" cardProps={{variant: 'outlined'}}/>;
}