import { gql } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/client/react';

import { Race as RaceT } from '@/gql/graphql';

const raceQuery = gql`
	#graphql
	query raceBySeasonRound($season: Int!, $round: Int!) {
		races(condition: { year: $season, round: $round }) {
			year
			round
			raceResults {
				raceId
				driver {
					id
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
			sprintRaceResults {
				raceId
				driver {
					id
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
`;

export default function useRace(season: number, round: number) {
	const { data } = useSuspenseQuery<{
		races: RaceT[];
	}>(raceQuery, { variables: { season: season, round: round } });

	return data.races[0];
}
