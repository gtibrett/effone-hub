import type { SimpleApolloResult } from '@/app/lib/apollo-types';
import {
	ChartSwitcher,
	ChartSwitcherChart,
	LineChartByTeam,
	LineChartByTeamProps
} from '@/components/app';
import { DriverPageData } from '@/components/page/driver';
import { useGetTeamColor } from '@/hooks';
import { useDriver } from '@/hooks/data';

import CareerBreakdownChart from '../career/CareerBreakdownChart';
import CareerTooltip from '../career/CareerTooltip';

type SeasonChartProps = SimpleApolloResult<DriverPageData> & {
	driverId: string | undefined;
	season?: number;
};

export default function SeasonChart({ driverId, season, data, loading }: SeasonChartProps) {
	const getTeamColor = useGetTeamColor();
	const driver = useDriver(driverId);
	const seasonResults = data?.races
		?.filter(r => r.raceResults?.length)
		.map(r => ({ ...r.raceResults?.[0], race: r }));
	const firstResult = seasonResults?.[0];

	if (!firstResult || !driver || loading) {
		return null;
	}

	const chartData = seasonResults.map(
		({ race: { round }, gridPositionNumber, positionDisplayOrder }) => ({
			teamId: driver.seasonEntrantDrivers?.[0]?.team?.id ?? '',
			color: getTeamColor(driver.seasonEntrantDrivers?.[0]?.team?.colors, 'primaryHex'),
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
			chart: <CareerBreakdownChart driverId={driverId} season={season} />
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
