import {useGetAccessibleColor, useGetTeamColor} from '@/hooks';
import {DriverId} from '@/types';
import {gql, useQuery} from '@apollo/client';
import {Driver, LapTime, Result} from '@/gql/graphql';
import {Maybe} from '@/gql/graphql';
import {useMemo} from 'react';
import {LapChartSeries} from './LapByLap';

const lapsQuery = gql`
	#graphql
	query lapsSeasonRound($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			lapTimes: lapTimesWithStarts (orderBy:LAP_ASC)  {
				lap
				position
				time
				milliseconds
				driverId
			}
			results (orderBy: POSITION_ORDER_ASC) {
				positionOrder
				driver {
					driverId
					surname
					currentTeam {
						team {
							colors {
								primary
							}
						}
					}
				}
			}
		}
	}
`;

export type LapTimeData = {
	race: {
		lapTimes: Pick<LapTime, 'lap' | 'position' | 'driverId' | 'milliseconds'>[];
		results: {
			positionOrder: Result['positionOrder'];
			driver: Pick<Driver, 'driverId' | 'currentTeam' | 'surname'>
		}[]
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
		laps: LapTimeData['race']['lapTimes'];
	}[]
}
export const useLapByLapData = (season: number, round: number): LapByLapData => {
	const getTeamColor    = useGetTeamColor();
	const {data, loading} = useQuery<LapTimeData>(lapsQuery, {variables: {season, round}});
	
	return useMemo<LapByLapData>(() => {
		if (!data?.race.lapTimes.length || !data.race.results.length) {
			return {
				loading,
				data:      undefined,
				totalLaps: undefined
			};
		}
		
		const {lapTimes, results} = data.race;
		
		return {
			loading,
			data:      results.map(r => ({
				driverId: r.driver.driverId,
				name:     r.driver.surname,
				color:    getTeamColor(r.driver.currentTeam?.team?.colors, 'primary', false),
				position: r.positionOrder,
				laps:     lapTimes.filter(lt => lt.driverId === r.driver.driverId)
			})),
			totalLaps: Math.max(...lapTimes.map(lt => lt.lap))
		};
	}, [data?.race, getTeamColor, loading]);
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
					x: lt.lap,
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