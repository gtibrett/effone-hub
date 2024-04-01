import {DriverByLine} from '@effonehub/driver';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useComponentDimensionsWithRef} from '@gtibrett/mui-additions';
import {Card, Dialog, DialogContent, DialogTitle, Grid, IconButton, Tooltip} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {Dispatch, SetStateAction} from 'react';
import Place from '../../race/Place';
import useDriverStandingsData from './useDriversStandingsData';

const sx = {
	'& > .MuiDataGrid-main':                  {
		overflowX: 'hidden'
	},
	'& > div > .MuiDataGrid-footerContainer': {
		display: 'none'
	}
};

type DriverStandingsDialogProps = {
	season: number;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DriverStandingsDialog({season, open, setOpen}: DriverStandingsDialogProps) {
	const {ref, dimensions} = useComponentDimensionsWithRef();
	const {data}            = useDriverStandingsData(season);
	const races             = data?.races.filter(r => r.driverStandings.length);
	const standings         = races?.at(-1)?.driverStandings;
	const onClose           = () => setOpen(false);
	
	if (!standings?.length) {
		return null;
	}
	
	const [p1, p2, p3, ...rest] = standings;
	
	return (
		<Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
			<DialogTitle>
				<Grid container spacing={2}>
					<Grid item xs>Season {season} Driver Standings</Grid>
					<Grid item>
						<Tooltip title="Close" arrow placement="left">
							<IconButton color="secondary" onClick={onClose}><FontAwesomeIcon fixedWidth icon={faTimes}/></IconButton>
						</Tooltip>
					</Grid>
				</Grid>
			</DialogTitle>
			<DialogContent dividers>
				<Grid container spacing={2}>
					<Grid item xs={12} lg={5}>
						<Grid container spacing={2} ref={ref}>
							<Grid item xs={12}><Place driverId={p1.driver.driverId} place={1} points={p1.points} asterisk={season === 2021}/></Grid>
							<Grid item xs={12}><Place driverId={p2.driver.driverId} place={2} points={p2.points}/></Grid>
							<Grid item xs={12}><Place driverId={p3.driver.driverId} place={3} points={p3.points}/></Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} lg={7}>
						<Card sx={{height: dimensions.height - 14}}>
							<DataGrid
								sx={sx}
								rows={rest}
								density="compact"
								getRowId={r => r.driver.driverId}
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
											field:      'code',
											headerName: 'Driver',
											flex:       1,
											renderCell: ({row}) => <DriverByLine id={row.driver.driverId} avatarProps={{size: 24}} flagProps={{size: 16}}/>,
											minWidth:   200
										},
										{
											field:      'points',
											headerName: 'Points',
											type:       'number'
										}
									]
								}
							/>
						</Card>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
}