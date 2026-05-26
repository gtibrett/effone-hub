import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { DriverId } from '@/types';

import { CircuitDialogData } from './types';

const CircuitDataQuery = gql`
	query CircuitDataQuery($circuitId: String!, $driverId: String!) {
		circuit(rowId: $circuitId) {
			id
			rowId
			fullName
			longitude
			latitude
			races {
				id
				rowId
				year
				date
				raceResults(condition: {driverId: $driverId}) {
					id
					gridPositionNumber
					positionDisplayOrder
					positionText
					points
					timeMillis
					reasonRetired
					team {
						id
						rowId
						colors {
							id
							primaryHex
						}
					}
				}
				lapTimes(condition: {driverId: $driverId}) {
					id
					lap
					milliseconds
				}
			}
		}
		driver(rowId: $driverId) {
			id
			seasonEntrantDrivers {
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

export default function useCircuitDialogData(circuitId?: string, driverId?: DriverId) {
	return useQuery<CircuitDialogData>(CircuitDataQuery, {
		variables: { circuitId, driverId },
		skip: !circuitId || !driverId
	});
}
