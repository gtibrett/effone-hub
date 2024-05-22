import {Box} from '@mui/material';
import {ActiveChart, ChartSwitcherChart} from './types';

type ChartSwitcherProps = {
	active: ActiveChart;
	charts: ChartSwitcherChart[];
}

export default function ChartSwitcherCharts({active, charts}: ChartSwitcherProps) {
	return (
		<>
			{charts.map(({id, chart}) => <Box key={id} height="100%" width="100%" sx={{display: id === active ? 'block' : 'none'}}>{chart}</Box>)}
		</>
	);
}