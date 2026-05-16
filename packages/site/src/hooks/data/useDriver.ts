import {gql, useQuery} from '@apollo/client';
import {Driver} from '@/gql/graphql';
import {useMemo} from 'react';

const DriverFields = gql`
	fragment DriverFields on Driver {
		id
		rowId
		dateOfBirth
		firstName
		lastName
		abbreviation
		permanentNumber
		nationalityCountryId

		bio {
			title
			extract
			thumbnailUrl
			sourceUrl
		}

		seasonEntrantDrivers(orderBy: YEAR_DESC, first: 1) {
			nodes {
				id
				year
				team {
					id
					colors {
						id
						primaryHex
					}
				}
			}
		}

		teamsByYear: seasonEntrantDrivers(orderBy: YEAR_DESC) {
			nodes {
				id
				year
				team {
					id
					colors {
						id
						primaryHex
					}
				}
			}
		}
	}
`;

export const DriverQuery = gql`
	${DriverFields}
	query DriverQuery($id: String!) {
		driver(rowId: $id) {
			...DriverFields
		}
	}
`;

export default function useDriver(driverId?: string) {
	const variables = {id: driverId ?? ''};

	const {loading, data} = useQuery<{driver: Driver}>(DriverQuery, {
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
				abbreviation: (driverData?.lastName || '').replace(/[^a-z]/i, '').substring(0, 3).toUpperCase()
			};
		}

		return driverData;
	}, [data, loading]);
}
