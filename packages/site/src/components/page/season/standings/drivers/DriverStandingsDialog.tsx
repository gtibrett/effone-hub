import {DriverByLine} from '@/components/app';
import {Place} from '@/components/page/race';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {DataTable, Dialog} from '@/components/ui';
import useComponentDimensionsWithRef from '@/hooks/useComponentDimensionsWithRef';
import {Card, Grid} from '@mui/material';
import type {ColumnDef} from '@tanstack/react-table';
import {Dispatch, SetStateAction} from 'react';
import useDriverStandingsData from './useDriversStandingsData';

type DriverStandingsDialogProps = {
	season: number;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DriverStandingsDialog({season, open, setOpen}: DriverStandingsDialogProps) {
	const {ref, dimensions} = useComponentDimensionsWithRef();
	const {data}            = useDriverStandingsData(season);
	const races             = data?.season?.racesByYear?.nodes?.filter((r) => r.raceDriverStandings.nodes.length);
	const standings         = races?.at(-1)?.raceDriverStandings?.nodes;
	const onClose           = () => setOpen(false);

	if (!standings?.length) {
		return null;
	}

	const [p1, p2, p3, ...rest] = standings;
	type Row = (typeof rest)[number];
	const numCell = (v: unknown) => <div className="text-center">{v as any}</div>;
	const numHeader = (label: string) => () => <div className="text-center w-full">{label}</div>;

	const columns: ColumnDef<Row, any>[] = [
		{
			accessorKey: 'position',
			header:      numHeader('P'),
			size:        16,
			cell:        ({getValue}) => numCell(getValue())
		},
		{
			id:     'code',
			header: 'Driver',
			cell:   ({row}) => <DriverByLine id={row.original.driver?.rowId} avatarProps={{size: 24}} flagProps={{size: 16}}/>
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
			title={`${season} Driver Standings`}
			closeIcon={<FontAwesomeIcon fixedWidth icon={faTimes}/>}
		>
			<Grid container spacing={2}>
				<Grid item xs={12} lg={5}>
					<Grid container spacing={2} ref={ref}>
						<Grid item xs={12}><Place driverId={p1.driver?.rowId} place={1} points={p1.points || undefined} asterisk={season === 2021}/></Grid>
						<Grid item xs={12}><Place driverId={p2.driver?.rowId} place={2} points={p2.points || undefined}/></Grid>
						<Grid item xs={12}><Place driverId={p3.driver?.rowId} place={3} points={p3.points || undefined}/></Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} lg={7}>
					<Card sx={{height: dimensions.height - 14}}>
						<DataTable<Row>
							rows={rest as Row[]}
							columns={columns}
							density="compact"
							getRowId={(r: Row) => r.driver?.rowId || r.driverId || ''}
							hideFooter
							initialState={{
								sorting: {
									sortModel: [{field: 'position', sort: 'asc'}]
								}
							}}
						/>
					</Card>
				</Grid>
			</Grid>
		</Dialog>
	);
}
