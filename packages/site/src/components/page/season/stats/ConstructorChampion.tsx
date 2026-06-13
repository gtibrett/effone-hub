import type { SeasonConstructorChampionData } from '@/app/lib/cached-data';
import { StatCard, useAppState } from '@/components/app';

type ConstructorChampionProps = { season: number; data: SeasonConstructorChampionData };

export default function ConstructorChampion({ season, data }: ConstructorChampionProps) {
	const [{ currentSeason }] = useAppState();
	const champion = new Map<string, number>();
	const label = season === currentSeason ? 'Constructor Leader' : 'Constructor Champion';

	const nodes = data?.season?.seasonTeamStandingsByYear ?? [];
	if (!nodes.length) {
		return null;
	}

	const teamId = nodes[0]?.teamId;
	if (!teamId) {
		return null;
	}
	champion.set(teamId, 1);

	return (
		<StatCard
			label={label}
			loading={false}
			data={champion}
			format={() => ''}
			variant="team"
			noGrid
			cardProps={{ className: '[&>.MuiCardHeader-root]:px-0 [&>.MuiCardHeader-root]:pb-0' }}
		/>
	);
}
