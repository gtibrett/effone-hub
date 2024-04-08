import {ChartSwitcher, ChartSwitcherChart} from '@effonehub/components/charts';
import {DriverChampion} from '@effonehub/season';
import {Button, Skeleton} from '@mui/material';
import {memo, useState} from 'react';
import {PointsChart, PositionsChart} from '../charts';
import DriverStandingsDialog from './DriverStandingsDialog';
import {DriverStandingsPointsTooltip, DriverStandingsPositionTooltip} from './DriverStandingsTooltip';
import useDriverStandingsData from './useDriversStandingsData';

type DriversStandingsProps = { season: number };

const DriversStandingsActions = ({season}: DriversStandingsProps) => {
	const [open, setOpen] = useState(false);
	
	return (
		<>
			<Button variant="outlined" size="small" onClick={() => setOpen(true)}>show full standings</Button>
			<DriverStandingsDialog season={season} open={open} setOpen={setOpen}/>
		</>
	);
};

function DriversStandings({season}: DriversStandingsProps) {
	const {loading, chartData} = useDriverStandingsData(season);
	const height               = Math.max(...chartData.map(s => s.standings.length), 20) * 20;
	
	if (loading) {
		return <Skeleton variant="rectangular" height={height + 182}/>;
	}
	
	if (!chartData?.length) {
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
			charts={charts} size={height}
			subheader={<DriverChampion season={season}/>}
			actions={<DriversStandingsActions season={season}/>}/>
	);
}

export default memo(DriversStandings);