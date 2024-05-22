import {StatCard} from '@effonehub/ui-components';
import {faFlag} from '@fortawesome/free-solid-svg-icons';
import {DriverStatProps} from './index';
import useDriverStatsData from './useDriverStatsData';


export default function DriverAppearances({driverId}: DriverStatProps) {
	const {data, loading} = useDriverStatsData(driverId);
	if (!driverId) {
		return null;
	}
	
	const leaders = new Map<number, number>([[driverId, (data?.results || []).length]]);
	
	return <StatCard variant="icon" icon={faFlag} loading={loading} data={leaders} label="Appearances" cardProps={{variant: 'outlined'}}/>;
}