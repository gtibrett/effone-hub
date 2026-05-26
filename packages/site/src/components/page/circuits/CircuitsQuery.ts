import { gql } from '@apollo/client';

const CircuitQuery = gql`
	query CircuitsListQuery {
		circuits(orderBy: FULL_NAME_ASC) {
			id
			rowId
			fullName
			placeName
			countryId
			latitude
			longitude
			type
			direction
			races(orderBy: YEAR_DESC) {
				year
				round
			}
		}
	}
`;

export default CircuitQuery;
