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
	rowId: string;
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
				id: driver.rowId,
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
			seasonDriverStandingsByYear(orderBy: POSITION_NUMBER_ASC) {
				id
				driverId
				positionNumber
				points
			}
			racesByYear(orderBy: ROUND_ASC) {
				id
				round
				raceDriverStandings(orderBy: POSITION_NUMBER_ASC) {
					id
					driverId
					positionNumber
					points
					driver {
						id
						rowId
						lastName
						seasonEntrantDrivers(condition: {year: $season}, first: 1) {
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
