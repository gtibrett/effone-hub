import {useAppState} from '@/components/app';
import {PositionChange} from '@/components/page/race';
import {getPositionTextOutcome, getTimeStringFromDate} from '@/helpers';
import {DriverId} from '@/types';
import {Link} from '@gtibrett/mui-additions';
import {Alert, Grid, Skeleton, Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {DataGrid} from '@mui/x-data-grid';
import SeasonChart from './SeasonChart';
import useSeasonData from './useSeasonData';

type SeasonProps = { season: number, driverId: DriverId };

export default function Season({season, driverId}: SeasonProps) {
	const [{currentSeason}] = useAppState();
	const {data, loading}   = useSeasonData(driverId, season);
	
	if (loading || !data?.races) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!data.races.length) {
		return <Alert variant="outlined" severity="info">Season Data Not Available</Alert>;
	}
	
	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<SeasonChart season={season} driverId={driverId} data={data} loading={loading}/>
			</Grid>
			
			<Grid item xs={12}>
				<DataGrid
					rows={data.races}
					autoHeight
					density="compact"
					getRowId={(row) => row.raceId || ''}
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
								minWidth:    100
							},
							{
								field:      'name',
								headerName: 'Race',
								flex:       1,
								renderCell: ({row, value}) => (
									<Link href={`/${currentSeason}/${row.round}#${row.name}`}>{value}</Link>
								),
								minWidth:   200
							},
							{
								field:       'grid',
								headerName:  'Start',
								type:        'number',
								headerAlign: 'center',
								align:       'center',
								valueGetter: (value, row) => row.results[0]?.grid || '--'
							},
							{
								field:       'result',
								headerName:  'Finish',
								type:        'number',
								headerAlign: 'center',
								align:       'center',
								valueGetter: (value, row) => row.results[0]?.positionOrder || '--'
							},
							{
								field:        'change',
								renderHeader: () => <Typography sx={visuallyHidden}>Position Changes</Typography>,
								renderCell:   ({row}) => {
									const result = row.results[0];
									if (result) {
										const {grid, positionOrder} = result;
										return <PositionChange grid={grid} positionOrder={positionOrder}/>;
									}
									return '--';
								},
								valueGetter:  (value, row) => {
									const result = row.results[0];
									if (result) {
										const {grid, positionOrder} = result;
										if (grid && positionOrder) {
											return grid - positionOrder;
										}
									}
									
									return 'unknown';
								},
								width:        60,
								headerAlign:  'center',
								align:        'center'
							},
							{
								field:       'points',
								headerName:  'Points',
								type:        'number',
								headerAlign: 'center',
								align:       'center',
								valueGetter: (value, row) => row.results[0]?.points || '--'
							},
							{
								field:       'time',
								headerName:  'Time',
								sortable:    false,
								headerAlign: 'left',
								align:       'left',
								flex:        .5,
								valueGetter: (value, row) => {
									const result = row.results[0];
									if (result) {
										const time = result.milliseconds;
										return time ? getTimeStringFromDate(new Date(time)) : getPositionTextOutcome(result.positionText, result.status?.status);
									}
									return '--';
								}
							}
						]
					}
				/>
			</Grid>
		</Grid>
	);
}