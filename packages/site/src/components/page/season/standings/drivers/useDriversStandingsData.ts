import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/client/react';

import { useFallbackColor } from '@/components/ui';

import type { Entity, RaceStandingsWithEntities, StandingWithEntity } from '../charts';

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
	id: string;
	lastName: string;
	seasonEntrantDrivers: DriverSeasonEntrantNode[];
};

type RaceDriverStandingNode = {
	driverId: string;
	positionNumber: number | null;
	points: string;
	driver: DriverNode | null;
};

type RaceNode = {
	round: number;
	raceDriverStandings: RaceDriverStandingNode[];
};

// Extended fields fetched for server-side display seed (EntityDisplayProvider).
type SeasonDriverStandingDriverColors = {
	teamId: string;
	primaryHex: string | null;
	secondaryHex: string | null;
};

type SeasonDriverStandingEntrant = {
	team: { id: string; colors: SeasonDriverStandingDriverColors | null } | null;
};

export type SeasonDriverStandingDriverNode = {
	id: string;
	firstName: string | null;
	lastName: string | null;
	abbreviation: string | null;
	bio: { thumbnailUrl: string | null } | null;
	seasonEntrantDrivers: SeasonDriverStandingEntrant[];
};

export type SeasonDriverStandingNode = {
	driverId: string;
	positionNumber: number | null;
	points: string;
	driver: SeasonDriverStandingDriverNode | null;
};

type DriverStandingsQueryData = {
	season: {
		seasonDriverStandingsByYear: SeasonDriverStandingNode[];
		racesByYear: RaceNode[];
	} | null;
};

const useMapDriverToEntity = () => {
	const fallbackColor = useFallbackColor();

	return useCallback(
		(driver: DriverNode): Entity => {
			const primaryHex = driver.seasonEntrantDrivers[0]?.team?.colors?.primaryHex;
			const color = primaryHex || fallbackColor;

			return {
				id: driver.id,
				name: driver.lastName,
				color
			};
		},
		[fallbackColor]
	);
};

export const driverStandingsQuery = gql`
	query driverStandingsQuery($season: Int!) {
		season(year: $season) {
			year
			seasonDriverStandingsByYear(orderBy: POSITION_NUMBER_ASC) {
				year
				driverId
				positionNumber
				points
				driver {
					id
					firstName
					lastName
					abbreviation
					bio { thumbnailUrl }
					seasonEntrantDrivers(condition: {year: $season}, first: 1) {
						team {
							id
							colors {
								teamId
								primaryHex
								secondaryHex
							}
						}
					}
				}
			}
			racesByYear(orderBy: ROUND_ASC) {
				year
				round
				raceDriverStandings(orderBy: POSITION_NUMBER_ASC) {
					raceId
					driverId
					positionNumber
					points
					driver {
						id
						lastName
						seasonEntrantDrivers(condition: {year: $season}, first: 1) {
							year
							driverId
							teamId
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
			}
		}
	}
`;

export default function useDriverStandingsData(season: number) {
	const { data } = useSuspenseQuery<DriverStandingsQueryData>(driverStandingsQuery, {
		variables: { season }
	});
	const mapDriverToEntity = useMapDriverToEntity();

	const chartData: RaceStandingsWithEntities[] = (data?.season?.racesByYear ?? []).map(r => {
		const standings: StandingWithEntity[] = r.raceDriverStandings
			.filter(s => s.driver)
			.map(({ driverId, positionNumber, points, driver }) => ({
				id: driverId,
				position: Number(positionNumber),
				points: Number(points),
				entity: mapDriverToEntity(driver as DriverNode)
			}));

		return {
			round: r.round,
			standings
		};
	});

	return { data, chartData };
}
