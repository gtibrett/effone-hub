import {QueryResult} from '@apollo/client/react/types/types';
import {Link} from '@gtibrett/mui-additions';
import {Alert, Grid, Skeleton, Typography} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import ByLine from '../drivers/ByLine';
import {Race} from '@gtibrett/effone-hub-graph-api';
import SeasonChart from './SeasonChart';
import {ConstructorPageData} from './types';

type SeasonProps = Pick<QueryResult<ConstructorPageData>, 'data' | 'loading'> & { season: number };

export default function Season({data, loading, season}: SeasonProps) {
	
	if (loading || !data) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	const races   = data.races;
	const results = data.team.results;
	
	if (!races?.length) {
		return <Alert variant="outlined" severity="info">Season Data Not Available</Alert>;
	}
	
	return (
		<>
			<SeasonChart data={data} loading={loading} season={season}/>
			<DataGrid
				rows={races}
				rowHeight={72}
				autoHeight
				density="compact"
				getRowId={(row) => row.round || ''}
				initialState={{
					sorting: {
						sortModel: [{field: 'date', sort: 'asc'}]
					}
				}}
				columns={
					[
						{
							field:       'date',
							headerName:  'Date',
							headerAlign: 'center',
							type:        'date',
							align:       'center',
							valueGetter: ({value}) => (new Date(value)),
							renderCell:  ({value}) => value.toLocaleDateString()
						},
						{
							field:      'name',
							headerName: 'Race',
							flex:       1,
							renderCell: ({row, value}) => (
								<Link to={`/${season}/${row.round}#${row.name}`}>{value}</Link>
							)
						},
						{
							field:      'driver',
							headerName: 'Drivers',
							flex:       1,
							renderCell: ({row}) => {
								return <Grid container spacing={0}>
									{results.filter(r => r.raceId === row.raceId).map(result => <Grid item xs={12} key={result.driverId}><ByLine id={result.driverId} variant="name"/></Grid>)}
								</Grid>;
							}
						},
						{
							field:       'qualifying',
							headerName:  'Qualifying',
							headerAlign: 'center',
							align:       'center',
							renderCell:  ({row}) => {
								return <Grid container spacing={0} justifyContent="center">
									{results.filter(r => r.raceId === row.raceId).map(result => <Grid item xs={12} key={result.driverId}><Typography align="center">{result.grid}</Typography></Grid>)}
								</Grid>;
							}
						},
						{
							field:       'finish',
							headerName:  'Finish',
							headerAlign: 'center',
							align:       'center',
							renderCell:  ({row}) => {
								return <Grid container spacing={0} justifyContent="center">
									{results.filter(r => r.raceId === row.raceId).map(result => <Grid item xs={12} key={result.driverId}><Typography align="center">{result.positionOrder}</Typography></Grid>)}
								</Grid>;
							}
						},
						{
							field:       'points',
							headerName:  'Points',
							headerAlign: 'center',
							align:       'center',
							renderCell:  ({row}) => {
								return <Grid container spacing={0} justifyContent="center">
									{results.filter(r => r.raceId === row.raceId).map(result => <Grid item xs={12} key={result.driverId}><Typography align="center">{result.points}</Typography></Grid>)}
								</Grid>;
							}
						}
					] as GridColDef<Race>[]
				}
			/>
		</>
	);
}