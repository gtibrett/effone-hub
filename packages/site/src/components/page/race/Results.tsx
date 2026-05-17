import {ConstructorByLine, DriverByLine} from '@/components/app';
import {getPositionTextOutcome} from '@/helpers';
import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Race, RaceResult} from '@/gql/graphql';
import {Alert, AlertDescription} from '@/components/ui/shadcn/alert';
import {DataTable, Skeleton, Typography} from '@/components/ui';
 
import {Grid, Tooltip} from '@mui/material';
import {purple} from '@mui/material/colors';
import {visuallyHidden} from '@mui/utils';
import type {ColumnDef} from '@tanstack/react-table';
import Podium from './Podium';
import PositionChange from './PositionChange';

type Row = RaceResult;

export default function Results({results}: { results: Race['raceResults'] }) {
	const nodes = results?.nodes;

	if (!nodes) {
		return <Skeleton variant="rectangular" height={400}/>;
	}

	if (!nodes.length) {
		return <Alert><AlertDescription>Race Data Not Available</AlertDescription></Alert>;
	}

	const rows: Row[] = (nodes as Array<RaceResult | null>)
		.filter((r): r is RaceResult => r != null);

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
						{row.original.fastestLap && (
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
	];

	return (
		<>
			<Grid container spacing={2} justifyContent="space-evenly" sx={{mb: 2}}>
				<Podium results={rows}/>
			</Grid>
			<DataTable<Row>
				rows={rows}
				columns={columns}
				autoHeight
				density="compact"
				getRowId={(r: Row) => r.driverId || 0}
				initialState={{
					sorting: {
						sortModel: [{field: 'positionDisplayOrder', sort: 'asc'}]
					}
				}}
			/>
		</>
	);
}
