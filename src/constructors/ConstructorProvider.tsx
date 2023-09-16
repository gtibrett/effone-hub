import {gql, useQuery} from '@apollo/client';
import {Team} from '@gtibrett/effone-hub-graph-api';

export type TeamId = Team['teamId'];

const byIdQuery = gql`
	query constructorById($teamId: Int!) {
		team: team(teamId: $teamId) {
			teamId
			constructorRef
			name
			nationality
			bio {
				description
				title
				extract
			}
		}
	}
`;

const byRefQuery = gql`
	query constructorById($teamRef: String!) {
		team: teamByConstructorRef(constructorRef: $teamRef) {
			teamId
			constructorRef
			name
			nationality
			bio {
				description
				title
				extract
			}
		}
	}
`;

export const useTeam = (teamId?: TeamId): { team?: Team, loading: boolean } => {
	const {data, loading} = useQuery<{ team: Team }>(byIdQuery, {variables: {teamId}});
	
	return {team: data?.team, loading};
};

export const useTeamByRef = (teamRef?: string): { team?: Team, loading: boolean } => {
	const {data, loading} = useQuery<{ team: Team }>(byRefQuery, {variables: {teamRef}});
	
	return {team: data?.team, loading};
};