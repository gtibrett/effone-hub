import { useMemo } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { useFallbackColor } from '@/components/ui';
import type { AppLapTime, Driver, Maybe, RaceResult } from '@/gql/graphql';
import type { DriverId } from '@/types';

import type { LapChartSeries } from './LapByLap';

const lapsQuery = gql`
	#graphql
	query lapsSeasonRound($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			year
			round
			lapTimes(orderBy: LAP_ASC) {
				raceId
				lap
				position
				timeText
				milliseconds
				driverId
			}
			raceResults(orderBy: POSITION_DISPLAY_ORDER_ASC) {
				raceId
				positionDisplayOrder
				positionNumber
				driverId
				driver {
					id
					lastName
				}
				team {
					id
					colors {
						teamId
						primaryHex
					}
				}
			}
		}
	}
`;

type LapTimeRow = Pick<AppLapTime, 'lap' | 'position' | 'driverId' | 'timeText' | 'milliseconds'>;

type RaceResultRow = Pick<RaceResult, 'positionDisplayOrder' | 'positionNumber' | 'driverId'> & {
	driver: Pick<Driver, 'id' | 'lastName'> | null;
	team: { colors: { primaryHex: Maybe<string> } | null } | null;
};

export type LapTimeData = {
	race: {
		lapTimes: LapTimeRow[];
		raceResults: RaceResultRow[];
	};
};

export type LapByLapData = {
	loading: boolean;
	totalLaps?: number;
	data?: {
		driverId: DriverId;
		name: Maybe<string> | undefined;
		color: string;
		position: Maybe<number> | undefined;
		laps: LapTimeRow[];
	}[];
};
export const useLapByLapData = (season: number, round: number): LapByLapData => {
	const fallbackColor = useFallbackColor();
	const { data, loading } = useQuery<LapTimeData>(lapsQuery, { variables: { season, round } });

	return useMemo<LapByLapData>(() => {
		const lapTimes = data?.race?.lapTimes ?? [];
		const results = data?.race?.raceResults ?? [];

		if (!lapTimes.length || !results.length) {
			return {
				loading,
				data: undefined,
				totalLaps: undefined
			};
		}

		return {
			loading,
			// lap_times.driver_id holds the F1DB slug (e.g. "kimi-antonelli"),
			// which matches race_results.driver_id but NOT the GraphQL Node id
			// (`driver { id }` is Base64-encoded). Pre-F1DB the two happened to
			// be equal; post-migration they diverged and the filter silently
			// produced empty laps for every driver.
			data: results.map(r => ({
				driverId: r.driverId ?? undefined,
				name: r.driver?.lastName,
				color: r.team?.colors?.primaryHex || fallbackColor,
				position: r.positionNumber ?? r.positionDisplayOrder,
				laps: lapTimes.filter(lt => lt.driverId === r.driverId)
			})),
			totalLaps: Math.max(...lapTimes.map(lt => lt.lap ?? 0))
		};
	}, [data?.race, fallbackColor, loading]);
};

const useLapByLapChartData = (lapByLapData: LapByLapData) => {
	const { data = [], totalLaps = 0 } = lapByLapData;

	return useMemo<LapChartSeries[]>(() => {
		const drivers: LapChartSeries[] = [];

		data.forEach(({ driverId, laps, color, ...driverData }) => {
			driverId &&
				drivers.push({
					...driverData,
					driverId,
					id: driverId,
					color,
					data: laps.map(lt => ({
						x: lt.lap ?? 0,
						y: lt.position || null
					}))
				});
		});

		drivers.forEach(driver => {
			// Fill in missing laps with previous classification (final classification breaks if there are disqualifications)
			const lastPosition = driver.data.at(-1)?.y || null;
			for (let x = driver.data.length; x < totalLaps; x++) {
				driver.data.push({ x, y: lastPosition });
			}

			driver.data.push({ x: totalLaps + 1, y: lastPosition || null });
		});

		return drivers;
	}, [data, totalLaps]);
};

export default useLapByLapChartData;
