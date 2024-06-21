import {DriverByLine} from '@/components/app';
import {QueryResult} from '@apollo/client/react/types/types';
import {Link} from '@gtibrett/mui-additions';
import {Alert, Grid, Skeleton, Typography, TypographyProps} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {PropsWithChildren} from 'react';
import {ConstructorPageData} from '../types';
import SeasonChart from './SeasonChart';

const CellValueWrapper = ({align = 'center', children}: PropsWithChildren<Pick<TypographyProps, 'align'>>) => <Typography paragraph align={align} sx={{mb: 0, mt: .5}}>{children}</Typography>;

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
				rowHeight={100}
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
							valueGetter: (value) => (new Date(value)),
							renderCell:  ({value}) => value.toLocaleDateString()
						},
						{
							field:      'name',
							headerName: 'Race',
							flex:       1,
							renderCell: ({row, value}) => (
								<Link href={`/${season}/${row.round}#${row.name}`}>{value}</Link>
							)
						},
						{
							field:      'driver',
							headerName: 'Drivers',
							flex:       1,
							renderCell: ({row}) => (
								<>
									{
										results.filter(r => r.raceId === row.raceId).map(result => <CellValueWrapper key={result.driverId} align="left"><DriverByLine id={result.driverId} variant="link"/></CellValueWrapper>)
									}
								</>
							)
						},
						{
							field:       'qualifying',
							headerName:  'Qualifying',
							headerAlign: 'center',
							align:       'center',
							renderCell:  ({row}) => (
								<>
									{
										results.filter(r => r.raceId === row.raceId).map(result => <CellValueWrapper key={result.driverId}>{result.grid}</CellValueWrapper>)
									}
								</>
							)
						},
						{
							field:       'finish',
							headerName:  'Finish',
							headerAlign: 'center',
							align:       'center',
							renderCell:  ({row}) => {
								return <>
									{results.filter(r => r.raceId === row.raceId).map(result => <CellValueWrapper key={result.driverId}>{result.positionOrder}</CellValueWrapper>)}
								</>;
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
					]
				}
			/>
		</>
	);
}