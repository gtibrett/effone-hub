import {gql} from '@apollo/client';

const SeasonsQuery = gql`
	query SeasonsQuery {
		seasons(condition: {hasResults: true, ended: true}, orderBy: YEAR_DESC) {
			nodes {
				year
				seasonConstructorStandingsByYear(orderBy: POSITION_NUMBER_ASC, first: 1) {
					nodes {
						constructorId
						points
						positionNumber
					}
				}
				seasonDriverStandingsByYear(orderBy: POSITION_NUMBER_ASC, first: 3) {
					nodes {
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
