import { Box } from '@mui/material';

import { ActiveChart, ChartSwitcherChart } from './types';

type ChartSwitcherProps = {
	active: ActiveChart;
	charts: ChartSwitcherChart[];
};

export default function ChartSwitcherCharts({ active, charts }: ChartSwitcherProps) {
	return (
		<>
			{charts.map(({ id, chart }) => (
				<Box key={id} className={`h-full w-full ${id === active ? 'block' : 'hidden'}`}>
					{chart}
				</Box>
			))}
		</>
	);
}
