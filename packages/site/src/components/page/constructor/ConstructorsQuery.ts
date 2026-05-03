import {gql} from '@apollo/client';

const ConstructorsQuery = gql`
	#graphql
	query ConstructorsQuery {
		teams (orderBy: NAME_ASC) {
			nodes {
				id
				rowId
				name
				countryId
				colors {
					primaryHex
					secondaryHex
				}
				seasons: seasonTeams {
					nodes {
						year
					}
				}
				raceResults {
					nodes {
						raceId
						driverId
						positionNumber
					}
				}
			}
		}
	}
`;

export default ConstructorsQuery;