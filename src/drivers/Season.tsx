import {Race} from '@gtibrett/effone-hub-api';
import {Alert, Skeleton, Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useAppState} from '../app/AppStateProvider';
import {getPositionTextOutcome} from '../helpers';
import PositionChange from '../race/PositionChange';
import {Link} from '@gtibrett/mui-additions';
import {DriverId} from './DriverProvider';
import {useRacesBySeason} from './hooks';
import SeasonChart from './SeasonChart';

type SeasonProps = {
	driverId?: DriverId;
}

export default function Season({driverId}: SeasonProps) {
	const [{currentSeason}] = useAppState();
	const races             = useRacesBySeason(currentSeason, driverId);
	
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
							renderCell:  ({value}) => value.toLocaleDateString(),
							minWidth:    100
						},
						{
							field:      'raceName',
							headerName: 'Race',
							flex:       1,
							renderCell: ({row, value}) => (
								<Link to={`/${currentSeason}/${row.round}#${row.raceName}`}>{value}</Link>
							),
							minWidth:   200
						},
						{
							field:       'qualifying',
							headerName:  'Start',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							valueGetter: ({row}) => {
								return Number(row.Results?.[0].grid);
							}
						},
						{
							field:       'result',
							headerName:  'Finish',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							valueGetter: ({row}) => {
								return Number(row.Results?.[0].position);
							}
						},
						{
							field:        'change',
							renderHeader: () => <Typography sx={visuallyHidden}>Position Changes</Typography>,
							renderCell:   ({row}) => {
								const result = row.Results?.[0];
								if (result) {
									const {grid, position} = result;
									return <PositionChange grid={grid} position={position}/>;
								}
								return '';
							},
							valueGetter:  ({row}) => {
								const {grid, position} = row.Results?.[0] || {};
								if (!grid || !position) {
									return 0;
								}
								
								return Number(grid) - Number(position);
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
							valueGetter: ({row}) => {
								return Number(row.Results?.[0].points);
							}
						},
						{
							field:       'time',
							headerName:  'Time',
							sortable:    false,
							headerAlign: 'left',
							align:       'left',
							flex:        .5,
							valueGetter: ({row}) => {
								const result = row.Results?.[0];
								if (result) {
									const time = result.Time?.time;
									return time ? time : getPositionTextOutcome(result.positionText, result.status);
								}
								return '';
							}
						}
					] as GridColDef<Race>[]
				}
			/>
		</>
	);
}