import {Button, Card, CardActions, CardContent, CardHeader, Skeleton} from '@mui/material';
import {useState} from 'react';
import {ChartSwitcher, ChartSwitcherToggle, useChartSwitcherMode} from '../charts';
import DriverStandingsDialog from './DriverStandingsDialog';
import {DriverStandingsPointsTooltip, DriverStandingsPositionTooltip} from './DriverStandingsTooltip';
import useDriverStandingsData from './useDriversStandingsData';

type DriversProps = { season: number, height: number };

export default function DriversStandings({season, height}: DriversProps) {
	const [open, setOpen]            = useState(false);
	const {mode, handleMode}         = useChartSwitcherMode();
	const {data, loading, chartData} = useDriverStandingsData(season);
	const races                      = data?.races.filter(r => r.driverStandings.length);
	const standings                  = races?.at(-1)?.driverStandings;
	
	if (loading) {
		return <Skeleton variant="rectangular" height={height}/>;
	}
	
	if (!standings?.length) {
		return null;
	}
	
	return (
		<Card variant="outlined">
			<CardHeader title="Driver's Standings" action={<ChartSwitcherToggle mode={mode} handleMode={handleMode}/>}/>
			<CardContent sx={{height}}>
				<ChartSwitcher data={chartData} loading={loading} mode={mode} PointsTooltip={DriverStandingsPointsTooltip} PositionsTooltip={DriverStandingsPositionTooltip}/>
			</CardContent>
			<CardActions sx={{justifyContent: 'flex-end'}}>
				<Button variant="outlined" size="small" onClick={() => setOpen(true)}>show full standings</Button>
				<DriverStandingsDialog season={season} open={open} setOpen={setOpen}/>
			</CardActions>
		</Card>
	);
}