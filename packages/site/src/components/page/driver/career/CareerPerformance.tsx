'use client';

import { Paper, Typography } from '@mui/material';
import { deepPurple, green, red } from '@mui/material/colors';
import { PieChart } from '@mui/x-charts/PieChart';

import type { SimpleApolloResult } from '@/app/lib/apollo-types';
import { useDarkMode } from '@/components/ui';
import { ChartsTooltipBody, useChartsTheme } from '@/components/ui/charts';
import { blueGrey } from '@/components/ui/colors';

import type { DriverPageData } from '../types';
import usePerformanceData from '../usePerformanceData';

type CareerPerformanceProps = SimpleApolloResult<DriverPageData>;

type Slice = { id: string; label: string; value: number; color: string };

function CareerPerformanceTooltip(props: { itemData?: { seriesId?: string; dataIndex?: number } }) {
	const { itemData } = props;
	if (!itemData || itemData.dataIndex == null) {
		return null;
	}
	const slice = (props as unknown as { series?: { data?: Slice[] } }).series?.data?.[
		itemData.dataIndex
	];
	if (!slice) {
		return null;
	}
	return (
		<ChartsTooltipBody>
			<Typography variant="caption">{slice.label}</Typography>
		</ChartsTooltipBody>
	);
}

export default function CareerPerformance({ data }: CareerPerformanceProps) {
	const summaryData = usePerformanceData(data?.driver.raceResults);
	const prefersDarkMode = useDarkMode();
	const { sx } = useChartsTheme();

	if (!summaryData) {
		return null;
	}

	const chartData: Slice[] = [
		{
			id: 'wins',
			label: `Wins: ${summaryData.wins}`,
			value: summaryData.wins,
			color: deepPurple[prefersDarkMode ? 200 : 600]
		},
		{
			id: 'podiums',
			label: `Podiums: ${summaryData.podiums}`,
			value: summaryData.podiums - summaryData.wins,
			color: green[prefersDarkMode ? 200 : 600]
		},
		{
			id: 'inPoints',
			label: `In Points: ${summaryData.inPoints}`,
			value: summaryData.inPoints - summaryData.podiums,
			color: blueGrey[prefersDarkMode ? 200 : 600]
		},
		{
			id: 'appearances',
			label: `Out of Points: ${summaryData.appearances}`,
			value: summaryData.appearances - summaryData.inPoints - summaryData.DNFs,
			color: blueGrey[prefersDarkMode ? 100 : 300]
		},
		{
			id: 'DNFs',
			label: `DNFs: ${summaryData.DNFs}`,
			value: summaryData.DNFs,
			color: red[prefersDarkMode ? 200 : 600]
		}
	].filter(s => s.value > 0);

	return (
		<Paper variant="outlined" className="h-[132px] p-2" aria-hidden>
			<PieChart
				height={116}
				series={[
					{
						data: chartData.map(s => ({
							id: s.id,
							label: s.label,
							value: s.value,
							color: s.color
						})),
						innerRadius: 12,
						paddingAngle: 3,
						cornerRadius: 3,
						arcLabel: () => '',
						highlightScope: { fade: 'global', highlight: 'item' }
					}
				]}
				margin={{ top: 0, right: 110, bottom: 0, left: 0 }}
				slotProps={{
					legend: {
						direction: 'vertical',
						position: { vertical: 'middle', horizontal: 'end' }
					},
					tooltip: { trigger: 'item' }
				}}
				slots={{ itemContent: CareerPerformanceTooltip }}
				sx={sx}
			/>
		</Paper>
	);
}
