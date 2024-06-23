import {DriverByLine, RaceMap, useMapSeasonRacesToMapPoints} from '@/components/app';
import {Link} from '@gtibrett/mui-additions';
import {Box, Card, CardHeader, Skeleton} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {Suspense} from 'react';
import useScheduleData from './useScheduleData';

type ScheduleProps = { season: number };

export default function Schedule({season}: ScheduleProps) {
	const {data}                   = useScheduleData(season);
	const mapSeasonRacesToFeatures = useMapSeasonRacesToMapPoints();
	const races                    = data?.races;
	
	const {points, onClick} = mapSeasonRacesToFeatures(season, races.map(
		({name, round, circuit: {lng, lat}, results}) => ({name, round, lat, lng, hasResults: results?.length > 0}))
	);
	
	return (
		<Suspense fallback={(
			<>
				<Skeleton variant="rectangular" height={300} sx={{mb: 2, mx: 2}}/>
				<Skeleton variant="rectangular" height={800}/>
			</>
		)}>
			<Card id="season" variant="outlined">
				<CardHeader title="Schedule"/>
				<Box sx={{px: 2}}><RaceMap points={points} onClick={onClick} highlightNext/></Box>
				<DataGrid
					sx={{mt: 2}}
					rows={races}
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
								renderCell:  ({value}) => value.toLocaleDateString(),
								minWidth:    100,
								sortable:    false
							},
							{
								field:      'name',
								headerName: 'Race',
								flex:       1,
								renderCell: ({row, value}) => <Link href={`/seasons/${season}/${row.round}#${row.name}`}>{value}</Link>,
								minWidth:   200,
								sortable:   false
							},
							{
								field:      'winner',
								headerName: 'Winner',
								flex:       1,
								renderCell: ({row}) => {
									if (!row.results.length) {
										return '--';
									}
									
									return <DriverByLine id={row.results[0].driverId}/>;
								},
								minWidth:   200,
								sortable:   false
							},
							{
								field:      'sprint-winner',
								headerName: 'Sprint Winner',
								flex:       1,
								renderCell: ({row}) => {
									if (!row.sprintResults.length) {
										return '--';
									}
									
									return <DriverByLine id={row.sprintResults[0].driverId}/>;
								},
								minWidth:   200,
								sortable:   false
							}
						]
					}
				/>
			</Card>
		</Suspense>
	);
}