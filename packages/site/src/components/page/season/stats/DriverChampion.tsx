import {StatCard, useAppState} from '@/components/app';
import { gql } from '@apollo/client';

import { useQuery } from "@apollo/client/react";

type Data = {
	seasonDriverStandings: {
		nodes: {
			driverId: string
		}[]
	}
}

const query = gql`
	query SeasonDriverChampionQuery($season: Int!) {
		seasonDriverStandings(condition: {year: $season}, orderBy: POSITION_NUMBER_ASC, first: 1) {
			nodes {
				id
				driverId
			}
		}
	}
`;

export default function DriverChampion({season}: { season: number }) {
	const {loading, data: {seasonDriverStandings: {nodes = []} = {}} = {}} = useQuery<Data>(query, {variables: {season}});

	const [{currentSeason}] = useAppState();
	const champion          = new Map<string, number>();
	const label             = season === currentSeason ? 'Driver Leader' : 'Driver Champion';

	if (!nodes.length) {
		return null;
	}

	const {driverId} = nodes[0];
	if (!driverId) {
		return null;
	}

	champion.set(driverId, 1);

	return <StatCard label={label} loading={loading} data={champion} format={() => ''} noGrid cardProps={{className: '[&>.MuiCardHeader-root]:px-0 [&>.MuiCardHeader-root]:pb-0'}}/>;
}