import {ConstructorByLine} from '@effonehub/constructor';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Dialog} from '@gtibrett/mui-additions';
import {DataGrid} from '@mui/x-data-grid';
import {Dispatch, SetStateAction} from 'react';
import useConstructorStandingsData from './useConstructorsStandingsData';

type ConstructorStandingsDialogProps = {
	season: number;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ConstructorStandingsDialog({season, open, setOpen}: ConstructorStandingsDialogProps) {
	const {data}            = useConstructorStandingsData(season);
	const lastRaceStandings = data?.races?.filter(r => r.teamStandings.length)?.at(-1)?.teamStandings || [];
	const onClose           = () => setOpen(false);
	
	if (!lastRaceStandings?.length) {
		return null;
	}
	
	return (
		<Dialog
			open={open} onClose={onClose} maxWidth="lg" fullWidth
			title={`${season} Constructor Standings`}
			closeIcon={<FontAwesomeIcon fixedWidth icon={faTimes}/>}
		>
			<DataGrid
				rows={lastRaceStandings}
				getRowId={r => r.team?.teamId || ''}
				autoHeight
				density="compact"
				hideFooter
				initialState={{
					sorting: {
						sortModel: [{field: 'position', sort: 'asc'}]
					}
				}}
				columns={
					[
						{
							field:       'position',
							headerName:  'P',
							headerAlign: 'center',
							type:        'number',
							align:       'center',
							width:       16
						},
						{
							field:      'teamId',
							headerName: 'Constructor',
							flex:       1,
							renderCell: ({row}) => <ConstructorByLine id={row.team?.teamId} variant="link"/>
						},
						{
							field:      'points',
							headerName: 'Points',
							type:       'number'
						}
					]
				}
			/>
		</Dialog>
	);
}