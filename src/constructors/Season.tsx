import {Race} from '@gtibrett/effone-hub-api';
import {Alert, Grid, Skeleton, Typography} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import Caxios from '../api/Caxios';
import {getAPIUrl, mapSchedule} from '../api/Ergast';
import {useAppState} from '../app/AppStateProvider';
import ByLine from '../drivers/ByLine';
import Link from '../ui-components/Link';
import {ConstructorId} from './ConstructorProvider';
import SeasonChart from './SeasonChart';

type SeasonProps = {
	constructorId?: ConstructorId;
}

export default function Season({constructorId}: SeasonProps) {
	const [{season}]        = useAppState();
	const [races, setRaces] = useState<Race[] | undefined>();
	
	useEffect(() => {
		const dataUrl = getAPIUrl(`/${season}/constructors/${constructorId}/results.json`);
		
		Caxios.get(dataUrl)
		      .then(mapSchedule)
		      .then(races => setRaces(races));
	}, [season, constructorId]);
	
	if (!races) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!races.length) {
		return <Alert variant="outlined" severity="info">Season Data Not Available</Alert>;
	}
	
	return (
		<>
			<SeasonChart races={races}/>
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
							field: 'date',
							headerName: 'Date',
							headerAlign: 'center',
							type: 'date',
							align: 'center',
							valueGetter: ({value}) => (new Date(value)),
							renderCell: ({value}) => value.toLocaleDateString()
						},
						{
							field: 'raceName',
							headerName: 'Race',
							flex: 1,
							renderCell: ({row, value}) => (
								<Link to={`/race/${season}/${row.round}#${row.raceName}`}>{value}</Link>
							)
						},
						{
							field: 'driver',
							headerName: 'Drivers',
							flex: 1,
							renderCell: ({row}) => {
								return <Grid container spacing={0}>
									{row.Results?.map(result => <Grid item xs={12} key={result.Driver?.driverId}><ByLine id={result.Driver?.driverId} variant="name"/></Grid>)}
								</Grid>;
							}
						},
						{
							field: 'finish',
							headerName: 'Finish',
							headerAlign: 'center',
							align: 'center',
							renderCell: ({row}) => {
								return <Grid container spacing={0} justifyContent="center">
									{row.Results?.map(result => <Grid item xs={12} key={result.Driver?.driverId}><Typography align="center">{result.position}</Typography></Grid>)}
								</Grid>;
							}
						},
						{
							field: 'points',
							headerName: 'Points',
							headerAlign: 'center',
							align: 'center',
							renderCell: ({row}) => {
								return <Grid container spacing={0} justifyContent="center">
									{row.Results?.map(result => <Grid item xs={12} key={result.Driver?.driverId}><Typography align="center">{result.points}</Typography></Grid>)}
								</Grid>;
							}
						}
					] as GridColDef<Race>[]
				}
			/>
		</>
	);
}