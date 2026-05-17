import {ConstructorByLine, DriverByLine} from '@/components/app';
import {getPositionTextOutcome} from '@/helpers';
import {SprintRaceResult} from '@/gql/graphql';
import {Alert, AlertDescription} from '@/components/ui/shadcn/alert';
import {DataTable, Skeleton, Typography} from '@/components/ui';
 
import {Grid} from '@mui/material';
import {visuallyHidden} from '@mui/utils';
import type {ColumnDef} from '@tanstack/react-table';
import PositionChange from './PositionChange';

export default function SprintResults({results}: {
	results: SprintRaceResult[]
}) {
	if (!results) {
		return <Skeleton variant="rectangular" height={400}/>;
	}

	if (!results.length) {
		return <Alert><AlertDescription>Race Data Not Available</AlertDescription></Alert>;
	}

	const numCell = (v: unknown) => <div className="text-center">{v as any}</div>;
	const numHeader = (label: string) => () => <div className="text-center w-full">{label}</div>;

	const columns: ColumnDef<SprintRaceResult, any>[] = [
		{
			accessorKey: 'positionDisplayOrder',
			header:      numHeader('P'),
			size:        60,
			cell:        ({getValue}) => numCell(getValue())
		},
		{
			id:         'change',
			header:     () => <Typography sx={visuallyHidden}>Position Changes</Typography>,
			size:       60,
			accessorFn: (row) => {
				const {gridPositionNumber, positionNumber} = row;
				if (!gridPositionNumber || !positionNumber) {
					return 0;
				}
				return Number(gridPositionNumber) - Number(positionNumber);
			},
			cell:       ({row}) => <div className="text-center"><PositionChange {...row.original}/></div>
		},
		{
			id:     'Driver',
			header: 'Driver',
			cell:   ({row}) => row.original.driverId ? <DriverByLine id={row.original.driverId}/> : ''
		},
		{
			id:     'Constructor',
			header: 'Constructor',
			cell:   ({row}) => row.original.teamId ? <ConstructorByLine id={row.original.teamId}/> : ''
		},
		{
			accessorKey: 'points',
			header:      numHeader('Points'),
			cell:        ({getValue}) => numCell(getValue())
		},
		{
			id:            'time',
			header:        'Time',
			enableSorting: false,
			cell:          ({row}) => {
				const time = row.original.time;
				return (
					<Grid container alignItems="center" justifyContent="space-between" flexWrap="nowrap" spacing={1}>
						<Grid item>{time ? time : getPositionTextOutcome(row.original.positionText, row.original.reasonRetired)}</Grid>
					</Grid>
				);
			}
		}
	];

	return (
		<DataTable<SprintRaceResult>
			rows={results}
			columns={columns}
			autoHeight
			density="compact"
			getRowId={(r: SprintRaceResult) => r.driverId || r.positionDisplayOrder}
			initialState={{
				sorting: {
					sortModel: [{field: 'positionDisplayOrder', sort: 'asc'}]
				}
			}}
		/>
	);
}
