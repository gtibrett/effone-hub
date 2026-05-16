import {Team} from '@/gql/graphql';
import {gql, useQuery} from '@apollo/client';
import {useMemo} from 'react';

const TeamFields = gql`
	fragment TeamFields on Team {
		id
		name
		countryId
		colors {
			id
			primaryHex
			secondaryHex
		}
		bio {
			title
			extract
			thumbnailUrl
			sourceUrl
		}
	}
`;

export const TeamQuery = gql`
	${TeamFields}
	query teamById($rowId: String!) {
		team(rowId: $rowId) {
			...TeamFields
		}
	}
`;


export default function useTeam(constructorId?: Team['id']): { team?: Team } {
	const variables = {rowId: constructorId ?? ''};

	const {data} = useQuery<{team: Team | null}>(TeamQuery, {
		variables,
		skip: !constructorId
	});

	return useMemo(() => ({team: data?.team ?? undefined}), [data]);
}
