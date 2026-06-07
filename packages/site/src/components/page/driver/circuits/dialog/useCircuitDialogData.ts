import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { DriverId } from '@/types';

import { CircuitDialogData } from './types';

const CircuitDataQuery = gql`
	query CircuitDataQuery($circuitId: String!, $driverId: String!) {
		circuit(id: $circuitId) {
			id
			fullName
			longitude
			latitude
			races {
				rowId
				year
				round
				date
				results: raceResults(condition: {driverId: $driverId}) {
					raceId
					driverId
					gridPositionNumber
					positionDisplayOrder
					positionText
					points
					timeMillis
					reasonRetired
					constructor: team {
						id
						colors {
							teamId
							primaryHex
						}
					}
				}
				lapTimes(condition: {driverId: $driverId}) {
					raceId
					driverId
					lap
					timeMillis: milliseconds
				}
			}
		}
		driver(id: $driverId) {
			id
			seasonEntrantDrivers {
				year
				driverId
				teamId
				constructor: team {
					id
					colors {
						teamId
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
