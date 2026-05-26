import { gql } from '@apollo/client';

const SeasonsQuery = gql`
	query SeasonsQuery {
		seasons(orderBy: YEAR_DESC) {
			nodes {
				id
				year
				seasonTeamStandingsByYear(orderBy: POSITION_NUMBER_ASC, first: 1) {
					nodes {
						id
						teamId
						points
						positionNumber
					}
				}
				seasonDriverStandingsByYear(orderBy: POSITION_NUMBER_ASC, first: 3) {
					nodes {
						id
						driverId
						points
						positionNumber
					}
				}
			}
		}
	}
`;

export default SeasonsQuery;
