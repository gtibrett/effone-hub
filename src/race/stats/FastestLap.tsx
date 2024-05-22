import {gql, useQuery} from '@apollo/client';
import {getTimeStringFromDate} from '@effonehub/helpers';
import {DataWithValue, StatCard} from '@effonehub/ui-components';
import {LapTime} from '@gtibrett/effone-hub-graph-api';
import {Typography} from '@mui/material';
import {RaceStatProps} from './types';

type FastestLapQueryData = {
	races: (
		{
			lapTimes: Pick<LapTime, 'lap' | 'milliseconds' | 'driverId'>[];
		}
		)[]
}

const query = gql`
	query raceFastestLapQuery($season: Int!, $round: Int!) {
		races (condition: {year: $season, round: $round}) {
			lapTimes (orderBy: MILLISECONDS_ASC, first: 1) {
				lap
				milliseconds
				driverId
			}
		}
	}
`;

interface FastestRaceLap extends DataWithValue {
	lap: LapTime['lap'];
	driverId: LapTime['driverId'];
}

export default function FastestLap({season, round, size = 'small'}: RaceStatProps) {
	const {loading, data} = useQuery<FastestLapQueryData>(query, {variables: {season, round}});
	
	if (!data?.races.length) {
		return null;
	}
	
	let fastestSeasonLap: FastestRaceLap = {
		lap:      0,
		value:    Number.POSITIVE_INFINITY,
		driverId: 0
	};
	
	data.races.forEach(({lapTimes = []}) => {
		if (lapTimes[0]) {
			// Get fastest race lap
			const {milliseconds, lap, driverId} = lapTimes[0];
			
			if (milliseconds && milliseconds < fastestSeasonLap.value) {
				fastestSeasonLap = {
					lap, value: milliseconds, driverId
				};
			}
		}
	});
	
	const fastestDriver = new Map<number, FastestRaceLap>();
	fastestDriver.set(fastestSeasonLap.driverId, fastestSeasonLap);
	
	const formatExtra = (data: FastestRaceLap) => (
		<Typography variant="caption">Lap {data.lap}</Typography>
	);
	
	return <StatCard<FastestRaceLap, FastestRaceLap>
		label="Fastest Lap"
		size={size}
		loading={loading}
		data={fastestDriver}
		format={(t) => getTimeStringFromDate(new Date(t.value))}
		extra={formatExtra}
	/>;
}