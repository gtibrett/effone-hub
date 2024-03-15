import {QueryResult} from '@apollo/client/react/types/types';
import {Race} from '@gtibrett/effone-hub-graph-api';
import {Link} from '@gtibrett/mui-additions';
import {Alert, Box, Skeleton, Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {getPositionTextOutcome, getTimeStringFromDate} from '../../../helpers';
import PositionChange from '../../../race/PositionChange';
import {CircuitDialogData} from './types';

type CircuitTableProps = Pick<QueryResult<CircuitDialogData>, 'data' | 'loading'>;

export default function CircuitTable({data, loading}: CircuitTableProps) {
	if (!data?.circuit.races || loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}
	
	const races = data?.circuit.races.filter(r => r.results.length);
	
	if (!races.length) {
		return <Alert variant="outlined" severity="info">Race Data Not Available</Alert>;
	}
	
	return (
		<Box height={400}>
			<DataGrid
				rows={races}
				density="compact"
				getRowId={(row) => row.date || ''}
				initialState={{
					sorting: {
						sortModel: [{field: 'year', sort: 'desc'}]
					}
				}}
				columns={
					[
						{
							field:       'year',
							headerName:  'Season',
							headerAlign: 'center',
							align:       'center',
							width:       100,
							renderCell: ({row}) => <Link to={`/season/${row.year}`}>{row.year}</Link>
						},
						{
							field:       'grid',
							headerName:  'Start',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							valueGetter: ({row}) => {
								return row.results[0].grid;
							},
							flex:        1
						},
						{
							field:       'positionOrder',
							headerName:  'Finish',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							valueGetter: ({row}) => {
								return row.results[0].positionOrder;
							},
							flex:        1
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
								return '';
							},
							valueGetter:  ({row}) => {
								const {grid, position} = row.results[0] || {};
								if (!grid || !position) {
									return 0;
								}
								
								return grid - position;
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
								return row.results[0].points;
							},
							flex:        1
						},
						{
							field:       'time',
							headerName:  'Time',
							sortable:    false,
							headerAlign: 'left',
							align:       'left',
							valueGetter: ({row}) => {
								const result = row.results[0];
								if (result) {
									return result.milliseconds ? getTimeStringFromDate(new Date(result.milliseconds)) : getPositionTextOutcome(result.positionText, result.status.status);
								}
								return '';
							},
							flex:        1
						}
					] as GridColDef<Race>[]
				}
			/>
		</Box>
	);
}