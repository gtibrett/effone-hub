import {ChartSwitcher, ChartSwitcherChart, LineChartByTeam, LineChartByTeamProps} from '@/components/app';
import {DriverPageData} from '@/components/page/driver';
import {useGetTeamColor} from '@/hooks';
import {useDriver} from '@/hooks/data';
import {DriverId} from '@/types';
import {QueryResult} from '@apollo/client/react/types/types';
import CareerBreakdownChart from '../career/CareerBreakdownChart';
import CareerTooltip from '../career/CareerTooltip';

type SeasonChartProps = Pick<QueryResult<DriverPageData>, 'data' | 'loading'> & {
	driverId: DriverId
	season?: number
};

export default function SeasonChart({driverId, season, data, loading}: SeasonChartProps) {
	const getTeamColor  = useGetTeamColor();
	const driver        = useDriver(driverId);
	const seasonResults = data?.races.filter(r => r.results.length).map(r => ({...r.results[0], race: r}));
	const firstResult   = seasonResults?.[0];
	
	if (!firstResult || !driver || loading) {
		return null;
	}
	
	const chartData = seasonResults.map(({race: {round}, grid, positionOrder}) => ({
		teamId:   driver.currentTeam?.teamId as number,
		color:    getTeamColor(driver.currentTeam?.team?.colors, 'primary', false),
		round,
		grid,
		position: positionOrder
	}));
	
	const baseProps: Omit<LineChartByTeamProps, 'yKey'> = {
		xKey:    'round',
		data:    chartData,
		tooltip: CareerTooltip
	};
	
	const charts: ChartSwitcherChart[] = [
		{
			id:    'breakdown',
			label: 'Breakdown',
			chart: <CareerBreakdownChart driverId={driverId} season={season}/>
		},
		{
			id:    'position',
			label: 'Position',
			chart: <LineChartByTeam {...baseProps} yKey="position" invert min={1} max={20}/>
		},
		{
			id:    'qualifying',
			label: 'Qualifying',
			chart: <LineChartByTeam {...baseProps} yKey="grid" invert min={1} max={20}/>
		}
	];
	
	return (
		<ChartSwitcher title="Season" charts={charts} size={250} initial="breakdown"/>
	);
}