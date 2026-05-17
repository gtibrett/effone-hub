import {Card, CardContent, CardHeader} from '@/components/ui';
  
import {CardActions} from '@/components/ui';
import type {CardActionsProps, CardHeaderProps} from '@/components/ui';
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

	// CardContent's MUI->shadcn shim drops `sx`, so set the chart height via
	// an inline style on a wrapper. Nivo's Responsive* components require a
	// parent with computed height; without it the chart renders empty.
	return (
		<Card variant="outlined" aria-hidden>
			<CardHeader title={title} subheader={subheader} action={<ChartSwitcherToggle charts={charts} active={active} setActive={setActive}/>}/>
			<CardContent>
				<div style={{height: size, position: 'relative'}}>
					<ChartSwitcherCharts charts={charts} active={active}/>
				</div>
			</CardContent>
			{actions && <CardActions sx={{justifyContent: 'flex-end'}}>{actions}</CardActions>}
		</Card>
	);
}