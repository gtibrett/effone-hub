import { gql } from '@apollo/client';

import type { Driver } from '@/gql/graphql';

export const DriverFields = gql`
	fragment DriverFields on Driver {
		id
		dateOfBirth
		firstName
		lastName
		abbreviation
		permanentNumber
		nationalityCountryId
		nationalityCountry {
			id
			name
			alpha2Code
		}

		bio {
			title
			extract
			thumbnailUrl
			sourceUrl
		}

		seasonEntrantDrivers(orderBy: YEAR_DESC, first: 1) {
			year
			driverId
			teamId
			team {
				id
				colors {
					teamId
					primaryHex
				}
			}
		}

		teamsByYear: seasonEntrantDrivers(orderBy: YEAR_DESC) {
			year
			driverId
			teamId
			team {
				id
				colors {
					teamId
					primaryHex
				}
			}
		}
	}
`;

export const DriverQuery = gql`
	${DriverFields}
	query DriverQuery($id: String!) {
		driver(id: $id) {
			...DriverFields
		}
	}
`;

export type { Driver };
