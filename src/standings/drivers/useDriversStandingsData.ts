import {gql, useQuery} from '@apollo/client';
import {useGetTeamColor} from '@effonehub/constructor';
import {Driver, Race} from '@gtibrett/effone-hub-graph-api';
import {useCallback} from 'react';
import {Entity, RaceStandingsWithEntities, StandingWithEntity} from '../charts';

type DriverStandingsQueryData = {
	races: Pick<Race, 'round' | 'driverStandings'>[]
}

const useMapDriverToEntity = () => {
	const getTeamColor = useGetTeamColor();
	
	return useCallback((driver: Driver): Entity => ({
		id:    driver.driverId,
		name:  driver.surname || '',
		color: getTeamColor(driver?.teamsByYear?.[0].team?.colors, 'primary', false)
	}), [getTeamColor]);
};

const query = gql`
	query driverStandingsQuery($season: Int!) {
		races (condition: {year: $season}, orderBy: ROUND_ASC) {
			round
			driverStandings(orderBy: POSITION_ASC) {
				driverId
				points
				position
				driver {
					driverId
					code
					surname
					teamsByYear (condition: {year: $season}) {
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

export default function useDriverStandingsData(season: number) {
	const {data, loading}   = useQuery<DriverStandingsQueryData>(query, {variables: {season}});
	const mapDriverToEntity = useMapDriverToEntity();
	
	const chartData: RaceStandingsWithEntities[] = (data?.races || []).map(r => {
		const standings: StandingWithEntity[] = [];
		r.driverStandings.forEach(({driverId, position, points, driver}) => {
				if (driver) {
					standings.push({
						id:       driverId as number,
						position: position as number,
						points:   points as number,
						entity:   mapDriverToEntity(driver)
					});
				}
			}
		);
		
		return {
			round: r.round,
			standings
		};
	});
	
	return {data, loading, chartData};
}