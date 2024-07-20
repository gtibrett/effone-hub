import {Team} from '@/gql/graphql';
import {gql, useLazyQuery} from '@apollo/client';
import {useMemo} from 'react';

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


export default function useTeam(teamIdOrRef?: Team['teamId'] | Team['constructorRef']): { team?: Team } {
	const variables = {
		teamId:            typeof teamIdOrRef === 'number' ? teamIdOrRef : undefined,
		constructorRef:    typeof teamIdOrRef === 'string' ? teamIdOrRef : undefined,
		useConstructorRef: typeof teamIdOrRef === 'string'
	};
	
	const [loadTeam, {called, loading, data}] = useLazyQuery<{ teamById: Team, teamByRef: Team }>(query, {variables});
	
	return useMemo(() => {
		if (!called) {
			loadTeam();
		}
		
		return {team: data?.teamById || data?.teamByRef || undefined};
	}, [called, data, loadTeam]);
}