import {PositionChange} from '@/components/page/race';
import {getPositionTextOutcome, getTimeStringFromDate} from '@/helpers';
import type {SimpleApolloResult} from '@/app/lib/apollo-types';
import {Alert, AlertDescription} from '@/components/ui/shadcn/alert';
import {DataTable, Link} from '@/components/ui';
import {Box, Skeleton, Typography} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import type {ColumnDef} from '@tanstack/react-table';
import {CircuitDialogData} from './types';

type CircuitTableProps = SimpleApolloResult<CircuitDialogData>;

export default function CircuitTable({data, loading}: CircuitTableProps) {
	if (!data?.circuit.races?.nodes || loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}

	const races = data?.circuit.races?.nodes?.filter((r) => r.results?.length);

	if (!races.length) {
		return <Alert><AlertDescription>Race Data Not Available</AlertDescription></Alert>;
	}

	type RaceRow = (typeof races)[number];
	const numCell = (v: unknown) => <div className="text-center">{v as any}</div>;
	const numHeader = (label: string) => () => <div className="text-center w-full">{label}</div>;

	const columns: ColumnDef<RaceRow, any>[] = [
		{
			accessorKey: 'year',
			header:      numHeader('Season'),
			size:        100,
			cell:        ({row}) => <div className="text-center"><Link href={`/${row.original.year}`}>{row.original.year}</Link></div>
		},
		{
			id:         'grid',
			header:     numHeader('Start'),
			accessorFn: (row) => row.results[0].gridPositionNumber,
			cell:       ({getValue}) => numCell(getValue())
		},
		{
			id:         'positionOrder',
			header:     numHeader('Finish'),
			accessorFn: (row) => row.results[0].positionDisplayOrder,
			cell:       ({getValue}) => numCell(getValue())
		},
		{
			id:         'change',
			header:     () => <Typography sx={visuallyHidden}>Position Changes</Typography>,
			size:       60,
			accessorFn: (row) => {
				const {gridPositionNumber, positionDisplayOrder} = row.results[0] || {};
				if (!gridPositionNumber || !positionDisplayOrder) {
					return 0;
				}
				return gridPositionNumber - positionDisplayOrder;
			},
			cell:       ({row}) => {
				const result = row.original.results[0];
				if (result) {
					const {gridPositionNumber, positionDisplayOrder} = result;
					return <div className="text-center"><PositionChange gridPositionNumber={gridPositionNumber ?? 0} positionDisplayOrder={positionDisplayOrder ?? 0}/></div>;
				}
				return '';
			}
		},
		{
			id:         'points',
			header:     numHeader('Points'),
			accessorFn: (row) => row.results[0].points,
			cell:       ({getValue}) => numCell(getValue())
		},
		{
			id:            'time',
			header:        'Time',
			enableSorting: false,
			accessorFn:    (row) => {
				const result = row.results[0];
				if (result) {
					return result.timeMillis ? getTimeStringFromDate(new Date(result.timeMillis)) : getPositionTextOutcome(result.positionText, result.reasonRetired);
				}
				return '';
			},
			cell:          ({getValue}) => <>{getValue() as any}</>
		}
	];

	return (
		<Box height={400}>
			<DataTable<RaceRow>
				rows={races}
				columns={columns}
				density="compact"
				getRowId={(row) => row.date || ''}
				initialState={{
					sorting: {
						sortModel: [{field: 'year', sort: 'desc'}]
					}
				}}
			/>
		</Box>
	);
}
