import type { SeasonDriverChampionData } from '@/app/lib/cached-data';
import { StatCard, useAppState } from '@/components/app';

type DriverChampionProps = { season: number; data: SeasonDriverChampionData };

export default function DriverChampion({ season, data }: DriverChampionProps) {
	const [{ currentSeason }] = useAppState();
	const champion = new Map<string, number>();
	const label = season === currentSeason ? 'Driver Leader' : 'Driver Champion';

	const seasonDriverStandings = data?.seasonDriverStandings ?? [];
	if (!seasonDriverStandings.length) {
		return null;
	}

	const { driverId } = seasonDriverStandings[0];
	if (!driverId) {
		return null;
	}

	champion.set(driverId, 1);

	return (
		<StatCard
			label={label}
			loading={false}
			data={champion}
			format={() => ''}
			noGrid
			cardProps={{ className: '[&>.MuiCardHeader-root]:px-0 [&>.MuiCardHeader-root]:pb-0' }}
		/>
	);
}
