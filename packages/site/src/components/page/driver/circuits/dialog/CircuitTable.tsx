import {Link} from '@/components/ui';
import {PositionChange} from '@/components/page/race';
import {getPositionTextOutcome, getTimeStringFromDate} from '@/helpers';
import type {SimpleApolloResult} from '@/app/lib/apollo-types';
import {Alert, Box, Skeleton, Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import {DataGrid} from '@mui/x-data-grid';
import {CircuitDialogData} from './types';

type CircuitTableProps = SimpleApolloResult<CircuitDialogData>;

export default function CircuitTable({data, loading}: CircuitTableProps) {
	if (!data?.circuit.races?.nodes || loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}

	const races = data?.circuit.races?.nodes?.filter(r => r.results?.length);

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
							renderCell:  ({row}) => <Link href={`/${row.year}`}>{row.year}</Link>
						},
						{
							field:       'grid',
							headerName:  'Start',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							valueGetter: (_value: unknown, row: typeof races[number]) => {
								return row.results[0].gridPositionNumber;
							},
							flex:        1
						},
						{
							field:       'positionOrder',
							headerName:  'Finish',
							type:        'number',
							headerAlign: 'center',
							align:       'center',
							valueGetter: (_value: unknown, row: typeof races[number]) => {
								return row.results[0].positionDisplayOrder;
							},
							flex:        1
						},
						{
							field:        'change',
							renderHeader: () => <Typography sx={visuallyHidden}>Position Changes</Typography>,
							renderCell:   ({row}) => {
								const result = row.results[0];
								if (result) {
									const {gridPositionNumber, positionDisplayOrder} = result;
									return <PositionChange gridPositionNumber={gridPositionNumber ?? 0} positionDisplayOrder={positionDisplayOrder ?? 0}/>;
								}
								return '';
							},
							valueGetter:  (_value: unknown, row: typeof races[number]) => {
								const {gridPositionNumber, positionDisplayOrder} = row.results[0] || {};
								if (!gridPositionNumber || !positionDisplayOrder) {
									return 0;
								}

								return gridPositionNumber - positionDisplayOrder;
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
							valueGetter: (_value: unknown, row: typeof races[number]) => {
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
							valueGetter: (_value: unknown, row: typeof races[number]) => {
								const result = row.results[0];
								if (result) {
									return result.timeMillis ? getTimeStringFromDate(new Date(result.timeMillis)) : getPositionTextOutcome(result.positionText, result.reasonRetired);
								}
								return '';
							},
							flex:        1
						}
					]
				}
			/>
		</Box>
	);
}
