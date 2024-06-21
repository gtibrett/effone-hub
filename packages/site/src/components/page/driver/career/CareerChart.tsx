import {ChartSwitcher, ChartSwitcherChart, LineChartByTeam} from '@/components/app';
import {DriverId} from '@/types';
import CareerBreakdownChart from './CareerBreakdownChart';
import CareerTooltip from './CareerTooltip';
import useCareerChartDataWithTeam from './useCareerChartDataWithTeam';

type CareerChartProps = {
	driverId: DriverId;
	size: number;
}

export default function CareerChart({driverId, size}: CareerChartProps) {
	const data = useCareerChartDataWithTeam(driverId);
	
	const charts: ChartSwitcherChart[] = [
		{
			id:    'breakdown',
			label: 'Breakdown',
			chart: <CareerBreakdownChart driverId={driverId}/>
		},
		{
			id:    'position',
			label: 'Position',
			chart: <LineChartByTeam xKey="year" yKey="position" data={data} tooltip={CareerTooltip} invert min={1}/>
		},
		{
			id:    'points',
			label: 'Points',
			chart: <LineChartByTeam xKey="year" yKey="points" data={data} tooltip={CareerTooltip}/>
		},
		{
			id:    'wins',
			label: 'Wins',
			chart: <LineChartByTeam xKey="year" yKey="wins" data={data} tooltip={CareerTooltip}/>
		}
	];
	
	return (
		<ChartSwitcher title="Career Timeline" size={size} charts={charts} initial="breakdown"/>
	);
}