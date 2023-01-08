import {alpha, Box, Grid, Typography} from '@mui/material';
import {TooltipProps} from '@nivo/heatmap';
import ByLine from '../drivers/ByLine';
import {useInvertedTheme} from '../ui-components/Theme';
import {LapChartDatum} from './LapTimes';

export default function LapTooltip({cell}: TooltipProps<LapChartDatum>) {
	const {color, data}    = cell;
	const {driverId, time} = data.timing;
	
	const theme = useInvertedTheme();
	
	const sx = {
		p: 1,
		borderRadius: 1,
		background: alpha(color, .9),
		color: theme.palette.getContrastText(color)
	};
	
	return <Box sx={sx}>
		<Grid container spacing={2} justifyContent="space-between">
			<Grid item xs={12}><ByLine id={driverId}/></Grid>
			<Grid item><Typography>Lap {data.x}</Typography></Grid>
			<Grid item>{time}</Grid>
		</Grid>
	</Box>;
}