import {Race as RaceT} from '@/gql/graphql';
import {gql, useSuspenseQuery} from '@apollo/client';

const raceQuery = gql`
	#graphql
	query raceBySeasonRound($season: Int!, $round: Int!) {
		races(condition: { year: $season, round: $round }) {
			nodes {
				raceResults {
					nodes {
						driver {
							id
							rowId
						}
						driverId
						teamId
						gridPositionNumber
						positionNumber
						positionText
						positionDisplayOrder
						points
						laps
						time
						timeMillis
						reasonRetired
					}
				}
				sprintRaceResults {
					nodes {
						driver {
							id
							rowId
						}
						driverId
						teamId
						gridPositionNumber
						positionNumber
						positionText
						positionDisplayOrder
						points
						laps
						time
						timeMillis
						reasonRetired
					}
				}
			}
		}
	}
`;

export default function useRace(season: number, round: number) {
	const {data} = useSuspenseQuery<{
		races: { nodes: RaceT[] }
	}>(raceQuery, {variables: {season: season, round: round}});

	return data.races.nodes[0];
}