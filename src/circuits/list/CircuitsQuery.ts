import {gql} from '@apollo/client';

const CircuitQuery = gql`
	#graphql
	query q {
		circuits {
			circuitId
			circuitRef
			name
			location
			country
			lat
			lng

			races {
				year
			}
		}
	}
`;

export default CircuitQuery;