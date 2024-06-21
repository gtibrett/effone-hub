import {DriverId} from '@/types';
import {gql, useQuery} from '@apollo/client';
import {CircuitDialogData} from './types';

const CircuitDataQuery = gql`
	query CircuitDataQuery($circuitId: Int!, $driverId: Int!) {
		circuit (circuitId: $circuitId) {
			name
			lat
			lng
			races {
				year
				date
				results (condition: {driverId: $driverId}) {
					grid
					position
					positionOrder
					positionText
					milliseconds
					points
					status {
						status
					}
					team {
						teamId
						colors {
							primary
						}
					}
				}
				lapTimes (condition: {driverId: $driverId}) {
					lap
					milliseconds
				}
			}
		}
		driver: driver(driverId: $driverId) {
			teamsByYear {
				year
				team {
					colors {
						primary
					}
				}
			}
		}
	}
`;

export default function useCircuitDialogData(circuitId?: number, driverId?: DriverId) {
	return useQuery<CircuitDialogData>(CircuitDataQuery, {variables: {circuitId, driverId}});
}