import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Result} from '@gtibrett/effone-hub-graph-api';
import {Grid, Skeleton, Tooltip, Typography} from '@mui/material';
import {purple} from '@mui/material/colors';
import {visuallyHidden} from '@mui/utils';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {ConstructorByLine} from '../constructor';
import {DriverByLine} from '../driver';
import {getPositionTextOutcome} from '../helpers';
import PositionChange from '../race/PositionChange';
import NextRaceCountdown from '../raceWeekend/NextRaceCountdown';
import {CircuitDataProps} from './useCircuitByRef';

export default function Season({data, loading}: CircuitDataProps) {
	if (loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!data) {
		return null;
	}
	
	if (data.circuit.season.length) {
		if (!data.circuit.season[0].results.length) {
			return <>
				<Typography variant="h5">Countdown</Typography>
				<NextRaceCountdown race={data.circuit.season[0]}/>
			</>;
		}
	}
	
	const results = data.circuit.season[0].results;
	
	return (
		<DataGrid
			rows={results}
			autoHeight
			density="compact"
			getRowId={r => r.driverId}
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
							<PositionChange grid={Number(row.grid)} position={Number(row.positionOrder)}/>
						),
						valueGetter:  ({row}) => {
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
						renderCell: ({row}) => row.driverId ? <DriverByLine id={row.driverId}/> : '',
						minWidth:   200
					},
					{
						field:      'Constructor',
						headerName: 'Constructor',
						flex:       1,
						renderCell: ({row}) => row.team.teamId ? <ConstructorByLine id={row.team.teamId}/> : '',
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
									{row.rank === 1 && (
										<Grid item>
											<Tooltip title="Fastest Lap">
												<FontAwesomeIcon icon={faSquare} color={purple[400]}/>
											</Tooltip>
										</Grid>
									)}
									<Grid item><>{time ? time : getPositionTextOutcome(row.positionText, row.status.status)}</>
									</Grid>
								</Grid>
							);
						},
						minWidth:    110
					}
				] as GridColDef<Result>[]
			}
		/>
	);
}