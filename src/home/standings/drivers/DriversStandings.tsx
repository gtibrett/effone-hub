import {Box, Card, CardHeader, Divider, Grid, Skeleton} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {DriverByLine} from '../../../driver';

import Place from '../../../race/Place';
import {ChartSwitcher, ChartSwitcherToggle, useChartSwitcherMode} from '../charts';
import {DriverStandingsPointsTooltip, DriverStandingsPositionTooltip} from './DriverStandingsTooltip';
import useDriverStandingsData from './useDriversStandingsData';

const sx = {
	'& > .MuiDataGrid-main':                  {
		overflowX: 'hidden'
	},
	'& > div > .MuiDataGrid-footerContainer': {
		display: 'none'
	}
};

type DriversProps = { season: number };

export default function DriversStandings({season}: DriversProps) {
	const {mode, handleMode}         = useChartSwitcherMode();
	const {data, loading, chartData} = useDriverStandingsData(season);
	const races                      = data?.races.filter(r => r.driverStandings.length);
	const standings                  = races?.at(-1)?.driverStandings;
	
	if (loading) {
		return <Skeleton variant="rectangular" height={325}/>;
	}
	
	if (!standings?.length) {
		return null;
	}
	const [p1, p2, p3, ...rest] = standings;
	
	return (
		<Card variant="outlined">
			<CardHeader title="Driver's Standings" action={<ChartSwitcherToggle mode={mode} handleMode={handleMode}/>}/>
			<Grid container spacing={2} alignItems="stretch">
				<Grid item xs={12}>
					<ChartSwitcher data={chartData} loading={loading} mode={mode} PointsTooltip={DriverStandingsPointsTooltip} PositionsTooltip={DriverStandingsPositionTooltip}/>
				</Grid>
				<Grid item xs={12} lg={5}>
					<Place driverId={p1.driver.driverId} place={1} points={p1.points} asterisk={season === 2021}/>
					<Divider/>
					<Place driverId={p2.driver.driverId} place={2} points={p2.points}/>
					<Divider/>
					<Place driverId={p3.driver.driverId} place={3} points={p3.points}/>
				</Grid>
				<Grid item xs={12} lg={7}>
					<Box sx={{
						height: {
							xs: 300,
							lg: 'calc(100% - 8px)'
						},
						pr:     {
							xs: 0,
							lg: 4
						}
					}}>
						<DataGrid
							sx={sx}
							rows={rest}
							density="compact"
							getRowId={r => r.driver.driverId}
							initialState={{
								sorting: {
									sortModel: [{field: 'position', sort: 'asc'}]
								}
							}}
							columns={
								[
									{
										field:       'position',
										headerName:  'P',
										headerAlign: 'center',
										type:        'number',
										align:       'center',
										width:       16
									},
									{
										field:      'code',
										headerName: 'Driver',
										flex:       1,
										renderCell: ({row}) => <DriverByLine id={row.driver.driverId} avatarProps={{size: 24}} flagProps={{size: 16}}/>,
										minWidth:   200
									},
									{
										field:      'points',
										headerName: 'Points',
										type:       'number'
									}
								]
							}
						/>
					</Box>
				</Grid>
			</Grid>
		</Card>
	);
}