import { gql } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/client/react';

import { DriverId } from '@/types';

type DriverResult = {
	driverId: DriverId;
};

type RaceNode = {
	rowId: number;
	round: number;
	date: string;
	officialName: string;
	circuit: {
		latitude: number | null;
		longitude: number | null;
	} | null;
	raceResults: DriverResult[];
	sprintRaceResults: DriverResult[];
};

export type RaceData = {
	date: string;
	name: string;
	round: number;
	circuit: { lat: number | null; lng: number | null };
	results: DriverResult[];
	sprintResults: DriverResult[];
};

export type ScheduleData = {
	races: RaceData[];
};

type ScheduleQueryResponse = {
	season: {
		racesByYear: RaceNode[];
	} | null;
};

const query = gql`
	query scheduleQuery($season: Int!) {
		season(year: $season) {
			id
			racesByYear(orderBy: ROUND_ASC) {
				id
				rowId
				round
				date
				officialName
				circuit {
					id
					latitude
					longitude
				}
				raceResults(condition: {positionNumber: 1}, first: 1) {
					driverId
				}
				sprintRaceResults(condition: {positionNumber: 1}, first: 1) {
					driverId
				}
			}
		}
	}
`;

export default function useScheduleData(season: number) {
	const result = useSuspenseQuery<ScheduleQueryResponse>(query, { variables: { season } });
	const nodes = result.data?.season?.racesByYear ?? [];

	const races: RaceData[] = nodes.map(race => ({
		date: race.date,
		name: race.officialName,
		round: race.round,
		circuit: {
			lat: race.circuit?.latitude ?? null,
			lng: race.circuit?.longitude ?? null
		},
		results: race.raceResults ?? [],
		sprintResults: race.sprintRaceResults ?? []
	}));

	return { ...result, data: { races } };
}
