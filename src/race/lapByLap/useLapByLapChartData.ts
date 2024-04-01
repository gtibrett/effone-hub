import {gql, useQuery} from '@apollo/client';
import {DriverId} from '@effonehub/driver';
import {useGetAccessibleColor} from '@effonehub/ui-components';
import {Driver, LapTime, Result} from '@gtibrett/effone-hub-graph-api';
import {useTheme} from '@mui/material';
import {useMemo} from 'react';
import {LapChartSeries} from './LapByLap';

export type LapTimeData = {
	race: {
		lapTimes: Pick<LapTime, 'lap' | 'position' | 'driverId' | 'milliseconds'>[];
		results: {
			positionOrder: Result['positionOrder'];
			driver: Pick<Driver, 'driverId' | 'currentTeam' | 'surname'>
		}[]
	}
}

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

export type LapByLapData = {
	loading: boolean;
	totalLaps?: number;
	data?: {
		driverId: DriverId;
		name: string;
		color: string;
		position: number;
		laps: LapTimeData['race']['lapTimes'];
	}[]
}
export const useLapByLapData = (season: number, round: number): LapByLapData => {
	const theme           = useTheme();
	const {data, loading} = useQuery<LapTimeData>(lapsQuery, {variables: {season, round}});
	
	const dataByDriver = useMemo<Omit<LapByLapData, 'loading'>>(() => {
		if (!data?.race.lapTimes.length || !data.race.results.length) {
			return {
				data:      undefined,
				totalLaps: undefined
			};
		}
		
		const {lapTimes, results} = data.race;
		
		return {
			data:      results.map(r => ({
				driverId: r.driver.driverId,
				name:     r.driver.surname,
				color:    r.driver.currentTeam.team.colors.primary || theme.palette.primary.main,
				position: r.positionOrder,
				laps:     lapTimes.filter(lt => lt.driverId === r.driver.driverId)
			})),
			totalLaps: Math.max(...lapTimes.map(lt => lt.lap))
		};
	}, [data, theme]);
	
	return {
		loading,
		...dataByDriver
	};
};

const useLapByLapChartData = (lapByLapData: LapByLapData) => {
	const getAccessibleColor         = useGetAccessibleColor();
	const {data = [], totalLaps = 0} = lapByLapData;
	
	return useMemo<LapChartSeries[]>(() => {
		const drivers: LapChartSeries[] = [];
		
		data.forEach(({driverId, laps, color, ...driverData}) => {
			drivers.push({
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
			const lastPosition = driver.position || driver.data.at(-1)?.y || null;
			for (let x = driver.data.length; x < totalLaps; x++) {
				driver.data.push({x, y: lastPosition});
			}
			
			driver.data.push({x: totalLaps + 1, y: driver.position});
		});
		
		return drivers;
	}, [data, totalLaps, getAccessibleColor]);
};

export default useLapByLapChartData;