import {useCssTokens} from '@/lib/cssTokens';
import {useGetAccessibleColor} from '@/hooks';
import { gql } from '@apollo/client';
import { useSuspenseQuery } from "@apollo/client/react";
import {useCallback} from 'react';
import {Entity, RaceStandingsWithEntities, StandingWithEntity} from '../charts';

type DriverColors = {
	primaryHex: string | null;
};

type DriverConstructorNode = {
	colors: DriverColors | null;
};

type DriverSeasonEntrantNode = {
	team: DriverConstructorNode | null;
};

type DriverNode = {
	rowId: string;
	lastName: string;
	seasonEntrantDrivers: { nodes: DriverSeasonEntrantNode[] };
};

type RaceDriverStandingNode = {
	driverId: string;
	positionNumber: number | null;
	points: string;
	driver: DriverNode | null;
};

type RaceNode = {
	round: number;
	raceDriverStandings: { nodes: RaceDriverStandingNode[] };
};

type SeasonDriverStandingNode = {
	driverId: string;
	positionNumber: number | null;
	points: string;
};

type DriverStandingsQueryData = {
	season: {
		seasonDriverStandingsByYear: { nodes: SeasonDriverStandingNode[] };
		racesByYear: { nodes: RaceNode[] };
	} | null;
};

const useMapDriverToEntity = () => {
	const getAccessibleColor = useGetAccessibleColor();
	const fallbackColor      = useCssTokens().primary;

	return useCallback((driver: DriverNode): Entity => {
		const primaryHex = driver.seasonEntrantDrivers.nodes[0]?.team?.colors?.primaryHex;
		const color      = getAccessibleColor(primaryHex || fallbackColor, false);

		return {
			id:    driver.rowId,
			name:  driver.lastName,
			color
		};
	}, [getAccessibleColor, fallbackColor]);
};

const query = gql`
	query driverStandingsQuery($season: Int!) {
		season(year: $season) {
			seasonDriverStandingsByYear(orderBy: POSITION_NUMBER_ASC) {
				nodes {
					id
					driverId
					positionNumber
					points
				}
			}
			racesByYear(orderBy: ROUND_ASC) {
				nodes {
					id
					round
					raceDriverStandings(orderBy: POSITION_NUMBER_ASC) {
						nodes {
							id
							driverId
							positionNumber
							points
							driver {
								id
								rowId
								lastName
								seasonEntrantDrivers(condition: {year: $season}, first: 1) {
									nodes {
										id
										team {
											id
											colors {
												id
												primaryHex
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

export default function useDriverStandingsData(season: number) {
	const {data}          = useSuspenseQuery<DriverStandingsQueryData>(query, {variables: {season}});
	const mapDriverToEntity = useMapDriverToEntity();

	const chartData: RaceStandingsWithEntities[] = (data?.season?.racesByYear?.nodes ?? []).map(r => {
		const standings: StandingWithEntity[] = r.raceDriverStandings.nodes
			.filter(s => s.driver)
			.map(({driverId, positionNumber, points, driver}) => ({
				id:       driverId,
				position: Number(positionNumber),
				points:   Number(points),
				entity:   mapDriverToEntity(driver as DriverNode)
			}));

		return {
			round: r.round,
			standings
		};
	});

	return {data, chartData};
}
