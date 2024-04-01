import {DriverByLine} from '@effonehub/driver';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Tabs} from '@gtibrett/mui-additions';
import {Card, Dialog, DialogContent, DialogTitle, Grid, IconButton, SxProps, Tooltip, Typography, useTheme} from '@mui/material';
import RaceMap from '../../../maps/RaceMap';
import useMapCircuitsToMapPoints from '../../../maps/useMapCircuitsToMapPoints';
import {DriverId} from '../../index';
import CircuitChart from './CircuitChart';
import CircuitPerformance from './CircuitPerformance';
import CircuitTable from './CircuitTable';
import LapTimesByYearBox from './LapTimesByYearBox';
import useCircuitDialogData from './useCircuitDialogData';

const useSx = () => {
	const theme          = useTheme();
	const title: SxProps = {
		position:     'sticky',
		top:          0, left: 0, right: 0,
		background:   theme.palette.background.paper,
		borderBottom: `1px solid ${theme.palette.divider}`,
		zIndex:       2
	};
	
	const content: SxProps = {
		height:    '90vh',
		overflow:  'visible',
		borderTop: 0,
		zIndex:    1
	};
	
	return {title, content};
};

type CircuitProps = {
	driverId: DriverId;
	circuitId?: number;
	onClose: () => void
};

export default function CircuitDialog({driverId, circuitId, onClose}: CircuitProps) {
	const sx                     = useSx();
	const mapCircuitsToMapPoints = useMapCircuitsToMapPoints();
	const {data, loading}        = useCircuitDialogData(circuitId, driverId);
	
	if (!data || loading) {
		return null;
	}
	
	const {circuit}         = data;
	const {points, onClick} = mapCircuitsToMapPoints([circuit]);
	
	return (
		<Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
			<DialogTitle sx={sx.title}>
				<Grid container spacing={2}>
					<Grid item xs>
						{circuit.name}
						<Typography paragraph variant="subtitle1"><DriverByLine id={driverId} variant="name"/></Typography>
					</Grid>
					<Grid item>
						<Tooltip title="Close" arrow placement="left">
							<IconButton color="secondary" onClick={onClose}><FontAwesomeIcon fixedWidth icon={faTimes}/></IconButton>
						</Tooltip>
					</Grid>
				</Grid>
			</DialogTitle>
			<DialogContent dividers sx={{...sx.content, mt: `${0}px`}}>
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
			</DialogContent>
		</Dialog>
	);
	
}