import {StatCard} from '@/components/app';
import {faBolt} from '@fortawesome/free-solid-svg-icons';
import {DriverStatProps} from './index';
import useDriverStatsData from './useDriverStatsData';

export default function DriverInPoints({driverId}: DriverStatProps) {
	const {data, loading} = useDriverStatsData(driverId);
	const leaders         = new Map<number, number>();
	
	data?.results.forEach(rs => {
		if (rs.driverId && rs.positionOrder) {
			leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + (rs.positionOrder < 11 ? 1 : 0));
		}
	});
	
	return <StatCard variant="icon" icon={faBolt} loading={loading} data={leaders} label="In Points" cardProps={{variant: 'outlined'}}/>;
}