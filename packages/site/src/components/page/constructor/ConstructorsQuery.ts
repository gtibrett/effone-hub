import {gql} from '@apollo/client';

const ConstructorsQuery = gql`
	#graphql
	query ConstructorsQuery {
		constructors (orderBy: NAME_ASC) {
			nodes {
				id
				name
				nationality
			}
		}
	}
`;

export default ConstructorsQuery;