import {gql, useSuspenseQuery} from '@apollo/client';
import {useMemo} from 'react';

type NextRaceQueryResult = {
	races: {
		nodes: Array<{
			id: string;
			rowId: number;
			year: number;
			round: number;
			date: string;
			time: string | null;
			officialName: string;
			grandPrixId: string;
			preQualifyingDate: string | null;
			preQualifyingTime: string | null;
			freePractice1Date: string | null;
			freePractice1Time: string | null;
			freePractice2Date: string | null;
			freePractice2Time: string | null;
			freePractice3Date: string | null;
			freePractice3Time: string | null;
			freePractice4Date: string | null;
			freePractice4Time: string | null;
			qualifyingDate: string | null;
			qualifyingTime: string | null;
			sprintQualifyingDate: string | null;
			sprintQualifyingTime: string | null;
			sprintRaceDate: string | null;
			sprintRaceTime: string | null;
			circuit: {
				id: string;
				fullName: string;
				placeName: string | null;
				countryId: string | null;
				latitude: number | null;
				longitude: number | null;
			} | null;
		}>
	}
};

// Shape kept compatible with the old Ergast-shaped consumers
// (RaceWeekend.tsx, useRaceScheduleEvents.ts, NextRaceCountdown.tsx,
// NextRaceSchedule.tsx). `url`/`summary` are no longer in F1DB and
// remain undefined; consumers already optional-chain them.
export type NextRace = {
	id: string;
	rowId: number;
	year: number;
	round: number;
	name: string;
	date: string;
	time: string | null;
	fp1Date: string | null;
	fp1Time: string | null;
	fp2Date: string | null;
	fp2Time: string | null;
	fp3Date: string | null;
	fp3Time: string | null;
	qualiDate: string | null;
	qualiTime: string | null;
	sprintDate: string | null;
	sprintTime: string | null;
	url?: undefined;
	summary?: undefined;
	circuit: {
		id: string;
		circuitRef: string;
		fullName: string;
		location: string | null;
		country: string | null;
		lat: number | null;
		lng: number | null;
	} | null;
};

export type NextRaceData = {
	race: NextRace | null;
};

const query = gql`
	query NextRaceBySeason($season: Int!) {
		races(
			condition: {year: $season},
			orderBy: ROUND_ASC
		) {
			nodes {
				id
				rowId
				year
				round
				date
				time
				officialName
				grandPrixId
				preQualifyingDate
				preQualifyingTime
				freePractice1Date
				freePractice1Time
				freePractice2Date
				freePractice2Time
				freePractice3Date
				freePractice3Time
				freePractice4Date
				freePractice4Time
				qualifyingDate
				qualifyingTime
				sprintQualifyingDate
				sprintQualifyingTime
				sprintRaceDate
				sprintRaceTime
				circuit {
					id
					fullName
					placeName
					countryId
					latitude
					longitude
				}
			}
		}
	}
`;

export default function useNextRaceData(season: number) {
	const today  = new Date().toISOString().slice(0, 10);
	const result = useSuspenseQuery<NextRaceQueryResult>(query, {variables: {season}});

	const data = useMemo<NextRaceData>(() => {
		const node = (result.data?.races.nodes ?? []).find(r => r.date && r.date >= today) ?? null;
		if (!node) {
			return {race: null};
		}
		return {
			race: {
				id:          node.id,
				rowId:       node.rowId,
				year:        node.year,
				round:       node.round,
				name:        node.officialName,
				date:        node.date,
				time:        node.time,
				fp1Date:     node.freePractice1Date,
				fp1Time:     node.freePractice1Time,
				fp2Date:     node.freePractice2Date,
				fp2Time:     node.freePractice2Time,
				fp3Date:     node.freePractice3Date,
				fp3Time:     node.freePractice3Time,
				qualiDate:   node.qualifyingDate,
				qualiTime:   node.qualifyingTime,
				sprintDate:  node.sprintRaceDate,
				sprintTime:  node.sprintRaceTime,
				circuit:     node.circuit ? {
					id:         node.circuit.id,
					circuitRef: node.circuit.id,
					fullName:   node.circuit.fullName,
					location:   node.circuit.placeName,
					country:    node.circuit.countryId,
					lat:        node.circuit.latitude,
					lng:        node.circuit.longitude
				} : null
			}
		};
	}, [result.data]);

	return {...result, data};
}
