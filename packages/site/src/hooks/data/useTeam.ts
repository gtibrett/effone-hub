import {Constructor} from '@/gql/graphql';
import {gql, useLazyQuery} from '@apollo/client';
import {useMemo} from 'react';

const ConstructorFields = gql`
	fragment ConstructorFields on Team {
		id
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
	query constructorById($id: String = "") {
		teams(condition: { id: $id }) {
			nodes {
				...ConstructorFields
			}
		}
	}
`;


export default function useTeam(constructorId?: Constructor['id']): { team?: Constructor } {
	const variables = {id: constructorId ?? ''};

	const [loadTeam, {called, data}] = useLazyQuery<{ teams: { nodes: Constructor[] } }>(query, {variables});

	return useMemo(() => {
		if (!called) {
			loadTeam();
		}

		return {team: data?.teams?.nodes?.[0] ?? undefined};
	}, [called, data, loadTeam]);
}