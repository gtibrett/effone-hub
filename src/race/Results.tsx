import {faSquare} from '@fortawesome/pro-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Alert, Grid, Skeleton, Tooltip, Typography} from '@mui/material';
import {purple} from '@mui/material/colors';
import {visuallyHidden} from '@mui/utils';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import ConstructorByLine from '../constructors/ByLine';
import ByLine from '../drivers/ByLine';
import {getPositionTextOutcome} from '../helpers';
import {Race, Result} from '../types/ergast';
import PositionChange from './PositionChange';

const sx = {
	border: 0,
	'& > div > .MuiDataGrid-footerContainer': {
		display: 'none'
	}
};

export default function Results({results}: { results: Race['Results'] }) {
	if (!results) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	if (!results.length) {
		return <Alert variant="outlined" severity="info">Race Data Not Available</Alert>;
	}
	
	const rows = results.map(row => ({
		...row,
		id: row.position
	}));
	
	return (
		<DataGrid
			sx={sx}
			rows={rows}
			autoHeight
			density="compact"
			columns={
				[
					{
						field: 'position',
						headerName: 'P',
						width: 60,
						headerAlign: 'center',
						align: 'center',
						type: 'number'
					},
					{
						field: 'change',
						renderHeader: () => <Typography sx={visuallyHidden}>Position Changes</Typography>,
						renderCell: ({row}) => (
							<PositionChange {...row}/>
						),
						valueGetter: ({row}) => {
							const {grid, position} = row;
							if (!grid || !position) {
								return 0;
							}
							
							return Number(grid) - Number(position);
						},
						width: 60,
						headerAlign: 'center',
						align: 'center'
					},
					{
						field: 'Driver',
						headerName: 'Driver',
						flex: 1,
						renderCell: ({row}) => row.Driver ? <ByLine id={row.Driver.driverId}/> : ''
					},
					{
						field: 'Constructor',
						headerName: 'Constructor',
						flex: 1,
						renderCell: ({row}) => row.Constructor ? <ConstructorByLine id={row.Constructor.constructorId}/> : ''
					},
					{
						field: 'points',
						headerName: 'Points',
						type: 'number',
						headerAlign: 'center',
						align: 'center'
					},
					{
						field: 'time',
						headerName: 'Time',
						sortable: false,
						headerAlign: 'left',
						align: 'left',
						flex: .5,
						renderCell: ({row}) => {
							const time = row.Time?.time;
							return (
								<Grid container alignItems="center" justifyContent="space-between">
									<Grid item>{time ? time : getPositionTextOutcome(row.positionText, row.status)}</Grid>
									{row.FastestLap?.rank === '1' && (
										<Grid item>
											<Tooltip title="Fastest Lap">
												<FontAwesomeIcon icon={faSquare} color={purple[400]}/>
											</Tooltip>
										</Grid>
									)}
								</Grid>
							);
						}
					}
				] as GridColDef<Result>[]
			}
		/>
	);
}