import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {TeamStanding} from '@gtibrett/effone-hub-graph-api';
import {Dialog, DialogContent, DialogTitle, Grid, IconButton, Tooltip} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Dispatch, SetStateAction} from 'react';
import {ConstructorByLine} from '../../constructor';
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
		<Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
			<DialogTitle>
				<Grid container spacing={2}>
					<Grid item xs>Season {season} Constructor Standings</Grid>
					<Grid item>
						<Tooltip title="Close" arrow placement="left">
							<IconButton color="secondary" onClick={onClose}><FontAwesomeIcon fixedWidth icon={faTimes}/></IconButton>
						</Tooltip>
					</Grid>
				</Grid>
			</DialogTitle>
			<DialogContent dividers>
				<DataGrid
					rows={lastRaceStandings}
					getRowId={r => r.team.teamId}
					autoHeight
					density="compact"
					pageSize={10}
					initialState={{
						sorting: {
							sortModel: [{field: 'points', sort: 'desc'}]
						}
					}}
					columns={
						[
							{
								field:      'teamId',
								headerName: 'Constructor',
								flex:       1,
								renderCell: ({row}) => <ConstructorByLine id={row.team.teamId} variant="link"/>
							},
							{
								field:      'points',
								headerName: 'Points',
								type:       'number'
							}
						] as GridColDef<TeamStanding>[]
					}
				/>
			</DialogContent>
		</Dialog>
	);
}