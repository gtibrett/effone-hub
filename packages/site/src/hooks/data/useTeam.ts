import {gql, useQuery} from '@apollo/client';
import {Team} from '@gtibrett/effone-hub-graph-api';

const ConstructorFields = gql`
	fragment ConstructorFields on Team {
		teamId
		constructorRef
		name
		nationality
		colors {
			primary
		}
		bio {
			description
			title
			extract
		}
	}
`;

const query = gql`
	${ConstructorFields}
	query constructorById($teamId: Int = -1, $constructorRef: String = "", $useConstructorRef: Boolean!) {
		teamById: team(teamId: $teamId) @skip(if: $useConstructorRef) {
			...ConstructorFields
		}

		teamByRef: teamByConstructorRef(constructorRef: $constructorRef) @include(if: $useConstructorRef) {
			...ConstructorFields
		}
	}
`;


export default function useTeam(teamIdOrRef?: Team['teamId'] | Team['constructorRef']): { team?: Team, loading: boolean } {
	const variables = {
		teamId:            typeof teamIdOrRef === 'number' ? teamIdOrRef : undefined,
		constructorRef:    typeof teamIdOrRef === 'string' ? teamIdOrRef : undefined,
		useConstructorRef: typeof teamIdOrRef === 'string'
	};
	
	const {data, loading} = useQuery<{ teamById: Team, teamByRef: Team }>(query, {variables});
	
	return {team: data?.teamById || data?.teamByRef || undefined, loading};
}