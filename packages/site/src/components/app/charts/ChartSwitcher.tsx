import {Card, CardActions, CardActionsProps, CardContent, CardHeader, CardHeaderProps} from '@mui/material';
import ChartSwitcherCharts from './ChartSwitcherCharts';
import ChartSwitcherToggle from './ChartSwitcherToggle';
import {ActiveChart, ChartSwitcherChart} from './types';
import useChartSwitcher from './useChartSwitcher';

type ChartSwitcherProps = {
	title: CardHeaderProps['title'];
	subheader?: CardHeaderProps['subheader'];
	charts: ChartSwitcherChart[]
	initial?: ActiveChart;
	size?: number;
	actions?: CardActionsProps['children'];
};

export default function ChartSwitcher({title, subheader, charts, initial, actions, size = 250}: ChartSwitcherProps) {
	const [active, setActive] = useChartSwitcher(initial);
	
	return (
		<Card variant="outlined" aria-hidden>
			<CardHeader title={title} subheader={subheader} action={<ChartSwitcherToggle charts={charts} active={active} setActive={setActive}/>}/>
			<CardContent sx={{height: size}}>
				<ChartSwitcherCharts charts={charts} active={active}/>
			</CardContent>
			{actions && <CardActions sx={{justifyContent: 'flex-end'}}>{actions}</CardActions>}
		</Card>
	);
}