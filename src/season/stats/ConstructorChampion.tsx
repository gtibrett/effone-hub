import {gql, useQuery} from '@apollo/client';
import {useAppState} from '@effonehub/app';
import {StatCard} from '@effonehub/ui-components';
import {Team} from '@gtibrett/effone-hub-graph-api';

type Data = {
	finalTeamStandingsByYears: {
		teamId: Team['teamId']
	}[]
}

const query = gql`
	query seasonConstructorChampionQuery($season: Int!) {
		finalTeamStandingsByYears (condition: {year: $season}, orderBy: POSITION_ASC, first: 1) {
			teamId
		}
	}
`;

export default function ConstructorChampion({season}: { season: number }) {
	const {loading, data: {finalTeamStandingsByYears = []} = {}} = useQuery<Data>(query, {variables: {season}});
	
	const [{currentSeason}] = useAppState();
	const champion          = new Map<number, number>();
	const label             = season === currentSeason ? 'Constructor Leader' : 'Constructor Champion';
	
	if (!finalTeamStandingsByYears.length) {
		return null;
	}
	
	const {teamId} = finalTeamStandingsByYears[0];
	champion.set(teamId, 1);
	
	return <StatCard label={label} loading={loading} data={champion} format={() => ''} variant="team" noGrid cardProps={{sx: {'& > .MuiCardHeader-root': {px: 0, pb: 0}}}}/>;
}