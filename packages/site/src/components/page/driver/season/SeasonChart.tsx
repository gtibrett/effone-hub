import type { DriverCareerData } from '@/app/lib/cached-data';
import {
	ChartSwitcher,
	type ChartSwitcherChart,
	LineChartByTeam,
	type LineChartByTeamProps
} from '@/components/app';
import type { Race } from '@/gql/graphql';
import { useGetTeamColor } from '@/hooks';

import CareerBreakdownChart from '../career/CareerBreakdownChart';
import CareerTooltip from '../career/CareerTooltip';

type SeasonTeamInfo =
	| {
			id?: string | null;
			colors?: { primaryHex?: string | null } | null;
	  }
	| null
	| undefined;

type SeasonChartProps = {
	driverId: string | undefined;
	season?: number;
	races: Race[];
	loading: boolean;
	careerData: DriverCareerData['driver'] | null | undefined;
	currentSeasonTeam: SeasonTeamInfo;
};

export default function SeasonChart({
	driverId,
	season,
	races,
	loading,
	careerData,
	currentSeasonTeam
}: SeasonChartProps) {
	const getTeamColor = useGetTeamColor();
	const seasonResults = races
		?.filter(r => r.raceResults?.length)
		.map(r => ({ ...r.raceResults?.[0], race: r }));
	const firstResult = seasonResults?.[0];

	if (!firstResult || loading) {
		return null;
	}

	const chartData = seasonResults.map(
		({ race: { round }, gridPositionNumber, positionDisplayOrder }) => ({
			teamId: currentSeasonTeam?.id ?? '',
			color: getTeamColor(currentSeasonTeam?.colors, 'primaryHex'),
			round,
			grid: gridPositionNumber,
			position: positionDisplayOrder
		})
	);

	const baseProps: Omit<LineChartByTeamProps, 'yKey'> = {
		xKey: 'round',
		data: chartData,
		tooltip: CareerTooltip,
		height: 250
	};

	const charts: ChartSwitcherChart[] = [
		{
			id: 'breakdown',
			label: 'Breakdown',
			chart: (
				<CareerBreakdownChart driverId={driverId} careerData={careerData} season={season} />
			)
		},
		{
			id: 'position',
			label: 'Position',
			chart: <LineChartByTeam {...baseProps} yKey="position" invert min={1} max={20} />
		},
		{
			id: 'qualifying',
			label: 'Qualifying',
			chart: <LineChartByTeam {...baseProps} yKey="grid" invert min={1} max={20} />
		}
	];

	return <ChartSwitcher title="Season" charts={charts} size={250} initial="breakdown" />;
}
