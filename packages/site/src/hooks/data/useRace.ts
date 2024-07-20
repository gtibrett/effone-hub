import {Race as RaceT} from '@/gql/graphql';
import {gql, useSuspenseQuery} from '@apollo/client';

const raceQuery = gql`
	#graphql
	query raceBySeasonRound($season: Int!, $round: Int!) {
		races(condition: { year: $season, round: $round }) {
			name
			date
			round
			url
			summary {
				extract
			}
			circuit {
				circuitRef
				name
				location
				country
				lat
				lng
				circuitDescription {
					description
				}
			}
			results {
				driver {
					driverId
				}
				teamId
				grid
				position
				positionText
				positionOrder
				points
				laps
				time
				milliseconds
				fastestLap
				rank
				fastestLapTime
				status {
					status
				}
			}
			sprintResults {
				driver {
					driverId
				}
				teamId
				grid
				position
				positionText
				positionOrder
				points
				laps
				time
				milliseconds
				fastestLap
				fastestLapTime
				status {
					status
				}
			}
		}
	}
`;

export default function useRace(season: number, round: number) {
	const {data} = useSuspenseQuery<{
		races: RaceT[]
	}>(raceQuery, {variables: {season: season, round: round}});
	
	return data.races[0];
}