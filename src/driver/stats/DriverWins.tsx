import {faTrophy} from '@fortawesome/free-solid-svg-icons';
import {StatCard} from '@ui-components';
import {DriverStatProps} from './index';
import useDriverStatsData from './useDriverStatsData';

export default function DriverWins({driverId}: DriverStatProps) {
	const {data, loading} = useDriverStatsData(driverId);
	const leaders         = new Map<number, number>();
	
	data?.results.forEach(rs => {
		leaders.set(rs.driverId, (leaders.get(rs.driverId) || 0) + (rs.positionOrder === 1 ? 1 : 0));
	});
	
	return <StatCard variant="icon" icon={faTrophy} loading={loading} data={leaders} label="Wins" cardProps={{variant: 'outlined'}}/>;
}