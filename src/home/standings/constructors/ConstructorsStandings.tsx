import {TeamStanding} from '@gtibrett/effone-hub-graph-api';
import {Alert, Card, CardHeader, Grid, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {ConstructorByLine} from '../../../constructor';
import {ChartSwitcher, ChartSwitcherToggle, useChartSwitcherMode} from '../charts';
import {ConstructorStandingsPointsTooltip, ConstructorStandingsPositionTooltip} from './ConstructorStandingsTooltip';
import useConstructorStandingsData from './useConstructorsStandingsData';

type ConstructorsStandingsProps = { season: number };

export default function ConstructorsStandings({season}: ConstructorsStandingsProps) {
	const {mode, handleMode}         = useChartSwitcherMode();
	const {data, loading, chartData} = useConstructorStandingsData(season);
	
	if (loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!data?.races?.length) {
		return <Alert variant="outlined" severity="info">Constructor Standings Data Not Available</Alert>;
	}
	
	const lastRaceStandings = data.races.filter(r => r.teamStandings.length)?.at(-1)?.teamStandings || [];
	
	return (
		<Card variant="outlined">
			<CardHeader title="Constructor's Standings" action={<ChartSwitcherToggle mode={mode} handleMode={handleMode}/>}/>
			<Grid container spacing={2} alignItems="stretch">
				<Grid item xs={12}>
					<ChartSwitcher
						data={chartData}
						loading={loading}
						mode={mode}
						PointsTooltip={ConstructorStandingsPointsTooltip}
						PositionsTooltip={ConstructorStandingsPositionTooltip}
					/>
				</Grid>
				<Grid item xs={12}>
					<DataGrid
						rows={lastRaceStandings}
						getRowId={r => r.team.teamId}
						autoHeight
						density="compact"
						pageSize={10}
						initialState={{
							sorting: {
								sortModel: [{field: 'points', sort: 'desc'}]
							}
						}}
						columns={
							[
								{
									field:      'teamId',
									headerName: 'Constructor',
									flex:       1,
									renderCell: ({row}) => <ConstructorByLine id={row.team.teamId} variant="link"/>
								},
								{
									field:      'points',
									headerName: 'Points',
									type:       'number'
								}
							] as GridColDef<TeamStanding>[]
						}
					/>
				</Grid>
			</Grid>
		</Card>
	);
}