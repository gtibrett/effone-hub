import {gql} from '@apollo/client';

const SeasonsQuery = gql`
	query SeasonsQuery {
		seasons(condition: {hasResults: true, ended: true}, orderBy: YEAR_DESC) {
			year
			racesByYear(orderBy: ROUND_DESC, first: 1) {
				round
				teamStandings(orderBy: POSITION_ASC, first: 1) {
					teamId
					points
					wins
				}
				driverStandings(orderBy: POSITION_ASC, first: 3) {
					driverId
					points
					wins
				}
			}
		}
	}
`;

export default SeasonsQuery;