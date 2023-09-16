import {QueryResult} from '@apollo/client/react/types/types';
import {Alert, Grid, Skeleton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import ByLine from '../../constructors/ByLine';
import {DriverPageData, DriverStandingData} from '../types';
import CareerChart from './CareerChart';
import CareerPerformance from './CareerPerformance';

type CareerProps = Pick<QueryResult<DriverPageData>, 'data' | 'loading'>;

export default function Career({data, loading}: CareerProps) {
	const careerStandings = data?.driver.standings;
	
	if (loading || !careerStandings) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!careerStandings.length) {
		return <Alert variant="outlined" severity="info">Career Data Not Available</Alert>;
	}
	
	return (
		<Grid container spacing={2}>
			<Grid item xs={8}><CareerChart standings={careerStandings}/></Grid>
			<Grid item xs={4}><CareerPerformance data={data} loading={loading}/></Grid>
			<Grid item xs={12}>
				<DataGrid
					rows={careerStandings}
					autoHeight
					density="compact"
					getRowId={(r) => r.year || ''}
					initialState={{
						sorting: {
							sortModel: [{field: 'year', sort: 'desc'}]
						}
					}}
					columns={
						[
							{
								field:       'year',
								headerName:  'Season',
								headerAlign: 'center',
								align:       'center',
								flex:        1,
								minWidth:    100
							},
							{
								field:       'position',
								headerName:  'Position',
								type:        'number',
								headerAlign: 'center',
								align:       'center',
								flex:        1,
								minWidth:    100
							},
							{
								field:       'points',
								headerName:  'Points',
								type:        'number',
								headerAlign: 'center',
								align:       'center',
								flex:        1,
								minWidth:    100
							},
							{
								field:       'wins',
								headerName:  'Wins',
								type:        'number',
								headerAlign: 'center',
								align:       'center',
								flex:        1,
								minWidth:    100
							},
							{
								field:      'team',
								headerName: 'Constructor',
								filterable: false,
								renderCell: ({row}) => (
									<ByLine id={row.driverTeamByDriverIdAndYear.team.teamId} variant="link"/>
								),
								flex:       1,
								minWidth:   150
							}
						
						] as GridColDef<DriverStandingData>[]
					}
				/>
			</Grid>
		</Grid>
	);
}