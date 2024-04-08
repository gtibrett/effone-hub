import {DriverByLine, DriverId} from '@effonehub/driver';
import {RaceMap, useMapCircuitsToMapPoints} from '@effonehub/maps';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Dialog, Tabs} from '@gtibrett/mui-additions';
import {Card, Grid, Typography} from '@mui/material';
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
	const mapCircuitsToMapPoints = useMapCircuitsToMapPoints();
	const {data, loading}        = useCircuitDialogData(circuitId, driverId);
	
	if (!data || loading) {
		return null;
	}
	
	const {circuit}         = data;
	const {points, onClick} = mapCircuitsToMapPoints([circuit]);
	
	return (
		<Dialog
			open={!!circuitId} closeIcon={<FontAwesomeIcon fixedWidth icon={faTimes}/>} onClose={onClose} maxWidth="lg" fullWidth
			title={
				<>
					{circuit.name}
					<Typography paragraph variant="subtitle1"><DriverByLine id={driverId} variant="name"/></Typography>
				</>
			}>
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
					<Card sx={{mb: 2}}>
						<RaceMap points={points} onClick={onClick} height={200} centerOn={{lat: circuit.lat, lng: circuit.lng}} zoom/>
					</Card>
					<CircuitPerformance data={data} loading={loading}/>
				</Grid>
			</Grid>
		</Dialog>
	);
	
}