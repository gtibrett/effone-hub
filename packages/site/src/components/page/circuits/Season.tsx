import {ConstructorByLine, DriverByLine} from '@/components/app';
import {getPositionTextOutcome} from '@/helpers';
import {CircuitDataProps} from '@/hooks/data';
import {DataTable, Skeleton, Typography} from '@/components/ui';
 
import {Grid} from '@/components/ui';
import {visuallyHidden} from '@/lib/visuallyHidden';
import type {ColumnDef} from '@tanstack/react-table';
import PositionChange from '../race/PositionChange';
import NextRaceCountdown from '../raceWeekend/NextRaceCountdown';

export default function Season({data, loading}: CircuitDataProps) {
	if (loading) {
		return <Skeleton variant="rectangular" height={400}/>;
	}

	if (!data) {
		return null;
	}

	if (data.circuit.season.nodes.length) {
		if (!data.circuit.season.nodes[0].raceResults.nodes.length) {
			return <>
				<Typography variant="h5">Countdown</Typography>
				<NextRaceCountdown variant="main" race={data.circuit.season.nodes[0] as any}/>
			</>;
		}
	}

	const results = (data.circuit.season.nodes[0].raceResults.nodes).filter(Boolean) as NonNullable<typeof data.circuit.season.nodes[0]['raceResults']['nodes'][number]>[];
	type Row = (typeof results)[number];
	const numCell = (v: unknown) => <div className="text-center">{v as any}</div>;
	const numHeader = (label: string) => () => <div className="text-center w-full">{label}</div>;

	const columns: ColumnDef<Row, any>[] = [
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
				const {gridPositionNumber, positionDisplayOrder} = row;
				if (!gridPositionNumber || !positionDisplayOrder) {
					return 0;
				}
				return Number(gridPositionNumber) - Number(positionDisplayOrder);
			},
			cell:       ({row}) => (
				<div className="text-center">
					<PositionChange gridPositionNumber={Number(row.original.gridPositionNumber)} positionDisplayOrder={Number(row.original.positionDisplayOrder)}/>
				</div>
			)
		},
		{
			id:     'Driver',
			header: 'Driver',
			cell:   ({row}) => row.original.driverId ? <DriverByLine id={row.original.driverId}/> : ''
		},
		{
			id:     'Constructor',
			header: 'Constructor',
			cell:   ({row}) => row.original.team?.rowId ? <ConstructorByLine id={row.original.team.rowId}/> : ''
		},
		{
			accessorKey: 'points',
			header:      numHeader('Points'),
			cell:        ({getValue}) => numCell(getValue())
		},
		{
			accessorKey:   'reasonRetired',
			header:        'Status',
			enableSorting: false,
			cell:          ({row}) => {
				return (
					<Grid container alignItems="center" justifyContent="space-between" flexWrap="nowrap" spacing={1}>
						<Grid item><>{row.original.reasonRetired ? row.original.reasonRetired : getPositionTextOutcome(String(row.original.positionDisplayOrder), undefined)}</>
						</Grid>
					</Grid>
				);
			}
		}
	];

	return (
		<DataTable<Row>
			rows={results}
			columns={columns}
			autoHeight
			density="compact"
			getRowId={(r: Row) => r.driverId || ''}
			initialState={{
				sorting: {
					sortModel: [{field: 'positionDisplayOrder', sort: 'asc'}]
				}
			}}
		/>
	);
}
