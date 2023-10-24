import {gql, useQuery} from '@apollo/client';
import {Driver, LapTime, Result} from '@gtibrett/effone-hub-graph-api';
import {useTheme} from '@mui/material';
import {useMemo} from 'react';
import {DriverId} from '../../driver';
import useGetAccessibleColor from '../../ui-components/useGetAccessibleColor';
import {LapChartSeries} from './LapByLap';

export type LapTimeData = {
	race: {
		lapTimes: Pick<LapTime, 'lap' | 'position' | 'driverId' | 'milliseconds'>[];
		results: {
			positionOrder: Result['positionOrder'];
			driver: Pick<Driver, 'driverId' | 'currentTeam'>
		}[]
	}
}

const lapsQuery = gql`
	#graphql
	query lapsSeasonRound($season: Int!, $round: Int!) {
		race: raceByYearAndRound(year: $season, round: $round) {
			lapTimes (orderBy: LAP_ASC) {
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

export const useTotalLaps = (lapTimes: LapTime[]) => (
	useMemo<number>(() => Math.max(...lapTimes.map(lt => lt.lap)), [lapTimes])
);


export type LapByLapData = {
	loading: boolean;
	totalLaps?: number;
	data?: {
		driverId: DriverId;
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
		
		data.forEach(driverData => {
			drivers.push({
				id:       driverData.driverId,
				driverId: driverData.driverId,
				color:    getAccessibleColor(driverData.color),
				data:     driverData.laps.map(lt => ({
					x: lt.lap,
					y: lt.position || null
				}))
			});
		});
		
		drivers.forEach(driver => {
			// Fill in missing laps with final classification
			const lastPosition = data.find(d => d.driverId === driver.id)?.position || null;
			for (let x = driver.data.length; x < totalLaps; x++) {
				driver.data.push({x, y: lastPosition});
			}
		});
		
		return drivers;
	}, [data, totalLaps, getAccessibleColor]);
};

export default useLapByLapChartData;