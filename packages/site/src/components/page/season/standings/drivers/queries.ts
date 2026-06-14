import { gql } from '@apollo/client';

export type SeasonDriverStandingDriverColors = {
	teamId: string;
	primaryHex: string | null;
	secondaryHex: string | null;
};

export type SeasonDriverStandingEntrant = {
	year: number;
	driverId: string;
	teamId: string;
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
						year
						driverId
						teamId
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
