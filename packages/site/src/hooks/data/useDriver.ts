import {gql, useLazyQuery} from '@apollo/client';
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

		seasonEntrantDrivers(orderBy: YEAR_DESC, first: 1) {
			nodes {
				year
				team {
					id
					colors {
						primaryHex
					}
				}
			}
		}

		teamsByYear: seasonEntrantDrivers(orderBy: YEAR_DESC) {
			nodes {
				year
				team {
					id
					colors {
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

	const [loadDriver, {called, loading, data}] = useLazyQuery<{ driver: Driver }>(DriverQuery, {variables});

	return useMemo((): Driver | undefined => {
		if (!called) {
			loadDriver();
		}

		if (!called || loading || !data?.driver) {
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
	}, [called, data, loadDriver, loading]);
}
