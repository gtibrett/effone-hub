import {gql} from '@apollo/client';

const DriversQuery = gql`
	#graphql
	query DriversQuery {
		drivers (orderBy: LAST_NAME_ASC) {
			nodes {
				id
				rowId
				firstName
				lastName
				nationalityCountryId
#			driverStandingsBySeasons{
#				position
#			}
			}
		}
	}
`;

export default DriversQuery;