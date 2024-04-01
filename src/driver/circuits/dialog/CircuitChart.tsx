import {QueryResult} from '@apollo/client/react/types/types';
import {ChartSwitcher, ChartSwitcherChart, DataWithTeamInfo, LineChartByTeam, LineChartByTeamProps} from '@effonehub/components/charts';
import CareerTooltip from '@effonehub/driver/career/CareerTooltip';
import {CircuitDialogData} from './types';

type CircuitChartProps = Pick<QueryResult<CircuitDialogData>, 'data' | 'loading'>;

export default function CircuitChart({data}: CircuitChartProps) {
	const races = (data?.circuit.races || []).filter(r => r.results.length);
	
	const chartData: DataWithTeamInfo[] = races.map(r => ({
		teamId:   r.results[0].team.teamId,
		color:    r.results[0].team.colors.primary,
		year:     Number(r.year),
		points:   Number(r.results[0].points),
		position: Number(r.results[0].positionOrder),
		grid:     Number(r.results[0].grid)
	}));
	
	const baseProps: Omit<LineChartByTeamProps, 'yKey'> = {
		xKey:    'year',
		data:    chartData,
		tooltip: CareerTooltip
	};
	
	const charts: ChartSwitcherChart[] = [
		{
			id:    'position',
			label: 'Position',
			chart: <LineChartByTeam {...baseProps} yKey="position" invert min={1}/>
		},
		{
			id:    'qualifying',
			label: 'Qualifying',
			chart: <LineChartByTeam {...baseProps} yKey="grid" invert min={1}/>
		},
		{
			id:    'points',
			label: 'Points',
			chart: <LineChartByTeam {...baseProps} yKey="points"/>
		}
	];
	
	return (
		<ChartSwitcher title="Circuit History" charts={charts} size={200}/>
	);
}