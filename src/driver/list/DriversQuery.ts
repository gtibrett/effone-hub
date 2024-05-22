import {gql} from '@apollo/client';

const DriversQuery = gql`
	#graphql
	query DriversQuery {
		drivers (orderBy: SURNAME_ASC) {
			driverId
			driverRef
			forename
			surname
			nationality
#			driverStandingsBySeasons{
#				position
#			}
			results {
				positionOrder
			}
			teamsByYear {
				year
				teamId
				team {
					name
				}
			}
		}
	}
`;

export default DriversQuery;