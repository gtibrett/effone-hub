import {Constructor} from '@/gql/graphql';
import {gql, useLazyQuery} from '@apollo/client';
import {useMemo} from 'react';

const ConstructorFields = gql`
	fragment ConstructorFields on Constructor {
		id
		name
		countryId
		colors {
			primaryHex
			secondaryHex
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
	query constructorById($id: String!) {
		constructor(id: $id) {
			...ConstructorFields
		}
	}
`;


export default function useTeam(constructorId?: Constructor['id']): { team?: Constructor } {
	const variables = {id: constructorId ?? ''};

	const [loadTeam, {called, data}] = useLazyQuery<{ constructor: Constructor | null }>(query, {variables});

	return useMemo(() => {
		if (!called) {
			loadTeam();
		}

		return {team: data?.constructor ?? undefined};
	}, [called, data, loadTeam]);
}
