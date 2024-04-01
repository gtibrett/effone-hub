import {Card, CardActions, CardActionsProps, CardContent, CardHeader, CardHeaderProps} from '@mui/material';
import ChartSwitcherCharts from './ChartSwitcherCharts';
import ChartSwitcherToggle from './ChartSwitcherToggle';
import {ChartSwitcherChart} from './types';
import useChartSwitcher from './useChartSwitcher';

type ChartSwitcherProps = {
	title: CardHeaderProps['title'];
	subheader?: CardHeaderProps['subheader'];
	charts: ChartSwitcherChart[]
	size?: number;
	actions?: CardActionsProps['children'];
};

export default function ChartSwitcher({title, subheader, charts, size = 250, actions}: ChartSwitcherProps) {
	const [active, setActive] = useChartSwitcher();
	
	return (
		<Card variant="outlined" aria-hidden>
			<CardHeader title={title} subheader={subheader} action={<ChartSwitcherToggle charts={charts} active={active} setActive={setActive}/>}/>
			<CardContent sx={{height: size - 56}}>
				<ChartSwitcherCharts charts={charts} active={active}/>
			</CardContent>
			{actions && <CardActions sx={{justifyContent: 'flex-end'}}>{actions}</CardActions>}
		</Card>
	);
}