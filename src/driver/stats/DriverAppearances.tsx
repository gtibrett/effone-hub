import {faFlag} from '@fortawesome/free-solid-svg-icons';
import {StatCard} from '@ui-components';
import {DriverStatProps} from './index';
import useDriverStatsData from './useDriverStatsData';


export default function DriverAppearances({driverId}: DriverStatProps) {
	const {data, loading} = useDriverStatsData(driverId);
	const leaders         = new Map<number, number>();
	leaders.set(driverId, (data?.results || []).length);
	
	return <StatCard variant="icon" icon={faFlag} loading={loading} data={leaders} label="Appearances" cardProps={{variant: 'outlined'}}/>;
}