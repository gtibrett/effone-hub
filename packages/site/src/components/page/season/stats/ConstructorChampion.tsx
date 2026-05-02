import {StatCard, useAppState} from '@/components/app';
import {gql, useQuery} from '@apollo/client';
import {Season} from '@/gql/graphql';

type Data = {
	season: Pick<Season, 'seasonConstructorStandingsByYear'> | null;
}

const query = gql`
	query seasonConstructorChampionQuery($season: Int!) {
		season(year: $season) {
			seasonConstructorStandingsByYear(orderBy: POSITION_NUMBER_ASC, first: 1) {
				nodes {
					constructorId
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

	const nodes = data?.season?.seasonConstructorStandingsByYear?.nodes ?? [];
	if (!nodes.length) {
		return null;
	}

	const {constructorId} = nodes[0];
	if (!constructorId) {
		return null;
	}
	champion.set(constructorId, 1);

	return <StatCard label={label} loading={loading} data={champion as unknown as Map<number, number>} format={() => ''} variant="team" noGrid cardProps={{sx: {'& > .MuiCardHeader-root': {px: 0, pb: 0}}}}/>;
}