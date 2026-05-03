import {DriverId} from '@/types';
import {gql, useQuery} from '@apollo/client';
import {CircuitDialogData} from './types';

const CircuitDataQuery = gql`
	query CircuitDataQuery($circuitId: String!, $driverId: String!) {
		circuit(id: $circuitId) {
			rowId
			fullName
			longitude
			latitude
			races {
				nodes {
					rowId
					year
					date
					results(condition: {driverId: $driverId}) {
						gridPositionNumber
						positionDisplayOrder
						positionText
						points
						timeMillis
						reasonRetired
						constructor {
							rowId
							colors {
								primaryHex
							}
						}
					}
					lapTimes(condition: {driverId: $driverId}) {
						nodes {
							lap
							timeMillis
						}
					}
				}
			}
		}
		driver(id: $driverId) {
			id
			seasonEntrantDrivers {
				nodes {
					year
					constructor {
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
