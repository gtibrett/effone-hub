import { gql } from '@apollo/client';

// Exported so cached-data.ts can reuse the same document for the SSR dialog route.
export const CircuitDataQuery = gql`
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
