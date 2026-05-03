import {Team} from '@/gql/graphql';
import {gql, useLazyQuery} from '@apollo/client';
import {useMemo} from 'react';

const TeamFields = gql`
	fragment TeamFields on Team {
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
	${TeamFields}
	query teamById($rowId: String!) {
		team(rowId: $rowId) {
			...TeamFields
		}
	}
`;


export default function useTeam(constructorId?: Team['id']): { team?: Team } {
	const variables = {rowId: constructorId ?? ''};

	const [loadTeam, {called, data}] = useLazyQuery<{ team: Team | null }>(query, {variables});

	return useMemo(() => {
		if (!called) {
			loadTeam();
		}

		return {team: data?.team ?? undefined};
	}, [called, data, loadTeam]);
}
