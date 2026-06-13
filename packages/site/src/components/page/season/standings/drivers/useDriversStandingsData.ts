import { useCallback } from 'react';
import { useSuspenseQuery } from '@apollo/client/react';

import { useFallbackColor } from '@/components/ui';

import type { Entity, RaceStandingsWithEntities, StandingWithEntity } from '../charts';
import type { SeasonDriverStandingNode } from './queries';
import { driverStandingsQuery } from './queries';

export type { SeasonDriverStandingDriverNode, SeasonDriverStandingNode } from './queries';

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
