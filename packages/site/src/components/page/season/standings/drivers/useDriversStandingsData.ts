import { useCallback } from 'react';
import { gql } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/client/react';

import { useFallbackColor } from '@/components/ui';

import { Entity, RaceStandingsWithEntities, StandingWithEntity } from '../charts';

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

type SeasonDriverStandingNode = {
	driverId: string;
	positionNumber: number | null;
	points: string;
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

const query = gql`
	query driverStandingsQuery($season: Int!) {
		season(year: $season) {
			year
			seasonDriverStandingsByYear(orderBy: POSITION_NUMBER_ASC) {
				year
				driverId
				positionNumber
				points
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
	const { data } = useSuspenseQuery<DriverStandingsQueryData>(query, { variables: { season } });
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
