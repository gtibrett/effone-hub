import { Dispatch, SetStateAction } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@gtibrett/mui-additions';
import { DataGrid } from '@mui/x-data-grid';

import { ConstructorByLine } from '@/components/app';
import { toPoints } from '@/helpers';

import useConstructorStandingsData from './useConstructorsStandingsData';

type ConstructorStandingsDialogProps = {
	season: number;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ConstructorStandingsDialog({
	season,
	open,
	setOpen
}: ConstructorStandingsDialogProps) {
	const { data } = useConstructorStandingsData(season);
	const lastRaceStandings =
		data?.season?.racesByYear?.filter(r => r.raceTeamStandings.length)?.at(-1)
			?.raceTeamStandings || [];
	const onClose = () => setOpen(false);

	if (!lastRaceStandings?.length) {
		return null;
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="lg"
			fullWidth
			title={`${season} Constructor Standings`}
			closeIcon={<FontAwesomeIcon icon={faTimes} className="self-end" />}
		>
			<DataGrid
				rows={lastRaceStandings}
				getRowId={r => r.teamId || ''}
				autoHeight
				density="compact"
				hideFooter
				initialState={{
					sorting: {
						sortModel: [{ field: 'positionNumber', sort: 'asc' }]
					}
				}}
				columns={[
					{
						field: 'positionNumber',
						headerName: 'P',
						headerAlign: 'center',
						type: 'number',
						align: 'center',
						width: 16
					},
					{
						field: 'teamId',
						headerName: 'Constructor',
						flex: 1,
						renderCell: ({ row }) => (
							<ConstructorByLine id={row.team?.id} variant="link" />
						)
					},
					{
						field: 'points',
						headerName: 'Points',
						type: 'number',
						valueGetter: value => toPoints(value)
					}
				]}
			/>
		</Dialog>
	);
}
