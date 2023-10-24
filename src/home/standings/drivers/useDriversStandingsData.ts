import {gql, useQuery} from '@apollo/client';
import {Driver, Race} from '@gtibrett/effone-hub-graph-api';
import {Entity, RaceStandingsWithEntities} from '../charts';

export type DriverStandingsQueryData = {
	races: Pick<Race, 'round' | 'driverStandings'>[]
}

export const mapDriverToEntity = (driver: Driver): Entity => ({
	id:    driver.driverId,
	name:  driver.surname, //driver.code || (driver.surname || '').replace(' ', '').substring(0, 3).toUpperCase(),
	color: driver.currentTeam.team.colors.primary
});

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

export default function useDriverStandingsData(season: number) {
	const {data, loading} = useQuery<DriverStandingsQueryData>(query, {variables: {season}});
	
	const chartData: RaceStandingsWithEntities[] = (data?.races || []).map(r => {
		return {
			round:     r.round,
			standings: r.driverStandings.map(({driverId, position, points, driver}) => ({
					id:     driverId,
					position,
					points,
					entity: mapDriverToEntity(driver)
				})
			)
		};
	});
	
	return {data, loading, chartData};
}