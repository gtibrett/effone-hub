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
					id
					primaryHex
					secondaryHex
				}
				seasons: seasonTeams {
					nodes {
						id
						year
					}
				}
				raceResults {
					nodes {
						id
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