import {useFallbackColor} from '@/components/ui';
import {useGetAccessibleColor} from '@/hooks';
import {DriverId} from '@/types';
import {gql, useQuery} from '@apollo/client';
import {AppLapTime, Driver, RaceResult} from '@/gql/graphql';
import {Maybe} from '@/gql/graphql';
import {useMemo} from 'react';
import {LapChartSeries} from './LapByLap';

const lapsQuery = gql`
	#graphql
	query lapsSeasonRound($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			lapTimes(orderBy: LAP_ASC) {
				nodes {
					lap
					position
					timeText
					milliseconds
					driverId
				}
			}
			raceResults(orderBy: POSITION_DISPLAY_ORDER_ASC) {
				nodes {
					positionDisplayOrder
					positionNumber
					driverId
					driver {
						id
						lastName
					}
					constructor {
						colors {
							primaryHex
						}
					}
				}
			}
		}
	}
`;

type LapTimeRow = Pick<AppLapTime, 'lap' | 'position' | 'driverId' | 'timeText' | 'milliseconds'>;

type RaceResultRow = Pick<RaceResult, 'positionDisplayOrder' | 'positionNumber'> & {
	driver: Pick<Driver, 'id' | 'lastName'> | null;
	constructor: { colors: { primaryHex: Maybe<string> } | null } | null;
};

export type LapTimeData = {
	race: {
		lapTimes: { nodes: LapTimeRow[] };
		raceResults: { nodes: RaceResultRow[] };
	}
}

export type LapByLapData = {
	loading: boolean;
	totalLaps?: number;
	data?: {
		driverId: DriverId;
		name: Maybe<string> | undefined;
		color: string;
		position: Maybe<number> | undefined;
		laps: LapTimeRow[];
	}[]
}
export const useLapByLapData = (season: number, round: number): LapByLapData => {
	const fallbackColor   = useFallbackColor();
	const {data, loading} = useQuery<LapTimeData>(lapsQuery, {variables: {season, round}});

	return useMemo<LapByLapData>(() => {
		const lapTimes = data?.race?.lapTimes?.nodes ?? [];
		const results  = data?.race?.raceResults?.nodes ?? [];

		if (!lapTimes.length || !results.length) {
			return {
				loading,
				data:      undefined,
				totalLaps: undefined
			};
		}

		return {
			loading,
			data:      results.map(r => ({
				driverId: r.driver?.id,
				name:     r.driver?.lastName,
				color:    r.constructor?.colors?.primaryHex || fallbackColor,
				position: r.positionNumber ?? r.positionDisplayOrder,
				laps:     lapTimes.filter(lt => lt.driverId === r.driver?.id)
			})),
			totalLaps: Math.max(...lapTimes.map(lt => lt.lap ?? 0))
		};
	}, [data?.race, fallbackColor, loading]);
};

const useLapByLapChartData = (lapByLapData: LapByLapData) => {
	const getAccessibleColor         = useGetAccessibleColor();
	const {data = [], totalLaps = 0} = lapByLapData;

	return useMemo<LapChartSeries[]>(() => {
		const drivers: LapChartSeries[] = [];

		data.forEach(({driverId, laps, color, ...driverData}) => {
			driverId && drivers.push({
				...driverData,
				driverId,
				id:    driverId,
				color: getAccessibleColor(color),
				data:  laps.map(lt => ({
					x: lt.lap ?? 0,
					y: lt.position || null
				}))
			});
		});

		drivers.forEach(driver => {
			// Fill in missing laps with previous classification (final classification breaks if there are disqualifications)
			const lastPosition = driver.data.at(-1)?.y || null;
			for (let x = driver.data.length; x < totalLaps; x++) {
				driver.data.push({x, y: lastPosition});
			}

			driver.data.push({x: totalLaps + 1, y: lastPosition || null});
		});

		return drivers;
	}, [data, totalLaps, getAccessibleColor]);
};

export default useLapByLapChartData;
