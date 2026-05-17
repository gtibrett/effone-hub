import {Typography} from '@/components/ui';
import {DataWithValue, StatCard} from '@/components/app';
import {getTimeStringFromDate} from '@/helpers';
import { gql } from '@apollo/client';
import { useQuery } from "@apollo/client/react";
import {FastestLap as FastestLapNode, Race, Season} from '@/gql/graphql';

import {SeasonStatProps} from './types';

export type FastestLapQueryData = {
	season: (Pick<Season, 'year'> & {
		racesByYear: {
			nodes: (Pick<Race, 'rowId' | 'round' | 'officialName'> & {
				fastestLaps: {
					nodes: Pick<FastestLapNode, 'driverId' | 'lap' | 'time' | 'timeMillis'>[];
				};
			})[];
		};
	}) | null;
}

export const seasonFastestLapQuery = gql`
	query seasonFastestLapQuery($season: Int!) {
		season(year: $season) {
			year
			racesByYear {
				nodes {
					id
					rowId
					round
					officialName
					fastestLaps(orderBy: TIME_MILLIS_ASC, first: 1) {
						nodes {
							id
							driverId
							lap
							time
							timeMillis
						}
					}
				}
			}
		}
	}
`;

interface FastestSeasonLap extends DataWithValue {
	quali: boolean;
	name: Race['officialName'];
	round: Race['round'];
	lap: FastestLapNode['lap'];
	driverId: FastestLapNode['driverId'];
}

export default function FastestLap({season, size = 'small'}: SeasonStatProps) {
	const {loading, data} = useQuery<FastestLapQueryData>(seasonFastestLapQuery, {variables: {season}});

	const races = data?.season?.racesByYear?.nodes ?? [];

	if (!races.length) {
		return null;
	}

	let fastestSeasonLap: FastestSeasonLap | null = null;

	races.forEach(({officialName, round, fastestLaps}) => {
		const node = fastestLaps?.nodes?.[0];
		if (!node || node.timeMillis == null || node.driverId == null) {
			return;
		}

		if (fastestSeasonLap === null || node.timeMillis < fastestSeasonLap.value) {
			fastestSeasonLap = {
				name:     officialName,
				round,
				lap:      node.lap,
				value:    node.timeMillis,
				driverId: node.driverId,
				quali:    false
			};
		}
	});

	if (!fastestSeasonLap) {
		return null;
	}

	const winner: FastestSeasonLap = fastestSeasonLap;
	const fastestDriver = new Map<string, FastestSeasonLap>();
	fastestDriver.set(winner.driverId || '', winner);

	const formatExtra = (d: FastestSeasonLap) => (
		<Typography variant="caption">{d.name}: {d.quali ? 'Q' : 'Lap '}{d.lap}</Typography>
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
