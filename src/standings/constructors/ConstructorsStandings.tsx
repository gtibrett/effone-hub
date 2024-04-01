import {ChartSwitcher, ChartSwitcherChart} from '@effonehub/components/charts';
import {ConstructorChampion} from '@effonehub/season';
import {Alert, Button, Skeleton} from '@mui/material';
import {useState} from 'react';
import {PointsChart, PositionsChart} from '../charts';
import ConstructorStandingsDialog from './ConstructorStandingsDialog';
import {ConstructorStandingsPointsTooltip, ConstructorStandingsPositionTooltip} from './ConstructorStandingsTooltip';
import useConstructorStandingsData from './useConstructorsStandingsData';

type ConstructorsStandingsProps = { season: number, height: number };

export default function ConstructorsStandings({season, height}: ConstructorsStandingsProps) {
	const [open, setOpen]            = useState(false);
	const {data, loading, chartData} = useConstructorStandingsData(season);
	
	if (loading) {
		return <Skeleton variant="rectangular" height={height}/>;
	}
	
	if (!data?.races?.length) {
		return <Alert variant="outlined" severity="info">Constructor Standings Data Not Available</Alert>;
	}
	
	const charts: ChartSwitcherChart[] = [
		{
			id:    'position',
			label: 'Position',
			chart: <PositionsChart data={chartData} TooltipComponent={ConstructorStandingsPositionTooltip}/>
		},
		{
			id:    'points',
			label: 'Points',
			chart: <PointsChart data={chartData} TooltipComponent={ConstructorStandingsPointsTooltip}/>
		}
	];
	
	return (
		<ChartSwitcher title="Constructor's Standings" charts={charts} size={height + 56}
			subheader={<ConstructorChampion season={season}/>}
			actions={
				<>
					<Button variant="outlined" size="small" onClick={() => setOpen(true)}>show full standings</Button>
					<ConstructorStandingsDialog season={season} open={open} setOpen={setOpen}/>
				</>
			}/>
	);
}