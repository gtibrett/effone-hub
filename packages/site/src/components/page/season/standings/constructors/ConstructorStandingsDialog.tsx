import {ConstructorByLine} from '@/components/app';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {DataTable, Dialog} from '@/components/ui';
import type {ColumnDef} from '@tanstack/react-table';
import {Dispatch, SetStateAction} from 'react';
import useConstructorStandingsData from './useConstructorsStandingsData';

type ConstructorStandingsDialogProps = {
	season: number;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ConstructorStandingsDialog({season, open, setOpen}: ConstructorStandingsDialogProps) {
	const {data}            = useConstructorStandingsData(season);
	const lastRaceStandings = data?.season?.racesByYear?.nodes?.filter((r) => r.raceTeamStandings.nodes.length)?.at(-1)?.raceTeamStandings?.nodes || [];
	const onClose           = () => setOpen(false);

	if (!lastRaceStandings?.length) {
		return null;
	}

	type Row = (typeof lastRaceStandings)[number];
	const numCell = (v: unknown) => <div className="text-center">{v as any}</div>;
	const numHeader = (label: string) => () => <div className="text-center w-full">{label}</div>;

	const columns: ColumnDef<Row, any>[] = [
		{
			accessorKey: 'positionNumber',
			header:      numHeader('P'),
			size:        16,
			cell:        ({getValue}) => numCell(getValue())
		},
		{
			id:     'teamId',
			header: 'Constructor',
			cell:   ({row}) => <ConstructorByLine id={row.original.team?.rowId} variant="link"/>
		},
		{
			accessorKey: 'points',
			header:      numHeader('Points'),
			cell:        ({getValue}) => numCell(getValue())
		}
	];

	return (
		<Dialog
			open={open} onClose={onClose} maxWidth="lg" fullWidth
			title={`${season} Constructor Standings`}
			closeIcon={<FontAwesomeIcon fixedWidth icon={faTimes}/>}
		>
			<DataTable<Row>
				rows={lastRaceStandings as Row[]}
				columns={columns}
				getRowId={(r: Row) => r.teamId || ''}
				autoHeight
				density="compact"
				hideFooter
				initialState={{
					sorting: {
						sortModel: [{field: 'positionNumber', sort: 'asc'}]
					}
				}}
			/>
		</Dialog>
	);
}
