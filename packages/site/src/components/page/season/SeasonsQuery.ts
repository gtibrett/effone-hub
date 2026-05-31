import { gql } from '@apollo/client';

const SeasonsQuery = gql`
	query SeasonsQuery {
		seasons(orderBy: YEAR_DESC) {
			year
			seasonTeamStandingsByYear(orderBy: POSITION_NUMBER_ASC, first: 1) {
				year
				teamId
				engineManufacturerId
				points
				positionNumber
			}
			seasonDriverStandingsByYear(orderBy: POSITION_NUMBER_ASC, first: 3) {
				year
				driverId
				points
				positionNumber
			}
		}
	}
`;

export default SeasonsQuery;
