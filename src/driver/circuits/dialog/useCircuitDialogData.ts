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
					positionOrder
					milliseconds
					points
					status {
						status
					}
				}
				lapTimes (condition: {driverId: $driverId}) {
					lap
					milliseconds
				}
			}
		}
		driver: driver(driverId: $driverId) {
			driverId
			dob
			forename
			surname
			code
			number
			nationality
			url
			currentTeam {
				team {
					colors {
						primary
					}
				}
			}
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

export default function useCircuitDialogData(circuitId?: number, driverId?: number) {
	return useQuery<CircuitDialogData>(CircuitDataQuery, {variables: {circuitId, driverId}});
}