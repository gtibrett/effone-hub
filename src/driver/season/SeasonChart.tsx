import {QueryResult} from '@apollo/client/react/types/types';
import {ChartSwitcher, ChartSwitcherChart, LineChartByTeam, LineChartByTeamProps} from '@effonehub/components/charts';
import {DriverId, DriverPageData, useDriver} from '@effonehub/driver';
import CareerTooltip from '@effonehub/driver/career/CareerTooltip';
import {useTheme} from '@mui/material';

type SeasonChartProps = Pick<QueryResult<DriverPageData>, 'data' | 'loading'> & { driverId: DriverId };

export default function SeasonChart({driverId, data, loading}: SeasonChartProps) {
	const theme         = useTheme();
	const driver        = useDriver(driverId);
	const seasonResults = data?.races.filter(r => r.results.length).map(r => ({...r.results[0], race: r}));
	const firstResult   = seasonResults?.[0];
	
	if (!firstResult || !driver || loading) {
		return null;
	}
	
	const chartData = seasonResults.map(({race: {round}, grid, positionOrder}) => ({
		teamId:   driver.currentTeam.teamId,
		color:    driver.currentTeam.team.colors.primary || theme.palette.primary.main,
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
		<ChartSwitcher title="Season" charts={charts} size={250}/>
	);
}