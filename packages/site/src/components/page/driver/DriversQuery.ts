import {gql} from '@apollo/client';

const DriversQuery = gql`
	#graphql
	query DriversQuery {
		drivers (orderBy: LAST_NAME_ASC) {
			nodes {
				id
				firstName
				lastName
				nationality
#			driverStandingsBySeasons{
#				position
#			}
			}
		}
	}
`;

export default DriversQuery;