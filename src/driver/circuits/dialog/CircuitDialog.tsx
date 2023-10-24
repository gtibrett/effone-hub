import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Tabs} from '@gtibrett/mui-additions';
import {Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, Tooltip, Typography, useTheme} from '@mui/material';
import RaceMap from '../../../maps/RaceMap';
import useMapCircuitsToMapPoints from '../../../maps/useMapCircuitsToMapPoints';
import {DriverId} from '../../index';
import CircuitChart from './CircuitChart';
import CircuitPerformance from './CircuitPerformance';
import CircuitTable from './CircuitTable';
import LapTimesByYearBox from './LapTimesByYearBox';
import useCircuitDialogData from './useCircuitDialogData';

type CircuitProps = {
	driverId: DriverId;
	circuitId?: number;
	onClose: () => void
};
export default function CircuitDialog({driverId, circuitId, onClose}: CircuitProps) {
	const theme                  = useTheme();
	const mapCircuitsToMapPoints = useMapCircuitsToMapPoints();
	const {data, loading}        = useCircuitDialogData(circuitId, driverId);
	
	if (!data || loading) {
		return null;
	}
	
	const {circuit, driver} = data;
	const {points, onClick} = mapCircuitsToMapPoints([circuit]);
	
	return (
		<Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
			<DialogTitle>
				<Grid container spacing={2}>
					<Grid item xs>
						{circuit.name}
						<Typography paragraph variant="subtitle1">{driver.forename} {driver.surname}</Typography>
					</Grid>
					<Grid item>
						<Tooltip title="Close" arrow placement="left">
							<IconButton color="secondary" onClick={onClose}><FontAwesomeIcon fixedWidth icon={faTimes}/></IconButton>
						</Tooltip>
					</Grid>
				</Grid>
			</DialogTitle>
			<DialogContent dividers sx={{height: '90vh'}}>
				<Grid container spacing={2}>
					<Grid item xs={9}>
						<Tabs active="results" tabs={[
							{
								id:      'results',
								label:   'Results',
								content: (
									         <>
										         <CircuitChart data={data} loading={loading}/>
										         <CircuitTable data={data} loading={loading}/>
									         </>
								         )
							},
							{
								id:      'laptimes',
								label:   'Lap Times',
								content: <LapTimesByYearBox data={data} loading={loading}/>
							}
						]}/>
					</Grid>
					<Grid item xs={3}>
						<Box sx={{border: `1px solid ${theme.palette.divider}`, borderRadius: theme.shape.borderRadius / 2, overflow: 'hidden', mb: 2}}>
							<RaceMap points={points} onClick={onClick} height={200} centerOn={{lat: circuit.lat, lng: circuit.lng}} zoom/>
						</Box>
						<CircuitPerformance data={data} loading={loading}/>
					</Grid>
				</Grid>
			</DialogContent>
		</Dialog>
	);
	
}