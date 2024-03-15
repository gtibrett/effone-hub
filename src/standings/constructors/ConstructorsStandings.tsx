import {Alert, Button, Card, CardActions, CardContent, CardHeader, Skeleton} from '@mui/material';
import {useState} from 'react';
import {ChartSwitcher, ChartSwitcherToggle, useChartSwitcherMode} from '../charts';
import ConstructorStandingsDialog from './ConstructorStandingsDialog';
import {ConstructorStandingsPointsTooltip, ConstructorStandingsPositionTooltip} from './ConstructorStandingsTooltip';
import useConstructorStandingsData from './useConstructorsStandingsData';

type ConstructorsStandingsProps = { season: number, height:number };

export default function ConstructorsStandings({season,height}: ConstructorsStandingsProps) {
	const [open, setOpen]            = useState(false);
	const {mode, handleMode}         = useChartSwitcherMode();
	const {data, loading, chartData} = useConstructorStandingsData(season);
	
	if (loading) {
		return <Skeleton variant="rectangular" height={height}/>;
	}
	
	if (!data?.races?.length) {
		return <Alert variant="outlined" severity="info">Constructor Standings Data Not Available</Alert>;
	}
	
	return (
		<Card variant="outlined">
			<CardHeader title="Constructor's Standings" action={<ChartSwitcherToggle mode={mode} handleMode={handleMode}/>}/>
			<CardContent sx={{height}}>
				<ChartSwitcher
					data={chartData}
					loading={loading}
					mode={mode}
					PointsTooltip={ConstructorStandingsPointsTooltip}
					PositionsTooltip={ConstructorStandingsPositionTooltip}
				/>
			</CardContent>
			<CardActions sx={{justifyContent: 'flex-end'}}>
				<Button variant="outlined" size="small" onClick={() => setOpen(true)}>show full standings</Button>
				<ConstructorStandingsDialog season={season} open={open} setOpen={setOpen}/>
			</CardActions>
		</Card>
	);
}