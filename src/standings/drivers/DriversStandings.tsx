import {ChartSwitcher, ChartSwitcherChart} from '@effonehub/components/charts';
import {DriverChampion} from '@effonehub/season';
import {Button, Skeleton} from '@mui/material';
import {useState} from 'react';
import {PointsChart, PositionsChart} from '../charts';
import DriverStandingsDialog from './DriverStandingsDialog';
import {DriverStandingsPointsTooltip, DriverStandingsPositionTooltip} from './DriverStandingsTooltip';
import useDriverStandingsData from './useDriversStandingsData';

type DriversProps = { season: number, height: number };

export default function DriversStandings({season, height}: DriversProps) {
	const [open, setOpen]            = useState(false);
	const {data, loading, chartData} = useDriverStandingsData(season);
	const races                      = data?.races.filter(r => r.driverStandings.length);
	const standings                  = races?.at(-1)?.driverStandings;
	
	if (loading) {
		return <Skeleton variant="rectangular" height={height}/>;
	}
	
	if (!standings?.length) {
		return null;
	}
	
	const charts: ChartSwitcherChart[] = [
		{
			id:    'position',
			label: 'Position',
			chart: <PositionsChart data={chartData} TooltipComponent={DriverStandingsPositionTooltip}/>
		},
		{
			id:    'points',
			label: 'Points',
			chart: <PointsChart data={chartData} TooltipComponent={DriverStandingsPointsTooltip}/>
		}
	];
	
	return (
		<ChartSwitcher
			title="Driver's Standings"
			charts={charts} size={height + 56}
			subheader={<DriverChampion season={season}/>}
			actions={
				<>
					<Button variant="outlined" size="small" onClick={() => setOpen(true)}>show full standings</Button>
					<DriverStandingsDialog season={season} open={open} setOpen={setOpen}/>
				</>
			}/>
	);
}