import { Paper, Typography } from '@mui/material';
import { deepPurple, green, red } from '@mui/material/colors';
import { PieTooltipProps, ResponsivePie } from '@nivo/pie';

import type { SimpleApolloResult } from '@/app/lib/apollo-types';
import { useDarkMode } from '@/components/ui';
import { blueGrey } from '@/components/ui/colors';
import { NivoTooltipFactory, useNivoTheme } from '@/components/ui/nivo';

import { DriverPageData } from '../types';
import usePerformanceData from '../usePerformanceData';

type CareerPerformanceProps = SimpleApolloResult<DriverPageData>;

type PerformanceDatum = { id: string; label: string; value: number; color: string };

const CareerPerformanceTooltip = ({ datum }: PieTooltipProps<PerformanceDatum>) => {
	return <Typography>{datum.label}</Typography>;
};

export default function CareerPerformance({ data }: CareerPerformanceProps) {
	const nivoTheme = useNivoTheme();
	const summaryData = usePerformanceData(data?.driver.raceResults);
	const prefersDarkMode = useDarkMode();

	if (!summaryData) {
		return null;
	}

	const chartData = [
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
	];

	return (
		<Paper variant="outlined" className="h-[132px] p-2" aria-hidden>
			<ResponsivePie
				enableArcLinkLabels={false}
				enableArcLabels={false}
				theme={nivoTheme}
				data={chartData.filter(s => s.value > 0)}
				colors={{ datum: 'data.color' }}
				innerRadius={0.1}
				padAngle={3}
				cornerRadius={3}
				margin={{ top: 0, right: 110, bottom: 0, left: 0 }}
				tooltip={NivoTooltipFactory(CareerPerformanceTooltip)}
				legends={[
					{
						anchor: 'right',
						direction: 'column',
						justify: false,
						translateX: 40,
						translateY: 0,
						itemsSpacing: 0,
						itemWidth: 50,
						itemHeight: 18,
						itemDirection: 'left-to-right',
						symbolSize: 10,
						symbolShape: 'circle'
					}
				]}
			/>
		</Paper>
	);
}
