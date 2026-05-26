import { gql } from '@apollo/client';

const SeasonsQuery = gql`
	query SeasonsQuery {
		seasons(orderBy: YEAR_DESC) {
			id
			year
			seasonTeamStandingsByYear(orderBy: POSITION_NUMBER_ASC, first: 1) {
				id
				teamId
				points
				positionNumber
			}
			seasonDriverStandingsByYear(orderBy: POSITION_NUMBER_ASC, first: 3) {
				id
				driverId
				points
				positionNumber
			}
		}
	}
`;

export default SeasonsQuery;
