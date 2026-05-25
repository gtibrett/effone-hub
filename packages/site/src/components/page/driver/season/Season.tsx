import {useAppState} from '@/components/app';
import {PositionChange} from '@/components/page/race';
import {getPositionTextOutcome, getTimeStringFromDate} from '@/helpers';
import {Link} from '@gtibrett/mui-additions';
import {Alert, Grid, Skeleton, Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {DataGrid} from '@mui/x-data-grid';
import SeasonChart from './SeasonChart';
import useSeasonData from './useSeasonData';

type SeasonProps = { season: number, driverId: string };

export default function Season({season, driverId}: SeasonProps) {
	const [{currentSeason}] = useAppState();
	const {data, loading}   = useSeasonData(driverId, season);

	if (loading || !data?.races) {
		return <Skeleton variant="rectangular" height={400}/>;
	}

	if (!data.races.nodes.length) {
		return <Alert variant="outlined" severity="info">Season Data Not Available</Alert>;
	}

	return (
        <Grid container spacing={2}>
            <Grid size={12}>
				<SeasonChart season={season} driverId={driverId} data={data} loading={loading}/>
			</Grid>
            <Grid size={12}>
				<DataGrid
					rows={data.races.nodes}
					autoHeight
					density="compact"
					getRowId={(row) => row.rowId || ''}
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
								field:      'officialName',
								headerName: 'Race',
								flex:       1,
								renderCell: ({row, value}) => (
									<Link href={`/${currentSeason}/${row.round}#${row.officialName}`}>{value}</Link>
								),
								minWidth:   200
							},
							{
								field:       'grid',
								headerName:  'Start',
								type:        'number',
								headerAlign: 'center',
								align:       'center',
								valueGetter: (value, row) => row.raceResults?.nodes?.[0]?.gridPositionNumber || '--'
							},
							{
								field:       'result',
								headerName:  'Finish',
								type:        'number',
								headerAlign: 'center',
								align:       'center',
								valueGetter: (value, row) => row.raceResults?.nodes?.[0]?.positionDisplayOrder || '--'
							},
							{
								field:        'change',
								renderHeader: () => <Typography sx={visuallyHidden}>Position Changes</Typography>,
								renderCell:   ({row}) => {
									const result = row.raceResults?.nodes?.[0];
									if (result) {
										const {gridPositionNumber, positionDisplayOrder} = result;
										return <PositionChange gridPositionNumber={gridPositionNumber} positionDisplayOrder={positionDisplayOrder}/>;
									}
									return '--';
								},
								valueGetter:  (value, row) => {
									const result = row.raceResults?.nodes?.[0];
									if (result) {
										const {gridPositionNumber, positionDisplayOrder} = result;
										if (gridPositionNumber && positionDisplayOrder) {
											return gridPositionNumber - positionDisplayOrder;
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
								valueGetter: (value, row) => row.raceResults?.nodes?.[0]?.points || '--'
							},
							{
								field:       'time',
								headerName:  'Time',
								sortable:    false,
								headerAlign: 'left',
								align:       'left',
								flex:        .5,
								valueGetter: (value, row) => {
									const result = row.raceResults?.nodes?.[0];
									if (result) {
										const time = result.timeMillis;
										return time ? getTimeStringFromDate(new Date(time)) : getPositionTextOutcome(result.positionText, result.reasonRetired);
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
