import {gql, useQuery} from '@apollo/client';
import {Driver} from '@gtibrett/effone-hub-graph-api';

export type DriverId = Driver['driverId'];

const byIdQuery = gql`
	query driverById($driverId: Int!) {
		driver: driver(driverId: $driverId) {
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
		}
	}
`;

const byRefQuery = gql`
	query driverByRef($driverRef: String!) {
		driver: driverByDriverRef(driverRef: $driverRef) {
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
		}
	}
`;

export const useDriver = (driverId?: Driver['driverId']) => {
	const {data} = useQuery<{ driver: Driver }>(byIdQuery, {variables: {driverId}});
	
	return data?.driver;
};

export const useDriverByRef = (driverRef?: Driver['driverRef']) => {
	const {data} = useQuery<{ driver: Driver }>(byRefQuery, {variables: {driverRef}});
	
	return data?.driver;
};