import { gql } from '@apollo/client';

export type SeasonTeamStandingColors = {
	teamId: string;
	primaryHex: string | null;
	secondaryHex: string | null;
};

export type SeasonTeamStandingTeamNode = {
	id: string;
	name: string | null;
	bio: { thumbnailUrl: string | null } | null;
	colors: SeasonTeamStandingColors | null;
};

export type SeasonTeamStandingNode = {
	teamId: string;
	positionNumber: number | null;
	points: string;
	team: SeasonTeamStandingTeamNode | null;
};

export const constructorStandingsQuery = gql`
	query constructorStandingsQuery($season: Int!) {
		season(year: $season) {
			year
			seasonTeamStandingsByYear(orderBy: POSITION_NUMBER_ASC) {
				teamId
				positionNumber
				points
				team {
					id
					name
					bio { thumbnailUrl }
					colors {
						teamId
						primaryHex
						secondaryHex
					}
				}
			}
			racesByYear(orderBy: ROUND_ASC) {
				year
				round
				raceTeamStandings(orderBy: POSITION_NUMBER_ASC) {
					raceId
					teamId
					engineManufacturerId
					positionNumber
					points
					team {
						id
						name
						colors {
							teamId
							primaryHex
						}
					}
				}
			}
		}
	}
`;
