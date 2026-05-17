import {DriverByLine} from '@/components/app';
import {CircuitDataProps} from '@/hooks/data';
import {Alert, AlertDescription} from '@/components/ui/shadcn/alert';
import {DataTable, Link, Skeleton} from '@/components/ui';

import type {ColumnDef} from '@tanstack/react-table';

export default function History({data, loading}: CircuitDataProps) {
	if (loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}

	if (!data?.circuit.history.nodes.length) {
		return <Alert><AlertDescription>Race Data Not Available</AlertDescription></Alert>;
	}

	type Row = (typeof data.circuit.history.nodes)[number];

	const columns: ColumnDef<Row, any>[] = [
		{
			accessorKey: 'year',
			header:      () => <div className="text-center w-full">Season</div>,
			size:        100,
			cell:        ({row}) => <div className="text-center"><Link href={`/${row.original.year}`}>{row.original.year}</Link></div>
		},
		{
			id:         'date',
			header:     () => <div className="text-center w-full">Date</div>,
			accessorFn: (row) => row.date ? new Date(row.date) : undefined,
			sortingFn:  'datetime',
			cell:       ({getValue}) => {
				const value = getValue<Date | undefined>();
				return <div className="text-center">{value ? value.toLocaleDateString() : ''}</div>;
			}
		},
		{
			accessorKey: 'officialName',
			header:      'Race',
			cell:        ({row}) => (
				<Link href={`/${row.original.year}/${row.original.round}#${row.original.officialName}`}>{row.original.year} {row.original.officialName}</Link>
			)
		},
		{
			id:         'winner',
			header:     'Winner',
			accessorFn: (row) => {
				if (!row.raceResults?.nodes?.length) {
					return '--';
				}
				return `${row.raceResults?.nodes?.[0]?.driver?.lastName}, ${row.raceResults?.nodes?.[0]?.driver?.firstName}`;
			},
			cell:       ({row}) => {
				if (!row.original.raceResults?.nodes?.length) {
					return '--';
				}
				return <DriverByLine id={row.original.raceResults?.nodes?.[0]?.driverId}/>;
			}
		},
		{
			id:            'time',
			header:        'Time',
			enableSorting: false,
			cell:          ({row}) => row.original.raceResults?.nodes?.[0]?.time || '--'
		}
	];

	return (
		<DataTable<Row>
			rows={data.circuit.history.nodes as Row[]}
			columns={columns}
			autoHeight
			density="compact"
			getRowId={(r: Row) => r.date}
			initialState={{
				sorting: {
					sortModel: [{field: 'year', sort: 'desc'}]
				}
			}}
		/>
	);
}
