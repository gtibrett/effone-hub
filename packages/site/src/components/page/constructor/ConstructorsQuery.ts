import {gql} from '@apollo/client';

const ConstructorsQuery = gql`
	#graphql
	query ConstructorsQuery {
		teams (orderBy: NAME_ASC) {
			teamId
			constructorRef
			name
			colors {
				primary
			}
			seasons : driversByYear{
				year
			}
			results {
				positionOrder
			}
		}
	}
`;

export default ConstructorsQuery;