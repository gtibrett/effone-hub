import {StatCard} from '@effonehub/ui-components';
import {faCarBurst} from '@fortawesome/free-solid-svg-icons';
import {DriverStatProps} from './index';
import useDriverStatsData from './useDriverStatsData';

export default function DriverDNFs({driverId}: DriverStatProps) {
	const {data, loading} = useDriverStatsData(driverId);
	const leaders         = new Map<number, number>();
	
	data?.results.forEach(rs => {
		leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + (rs.position === null ? 1 : 0));
	});
	
	return <StatCard variant="icon" icon={faCarBurst} loading={loading} data={leaders} label="DNFs" cardProps={{variant: 'outlined'}}/>;
}