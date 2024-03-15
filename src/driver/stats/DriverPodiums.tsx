import {faRankingStar} from '@fortawesome/free-solid-svg-icons';
import {StatCard} from '@ui-components';
import {DriverStatProps} from './index';
import useDriverStatsData from './useDriverStatsData';

export default function DriverPodiums({driverId}: DriverStatProps) {
	const {data, loading} = useDriverStatsData(driverId);
	const leaders         = new Map<number, number>();
	
	data?.results.forEach(rs => {
		leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + (rs.positionOrder <= 3 ? 1 : 0));
	});
	
	return <StatCard variant="icon" icon={faRankingStar} loading={loading} data={leaders} label="Podiums" cardProps={{variant: 'outlined'}}/>;
}