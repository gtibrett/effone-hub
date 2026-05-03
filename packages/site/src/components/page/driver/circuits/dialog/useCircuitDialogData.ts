import {DriverId} from '@/types';
import {gql, useQuery} from '@apollo/client';
import {CircuitDialogData} from './types';

const CircuitDataQuery = gql`
	query CircuitDataQuery($circuitId: String!, $driverId: String!) {
		circuit(rowId: $circuitId) {
			rowId
			fullName
			longitude
			latitude
			races {
				nodes {
					rowId
					year
					date
					raceResults(condition: {driverId: $driverId}) {
						nodes {
							gridPositionNumber
							positionDisplayOrder
							positionText
							points
							timeMillis
							reasonRetired
							team {
								rowId
								colors {
									primaryHex
								}
							}
						}
					}
					lapTimes(condition: {driverId: $driverId}) {
						nodes {
							lap
							milliseconds
						}
					}
				}
			}
		}
		driver(rowId: $driverId) {
			id
			seasonEntrantDrivers {
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
	}
`;

export default function useCircuitDialogData(circuitId?: string, driverId?: DriverId) {
	return useQuery<CircuitDialogData>(CircuitDataQuery, {variables: {circuitId, driverId}});
}
