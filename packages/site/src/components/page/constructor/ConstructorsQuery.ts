import { gql } from '@apollo/client';

const ConstructorsQuery = gql`
	#graphql
	query ConstructorsQuery {
		teams (orderBy: NAME_ASC) {
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
				id
				year
			}
			raceResults {
				id
				raceId
				driverId
				positionNumber
			}
		}
	}
`;

export default ConstructorsQuery;
