import {gql, useQuery} from '@apollo/client';

export type TeamStandingData = {
	points: number;
	positionNumber: number;
	positionText: string;
	wins: number;
	year: number;
};

export type TeamHistoryData = {
	constructorId: string;
	name: string;
	colors: { primaryHex: string };
	standings: { nodes: TeamStandingData[] };
};

export type TeamData = {
	id: string;
	name: string;
	nationality: string;
	colors: { primaryHex: string };
	url: string;

	antecedents: { nodes: TeamHistoryData[] };

	standings: { nodes: TeamStandingData[] };

	results: {
		nodes: {
			raceId: number;
			race: { round: number };
			driverId: string;
			driver: { abbreviation: string };
			gridPositionNumber: number;
			positionDisplayOrder: number;
			points: number;
		}[];
	};

	drivers: {
		nodes: {
			year: number;
			driver: {
				id: string;
				firstName: string;
				lastName: string;
				driverStandings: {
					nodes: {
						year: number;
						points: number;
						positionNumber: number;
						wins: number;
					}[];
				};
			};
		}[];
	};
};

export type ConstructorPageData = {
	team: TeamData;
	races: { nodes: { rowId: number; round: number; officialName: string; date: string }[] };
};

const ConstructorDataQuery = gql`
	query ConstructorDataQuery($constructorRef: String!, $season: Int!) {
		team: constructor(id: $constructorRef) {
			id
			name
			nationality
			colors {
				primaryHex
			}
			url

			drivers: seasonEntrantDrivers(orderBy: YEAR_ASC) {
				nodes {
					year
					driver {
						id
						firstName
						lastName
						driverStandings: seasonDriverStandings(orderBy: YEAR_ASC) {
							nodes {
								year
								points
								positionNumber
								wins
							}
						}
					}
				}
			}

			standings: seasonConstructorStandings(orderBy: YEAR_ASC) {
				nodes {
					points
					positionNumber
					positionText
					wins
					year
				}
			}

			antecedents {
				nodes {
					constructorId
					name
					colors {
						primaryHex
					}
					standings: seasonConstructorStandings(orderBy: YEAR_ASC) {
						nodes {
							points
							positionNumber
							positionText
							wins
							year
						}
					}
				}
			}

			results: raceResults(condition: { year: $season }) {
				nodes {
					raceId
					race {
						round
					}
					driverId
					driver {
						abbreviation
					}
					gridPositionNumber
					positionDisplayOrder
					points
				}
			}
		}

		races(condition: { year: $season }, orderBy: ROUND_ASC) {
			nodes {
				rowId
				round
				officialName
				date
			}
		}
	}
`;

export default function useConstructorData(constructorRef?: string, season?: number) {
	return useQuery<ConstructorPageData>(ConstructorDataQuery, {variables: {constructorRef, season}});
}
