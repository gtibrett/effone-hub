import { gql } from '@apollo/client';

// Raw shape returned by NextRaceBySeason for each node.
export type NextRaceQueryNode = {
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
		rowId: string;
		fullName: string;
		placeName: string | null;
		countryId: string | null;
		latitude: number | null;
		longitude: number | null;
	} | null;
};

export type NextRaceQueryResult = {
	races: NextRaceQueryNode[];
};

export const NextRaceBySeasonDoc = gql`
	query NextRaceBySeason($season: Int!) {
		races(
			condition: {year: $season},
			orderBy: ROUND_ASC
		) {
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
`;
