import {gql, useQuery} from '@apollo/client';
import {Driver, Maybe} from '@gtibrett/effone-hub-graph-api';

const DriverFields = gql`
	fragment DriverFields on Driver {
		driverId
		driverRef
		dob
		forename
		surname
		code
		number
		nationality
		url
		bio {
			description
			extract
			thumbnail {
				source
			}
		}

		currentTeam {
			teamId
			team {
				colors {
					primary
				}
			}
		}

		teamsByYear (orderBy: YEAR_DESC) {
			year,
			team {
				teamId
				colors {
					primary
				}
			}
		}
	}
`;

const query = gql`
	${DriverFields}
	query DriverQuery($driverId: Int = -1, $driverRef: String = "", $useDriverRef: Boolean!) {
		driverById: driver(driverId: $driverId) @skip(if: $useDriverRef) {
			...DriverFields
		}

		driverByRef: driverByDriverRef(driverRef: $driverRef) @include(if: $useDriverRef) {
			...DriverFields
		}
	}
`;

export default function useDriver(driverIdOrRef?: Maybe<Driver['driverId']> | Maybe<Driver['driverRef']>) {
	const variables = {
		driverId:     typeof driverIdOrRef === 'number' ? driverIdOrRef : undefined,
		driverRef:    typeof driverIdOrRef === 'string' ? driverIdOrRef : undefined,
		useDriverRef: typeof driverIdOrRef === 'string'
	};
	
	const {data} = useQuery<{ driverById: Driver, driverByRef: Driver }>(query, {variables});
	
	if (!data?.driverById && !data?.driverByRef) {
		return undefined;
	}
	
	const driverData = data.driverById || data.driverByRef;
	
	if (!driverData.code) {
		return {
			...driverData,
			code: (driverData?.surname || '').replace(/[^a-z]/i, '').substring(0, 3).toUpperCase()
		};
	}
	
	return driverData;
};