import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Typography } from '@mui/material';

import { DataWithValue, StatCard } from '@/components/app';
import { FastestLap as FastestLapNode, Race } from '@/gql/graphql';
import { getTimeStringFromDate } from '@/helpers';

import { RaceStatProps } from './types';

type FastestLapQueryData = {
	race: Pick<Race, 'fastestLaps'> | null;
};

const query = gql`
	query raceFastestLapQuery($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			fastestLaps(first: 1) {
				id
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

export default function FastestLap({ season, round, size = 'small' }: RaceStatProps) {
	const { loading, data } = useQuery<FastestLapQueryData>(query, {
		variables: { season, round }
	});

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
			loading={loading}
			data={fastestDriver}
			format={t => getTimeStringFromDate(new Date(t.value))}
			extra={formatExtra}
		/>
	);
}
