import {StatCard, useAppState} from '@/components/app';
import { gql } from '@apollo/client';

import { useQuery } from "@apollo/client/react";

type Data = {
	season: {
		seasonTeamStandingsByYear: { nodes: Array<{ teamId: string }> };
	} | null;
}

const query = gql`
	query seasonConstructorChampionQuery($season: Int!) {
		season(year: $season) {
			seasonTeamStandingsByYear(orderBy: POSITION_NUMBER_ASC, first: 1) {
				nodes {
					id
					teamId
				}
			}
		}
	}
`;

export default function ConstructorChampion({season}: { season: number }) {
	const {loading, data} = useQuery<Data>(query, {variables: {season}});

	const [{currentSeason}] = useAppState();
	const champion          = new Map<string, number>();
	const label             = season === currentSeason ? 'Constructor Leader' : 'Constructor Champion';

	const nodes = data?.season?.seasonTeamStandingsByYear?.nodes ?? [];
	if (!nodes.length) {
		return null;
	}

	const teamId = nodes[0]?.teamId;
	if (!teamId) {
		return null;
	}
	champion.set(teamId, 1);

	return <StatCard label={label} loading={loading} data={champion} format={() => ''} variant="team" noGrid cardProps={{className: '[&>.MuiCardHeader-root]:px-0 [&>.MuiCardHeader-root]:pb-0'}}/>;
}