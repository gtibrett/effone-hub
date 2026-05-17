import {DriverId} from '@/types';
import { gql } from '@apollo/client';

import { useSuspenseQuery } from "@apollo/client/react";

type DriverResult = {
	driverId: DriverId;
}

type RaceNode = {
	rowId: number;
	round: number;
	date: string;
	officialName: string;
	circuit: {
		latitude: number | null;
		longitude: number | null;
	} | null;
	raceResults: { nodes: DriverResult[] };
	sprintRaceResults: { nodes: DriverResult[] };
}

export type RaceData = {
	date: string;
	name: string;
	round: number;
	circuit: { lat: number | null; lng: number | null };
	results: DriverResult[];
	sprintResults: DriverResult[];
}

export type ScheduleData = {
	races: RaceData[];
}

type ScheduleQueryResponse = {
	season: {
		racesByYear: { nodes: RaceNode[] };
	} | null;
}

const query = gql`
	query scheduleQuery($season: Int!) {
		season(year: $season) {
			racesByYear(orderBy: ROUND_ASC) {
				nodes {
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
						nodes {
							driverId
						}
					}
					sprintRaceResults(condition: {positionNumber: 1}, first: 1) {
						nodes {
							driverId
						}
					}
				}
			}
		}
	}
`;

export default function useScheduleData(season: number) {
	const result = useSuspenseQuery<ScheduleQueryResponse>(query, {variables: {season}});
	const nodes = result.data?.season?.racesByYear?.nodes ?? [];

	const races: RaceData[] = nodes.map((race) => ({
		date: race.date,
		name: race.officialName,
		round: race.round,
		circuit: {
			lat: race.circuit?.latitude ?? null,
			lng: race.circuit?.longitude ?? null
		},
		results: race.raceResults?.nodes ?? [],
		sprintResults: race.sprintRaceResults?.nodes ?? []
	}));

	return {...result, data: {races}};
}
