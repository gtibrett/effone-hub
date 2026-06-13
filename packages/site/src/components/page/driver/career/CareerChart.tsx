import { ChartSwitcher, type ChartSwitcherChart, LineChartByTeam } from '@/components/app';
import type { DriverId } from '@/types';

import CareerBreakdownChart from './CareerBreakdownChart';
import CareerTooltip from './CareerTooltip';
import useCareerChartDataWithTeam from './useCareerChartDataWithTeam';

type CareerChartProps = {
	driverId: DriverId;
	size: number;
};

export default function CareerChart({ driverId, size }: CareerChartProps) {
	const data = useCareerChartDataWithTeam(driverId);

	const charts: ChartSwitcherChart[] = [
		{
			id: 'breakdown',
			label: 'Breakdown',
			chart: <CareerBreakdownChart driverId={driverId} />
		},
		{
			id: 'position',
			label: 'Position',
			chart: (
				<LineChartByTeam
					xKey="year"
					yKey="position"
					data={data}
					tooltip={CareerTooltip}
					height={size}
					invert
					min={1}
					xOffset={0.5}
					yOffset={0.5}
				/>
			)
		},
		{
			id: 'points',
			label: 'Points',
			chart: (
				<LineChartByTeam
					xKey="year"
					yKey="points"
					data={data}
					tooltip={CareerTooltip}
					height={size}
					xOffset={1}
					yOffset={25}
				/>
			)
		},
		{
			id: 'wins',
			label: 'Wins',
			chart: (
				<LineChartByTeam
					xKey="year"
					yKey="wins"
					data={data}
					tooltip={CareerTooltip}
					height={size}
					xOffset={1}
					yOffset={0.5}
				/>
			)
		}
	];

	return (
		<ChartSwitcher title="Career Timeline" size={size} charts={charts} initial="breakdown" />
	);
}
