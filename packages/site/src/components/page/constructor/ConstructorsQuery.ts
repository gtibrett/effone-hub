import { gql } from '@apollo/client';

const ConstructorsQuery = gql`
	#graphql
	query ConstructorsQuery {
		teams (orderBy: NAME_ASC) {
			id
			name
			countryId
			colors {
				teamId
				primaryHex
				secondaryHex
			}
			seasons: seasonTeams {
				year
				teamId
			}
			raceResults {
				raceId
				driverId
				positionNumber
			}
		}
	}
`;

export default ConstructorsQuery;
