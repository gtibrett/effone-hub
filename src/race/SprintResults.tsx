import {ConstructorByLine} from '@effonehub/constructor';
import {DriverByLine} from '@effonehub/driver';
import {getMillisecondsFromTimeString, getPositionTextOutcome} from '@effonehub/helpers';
import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {SprintResult} from '@gtibrett/effone-hub-graph-api';
import {Alert, Grid, Skeleton, Tooltip, Typography} from '@mui/material';
import {purple} from '@mui/material/colors';
import {visuallyHidden} from '@mui/utils';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import PositionChange from './PositionChange';

export default function SprintResults({results}: {
	results: SprintResult[]
}) {
	if (!results) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!results.length) {
		return <Alert variant="outlined" severity="info">Race Data Not Available</Alert>;
	}
	
	const fastestLapTime = Math.min(...results.map(r => getMillisecondsFromTimeString(r.fastestLapTime) || Number.POSITIVE_INFINITY));
	
	return (
		<DataGrid
			rows={results}
			autoHeight
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
						field:       'positionOrder',
						headerName:  'P',
						width:       60,
						headerAlign: 'center',
						align:       'center',
						type:        'number'
					},
					{
						field:        'change',
						renderHeader: () => <Typography sx={visuallyHidden}>Position Changes</Typography>,
						renderCell:   ({row}) => (
							<PositionChange {...row}/>
						),
						valueGetter:  (value, row) => {
							const {grid, position} = row;
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
						field:      'Driver',
						headerName: 'Driver',
						flex:       1,
						renderCell: ({row}) => row.driver ? <DriverByLine id={row.driver.driverId}/> : '',
						minWidth:   200
					},
					{
						field:      'Constructor',
						headerName: 'Constructor',
						flex:       1,
						renderCell: ({row}) => row.teamId ? <ConstructorByLine id={row.teamId}/> : '',
						minWidth:   150
					},
					{
						field:       'points',
						headerName:  'Points',
						type:        'number',
						headerAlign: 'center',
						align:       'center'
					},
					{
						field:       'time',
						headerName:  'Time',
						sortable:    false,
						headerAlign: 'left',
						align:       'left',
						flex:        .5,
						renderCell:  ({row}) => {
							const time = row.time;
							return (
								<Grid container alignItems="center" justifyContent="space-between" flexWrap="nowrap" spacing={1}>
									<Grid item>{time ? time : getPositionTextOutcome(row.positionText, row.status.status)}</Grid>
									{getMillisecondsFromTimeString(row.fastestLapTime) === fastestLapTime && (
										<Grid item>
											<Tooltip title="Fastest Lap">
												<FontAwesomeIcon icon={faSquare} color={purple[400]}/>
											</Tooltip>
										</Grid>
									)}
								</Grid>
							);
						},
						minWidth:    110
					}
				]
			}
		/>
	);
}