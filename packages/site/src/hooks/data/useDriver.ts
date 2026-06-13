import { useMemo } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import type { Driver } from '@/gql/graphql';

const DriverFields = gql`
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

export default function useDriver(driverId?: string) {
	const variables = { id: driverId ?? '' };

	const { loading, data } = useQuery<{ driver: Driver }>(DriverQuery, {
		variables,
		skip: !driverId
	});

	return useMemo((): Driver | undefined => {
		if (loading || !data?.driver) {
			return undefined;
		}

		const driverData = data.driver;

		if (!driverData.abbreviation) {
			return {
				...driverData,
				abbreviation: (driverData?.lastName || '')
					.replace(/[^a-z]/i, '')
					.substring(0, 3)
					.toUpperCase()
			};
		}

		return driverData;
	}, [data, loading]);
}
