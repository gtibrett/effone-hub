import {ChartSwitcher, ChartSwitcherChart, DataWithTeamInfo, LineChartByTeam, LineChartByTeamProps} from '@/components/app';
import {useGetTeamColor} from '@/hooks';
import {QueryResult} from '@apollo/client/react/types/types';
import CareerTooltip from '@/components/page/driver/career/CareerTooltip';
import {CircuitDialogData} from './types';

type CircuitChartProps = Pick<QueryResult<CircuitDialogData>, 'data' | 'loading'>;

export default function CircuitChart({data}: CircuitChartProps) {
	const getTeamColor = useGetTeamColor();
	const races        = (data?.circuit.races || []).filter(r => r.results.length);
	
	const chartData: DataWithTeamInfo[] = races.map(r => ({
		teamId:   r.results[0].team?.teamId as number,
		color:    getTeamColor(r.results[0].team?.colors, 'primary', false),
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