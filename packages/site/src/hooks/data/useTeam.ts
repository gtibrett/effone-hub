import { useMemo } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import { Team } from '@/gql/graphql';

const TeamFields = gql`
	fragment TeamFields on Team {
		id
		name
		country {
	      id
	      name
	      alpha2Code
	    }
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
	const variables = { rowId: constructorId ?? '' };

	const { data } = useQuery<{ team: Team | null }>(TeamQuery, {
		variables,
		skip: !constructorId
	});

	return useMemo(() => ({ team: data?.team ?? undefined }), [data]);
}
