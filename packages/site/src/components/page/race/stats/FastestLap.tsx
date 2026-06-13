import { gql } from '@apollo/client';
import { Typography } from '@mui/material';

import type { RaceFastestLapData } from '@/app/lib/cached-data';
import { type DataWithValue, StatCard } from '@/components/app';
import type { FastestLap as FastestLapNode } from '@/gql/graphql';
import { getTimeStringFromDate } from '@/helpers';

import type { RaceStatProps } from './types';

// Exported so cached-data.ts can reuse the same document for SSR prefetch.
export const raceFastestLapQuery = gql`
	query raceFastestLapQuery($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			year
			round
			fastestLaps(first: 1) {
				raceId
				driverId
				lap
				time
				timeMillis
			}
		}
	}
`;

interface FastestRaceLap extends DataWithValue {
	lap: FastestLapNode['lap'];
	driverId: FastestLapNode['driverId'];
}

type Props = RaceStatProps & { data: RaceFastestLapData };

export default function FastestLap({ data, size = 'small' }: Props) {
	const node = data?.race?.fastestLaps?.[0];

	if (!node || node.timeMillis == null || node.driverId == null) {
		return null;
	}

	const fastestRaceLap: FastestRaceLap = {
		lap: node.lap,
		value: node.timeMillis,
		driverId: node.driverId
	};

	const fastestDriver = new Map<string, FastestRaceLap>();
	fastestDriver.set(node.driverId, fastestRaceLap);

	const formatExtra = (d: FastestRaceLap) => (
		<Typography variant="caption">Lap {d.lap}</Typography>
	);

	return (
		<StatCard<FastestRaceLap, FastestRaceLap>
			label="Fastest Lap"
			size={size}
			loading={false}
			data={fastestDriver}
			format={t => getTimeStringFromDate(new Date(t.value))}
			extra={formatExtra}
		/>
	);
}
