import {DataWithValue, StatCard} from '@/components/app';
import {getTimeStringFromDate} from '@/helpers';
import {gql, useQuery} from '@apollo/client';
import {LapTime, Race} from '@/gql/graphql';
import {Typography} from '@mui/material';
import {SeasonStatProps} from './types';

export type FastestLapQueryData = {
	races: (
		Pick<Race, 'name' | 'round'> & {
		lapTimes: Pick<LapTime, 'lap' | 'milliseconds' | 'driverId'>[];
	}
		)[]
}

export const seasonFastestLapQuery = gql`
	query seasonFastestLapQuery($season: Int!) {
		races (condition: {year: $season}) {
			name
			round
			lapTimes (orderBy: MILLISECONDS_ASC, first: 1) {
				lap
				milliseconds
				driverId
			}
		}
	}
`;

interface FastestSeasonLap extends DataWithValue {
	quali: boolean;
	name: Race['name'];
	round: Race['round'];
	lap: LapTime['lap'];
	driverId: LapTime['driverId'];
}

export default function FastestLap({season, size = 'small'}: SeasonStatProps) {
	const {loading, data} = useQuery<FastestLapQueryData>(seasonFastestLapQuery, {variables: {season}});
	
	if (!data?.races.length) {
		return null;
	}
	
	let fastestSeasonLap: FastestSeasonLap = {
		name:     '',
		round:    0,
		lap:      0,
		quali:    false,
		value:    Number.POSITIVE_INFINITY,
		driverId: 0
	};
	
	data.races.forEach(({name, round, lapTimes = []}) => {
		// Get fastest race lap
		const {milliseconds, lap, driverId} = lapTimes[0] || {};
		
		if ((milliseconds || Number.POSITIVE_INFINITY) < fastestSeasonLap.value) {
			fastestSeasonLap = {
				name, round, lap, value: milliseconds as number, driverId, quali: false
			};
		}
	});
	
	const fastestDriver = new Map<number, FastestSeasonLap>();
	fastestDriver.set(fastestSeasonLap.driverId, fastestSeasonLap);
	
	const formatExtra = (data: FastestSeasonLap) => (
		<Typography variant="caption">{data.name}: {data.quali ? 'Q' : 'Lap '}{data.lap}</Typography>
	);
	
	return <StatCard<FastestSeasonLap, FastestSeasonLap>
		label="Fastest Lap"
		size={size}
		loading={loading}
		data={fastestDriver}
		format={(t) => getTimeStringFromDate(new Date(t.value))}
		extra={formatExtra}
	/>;
}