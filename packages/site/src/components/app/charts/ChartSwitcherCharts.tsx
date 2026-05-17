import {ActiveChart, ChartSwitcherChart} from './types';

type ChartSwitcherProps = {
	active: ActiveChart;
	charts: ChartSwitcherChart[];
}

export default function ChartSwitcherCharts({active, charts}: ChartSwitcherProps) {
	return (
		<>
			{charts.map(({id, chart}) => <div key={id} className="h-full w-full" style={{display: id === active ? 'block' : 'none'}}>{chart}</div>)}
		</>
	);
}
