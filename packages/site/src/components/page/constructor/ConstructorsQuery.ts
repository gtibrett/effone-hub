import {gql} from '@apollo/client';

const ConstructorsQuery = gql`
	#graphql
	query ConstructorsQuery {
		teams (orderBy: NAME_ASC) {
			nodes {
				id
				name
				countryId
			}
		}
	}
`;

export default ConstructorsQuery;