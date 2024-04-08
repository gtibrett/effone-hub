import {useQuery} from '@apollo/client';
import {StatCard} from '@effonehub/ui-components';
import {FastestLapQueryData, seasonFastestLapQuery} from './FastestLap';
import {SeasonStatProps} from './types';

export default function FastestLaps({season, size = 'small'}: SeasonStatProps) {
	const {loading, data} = useQuery<FastestLapQueryData>(seasonFastestLapQuery, {variables: {season}});
	const leaders         = new Map<number, number>();
	
	(data?.races || []).forEach(r => {
		r.lapTimes.forEach(lt => {
			if (lt.driverId) {
				leaders.set(lt.driverId, (leaders.get(lt.driverId) || 0) + 1);
			}
		});
	});
	
	return <StatCard
		label="Fastest Laps"
		size={size}
		loading={loading}
		data={leaders}
	/>;
}