import { gql } from '@apollo/client';

import type { FastestLap as FastestLapNode, Race, Season } from '@/gql/graphql';

export type FastestLapQueryData = {
	season:
		| (Pick<Season, 'year'> & {
				racesByYear: (Pick<Race, 'rowId' | 'round' | 'officialName'> & {
					fastestLaps: Pick<FastestLapNode, 'driverId' | 'lap' | 'time' | 'timeMillis'>[];
				})[];
		  })
		| null;
};

export const seasonWinsQuery = gql`
	query SeasonWinsQuery($season: Int!) {
		season(year: $season) {
			year
			racesByYear {
				rowId
				year
				round
				raceResults(condition: {positionNumber: 1}, first: 1) {
					raceId
					driverId
				}
			}
		}
	}
`;

export const seasonSprintWinsQuery = gql`
	query SeasonSprintWinsQuery($season: Int!) {
		season(year: $season) {
			year
			racesByYear {
				rowId
				year
				round
				sprintRaceResults(condition: {positionNumber: 1}, first: 1) {
					raceId
					driverId
				}
			}
		}
	}
`;

export const seasonPolesQuery = gql`
	query SeasonPolesQuery($season: Int!) {
		season(year: $season) {
			year
			racesByYear {
				rowId
				year
				round
				qualifyingResults(condition: {positionNumber: 1}, first: 1) {
					raceId
					driverId
				}
			}
		}
	}
`;

export const seasonLapLeaderQuery = gql`
	query SeasonLapLeaderQuery($season: Int!) {
		season(year: $season) {
			year
			racesByYear {
				rowId
				year
				round
				lapTimes {
					raceId
					driverId
					lap
					position
				}
			}
		}
	}
`;

export const seasonFastestLapQuery = gql`
	query seasonFastestLapQuery($season: Int!) {
		season(year: $season) {
			year
			racesByYear {
				rowId
				year
				round
				officialName
				fastestLaps(orderBy: TIME_MILLIS_ASC, first: 1) {
					raceId
					driverId
					lap
					time
					timeMillis
				}
			}
		}
	}
`;

export const seasonPositionsGainedQuery = gql`
	query SeasonPositionsGainedQuery($season: Int!) {
		season(year: $season) {
			year
			racesByYear {
				rowId
				year
				round
				raceResults {
					raceId
					driverId
					gridPositionNumber
					positionNumber
				}
			}
		}
	}
`;

export const seasonDNFsQuery = gql`
	query SeasonDNFsQuery($season: Int!) {
		season(year: $season) {
			year
			racesByYear {
				rowId
				year
				round
				raceResults {
					raceId
					driverId
					reasonRetired
				}
			}
		}
	}
`;

export const seasonDriverChampionQuery = gql`
	query SeasonDriverChampionQuery($season: Int!) {
		seasonDriverStandings(condition: {year: $season}, orderBy: POSITION_NUMBER_ASC, first: 1) {
			year
			driverId
		}
	}
`;

export const seasonConstructorChampionQuery = gql`
	query seasonConstructorChampionQuery($season: Int!) {
		season(year: $season) {
			year
			seasonTeamStandingsByYear(orderBy: POSITION_NUMBER_ASC, first: 1) {
				year
				teamId
				engineManufacturerId
			}
		}
	}
`;
