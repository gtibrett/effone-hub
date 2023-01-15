import {Alert, Box, Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {getPositionTextOutcome} from '../../helpers';
import {getTimeStringFromDate} from '../../race/lapTimes/helpers';
import PositionChange from '../../race/PositionChange';
import {Race} from '../../types/ergast';

type SeasonProps = {
	races: Race[];
}

export default function CircuitTable({races}: SeasonProps) {
	if (!races.length) {
		return <Alert variant="outlined" severity="info">Race Data Not Available</Alert>;
	}
	
	return (
		<Box height={400}>
		<DataGrid
			rows={races}
			density="compact"
			getRowId={(row) => row.season || ''}
			columns={
				[
					{
						field: 'season',
						headerName: 'Season',
						headerAlign: 'center',
						type: 'number',
						align: 'center',
						minWidth: 100,
						flex:1
					},
					{
						field: 'qualifying',
						headerName: 'Start',
						type: 'number',
						headerAlign: 'center',
						align: 'center',
						valueGetter: ({row}) => {
							return Number(row.Results?.[0].grid);
						},
						flex:1
					},
					{
						field: 'result',
						headerName: 'Finish',
						type: 'number',
						headerAlign: 'center',
						align: 'center',
						valueGetter: ({row}) => {
							return Number(row.Results?.[0].position);
						},
						flex:1
					},
					{
						field: 'change',
						renderHeader: () => <Typography sx={visuallyHidden}>Position Changes</Typography>,
						renderCell: ({row}) => {
							const {grid, position} = row.Results?.[0] || {};
							return <PositionChange grid={grid} position={position}/>;
						},
						valueGetter: ({row}) => {
							const {grid, position} = row.Results?.[0] || {};
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
						field: 'points',
						headerName: 'Points',
						type: 'number',
						headerAlign: 'center',
						align: 'center',
						valueGetter: ({row}) => {
							return Number(row.Results?.[0].points);
						},
						flex:1
					},
					{
						field: 'time',
						headerName: 'Time',
						sortable: false,
						headerAlign: 'left',
						align: 'left',
						valueGetter: ({row}) => {
							const time = Number(row.Results?.[0].Time?.millis);
							return time ? getTimeStringFromDate(new Date(time)) : getPositionTextOutcome(row.Results?.[0].positionText, row.Results?.[0].status);
						},
						flex:1
					}
				] as GridColDef<Race>[]
			}
		/>
		</Box>
	);
}