import { Box } from '@mui/material';

import type { ActiveChart, ChartSwitcherChart } from './types';

type ChartSwitcherProps = {
	active: ActiveChart;
	charts: ChartSwitcherChart[];
};

export default function ChartSwitcherCharts({ active, charts }: ChartSwitcherProps) {
	// Mount only the active chart. Rendering inactive charts behind `display:none`
	// mounts MUI X surfaces at width 0 → "ChartsContainer has no width" warnings and
	// negative-width <rect> bars. `key={active}` gives each chart its own subtree so
	// switching remounts cleanly instead of swapping a different chart into stale DOM.
	const activeChart = charts.find(({ id }) => id === active);
	if (!activeChart) {
		return null;
	}
	return (
		<Box key={active} className="h-full w-full overflow-hidden">
			{activeChart.chart}
		</Box>
	);
}
